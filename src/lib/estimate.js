import { pricing } from '../data/pricing.js'

const round10 = (n) => Math.round(n / 10) * 10

// Estimates an "around-to-around" price within the selected tier, adjusted by
// add-ons, urgency and project size.
export function estimateRange({ tier = 'startup', addons = [], urgency = 'standard', size = 'medium' }) {
  const t = pricing.tiers[tier] ?? pricing.tiers.startup
  const [lo, hi] = t.range

  const addonPct = addons.reduce((sum, id) => {
    const addon = pricing.addons.find((a) => a.id === id)
    return sum + (addon ? addon.pct : 0)
  }, 0)

  const urgencyFactor = pricing.urgency.find((u) => u.id === urgency)?.factor ?? 1
  const sizeFactor = pricing.size.find((s) => s.id === size)?.factor ?? 1

  const mid = (lo + hi) / 2
  let estimate = mid * urgencyFactor * sizeFactor * (1 + addonPct / 100)
  estimate = Math.min(Math.max(estimate, lo * 0.8), hi * 1.2)

  return { min: round10(estimate * 0.85), max: round10(estimate * 1.1) }
}

export function formatMoney(value, currency = pricing.currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}

