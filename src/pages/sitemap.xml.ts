import type { MarkdownInstance } from 'astro';
import { site } from '../data/site';

export function GET() {
  const documents = import.meta.glob<MarkdownInstance<{ updated: string }>>('../content/documents/*.md', { eager: true });
  const routes = [
    { path: '/', updated: '2026-11-17' },
    ...['faq', 'support', 'delete-account'].map((slug) => ({ path: `/${slug}.html`, updated: '2026-11-17' })),
    ...Object.entries(documents).map(([path, doc]) => ({ path: `/${path.split('/').pop()!.replace(/\.md$/, '.html')}`, updated: doc.frontmatter.updated })),
  ];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `  <url><loc>${site.url}${route.path}</loc><lastmod>${route.updated}</lastmod></url>`).join('\n')}\n</urlset>\n`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
