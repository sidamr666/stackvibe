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
    { id: 'database', label: 'Database', pct: 10 },
    { id: 'auth', label: 'Accounts & auth', pct: 8 },
    { id: 'admin', label: 'Admin panel', pct: 10 },
    { id: 'payments', label: 'Payments', pct: 8 },
    { id: 'domain', label: 'Domain & hosting', pct: 5 },
    { id: 'store', label: 'Store submission', pct: 5 },
    { id: 'ai', label: 'AI model / RAG', pct: 15 },
    { id: 'docs', label: 'Document system', pct: 12 },
    { id: 'game', label: 'Game', pct: 20 },
  ],
  urgency: [
    { id: 'flexible', label: 'Flexible timeline', factor: 0.9 },
    { id: 'standard', label: 'Standard', factor: 1 },
    { id: 'rush', label: 'Urgent', factor: 1.25 },
  ],
  size: [
    { id: 'small', label: 'Small', factor: 0.85 },
    { id: 'medium', label: 'Medium', factor: 1 },
    { id: 'large', label: 'Large', factor: 1.3 },
  ],
}

