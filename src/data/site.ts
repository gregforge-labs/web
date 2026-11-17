export const site = {
  name: 'AstroDyuti',
  url: 'https://astrodyuti.com',
  company: 'Gregforge Labs LLC',
  email: 'support@gregforgelabs.com',
  description: 'Your Vedic birth chart, made clear. Explore your kundli, daily timing, compatibility, and Vani, your AI astrology guide—in nine languages.',
  stores: {
    ios: 'https://apps.apple.com/app/astrodyuti/id6772030551',
    android: 'https://play.google.com/store/apps/details?id=com.jyotishvani.app',
  },
  subscriptions: {
    ios: 'https://apps.apple.com/account/subscriptions',
    android: 'https://play.google.com/store/account/subscriptions',
  },
} as const;

// Keep these allowances aligned with the mobile app's src/modules/billing/tiers.ts
// and the backend's src/usage.py. Store checkout is authoritative for local prices.
export const plans = {
  free: { name: 'Free', questions: 3, daily: 3, profiles: 1, savedChats: 5, historyDays: 7 },
  pro: { name: 'Pro', questions: 45, daily: 5, profiles: 5, savedChats: 75, historyDays: 90 },
  max: { name: 'Max', questions: 120, daily: 10, profiles: 10, savedChats: 200, historyDays: null },
} as const;

export const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
] as const;

export const footerGroups = [
  { title: 'Explore', links: [
    { label: 'Inside the app', href: '/#inside' },
    { label: 'Meet Vani', href: '/#vani' },
    { label: 'Plans', href: '/#plans' },
    { label: 'Get AstroDyuti', href: '/get.html' },
  ] },
  { title: 'Help', links: [
    { label: 'Frequently asked questions', href: '/faq.html' },
    { label: 'Support & contact', href: '/support.html' },
    { label: 'Account & data deletion', href: '/delete-account.html' },
    { label: 'Accessibility', href: '/accessibility.html' },
  ] },
  { title: 'Policies', links: [
    { label: 'Privacy Policy', href: '/privacy.html' },
    { label: 'Terms of Service', href: '/terms.html' },
    { label: 'Subscriptions & refunds', href: '/refund.html' },
    { label: 'Disclaimer', href: '/disclaimer.html' },
    { label: 'End-User License Agreement', href: '/eula.html' },
    { label: 'Third-party notices', href: '/licenses.html' },
    { label: 'Cookies & web tracking', href: '/cookies.html' },
  ] },
];
