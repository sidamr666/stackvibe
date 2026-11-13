// Pricing engine data. Edit these numbers to change the live estimate.
export const pricing = {
  currency: 'USD',
  services: {
    'mobile-apps': { label: 'Mobile Apps', base: [3000, 8000] },
    'desktop-apps': { label: 'Desktop Apps', base: [3000, 8000] },
    'web-saas': { label: 'Web & SaaS', base: [2500, 6000] },
    'ai-features': { label: 'AI Features', base: [2000, 6000] },
    'document-automation': { label: 'Documents & Calculations', base: [1500, 5000] },
    'custom-software': { label: 'Custom Software', base: [800, 3000] },
  },
  addons: [
    { id: 'auth', label: 'Accounts & auth', price: 600 },
    { id: 'payments', label: 'Payments & subscriptions', price: 900 },
    { id: 'dashboard', label: 'Admin dashboard', price: 800 },
    { id: 'push', label: 'Push notifications', price: 300 },
    { id: 'offline', label: 'Offline sync', price: 700 },
    { id: 'ai-chat', label: 'AI chat / assistant', price: 1200 },
    { id: 'ocr', label: 'OCR & extraction', price: 900 },
    { id: 'i18n', label: 'Multi-language', price: 400 },
    { id: 'store', label: 'App Store submission', price: 400 },
    { id: 'notarize', label: 'macOS notarization', price: 300 },
  ],
  timeline: [
    { id: 'rush', label: 'Rush (under 4 weeks)', factor: 1.3 },
    { id: 'standard', label: 'Standard (4-8 weeks)', factor: 1.0 },
    { id: 'flexible', label: 'Flexible', factor: 0.9 },
  ],
}
