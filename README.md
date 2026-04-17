# gregforge-labs/web

Static pages for Gregforge Labs LLC. Hosted via GitHub Pages.

- `index.html` — landing page
- `privacy.html` — privacy policy for the Jyotish Vani app
- `terms.html` — terms of service
- `disclaimer.html` — astrology and AI-output disclaimer
- `refund.html` — refund and subscription terms
- `eula.html` — end-user license agreement
- `delete-account.html` — account and data deletion instructions
- `style.css` — shared styling
- `assets/` — Jyotish Vani icon assets reused from the app
- `.nojekyll` — disables Jekyll processing on GitHub Pages

To preview locally:

```sh
python3 -m http.server
```

Then open `http://127.0.0.1:8000/`. Use the local server instead of opening files directly, because the site uses root-relative links that match GitHub Pages.

DNS for `gregforgelabs.com` should point the apex domain to the GitHub Pages A records only:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```
