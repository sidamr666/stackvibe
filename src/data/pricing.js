// Pricing engine data. Edit these numbers to change the live estimate.
// Ranges are "around-to-around" - the final price is always confirmed by email/app.
export const pricing = {
  currency: 'USD',
  tiers: {
    student: { name: 'Student', range: [100, 650] },
    startup: { name: 'Startup', range: [1000, 4500] },
    enterprise: { name: 'Enterprise', range: [7000, 12000] },
  },
  addons: [
    { id: 'database', label: 'Database', pct: 10, services: ['all'] },
    { id: 'auth', label: 'Accounts & auth', pct: 8, services: ['mobile-apps', 'desktop-apps', 'web-saas'] },
    { id: 'admin', label: 'Admin panel', pct: 10, services: ['mobile-apps', 'desktop-apps', 'web-saas', 'custom-software'] },
    { id: 'payments', label: 'Payments', pct: 8, services: ['mobile-apps', 'web-saas'] },
    { id: 'push', label: 'Push notifications', pct: 4, services: ['mobile-apps'] },
    { id: 'offline', label: 'Offline sync', pct: 6, services: ['mobile-apps', 'desktop-apps'] },
    { id: 'hosting', label: 'Domain & hosting', pct: 5, services: ['web-saas'] },
    { id: 'store', label: 'Store submission', pct: 5, services: ['mobile-apps', 'desktop-apps'] },
    { id: 'ai', label: 'AI model / RAG', pct: 15, services: ['ai-features', 'custom-software', 'web-saas', 'document-automation'] },
    { id: 'docs', label: 'Document system (OCR)', pct: 12, services: ['document-automation', 'custom-software'] },
    { id: 'game', label: 'Game', pct: 20, services: ['custom-software', 'desktop-apps', 'mobile-apps'] },
    { id: 'i18n', label: 'Multi-language', pct: 4, services: ['all'] },
    { id: 'api', label: 'Integrations / API', pct: 6, services: ['custom-software', 'web-saas'] },
  ],
  size: [
    { id: 'small', label: 'Small', add: 0 },
    { id: 'medium', label: 'Medium', add: 0.2 },
    { id: 'large', label: 'Large', add: 0.45 },
  ],
  durationUnits: [
    { id: 'days', label: 'days', weeksPer: 1 / 7 },
    { id: 'months', label: 'months', weeksPer: 4.35 },
  ],
}


