import { readFile, stat } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import assert from 'node:assert/strict';
import { parse } from 'parse5';

const root = resolve('dist');
const canonicalHost = 'https://astrodyuti.com';
const expectedPages = ['index', 'privacy', 'terms', 'refund', 'disclaimer', 'eula', 'licenses', 'cookies', 'accessibility', 'faq', 'support', 'delete-account', 'get', '404'];
const documents = new Map();
let linksChecked = 0;

function nodes(node) {
  return [node, ...(node.childNodes ?? []).flatMap(nodes)];
}
function attr(node, name) { return node.attrs?.find((attribute) => attribute.name === name)?.value; }
for (const page of expectedPages) {
  const filename = `${page}.html`;
  const html = await readFile(resolve(root, filename), 'utf8');
  const all = nodes(parse(html));
  const ids = all.map((node) => attr(node, 'id')).filter(Boolean);
  assert.equal(new Set(ids).size, ids.length, `${filename}: duplicate IDs`);
  assert.equal(all.filter((node) => node.tagName === 'h1').length, 1, `${filename}: expected one h1`);
  assert.equal(all.filter((node) => node.tagName === 'main').length, 1, `${filename}: expected one main`);
  assert(all.some((node) => node.tagName === 'a' && attr(node, 'href') === '#main-content'), `${filename}: missing skip link`);
  assert(all.some((node) => node.tagName === 'title'), `${filename}: missing title`);
  assert(all.some((node) => node.tagName === 'meta' && attr(node, 'name') === 'description' && attr(node, 'content')), `${filename}: missing description`);
  const canonical = all.find((node) => node.tagName === 'link' && attr(node, 'rel') === 'canonical');
  const pathname = page === 'index' || page === '404' ? '/' : `/${filename}`;
  assert.equal(attr(canonical, 'href'), canonicalHost + pathname, `${filename}: wrong canonical`);
  assert(!html.includes('fonts.googleapis.com') && !html.includes('fonts.gstatic.com'), `${filename}: external font request`);
  assert(!html.includes('ec.europa.eu/consumers/odr'), `${filename}: discontinued ODR link`);
  for (const image of all.filter((node) => node.tagName === 'img')) {
    assert.notEqual(attr(image, 'alt'), undefined, `${filename}: image missing alt`);
    assert(attr(image, 'width') && attr(image, 'height'), `${filename}: image dimensions missing`);
  }
  for (const script of all.filter((node) => node.tagName === 'script' && attr(node, 'type') === 'application/ld+json')) {
    JSON.parse((script.childNodes ?? []).map((node) => node.value ?? '').join(''));
  }
  documents.set(filename, { all, ids, html });
}

for (const [filename, { all }] of documents) {
  const base = new URL(filename === 'index.html' ? '/' : `/${filename}`, canonicalHost);
  for (const node of all) {
    for (const key of ['href', 'src']) {
      const value = attr(node, key);
      if (!value || /^(mailto:|tel:|data:)/.test(value)) continue;
      const url = new URL(value, base);
      if (url.origin !== canonicalHost) continue;
      let target = resolve(root, '.' + decodeURIComponent(url.pathname));
      assert(!relative(root, target).startsWith('..'), `${filename}: path escapes output`);
      if (url.pathname.endsWith('/')) target = resolve(target, 'index.html');
      assert((await stat(target)).isFile(), `${filename}: missing file ${value}`);
      const targetName = relative(root, target);
      if (url.hash && documents.has(targetName)) assert(documents.get(targetName).ids.includes(decodeURIComponent(url.hash.slice(1))), `${filename}: missing anchor ${value}`);
      linksChecked++;
    }
    for (const controlled of (attr(node, 'aria-controls') ?? '').split(/\s+/).filter(Boolean)) assert(documents.get(filename).ids.includes(controlled), `${filename}: missing aria-controls target ${controlled}`);
  }
}
assert.equal((await readFile(resolve(root, 'CNAME'), 'utf8')).trim(), 'astrodyuti.com');
assert((await stat(resolve(root, '.nojekyll'))).isFile(), 'Missing .nojekyll');
assert((await readFile(resolve(root, 'app-ads.txt'), 'utf8')).includes('google.com,'), 'Missing AdMob seller record');
assert((await readFile(resolve(root, 'robots.txt'), 'utf8')).includes(`${canonicalHost}/sitemap.xml`));
const sitemap = await readFile(resolve(root, 'sitemap.xml'), 'utf8');
for (const page of expectedPages.filter((page) => !['get', '404'].includes(page))) assert(sitemap.includes(`<loc>${canonicalHost}${page === 'index' ? '/' : `/${page}.html`}</loc>`), `Sitemap missing ${page}`);
for (const page of ['get', '404']) assert(documents.get(`${page}.html`).html.includes('noindex'), `${page}: missing noindex`);
assert((await stat(resolve(root, 'assets/brand-icon.webp'))).size < 20000, 'Brand icon should stay small');
console.log(`Verified ${documents.size} pages, ${linksChecked} local references, metadata, anchors, sitemap, app-ads.txt, and custom domain.`);
