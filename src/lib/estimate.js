import { pricing } from '../data/pricing.js'

const round10 = (n) => Math.round(n / 10) * 10

// Shorter deadlines push the price up, longer ones push it down (within tier).
function durationAdd(weeks) {
  if (weeks == null) return 0
  if (weeks <= 2) return 0.2
  if (weeks <= 4) return 0.1
  if (weeks <= 8) return 0
  if (weeks <= 16) return -0.05
  return -0.1
}

// Estimates an "around-to-around" price inside the selected tier. Minimal scope
// sits at the tier minimum; add-ons, size and urgency push it toward the max.
export function estimateRange({ tier = 'startup', addons = [], size = 'medium', durationWeeks = null }) {
  const t = pricing.tiers[tier] ?? pricing.tiers.startup
  const [lo, hi] = t.range
  const span = hi - lo

  const addonPct = addons.reduce((sum, id) => {
    const addon = pricing.addons.find((a) => a.id === id)
    return sum + (addon ? addon.pct : 0)
  }, 0)

  const sizeAdd = pricing.size.find((s) => s.id === size)?.add ?? 0.2
  const addonAdd = (Math.min(addonPct, 60) / 100) * 0.6
  const durAdd = durationAdd(durationWeeks)

  const frac = Math.min(Math.max(sizeAdd + addonAdd + durAdd, 0), 1)
  const estimate = lo + span * frac

  return { min: round10(estimate * 0.9), max: round10(estimate * 1.1) }
}

// Converts a duration value + unit into weeks (or null when invalid).
export function toWeeks(value, unit) {
  const n = Number(value)
  if (!Number.isFinite(n) || n <= 0) return null
  const unitMeta = pricing.durationUnits.find((u) => u.id === unit)
  return n * (unitMeta ? unitMeta.weeksPer : 1)
}

export function formatMoney(value, currency = pricing.currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}


