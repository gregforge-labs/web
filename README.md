# gregforge-labs/web

Static pages for Gregforge Labs LLC. Hosted via GitHub Pages.

- `index.html` — landing page
- `support.html` — support and app-review contact page
- `privacy.html` — privacy policy for the AstroDyuti app
- `terms.html` — terms of service
- `disclaimer.html` — astrology and AI-output disclaimer
- `refund.html` — refund and subscription terms
- `eula.html` — end-user license agreement
- `licenses.html` — third-party notices and licenses (incl. Swiss Ephemeris Inside)
- `accessibility.html` — accessibility statement (WCAG 2.1 AA target)
- `cookies.html` — cookies and web-tracking notice for the static site
- `delete-account.html` — account and data deletion instructions
- `style.css` — shared styling (Editorial-Celestial palette, mirrors the app theme)
- `assets/` — AstroDyuti icon assets reused from the app
- `.nojekyll` — disables Jekyll processing on GitHub Pages

To preview locally:

```sh
python3 -m http.server
```

Then open `http://127.0.0.1:8000/`. Use the local server instead of opening files directly, because the site uses root-relative links that match GitHub Pages.

The canonical production domain is `astrodyuti.com`. DNS should point the apex domain to the GitHub Pages A records only:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

The `www` host should be a CNAME to `gregforge-labs.github.io`. GitHub Pages redirects it to the canonical apex domain. Keep the GitHub organization-level domain verification TXT record in DNS.

Legacy and defensive domains, including `gregforgelabs.com`, should issue permanent path-preserving redirects to `https://astrodyuti.com`; they should not serve duplicate copies of the site.
