import { useEffect, useRef, useState } from 'react'
import { packages, services, site } from '../data/site.js'
import { pricing } from '../data/pricing.js'
import { estimateRange, formatMoney } from '../lib/estimate.js'
import { submitRequest } from '../lib/submitRequest.js'
import Icon from './Icons.jsx'

const inputCls =
  'w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-slate-400 transition-colors focus:border-indigo-500 focus:outline-none'

const steps = ['What', 'Package', 'Details', 'Your info']

function Chip({ active, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
        active
          ? 'border-indigo-500 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-500'
          : 'border-line bg-white text-slate-600 hover:border-slate-300'
      }`}
    >
      {label}
    </button>
  )
}

function toggle(list, setList, value) {
  setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])
}

export default function RequestModal({ initialService = '', initialTier = '', onClose }) {
  const startedAt = useRef(Date.now())
  const [step, setStep] = useState(initialService ? 1 : 0)
  const [service, setService] = useState(initialService)
  const [tier, setTier] = useState(initialTier || 'startup')
  const [addons, setAddons] = useState([])
  const [urgency, setUrgency] = useState('standard')
  const [size, setSize] = useState('medium')
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

  const estimate = estimateRange({ tier, addons, urgency, size })
  const serviceName = services.find((s) => s.id === service)?.name ?? service
  const tierName = pricing.tiers[tier]?.name ?? tier
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
      urgency: pricing.urgency.find((u) => u.id === urgency)?.label ?? 'Standard',
      size: pricing.size.find((s) => s.id === size)?.label ?? 'Medium',
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
        `Service: ${payload.service}\nPackage: ${payload.tier}\nEstimate: ${formatMoney(estimate.min)} - ${formatMoney(estimate.max)}\n\n${message}\n\n- ${name}${email ? ` (${email})` : ''}`,
      )
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Project request - ${name}`)}&body=${body}`
      setStatus('sent')
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Start a project">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl ring-1 ring-slate-900/10">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-full border border-line bg-white text-slate-500 transition-colors hover:text-ink"
        >
          <Icon name="close" className="size-4" />
        </button>

        {status === 'sent' ? (
          <div className="p-10 text-center sm:p-14">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-600">
              <Icon name="checkCircle" className="size-8" />
            </span>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight text-ink">Request received</h3>
            <p className="mx-auto mt-3 max-w-md text-slate-600">
              Thanks {name.split(' ')[0] || 'there'}! We will get back to you within 24 hours with the exact price.
            </p>
            <p className="mt-2 text-xs text-slate-400">
              Reference: <span className="font-mono">{requestId || 'sent by email'}</span>
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="border-b border-line bg-slate-50/70 px-6 pb-4 pt-6 sm:px-10">
              <h2 className="text-xl font-semibold tracking-tight text-ink">Tell us what you need</h2>
              <p className="mt-1 text-sm text-slate-500">Four quick steps - we reply within 24 hours with the real price.</p>
              <ol className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2">
                {steps.map((label, i) => (
                  <li key={label} className="flex items-center gap-2">
                    <span className={`grid size-6 place-items-center rounded-full text-[11px] font-semibold ${i <= step ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-500'}`}>
                      {i + 1}
                    </span>
                    <span className={`hidden text-xs font-medium sm:inline ${i === step ? 'text-ink' : 'text-slate-500'}`}>{label}</span>
                    {i < steps.length - 1 && <span className="mx-1 hidden h-px w-6 bg-slate-300 sm:block" aria-hidden="true" />}
                  </li>
                ))}
              </ol>
            </div>

            <form onSubmit={onSubmit} noValidate className="p-6 sm:p-10">
              <div className="hidden" aria-hidden="true">
                <label>
                  Website
                  <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              {step === 0 && (
                <fieldset>
                  <legend className="sr-only">Choose what to build</legend>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          setService(s.id)
                          setStep(1)
                        }}
                        aria-pressed={service === s.id}
                        className={`rounded-2xl border p-4 text-left transition-colors ${
                          service === s.id ? 'border-indigo-500 bg-indigo-50/50 ring-1 ring-indigo-500' : 'border-line bg-white hover:border-slate-300'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500/15 to-violet-500/15 text-indigo-700">
                            <Icon name={s.icon} className="size-5" />
                          </span>
                          <span className="text-sm font-semibold text-ink">{s.name}</span>
                        </span>
                        <span className="mt-2 block text-xs leading-relaxed text-slate-500">{s.tagline}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              {step === 1 && (
                <fieldset>
                  <legend className="sr-only">Choose a package</legend>
                  <div className="grid gap-3">
                    {packages.map((pkg) => (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => {
                          setTier(pkg.id)
                          setStep(2)
                        }}
                        aria-pressed={tier === pkg.id}
                        className={`rounded-2xl border p-5 text-left transition-colors ${
                          tier === pkg.id ? 'border-indigo-500 bg-indigo-50/50 ring-1 ring-indigo-500' : 'border-line bg-white hover:border-slate-300'
                        }`}
                      >
                        <span className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-base font-semibold text-ink">
                            {pkg.name}
                            {pkg.highlighted && <span className="ml-2 rounded-full bg-indigo-500/15 px-2 py-0.5 text-[11px] font-semibold text-indigo-700">Most popular</span>}
                          </span>
                          <span className="text-sm font-semibold text-indigo-600">{pkg.priceLabel}</span>
                        </span>
                        <span className="mt-2 block text-sm leading-relaxed text-slate-600">{pkg.description}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              {step === 2 && (
                <div className="grid gap-8">
                  <fieldset>
                    <legend className="text-sm font-semibold text-ink">What do you need? <span className="font-normal text-slate-400">(optional)</span></legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {pricing.addons.map((a) => (
                        <Chip key={a.id} active={addons.includes(a.id)} label={a.label} onClick={() => toggle(addons, setAddons, a.id)} />
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="text-sm font-semibold text-ink">How urgent?</legend>
                    <div className="mt-3 grid gap-2 sm:grid-cols-3">
                      {pricing.urgency.map((u) => (
                        <button
                          key={u.id}
                          type="button"
                          onClick={() => setUrgency(u.id)}
                          aria-pressed={urgency === u.id}
                          className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
                            urgency === u.id ? 'border-indigo-500 bg-indigo-50/50 text-indigo-700 ring-1 ring-indigo-500' : 'border-line bg-white text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {u.label}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="text-sm font-semibold text-ink">How big is the project?</legend>
                    <div className="mt-3 grid gap-2 sm:grid-cols-3">
                      {pricing.size.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setSize(s.id)}
                          aria-pressed={size === s.id}
                          className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
                            size === s.id ? 'border-indigo-500 bg-indigo-50/50 text-indigo-700 ring-1 ring-indigo-500' : 'border-line bg-white text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <div className="rounded-2xl border border-line bg-slate-50/70 p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Estimated price</p>
                    <p className="mt-2 text-3xl font-semibold tracking-tight text-ink">
                      {formatMoney(estimate.min)} - {formatMoney(estimate.max)}
                    </p>
                    <p className="mt-2 text-sm text-slate-500">
                      Around this range for the {tierName} package. We confirm the exact price by email or in the StackVibe app after you apply.
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
                    <label htmlFor="rm-message" className="text-xs font-medium text-slate-600">Anything else?</label>
                    <textarea id="rm-message" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us more about your idea - anything helps." className={`${inputCls} resize-none`} />
                  </div>

                  <div className="rounded-2xl border border-line bg-slate-50/70 p-5 text-sm">
                    <p className="font-semibold text-ink">Summary</p>
                    <p className="mt-2 text-slate-600"><span className="font-medium text-ink">Building:</span> {serviceName}</p>
                    <p className="text-slate-600"><span className="font-medium text-ink">Package:</span> {tierName}</p>
                    <p className="text-slate-600"><span className="font-medium text-ink">Estimate:</span> {formatMoney(estimate.min)} - {formatMoney(estimate.max)}</p>
                  </div>
                </div>
              )}

              {error && <p role="alert" className="mt-5 text-sm font-medium text-rose-600">{error}</p>}

              <div className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-6">
                <button
                  type="button"
                  onClick={back}
                  disabled={step === 0}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Icon name="arrowRight" className="size-4 rotate-180" />
                  Back
                </button>
                {step < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={next}
                    disabled={!canNext}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                    <Icon name="arrowRight" className="size-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={status === 'sending' || !canNext}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
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
