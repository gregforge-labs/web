# AstroDyuti website

The public marketing, help, and policy website for AstroDyuti, by Gregforge Labs LLC. Built with Astro and TypeScript; deployed as static HTML on GitHub Pages at **https://astrodyuti.com**.

## Local development

Use Node.js 24 (`.node-version`) and npm. No website secrets or runtime environment variables are required.

```sh
npm ci
npm run dev
```

The development URL is `http://127.0.0.1:4321`. To inspect exactly what will be published:

```sh
npm run build
npm run preview
```

Astro may background its preview server in agent environments. `npm run preview -- stop` stops the managed preview; use `--ignore-lock` for an independent foreground instance.

If the system still has Node 20, run a command with an isolated Node 24 runtime without changing the system installation:

```sh
npm exec --yes --package=node@24 -- npm run dev
```

## Source layout

| Path | Purpose |
| --- | --- |
| `src/pages/` | Routes, including the homepage, help, download handoff, and sitemap |
| `src/layouts/` | Shared page head, navigation, footer, and document layout |
| `src/components/home/` | Homepage sections and the accessible product walkthrough |
| `src/components/` | Reusable header, footer, store links, icons, and FAQ disclosures |
| `src/content/documents/` | Policy and notice content with title, description, and revision date |
| `src/data/site.ts` | Product allowances, supported languages, store links, and footer navigation |
| `src/data/faq.ts` | Shared FAQ answers used by both the homepage and help page |
| `src/styles/` | Design tokens, self-hosted font declarations, and shared styles |
| `public/` | Files copied unchanged to the published root |
| `tests/` | Browser, keyboard, mobile layout, download, and accessibility checks |
| `scripts/check-site.mjs` | Validation of the generated site's routes, assets, anchors, and metadata |
| `docs/CONTENT-NOTES.md` | Product sources, factual corrections, and editorial maintenance notes |

Policy documents retain HTML section IDs within Markdown so existing legal anchors remain stable. Their table of contents is derived from their headings at build time.

The generated `dist/` directory is ignored. Edit the source, not the generated output. Generated public URLs retain the existing `.html` paths through `build.format: 'file'`.

## Checks

```sh
npm run verify        # Type checks, production build, and static site validation
npm run test:browser  # Browser interactions, reflow, redirects, and axe accessibility checks
npm audit
```

Local browser tests use an installed Google Chrome. On CI they use Playwright Chromium. To run them on another machine, install Chrome locally or use the same setup as CI:

```sh
npx playwright install --with-deps chromium
CI=1 npm run test:browser
```

The browser suite serves `dist/` on port 4322; build before running it. Tests intercept store destinations instead of contacting the stores. The QR code continues to point to `/get.html`, which sends iPhone/iPad and Android visitors to the correct store. `/get.html?choose=1` always shows both store choices; both also work without JavaScript.

To regenerate the small navigation and touch icons from the original app icon, plus copy font licenses:

```sh
node scripts/prepare-assets.mjs
```

The generated small assets are tracked, so ordinary builds do not need to regenerate them.

## GitHub Pages deployment

`.github/workflows/deploy.yml` validates pull requests to `main`. A push to `main` builds and deploys the `dist/` artifact. The workflow uses Node 24, the npm lockfile, static route checks, and browser tests before deployment.

**One-time migration when releasing this redesign:** the existing Pages configuration serves `main` from `/` (legacy branch publishing). Switch the repository's **Settings → Pages → Build and deployment → Source** to **GitHub Actions** before merging or deploying the new source layout. Confirm the custom domain remains `astrodyuti.com` and HTTPS stays enforced. Do not publish the source repository root as the website; the deployable output is `dist/`.

The following public paths are retained because the app, app stores, or advertising platform may reference them:

- `/`, `/get.html`, `/faq.html`, `/support.html`, `/delete-account.html`
- `/privacy.html`, `/terms.html`, `/refund.html`, `/disclaimer.html`, `/eula.html`
- `/licenses.html`, `/accessibility.html`, `/cookies.html`
- `/app-ads.txt`, `/robots.txt`, `/sitemap.xml`, and the existing `/assets/` paths

`public/CNAME` pins the production domain. `public/.nojekyll` is retained. The sitemap is generated from the document metadata; update content revision dates when changing the substance of a page. The download handoff and 404 page are intentionally excluded from indexing.

For a rollback to the pre-redesign site, restore the preceding commit's static root layout and switch Pages publishing back to `main` from `/`. After the Actions migration has successful deployments, a known-good Actions artifact can also be redeployed. The original source layout remains in Git history.

## Domain and DNS

Keep the apex domain's GitHub Pages A records:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

`www` should remain a CNAME to `gregforge-labs.github.io`, redirecting to the canonical apex. Keep the organization-level domain-verification TXT record. Legacy domains, including `gregforgelabs.com`, should use permanent, path-preserving redirects to `https://astrodyuti.com`.

## Content and privacy

Keep product facts aligned with the mobile app and backend. Local prices are shown in the app's store checkout; the website does not hardcode regional prices or a country-availability count. Add ratings, testimonials, and numerical marketing claims only with a verifiable source.

The website uses no analytics, ad scripts, tracking cookies, or external font CDN. Newsreader and Inter are self-hosted, with license notices in `public/assets/fonts/`. Changes that introduce third-party tracking must also update the website's cookie and privacy disclosures.
