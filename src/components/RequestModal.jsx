import { useEffect, useRef, useState } from 'react'
import { packages, services, site } from '../data/site.js'
import { pricing } from '../data/pricing.js'
import { estimateRange, formatMoney, toWeeks } from '../lib/estimate.js'
import { submitRequest } from '../lib/submitRequest.js'
import Icon from './Icons.jsx'

const inputCls =
  'w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-slate-400 transition-colors focus:border-indigo-500 focus:outline-none'

const steps = ['What', 'Package', 'Details', 'Your info']

export default function RequestModal({ initialService = '', initialTier = '', onClose }) {
  const startedAt = useRef(Date.now())
  const [step, setStep] = useState(initialService ? 1 : 0)
  const [service, setService] = useState(initialService)
  const [tier, setTier] = useState(initialTier || 'startup')
  const [addons, setAddons] = useState([])
  const [size, setSize] = useState('medium')
  const [durationValue, setDurationValue] = useState('')
  const [durationUnit, setDurationUnit] = useState('days')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [requestId, setRequestId] = useState('')

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const visibleAddons = pricing.addons.filter((a) => a.services.includes('all') || a.services.includes(service))
  const durationWeeks = toWeeks(durationValue, durationUnit)
  const estimate = estimateRange({ tier, addons, size, durationWeeks })
  const serviceName = services.find((s) => s.id === service)?.name ?? service
  const tierName = pricing.tiers[tier]?.name ?? tier
  const tierMinDays = pricing.tiers[tier]?.minDays ?? 1
  const durationLabel = durationValue
    ? `${durationValue} ${pricing.durationUnits.find((u) => u.id === durationUnit)?.label ?? ''}`
    : ''
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const canNext = step === 0 ? !!service : step === 3 ? name.trim().length > 0 && emailValid : true

  const selectTier = (id) => {
    setTier(id)
    const t = pricing.tiers[id]
    if (t?.minDays) {
      setDurationValue(String(t.minDays))
      setDurationUnit('days')
    }
    setStep(2)
  }

  const next = () => {
    if (!canNext) return
    setError('')
    setStep((s) => Math.min(s + 1, 3))
  }
  const back = () => {
    setError('')
    setStep((s) => Math.max(s - 1, 0))
  }

  const toggleAddon = (id) => {
    setAddons((list) => (list.includes(id) ? list.filter((v) => v !== id) : [...list, id]))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (website) return
    if (Date.now() - startedAt.current < 2000) {
      setError('That was very fast - please review before sending.')
      return
    }
    if (!canNext) {
      setError('Please fill the required fields.')
      return
    }
    const payload = {
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      message: message.trim(),
      service: serviceName,
      serviceId: service,
      tier: tierName,
      tierId: tier,
      addons: addons.map((id) => pricing.addons.find((a) => a.id === id)?.label ?? id),
      size: pricing.size.find((s) => s.id === size)?.label ?? 'Medium',
      duration: durationLabel,
      estimateMin: estimate.min,
      estimateMax: estimate.max,
      currency: pricing.currency,
    }
    setStatus('sending')
    setError('')
    try {
      const id = await submitRequest(payload)
      setRequestId(id)
      setStatus('sent')
    } catch {
      const body = encodeURIComponent(
        `Service: ${payload.service}\nPackage: ${payload.tier}\nDuration: ${durationLabel || 'Not set'}\nEstimate: ${formatMoney(estimate.min)} - ${formatMoney(estimate.max)}\n\n${message}\n\n- ${name}${email ? ` (${email})` : ''}`,
      )
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Project request - ${name}`)}&body=${body}`
      setStatus('sent')
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-label="Start a project">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div className="relative flex h-[100dvh] w-full max-w-5xl flex-col overflow-hidden bg-white shadow-2xl ring-1 ring-slate-900/10 sm:h-[min(92vh,760px)] sm:rounded-3xl">
        {status === 'sent' ? (
          <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-700 px-6 text-center">
            <div className="absolute -right-12 -top-12 size-48 rounded-full bg-white/10 blur-2xl animate-float" aria-hidden="true" />
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-white/15 text-white">
              <Icon name="checkCircle" className="size-8" />
            </span>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white">Request received</h3>
            <p className="mx-auto mt-3 max-w-md text-indigo-100">
              Thanks {name.split(' ')[0] || 'there'}! We will get back to you within 24 hours with the exact price.
            </p>
            <p className="mt-2 text-xs text-indigo-200/80">
              Reference: <span className="font-mono">{requestId || 'sent by email'}</span>
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-700 transition-colors hover:bg-indigo-50"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-line bg-white px-5 py-3">
              <div className="flex items-center gap-2.5">
                <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-white">
                  <Icon name="layers" className="size-4" />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-ink">StackVibe</p>
                  <p className="text-[11px] text-slate-400">Step {step + 1} of {steps.length} &middot; {steps[step]}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5" aria-hidden="true">
                {steps.map((label, i) => (
                  <span key={label} className={`h-1.5 rounded-full transition-all duration-300 ${i <= step ? 'w-8 bg-indigo-600' : 'w-3 bg-slate-200'}`} />
                ))}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-slate-500 transition-colors hover:bg-slate-50 hover:text-ink"
              >
                <Icon name="close" className="size-4" />
              </button>
            </div>

            <form onSubmit={onSubmit} noValidate className="flex min-h-0 flex-1 flex-col">
              <div className="min-h-0 flex-1 overflow-hidden">
                <div key={step} className="animate-fade-up h-full p-5 sm:p-8">
                  <div className="hidden" aria-hidden="true">
                    <label>
                      Website
                      <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" />
                    </label>
                  </div>

                  {step === 0 && (
                    <div className="mx-auto flex h-full max-w-3xl flex-col justify-center">
                      <h3 className="text-center text-xl font-semibold tracking-tight text-ink">What are we building?</h3>
                      <p className="mt-1 text-center text-sm text-slate-500">Pick one - you can refine it next.</p>
                      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {services.map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => {
                              setService(s.id)
                              setStep(1)
                            }}
                            className="group flex flex-col items-center gap-2.5 rounded-2xl border border-line bg-white p-4 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/5"
                          >
                            <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-indigo-500/12 to-violet-500/12 text-indigo-600 transition-transform duration-300 group-hover:scale-105">
                              <Icon name={s.icon} className="size-5" />
                            </span>
                            <span className="text-sm font-semibold leading-tight text-ink">{s.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="mx-auto flex h-full max-w-4xl flex-col justify-center">
                      <h3 className="text-center text-xl font-semibold tracking-tight text-ink">Choose your package</h3>
                      <p className="mt-1 text-center text-sm text-slate-500">We confirm the exact price after you apply.</p>
                      <div className="mt-5 grid gap-4 sm:grid-cols-3">
                        {packages.map((pkg) => (
                          <button
                            key={pkg.id}
                            type="button"
                            onClick={() => selectTier(pkg.id)}
                            className={`relative flex flex-col rounded-2xl border p-5 text-left transition-all duration-300 ${
                              pkg.highlighted
                                ? 'border-indigo-500 bg-gradient-to-b from-indigo-600 to-violet-700 text-white shadow-xl shadow-indigo-500/25'
                                : 'border-line bg-white hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/5'
                            }`}
                          >
                            {pkg.highlighted && (
                              <span className="absolute right-4 top-4 rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                                Most popular
                              </span>
                            )}
                            <span className={`text-base font-semibold ${pkg.highlighted ? 'text-white' : 'text-ink'}`}>{pkg.name}</span>
                            <span className={`mt-2 text-2xl font-bold tracking-tight ${pkg.highlighted ? 'text-white' : 'text-ink'}`}>{pkg.priceLabel}</span>
                            <span className={`mt-2 text-xs leading-relaxed ${pkg.highlighted ? 'text-indigo-100' : 'text-slate-500'}`}>{pkg.description}</span>
                            <ul className="mt-3.5 space-y-1.5">
                              {pkg.features.map((f) => (
                                <li key={f} className={`flex items-start gap-2 text-xs ${pkg.highlighted ? 'text-indigo-50' : 'text-slate-600'}`}>
                                  <Icon name="check" className={`mt-0.5 size-3.5 shrink-0 ${pkg.highlighted ? 'text-white' : 'text-emerald-600'}`} />
                                  {f}
                                </li>
                              ))}
                            </ul>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="mx-auto flex h-full max-w-3xl flex-col justify-center gap-5">
                      <div>
                        <p className="text-sm font-semibold text-ink">
                          Extras <span className="font-normal text-slate-400">(optional)</span>
                        </p>
                        <div className="mt-2.5 flex flex-wrap gap-2">
                          {visibleAddons.map((a) => {
                            const active = addons.includes(a.id)
                            return (
                              <button
                                key={a.id}
                                type="button"
                                onClick={() => toggleAddon(a.id)}
                                aria-pressed={active}
                                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-all ${
                                  active
                                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-500'
                                    : 'border-line bg-white text-slate-600 hover:border-slate-300'
                                }`}
                              >
                                <span className={`grid size-4 place-items-center rounded-full border ${active ? 'border-indigo-500 bg-indigo-500 text-white' : 'border-slate-300'}`}>
                                  {active && <Icon name="check" className="size-2.5" />}
                                </span>
                                {a.label}
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-sm font-semibold text-ink">How long do you need it?</p>
                          <div className="mt-2.5 flex gap-2">
                            <input
                              type="number"
                              min={tierMinDays}
                              inputMode="numeric"
                              value={durationValue}
                              onChange={(e) => setDurationValue(e.target.value)}
                              placeholder={String(tierMinDays)}
                              className={inputCls}
                            />
                            <select value={durationUnit} onChange={(e) => setDurationUnit(e.target.value)} className={`${inputCls} w-28`} aria-label="Unit">
                              {pricing.durationUnits.map((u) => (
                                <option key={u.id} value={u.id}>{u.label}</option>
                              ))}
                            </select>
                          </div>
                          <p className="mt-1.5 text-xs text-slate-400">Fastest: {tierMinDays} days for {tierName}. Faster costs more.</p>
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-ink">How big is the project?</p>
                          <div className="mt-2.5 grid grid-cols-3 gap-2">
                            {pricing.size.map((s) => (
                              <button
                                key={s.id}
                                type="button"
                                onClick={() => setSize(s.id)}
                                aria-pressed={size === s.id}
                                className={`rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                                  size === s.id
                                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-500'
                                    : 'border-line bg-white text-slate-600 hover:border-slate-300'
                                }`}
                              >
                                {s.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="mx-auto flex h-full max-w-3xl flex-col justify-center gap-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="rm-name" className="text-xs font-medium text-slate-600">Your name *</label>
                          <input id="rm-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className={inputCls} required />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="rm-email" className="text-xs font-medium text-slate-600">Email *</label>
                          <input id="rm-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className={inputCls} required />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="rm-company" className="text-xs font-medium text-slate-600">Company <span className="text-slate-400">(optional)</span></label>
                          <input id="rm-company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company name" className={inputCls} />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="rm-message" className="text-xs font-medium text-slate-600">Your idea</label>
                          <input id="rm-message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What are you trying to build?" className={inputCls} />
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 rounded-2xl border border-line bg-slate-50/70 px-5 py-3 text-sm text-slate-600">
                        <span><span className="font-medium text-ink">Building:</span> {serviceName}</span>
                        <span><span className="font-medium text-ink">Package:</span> {tierName}</span>
                        {durationLabel && <span><span className="font-medium text-ink">Duration:</span> {durationLabel}</span>}
                      </div>
                    </div>
                  )}

                  {error && <p role="alert" className="mt-4 text-center text-sm font-medium text-rose-600">{error}</p>}
                </div>
              </div>

              {step >= 1 && (
                <div className="shrink-0 flex items-center justify-between gap-3 border-t border-line bg-slate-50/80 px-5 py-2.5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Estimated</span>
                    <span key={estimate.max} className="animate-fade-up text-lg font-bold tracking-tight text-ink">
                      {formatMoney(estimate.min)} - {formatMoney(estimate.max)}
                    </span>
                    <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-slate-500 ring-1 ring-line">{tierName}</span>
                    {durationLabel && <span className="text-xs text-slate-400">&middot; {durationLabel}</span>}
                  </div>
                  <span className="hidden items-center gap-1.5 text-xs text-slate-400 sm:flex">
                    <Icon name="shield" className="size-3.5 text-emerald-600" />
                    You own the code &middot; Fixed price
                  </span>
                </div>
              )}

              <div className="flex shrink-0 items-center justify-between gap-3 border-t border-line bg-white px-5 py-3.5">
                <button
                  type="button"
                  onClick={back}
                  disabled={step === 0}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Icon name="arrowRight" className="size-4 rotate-180" />
                  Back
                </button>

                {step < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={next}
                    disabled={!canNext}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-7 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                    <Icon name="arrowRight" className="size-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={status === 'sending' || !canNext}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-7 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {status === 'sending' ? 'Sending...' : 'Apply'}
                    <Icon name="send" className="size-4" />
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
