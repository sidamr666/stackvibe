import { pricing } from '../data/pricing.js'

const roundTo10 = (n) => Math.round(n / 10) * 10

// Computes a rough price range for a service + addon selection.
export function estimateRange({ service, addons = [], timeline = 'standard' }) {
  const svc = pricing.services[service]
  const [lo, hi] = svc ? svc.base : [0, 0]

  const addonTotal = addons.reduce((sum, id) => {
    const item = pricing.addons.find((a) => a.id === id)
    return sum + (item ? item.price : 0)
  }, 0)

  const factor = (pricing.timeline.find((t) => t.id === timeline) || { factor: 1 }).factor
  const mid = (lo + hi) / 2 + addonTotal
  const estimate = mid * factor

  return {
    min: roundTo10(estimate * 0.9),
    max: roundTo10(estimate * 1.15),
  }
}

export function formatMoney(value, currency = pricing.currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}

// budget: { min, max } | { amount } | null. Returns how the estimate sits in the budget.
export function compareBudget(estimate, budget) {
  if (!budget) return 'unknown'
  const floor = typeof budget.amount === 'number' ? budget.amount : budget.min
  if (floor == null) return 'unknown'
  if (floor >= estimate.max) return 'comfortable'
  if (floor >= estimate.min) return 'tight'
  return 'below'
}
