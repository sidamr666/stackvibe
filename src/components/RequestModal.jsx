import { useEffect, useRef, useState } from 'react'
import { packages, services, site } from '../data/site.js'
import { pricing } from '../data/pricing.js'
import { estimateRange, formatMoney, toWeeks } from '../lib/estimate.js'
import { submitRequest } from '../lib/submitRequest.js'
import Icon from './Icons.jsx'

const inputCls =
  'w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-slate-400 transition-colors focus:border-indigo-500 focus:outline-none'

const steps = ['What', 'Package', 'Details', 'Your info']

export default function RequestModal({ initialService = '', initialTier = '', onClose }) {
  const startedAt = useRef(Date.now())
  const [step, setStep] = useState(initialService ? 1 : 0)
  const [service, setService] = useState(initialService)
  const [tier, setTier] = useState(initialTier || 'startup')
  const [addons, setAddons] = useState([])
  const [size, setSize] = useState('medium')
  const [durationValue, setDurationValue] = useState('')
  const [durationUnit, setDurationUnit] = useState('months')
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
  const durationLabel = durationValue
    ? `${durationValue} ${pricing.durationUnits.find((u) => u.id === durationUnit)?.label ?? ''}`
    : ''
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const canNext = step === 0 ? !!service : step === 3 ? name.trim().length > 0 && emailValid : true

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Start a project">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-900/10">
        {status === 'sent' ? (
          <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-700 px-6 py-16 text-center sm:px-10">
            <div className="absolute -right-12 -top-12 size-48 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
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
          <div className="flex min-h-0 flex-col">
            <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-700 px-6 py-6 sm:px-8">
              <div className="absolute -right-10 -top-14 size-44 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
              <div className="absolute -left-8 bottom-0 size-32 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-200">StackVibe Studio</p>
                  <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white">Let's build something great</h2>
                  <p className="mt-1 text-sm text-indigo-100/80">Tell us your idea - we reply within 24 hours with the exact price.</p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="grid size-9 shrink-0 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
                >
                  <Icon name="close" className="size-4" />
                </button>
              </div>

              <ol className="relative mt-5 flex items-start justify-between gap-2">
                {steps.map((label, i) => (
                  <li key={label} className="flex flex-1 flex-col items-center gap-1.5">
                    <span
                      className={`grid size-8 place-items-center rounded-full text-sm font-semibold transition-colors ${
                        i < step ? 'bg-white text-indigo-700' : i === step ? 'bg-white/20 text-white ring-2 ring-white/60' : 'bg-white/10 text-white/60'
                      }`}
                    >
                      {i < step ? <Icon name="check" className="size-4" /> : i + 1}
                    </span>
                    <span className={`text-[11px] font-medium ${i <= step ? 'text-white' : 'text-indigo-200/60'}`}>{label}</span>
                  </li>
                ))}
              </ol>
            </div>

            <form onSubmit={onSubmit} noValidate className="flex min-h-0 flex-col">
              <div key={step} className="animate-fade-up min-h-0 flex-1 overflow-y-auto p-6 sm:p-8">
                <div className="hidden" aria-hidden="true">
                  <label>
                    Website
                    <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                {step === 0 && (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {services.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          setService(s.id)
                          setStep(1)
                        }}
                        className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 ${
                          service === s.id
                            ? 'border-indigo-500 bg-indigo-50/40 ring-2 ring-indigo-500/40'
                            : 'border-line bg-white hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/5'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-500/15 to-violet-500/15 text-indigo-600 transition-transform duration-300 group-hover:scale-105">
                            <Icon name={s.icon} className="size-5" />
                          </span>
                          <span className="text-[15px] font-semibold text-ink">{s.name}</span>
                        </span>
                        <span className="mt-2.5 block text-xs leading-relaxed text-slate-500">{s.tagline}</span>
                      </button>
                    ))}
                  </div>
                )}

                {step === 1 && (
                  <div className="grid gap-4 sm:grid-cols-3">
                    {packages.map((pkg) => (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => {
                          setTier(pkg.id)
                          setStep(2)
                        }}
                        className={`relative flex flex-col rounded-2xl border p-5 text-left transition-all duration-300 ${
                          pkg.highlighted
                            ? 'border-indigo-500 bg-gradient-to-b from-indigo-600 to-violet-700 text-white shadow-xl shadow-indigo-500/25'
                            : 'border-line bg-white hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/5'
                        }`}
                      >
                        {pkg.highlighted && (
                          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-indigo-700 shadow">
                            Most popular
                          </span>
                        )}
                        <span className={`text-base font-semibold ${pkg.highlighted ? 'text-white' : 'text-ink'}`}>{pkg.name}</span>
                        <span className={`mt-3 text-2xl font-bold tracking-tight ${pkg.highlighted ? 'text-white' : 'text-ink'}`}>{pkg.priceLabel}</span>
                        <span className={`mt-2 text-xs leading-relaxed ${pkg.highlighted ? 'text-indigo-100' : 'text-slate-500'}`}>{pkg.description}</span>
                        <ul className="mt-4 space-y-1.5">
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
                )}

                {step === 2 && (
                  <div className="grid gap-6">
                    <div>
                      <p className="text-sm font-semibold text-ink">
                        What extra do you need? <span className="font-normal text-slate-400">(optional)</span>
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {visibleAddons.map((a) => {
                          const active = addons.includes(a.id)
                          return (
                            <button
                              key={a.id}
                              type="button"
                              onClick={() => toggleAddon(a.id)}
                              aria-pressed={active}
                              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-all ${
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
                        <div className="mt-3 flex gap-2">
                          <input
                            type="number"
                            min="1"
                            inputMode="numeric"
                            value={durationValue}
                            onChange={(e) => setDurationValue(e.target.value)}
                            placeholder="e.g. 2"
                            className={inputCls}
                          />
                          <select value={durationUnit} onChange={(e) => setDurationUnit(e.target.value)} className={`${inputCls} w-28`} aria-label="Unit">
                            {pricing.durationUnits.map((u) => (
                              <option key={u.id} value={u.id}>{u.label}</option>
                            ))}
                          </select>
                        </div>
                        <p className="mt-1.5 text-xs text-slate-400">Faster costs a little more, slower costs less.</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-ink">How big is the project?</p>
                        <div className="mt-3 grid grid-cols-3 gap-2">
                          {pricing.size.map((s) => (
                            <button
                              key={s.id}
                              type="button"
                              onClick={() => setSize(s.id)}
                              aria-pressed={size === s.id}
                              className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors ${
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

                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6">
                      <div className="absolute -right-8 -top-8 size-32 rounded-full bg-indigo-500/20 blur-2xl" aria-hidden="true" />
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Estimated price</p>
                      <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {formatMoney(estimate.min)} - {formatMoney(estimate.max)}
                      </p>
                      <p className="mt-2 text-sm text-slate-300">
                        Around this range for the {tierName} package. We confirm the exact price after you apply.
                      </p>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="grid gap-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="rm-name" className="text-xs font-medium text-slate-600">Your name *</label>
                        <input id="rm-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className={inputCls} required />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="rm-email" className="text-xs font-medium text-slate-600">Email *</label>
                        <input id="rm-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className={inputCls} required />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="rm-company" className="text-xs font-medium text-slate-600">Company <span className="text-slate-400">(optional)</span></label>
                      <input id="rm-company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company name" className={inputCls} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="rm-message" className="text-xs font-medium text-slate-600">Tell us about your idea</label>
                      <textarea id="rm-message" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What are you trying to build? Anything helps." className={`${inputCls} resize-none`} />
                    </div>

                    <div className="rounded-2xl border border-line bg-slate-50/70 p-5 text-sm">
                      <p className="font-semibold text-ink">Summary</p>
                      <div className="mt-2 grid gap-1 text-slate-600">
                        <p><span className="font-medium text-ink">Building:</span> {serviceName}</p>
                        <p><span className="font-medium text-ink">Package:</span> {tierName}</p>
                        {durationLabel && <p><span className="font-medium text-ink">Duration:</span> {durationLabel}</p>}
                        <p><span className="font-medium text-ink">Estimate:</span> {formatMoney(estimate.min)} - {formatMoney(estimate.max)}</p>
                      </div>
                    </div>
                  </div>
                )}

                {error && <p role="alert" className="mt-5 text-sm font-medium text-rose-600">{error}</p>}
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-line bg-white px-6 py-4 sm:px-8">
                <button
                  type="button"
                  onClick={back}
                  disabled={step === 0}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Icon name="arrowRight" className="size-4 rotate-180" />
                  Back
                </button>

                <div className="hidden items-center gap-2 text-xs text-slate-400 sm:flex">
                  <Icon name="shield" className="size-3.5 text-emerald-600" />
                  You own the code &middot; Fixed price
                </div>

                {step < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={next}
                    disabled={!canNext}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                    <Icon name="arrowRight" className="size-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={status === 'sending' || !canNext}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
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
