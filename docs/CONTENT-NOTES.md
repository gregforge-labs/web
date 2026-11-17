# Content sources and maintenance

This redesign serves Indian users, the Indian diaspora, and readers who are new to Vedic astrology. Introduce a plain-English explanation on first use: birth chart (kundli), daily almanac (panchang), and auspicious timing (muhurta). Use clear, personal language and distinguish astronomical calculations from astrological interpretation.

## Product facts

- `src/data/site.ts` contains the website's shared plan allowances, supported languages, and store URLs. The product references checked for this revision are the companion mobile repository's `src/modules/billing/tiers.ts` and the backend's `src/usage.py`.
- Free: 3 lifetime Vani questions, 1 profile. Pro: 45 questions per calendar month, up to 5 per day, 5 profiles. Max: 120 per calendar month, up to 10 per day, 10 profiles. Paid quotas use UTC calendar boundaries, rather than the subscription renewal date.
- Birth Snapshot, the daily reading, and the basic panchang are free. Eligible additional content can unlock with rewarded ads. Vastu, Kalachakra, Jaimini, Tajika, and KP are subscription chapters. Both paid plans remove ads.
- Use `src/data/faq.ts` for answers that appear on both the homepage and help page. Do not create a second homepage copy of an FAQ answer.
- Prices, availability, and device requirements are determined by the visitor's store. The redesign removes hardcoded rupee prices and the country count, which could become stale or confuse a visitor in another market.
- The screenshots are genuine existing app assets, presented as examples. Product-tour captions describe the screen actually pictured; the Match screenshot shows the profile-entry flow, not a fabricated compatibility result. Vani question examples are prompts, not fabricated AI replies or testimonials.

## Factual corrections made in this revision

- Privacy: removed the assertion that Free Vani history is only local. The current backend permits saved chats for Free users too (`api.py`, `src/usage.py`, and `src/chats.py`).
- Privacy: corrected the encrypted-local-store claim. The mobile app's `src/lib/storage.ts` initializes MMKV without an application encryption key. Device operating-system protections are distinguished from separate app-level encryption.
- Advertising: reflected the current non-personalized rewarded-ad requests and the absence of an ATT prompt (`src/modules/ads/useRewardedAd.ts` and `app.config.js`).
- Deletion: replaced a nonexistent web form with email-assisted instructions. Distinguished backend account deletion, local clearing on the current device, other-device data, provider retention, and store subscription cancellation. Removed the unsubstantiated promise of deleting a RevenueCat customer record: the current client logs out of RevenueCat; that is not the same as deleting its provider-side customer record.
- Terms: fixed section references and replaced the nonexistent account email with the account phone number. Replaced the retired EU ODR link with the Commission's current consumer-redress resource.
- Refunds: removed automatic 48-hour refund language. Google describes conditional eligibility, not guaranteed approval.
- FAQ: described the app's exact/approximate/unknown birth-time modes, offline limitations, premium gates, and actual purchase/deletion flows.
- Marketing: removed absolute promises about predictive accuracy, instant AI replies, universal deletion, and the provenance of every translation. Calculation accuracy is not presented as proof of predictive certainty.
- Website disclosures: updated font hosting and accessibility descriptions to reflect the rebuilt site. Unchanged substantive policy text remains available at the same public URLs and section anchors.

These comparisons use the current local app and backend checkouts. Confirm their release parity when publishing a future update rather than assuming every checkout change has shipped to the stores.

## Primary references

- [Google Play app and in-app purchase refund policy](https://support.google.com/googleplay/answer/15574908)
- [European Commission notice: ODR closed on July 20, 2025](https://consumer-redress.ec.europa.eu/site-relocation_en)
- [European Commission consumer dispute-resolution bodies](https://consumer-redress.ec.europa.eu/dispute-resolution-bodies)
- [Astro static output formats](https://docs.astro.build/en/reference/configuration-reference/#buildformat)
- [Astro on GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)

## Beginner explanations

The homepage introduces unfamiliar terms where they occur and offers short answers about Vedic signs and dashas. The full FAQ adds optional, more detailed explanations of charts, zodiac frames, planetary periods, panchang, and compatibility. These share the same introductory answers; links open the relevant full answer directly. Keep the homepage overview concise and explain any new term within the deeper answer.

The calculation descriptions were checked against the mobile app's `src/lib/jyotish-core/ephemeris.ts`, `dasas/vimsottari.ts`, `panchang/calculator.ts`, and `compatibility/ashtakoota.ts`. The sidereal/tropical and Lahiri terminology also follows the [Swiss Ephemeris programming documentation](https://www.astro.com/swisseph/swephprg.htm). Definitions describe a traditional interpretive system and do not present its readings or matching scores as scientifically validated predictions.

## Release context

The redesigned site went live on November 17, 2026. Production now publishes a generated `dist/` artifact through GitHub Actions. The domain, app-ads.txt seller record, app/store-linked page URLs, and HTTPS configuration were preserved. See the README for the current deployment configuration and validation commands.
