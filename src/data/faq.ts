import { languages, plans, site } from './site';

export interface Question {
  id: string;
  question: string;
  answer: string;
  more?: { heading: string; linkLabel: string; html: string };
}
export interface FaqSection { id: string; title: string; questions: Question[] }
const languageNames = languages.map(({ name }) => name).join(', ');

export const faqSections: FaqSection[] = [
  { id: 'getting-started', title: 'Getting started', questions: [
    { id: 'what-is-astrodyuti', question: 'What is AstroDyuti?', answer: '<p>AstroDyuti is a Vedic astrology app for iPhone and Android. Explore your birth chart (kundli), read daily, weekly, and monthly guidance, check your city’s daily almanac (panchang), find auspicious timing, compare two charts with Match, and ask Vani, an AI astrology guide, about your own chart.</p>' },
    { id: 'getting-started', question: 'What do I need to get started?', answer: '<p>Sign in with your phone number, then create a profile with your name, date of birth, birth time, and birth place. If your birth time is approximate or unknown, choose the corresponding option in the profile form. An accurate time gives more reliable chart calculations.</p>' },
    { id: 'birth-time', question: 'Can I use the app without an exact birth time?', answer: '<p>Yes. The profile form supports exact, approximate, and unknown birth times. Choose the option that reflects what you know. Time-sensitive details such as the ascendant, houses, and planetary periods can change with the birth time, so treat those readings with extra care when the time is uncertain. Your city’s panchang, festivals, and daily timing do not require your birth time.</p>' },
    { id: 'languages', question: 'Which languages are supported?', answer: `<p>${languageNames}. Change your reading language in Settings. Our support team reviews requests in English.</p>` },
    { id: 'outside-india', question: 'Does AstroDyuti work outside India?', answer: '<p>Yes. Panchang and timing features use your selected city and timezone, so you can follow local timing in India or abroad. Download availability depends on your App Store or Google Play region; check your store for current availability.</p>' },
    { id: 'offline', question: 'Does it work offline?', answer: '<p>Core chart calculations run on your device, and locally saved content can remain available offline. Vani chat, cloud sync, purchases, rewarded-ad unlocks, and some place lookups need an internet connection.</p>' },
    { id: 'devices', question: 'Which devices are supported?', answer: '<p>AstroDyuti is designed for iPhone and Android phones. Check the store listing for your device’s current operating-system requirements. There is no separate tablet layout.</p>' },
  ] },
  { id: 'your-kundli-panchang-and-readings', title: 'Your chart & daily timing', questions: [
    {
      id: 'kundli', question: 'What is a kundli?',
      answer: '<p>A kundli is your Vedic birth chart: a map of the sky for your birth time and place. AstroDyuti explains its parts in readable chapters, from the essentials to more advanced methods.</p>',
      more: {
        heading: 'The main parts of a birth chart', linkLabel: 'Explore the parts of a birth chart',
        html: `<ul>
          <li><strong>Planets:</strong> their positions at birth form part of the chart. Jyotish associates them with different themes; the Sun and Moon are also included in this traditional group.</li>
          <li><strong>Signs, or rashis:</strong> twelve equal divisions of the zodiac describe where a planet lies along its circle.</li>
          <li><strong>Houses:</strong> twelve chart divisions are traditionally associated with life areas such as home, work, and relationships. A sign and a house describe different things.</li>
          <li><strong>Ascendant, or lagna:</strong> the zodiac point rising on the eastern horizon at birth. It helps orient the chart and depends on birth time and place.</li>
        </ul><p>The natal chart records the birth moment. Dashas add a timeline of planetary periods; transits describe the planets’ positions at another time. Astrological readings consider these factors together.</p><p>North Indian and South Indian chart styles arrange the information differently on the page. Both can display the same underlying chart.</p>`,
      },
    },
    { id: 'astrology-system', question: 'Which astrology system does the app use?', answer: '<p>AstroDyuti follows the sidereal zodiac used in Vedic astrology, also called Jyotish. It uses Lahiri ayanamsa as the default offset between tropical and sidereal zodiac positions, with astronomical calculations supplied by Swiss Ephemeris.</p>' },
    {
      id: 'vedic-signs', question: 'Why might my Vedic sign differ from my Western sign?',
      answer: '<p>Vedic and most Western horoscopes use different starting points for the zodiac, so the same planet can appear in a different sign. Also compare the same body: a Vedic rashi often means the Moon’s sign, while a Western horoscope usually means the Sun’s sign.</p>',
      more: {
        heading: 'Zodiac systems, Sun signs, Moon signs, and rising signs', linkLabel: 'Explore Vedic and Western signs',
        html: `<p>The tropical zodiac begins at the March equinox. The sidereal zodiac uses a reference tied to the stars. The equinox slowly shifts relative to the stars, a movement called precession; the angular offset between the two zodiac frames is called <strong>ayanamsa</strong>. AstroDyuti uses the Lahiri convention by default.</p><p>Both systems divide the zodiac into twelve equal signs. They differ in where those signs begin, so a planet can fall in a different sign when you change systems.</p><ul>
          <li><strong>Sun sign:</strong> the sign containing the Sun at birth.</li>
          <li><strong>Moon sign:</strong> the sign containing the Moon at birth; this is often the rashi used in Vedic readings.</li>
          <li><strong>Rising sign:</strong> the sign containing the ascendant, the zodiac point rising on the eastern horizon at the birth moment.</li>
        </ul><p>Your Sun, Moon, and rising signs can differ within one chart. When comparing apps, check the same placement, zodiac system, birth details, and calculation settings.</p>`,
      },
    },
    {
      id: 'panchang', question: 'What are panchang, muhurta, and This Hour?',
      answer: '<p>Panchang is a daily Vedic calendar of lunar dates and timings for your city. Muhurta explores time windows traditionally considered favourable for an activity, while This Hour gives a quick overview of the current hour.</p>',
      more: {
        heading: 'The five parts of the panchang', linkLabel: 'Explore panchang and daily timing',
        html: `<ul>
          <li><strong>Tithi:</strong> the lunar day, measured by each 12-degree increase in the Moon’s angular separation from the Sun. It does not have a fixed 24-hour length.</li>
          <li><strong>Nakshatra:</strong> the section of the sidereal zodiac containing the Moon. This system divides the zodiac into 27 equal sections.</li>
          <li><strong>Yoga:</strong> a calendar factor calculated from the combined zodiac positions of the Sun and Moon.</li>
          <li><strong>Karana:</strong> half of a tithi.</li>
          <li><strong>Vara:</strong> the weekday used in the traditional almanac.</li>
        </ul><p>Several of these factors change at specific moments during a day, rather than at midnight. Your city and timezone are used for local time displays and sunrise or sunset calculations.</p><p>A muhurta search combines timing factors for a particular activity; This Hour offers a shorter overview. These are traditional interpretations of timing, not guarantees that an activity will succeed.</p>`,
      },
    },
    {
      id: 'dashas', question: 'What is a dasha, or planetary period?',
      answer: '<p>A dasha is a planetary period calculated from your birth chart and used in Vedic astrology to interpret phases of life. It is read alongside transits, the planets’ current positions.</p>',
      more: {
        heading: 'How a dasha timeline is calculated', linkLabel: 'Explore planetary periods',
        html: `<p>In <strong>Vimshottari dasha</strong>, the Moon’s position at birth determines the starting planetary period. The calculation uses its nakshatra, one of 27 equal sections of the sidereal zodiac, and how far the Moon has travelled through that section.</p><p>The fraction of that section remaining determines the fraction of the first period remaining at birth. For example, a Moon halfway through its nakshatra leaves half of that planet’s full period remaining.</p><ul>
          <li><strong>Mahadasha:</strong> the main planetary period.</li>
          <li><strong>Antardasha:</strong> a shorter sub-period within a mahadasha, with its own planetary association.</li>
        </ul><p>AstroDyuti also includes Yogini, Ashtottari, Chara, and Kalachakra systems. Each has its own rules, so their timelines can differ. Some advanced chapters require a subscription.</p><p>A period’s name alone is not a prediction. Traditional interpretations also consider the planet’s place in the birth chart and other timing factors.</p>`,
      },
    },
    { id: 'accuracy', question: 'How should I understand the readings?', answer: '<p>Accurate astronomical calculations depend on the birth information you provide. Astrological interpretations are part of a symbolic tradition, not scientifically validated predictions. Use them for reflection alongside your own judgment. They are not medical, legal, financial, or mental-health advice. See the <a href="/disclaimer.html">Disclaimer</a>.</p>' },
    { id: 'notifications', question: 'What notifications will I receive?', answer: '<p>You can enable reading reminders, timing prompts, and festival or transit alerts. Notifications are available on every plan. Manage them with the notification switch in Settings and your device’s notification permissions.</p>' },
  ] },
  { id: 'vani-and-match', title: 'Vani & compatibility', questions: [
    { id: 'vani', question: 'What is Vani?', answer: '<p>Vani is an AI astrology guide inside AstroDyuti. Ask about your active profile’s birth chart, planetary periods, and life themes in plain language. Vani uses chart calculations and Jyotish tools to explain relevant factors. Replies are AI-generated and can be wrong or incomplete; use them for reflection rather than consequential decisions.</p>' },
    { id: 'vani-profile', question: 'Which profile does Vani read?', answer: '<p>The profile you currently have active. Switch profiles before asking about a family member’s chart. Vani reads one chart at a time; use Match for a comparison between two people.</p>' },
    {
      id: 'match', question: 'How does compatibility matching work?',
      answer: '<p>Match compares two birth charts using Ashtakuta, a traditional eight-part matching system with a score out of 36, plus additional checks. Its explanations offer a reference for conversation, not a verdict on a relationship.</p>',
      more: {
        heading: 'What the 36-point score represents', linkLabel: 'Explore compatibility matching',
        html: '<p>Ashtakuta, also called Guna Milan, compares factors derived from the two birth Moons, including their signs and nakshatras—their sections of the sidereal zodiac. The eight factors carry different weights, adding up to a maximum of 36 points.</p><p>The total is a traditional score, not a percentage probability of relationship success. Additional checks can qualify the reading without becoming part of the 36-point total.</p><p>Use the report alongside your own understanding of the relationship, including communication, shared values, consent, and lived experience.</p>',
      },
    },
  ] },
  { id: 'plans-billing-and-refunds', title: 'Plans, purchases & subscriptions', questions: [
    { id: 'free', question: 'What can I use for free?', answer: `<p>Cast your kundli, read the Birth Snapshot chapter and daily reading, and check the panchang. Your first ${plans.free.questions} Vani questions are a lifetime free allowance. Eligible deeper chapters, weekly and monthly readings, Match reports, and muhurta searches can unlock after a rewarded ad. Five advanced chapters—Vastu, Kalachakra, Jaimini, Tajika, and KP—require Pro or Max.</p>` },
    { id: 'plans', question: 'How do Pro and Max differ?', answer: `<p>Both open every chapter and remove ads. Pro includes ${plans.pro.questions} Vani questions per calendar month, up to ${plans.pro.daily} per day, and ${plans.pro.profiles} chart profiles. Max includes ${plans.max.questions} questions per calendar month, up to ${plans.max.daily} per day, and ${plans.max.profiles} profiles. Max also includes more saved conversations and longer available chat history. Daily and monthly allowances reset on the corresponding UTC calendar boundary. Your local price is shown before purchase in the app.</p>` },
    { id: 'family-profiles', question: 'Can I save charts for family members?', answer: `<p>Yes. Free includes ${plans.free.profiles} profile, Pro includes ${plans.pro.profiles}, and Max includes ${plans.max.profiles}. Each has its own chart and readings. Having multiple profiles is different from store Family Sharing: the profiles live within your AstroDyuti account. Only enter someone else’s details when you have the authority to do so.</p>` },
    { id: 'credits', question: 'What are Vani credit packs?', answer: '<p>Active subscribers can buy one-time packs of 10, 30, or 75 Vani credits. One credit covers an extra turn after the monthly plan allowance is used. Packs do not auto-renew. An unused balance carries across tier changes, up to the account balance limit shown in the app. Credits cannot be restored after account deletion. See <a href="/refund.html">Subscription &amp; Refund Terms</a>.</p>' },
    { id: 'cancel', question: 'How do I cancel or request a refund?', answer: `<p>Manage your subscription in <a href="${site.subscriptions.ios}">Apple’s subscription settings</a> or <a href="${site.subscriptions.android}">Google Play subscriptions</a>. Cancellation stops future renewals, and access continues until the end of the paid period. Uninstalling the app or deleting your account does not cancel a subscription. Refund requests are subject to the store’s policies and your circumstances; approval is not automatic. See the <a href="/refund.html">full instructions</a>.</p>` },
    { id: 'restore', question: 'How do I restore a purchase?', answer: '<p>Use Restore purchases in the app while signed into the store account that made the purchase. If access is still missing, contact <a href="/support.html">Support</a> with your platform and the product involved. Do not send passwords, payment-card details, or verification codes.</p>' },
  ] },
  { id: 'privacy-and-your-account', title: 'Privacy & your account', questions: [
    { id: 'privacy', question: 'How is my birth data used?', answer: '<p>Your birth details are used for your chart and readings. Profiles and chat history can be stored on your device and in the cloud. When you use Vani, your question and relevant astrological context are processed by our backend and AI provider. We do not sell your personal information. Read the <a href="/privacy.html">Privacy Policy</a> for providers, retention, and your choices.</p>' },
    { id: 'delete-account', question: 'How do I delete my account?', answer: '<p>Open Settings → Delete Account and complete phone verification. If you cannot access the app, follow the <a href="/delete-account.html">email-assisted deletion instructions</a>. Deletion removes account data we control, subject to the limited retention described in our Privacy Policy. Cancel any active store subscription separately, and clear local data on other devices.</p>' },
  ] },
];

export const homepageFaqs = ['free', 'birth-time', 'vedic-signs', 'dashas', 'vani', 'outside-india', 'privacy', 'cancel'].map(
  (id) => faqSections.flatMap((section) => section.questions).find((question) => question.id === id)!,
);
