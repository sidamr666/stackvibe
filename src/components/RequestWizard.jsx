import { useRef, useState } from 'react'
import { budgetOptions, featureOptions, platformOptions, services, site, timelineOptions } from '../data/site.js'
import { pricing } from '../data/pricing.js'
import { compareBudget, estimateRange, formatMoney } from '../lib/estimate.js'
import { submitRequest } from '../lib/submitRequest.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import Icon from './Icons.jsx'

const FEATURE_TO_ADDON = {
  'Accounts & auth': 'auth',
  'Payments & subscriptions': 'payments',
  'Admin dashboard': 'dashboard',
  'Push notifications': 'push',
  'Offline sync': 'offline',
  'AI chat / assistant': 'ai-chat',
  'OCR & extraction': 'ocr',
  'Multi-language': 'i18n',
  'App Store submission': 'store',
}

const CURRENCIES = ['USD', 'EUR', 'MAD', 'DZD', 'GBP', 'AED']

const inputCls =
  'w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-slate-400 transition-colors focus:border-indigo-500 focus:outline-none'

const steps = ['What you need', 'Features', 'Budget', 'Your details']

function toggle(list, setList, value) {
  setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])
}

function Chip({ active, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
        active
          ? 'border-indigo-500 bg-indigo-50/50 text-indigo-700 ring-1 ring-indigo-500'
          : 'border-line bg-white text-slate-600 hover:border-slate-300'
      }`}
    >
      {label}
    </button>
  )
}

export default function RequestWizard() {
  const startedAt = useRef(Date.now())

  const [step, setStep] = useState(0)
  const [service, setService] = useState('')
  const [platforms, setPlatforms] = useState([])
  const [features, setFeatures] = useState([])
  const [timeline, setTimeline] = useState('standard')
  const [budgetValue, setBudgetValue] = useState('not-sure')
  const [customAmount, setCustomAmount] = useState('')
  const [currency, setCurrency] = useState(site.currency)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [requestId, setRequestId] = useState('')

  const addonIds = features.map((f) => FEATURE_TO_ADDON[f]).filter(Boolean)
  const estimate = estimateRange({ service, addons: addonIds, timeline })

  const svc = services.find((s) => s.id === service)?.name ?? service
  const budgetOption = budgetOptions.find((b) => b.value === budgetValue)
  const customAmountNum = budgetValue === 'custom' ? Number(customAmount) : NaN
  const budgetForCompare =
    budgetValue === 'custom'
      ? Number.isFinite(customAmountNum) && customAmountNum > 0
        ? { amount: customAmountNum }
        : null
      : budgetOption && budgetOption.min != null
        ? { min: budgetOption.min, max: budgetOption.max }
        : null

  const comparison = compareBudget(estimate, budgetForCompare)
  const comparisonText = {
    comfortable: 'Your budget comfortably covers this range - we can include more.',
    tight: 'Your budget is within range - we will finalise details on a call.',
    below: 'Your budget is below our estimate - we can phase it or scope down. Tell us more and we will find a fit.',
    unknown: 'We will propose a plan based on your details.',
  }[comparison]

  const breakdown = (() => {
    const svcPricing = pricing.services[service]
    const baseMid = svcPricing ? Math.round((svcPricing.base[0] + svcPricing.base[1]) / 2) : 0
    const items = [{ label: 'Base build', amount: baseMid }]
    addonIds.forEach((id) => {
      const addon = pricing.addons.find((a) => a.id === id)
      if (addon) items.push({ label: addon.label, amount: addon.price })
    })
    return items
  })()

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const canNext =
    step === 0 ? !!service : step === 3 ? name.trim().length > 0 && emailValid : true

  const next = () => {
    if (!canNext) return
    setError('')
    setStep((s) => Math.min(s + 1, steps.length - 1))
  }
  const back = () => {
    setError('')
    setStep((s) => Math.max(s - 1, 0))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (website) return
    if (Date.now() - startedAt.current < 2500) {
      setError('That was very fast - please take a moment to review before sending.')
      return
    }
    if (!canNext) {
      setError('Please complete the required fields.')
      return
    }

    const budgetLabel = budgetValue === 'custom' ? `Custom (${currency} ${customAmountNum})` : budgetOption?.label ?? 'Not sure yet'
    const payload = {
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      message: message.trim(),
      service: svc,
      serviceId: service,
      platforms,
      features,
      timeline: timelineOptions.find((t) => t.value === timeline)?.label ?? 'Standard (4-8 weeks)',
      budget: budgetLabel,
      budgetMin: budgetValue === 'custom' ? customAmountNum : budgetOption?.min ?? null,
      budgetMax: budgetValue === 'custom' ? null : budgetOption?.max ?? null,
      currency,
      estimateMin: estimate.min,
      estimateMax: estimate.max,
      estimateBreakdown: breakdown,
    }

    setStatus('sending')
    setError('')
    try {
      const id = await submitRequest(payload)
      setRequestId(id)
      setStatus('sent')
    } catch {
      const body = encodeURIComponent(
        `Service: ${payload.service}\nBudget: ${payload.budget}\nEstimate: ${formatMoney(estimate.min, currency)} - ${formatMoney(estimate.max, currency)}\nPlatforms: ${platforms.join(', ') || 'Not selected'}\n\n${message}\n\n- ${name}${email ? ` (${email})` : ''}`,
      )
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Project request - ${name}`)}&body=${body}`
      setStatus('sent')
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          align="center"
          kicker="Start a project"
          title={<>Tell us what <span className="text-gradient">you need</span></>}
          description="Four quick steps. No pressure - we reply within 24 hours with honest feedback and a plan."
        />

        <Reveal delay={120}>
          <div className="glass relative mt-12 overflow-hidden rounded-5xl">
            {status === 'sent' ? (
              <div className="p-10 text-center sm:p-14">
                <span className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-600">
                  <Icon name="checkCircle" className="size-8" />
                </span>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight text-ink">Request received</h3>
                <p className="mx-auto mt-3 max-w-md text-slate-600">
                  Thanks {name.split(' ')[0] || 'there'}! We will get back to you within 24 hours.
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  Reference: <span className="font-mono">{requestId || 'sent by email'}</span>
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus('idle')
                    setStep(0)
                    setName('')
                    setEmail('')
                    setMessage('')
                    setService('')
                    setPlatforms([])
                    setFeatures([])
                  }}
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-slate-50"
                >
                  Send another request <Icon name="arrowRight" className="size-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <div className="border-b border-line bg-slate-50/60 px-6 py-4 sm:px-10">
                  <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
                    {steps.map((label, i) => (
                      <li key={label} className="flex items-center gap-2">
                        <span
                          className={`grid size-6 place-items-center rounded-full text-[11px] font-semibold ${
                            i <= step ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {i + 1}
                        </span>
                        <span className={`hidden text-xs font-medium sm:inline ${i === step ? 'text-ink' : 'text-slate-500'}`}>{label}</span>
                        {i < steps.length - 1 && <span className="mx-1 hidden h-px w-6 bg-slate-300 sm:block" aria-hidden="true" />}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="p-6 sm:p-10">
                  <div className="hidden" aria-hidden="true">
                    <label>
                      Website
                      <input type="text" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" />
                    </label>
                  </div>

                  {step === 0 && (
                    <fieldset>
                      <legend className="sr-only">Choose a service</legend>
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
                              service === s.id
                                ? 'border-indigo-500 bg-indigo-50/50 ring-1 ring-indigo-500'
                                : 'border-line bg-white hover:border-slate-300'
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
                    <div className="grid gap-8">
                      <fieldset>
                        <legend className="text-sm font-semibold text-ink">Platforms <span className="font-normal text-slate-400">(optional)</span></legend>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {platformOptions.map((p) => (
                            <Chip key={p} active={platforms.includes(p)} label={p} onClick={() => toggle(platforms, setPlatforms, p)} />
                          ))}
                        </div>
                      </fieldset>
                      <fieldset>
                        <legend className="text-sm font-semibold text-ink">Features <span className="font-normal text-slate-400">(optional)</span></legend>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {featureOptions.map((f) => (
                            <Chip key={f} active={features.includes(f)} label={f} onClick={() => toggle(features, setFeatures, f)} />
                          ))}
                        </div>
                      </fieldset>
                      <fieldset>
                        <legend className="text-sm font-semibold text-ink">Timeline</legend>
                        <div className="mt-3 grid gap-2 sm:grid-cols-3">
                          {timelineOptions.map((t) => (
                            <button
                              key={t.value}
                              type="button"
                              onClick={() => setTimeline(t.value)}
                              aria-pressed={timeline === t.value}
                              className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
                                timeline === t.value
                                  ? 'border-indigo-500 bg-indigo-50/50 text-indigo-700 ring-1 ring-indigo-500'
                                  : 'border-line bg-white text-slate-600 hover:border-slate-300'
                              }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>
                      </fieldset>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="grid gap-8">
                      <fieldset>
                        <legend className="text-sm font-semibold text-ink">What is your budget?</legend>
                        <div className="mt-3 grid gap-2 sm:grid-cols-2">
                          {budgetOptions.map((b) => (
                            <button
                              key={b.value}
                              type="button"
                              onClick={() => setBudgetValue(b.value)}
                              aria-pressed={budgetValue === b.value}
                              className={`rounded-xl border px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                                budgetValue === b.value
                                  ? 'border-indigo-500 bg-indigo-50/50 text-indigo-700 ring-1 ring-indigo-500'
                                  : 'border-line bg-white text-slate-600 hover:border-slate-300'
                              }`}
                            >
                              {b.label}
                            </button>
                          ))}
                          <button
                            type="button"
                            onClick={() => setBudgetValue('custom')}
                            aria-pressed={budgetValue === 'custom'}
                            className={`rounded-xl border px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                              budgetValue === 'custom'
                                ? 'border-indigo-500 bg-indigo-50/50 text-indigo-700 ring-1 ring-indigo-500'
                                : 'border-line bg-white text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            Custom amount
                          </button>
                        </div>
                        {budgetValue === 'custom' && (
                          <div className="mt-3 flex gap-3">
                            <select value={currency} onChange={(e) => setCurrency(e.target.value)} className={`${inputCls} w-28`} aria-label="Currency">
                              {CURRENCIES.map((c) => (
                                <option key={c} value={c}>{c}</option>
                              ))}
                            </select>
                            <input
                              type="number"
                              min="0"
                              inputMode="numeric"
                              value={customAmount}
                              onChange={(e) => setCustomAmount(e.target.value)}
                              placeholder="Amount"
                              className={inputCls}
                            />
                          </div>
                        )}
                      </fieldset>

                      <div className="rounded-2xl border border-line bg-slate-50/60 p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Estimated investment</p>
                        <p className="mt-2 text-3xl font-semibold tracking-tight text-ink">
                          {formatMoney(estimate.min, currency)} - {formatMoney(estimate.max, currency)}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">{comparisonText}</p>
                        <div className="mt-4 grid gap-2">
                          {breakdown.map((line) => (
                            <div key={line.label} className="flex items-center justify-between text-sm">
                              <span className="text-slate-600">{line.label}</span>
                              <span className="font-medium text-ink">{formatMoney(line.amount, currency)}</span>
                            </div>
                          ))}
                        </div>
                        <p className="mt-3 text-xs text-slate-400">Indicative only - the final quote is always agreed before we start.</p>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="grid gap-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="rw-name" className="text-xs font-medium text-slate-600">Your name *</label>
                          <input id="rw-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className={inputCls} required />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="rw-email" className="text-xs font-medium text-slate-600">Email *</label>
                          <input id="rw-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className={inputCls} required />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="rw-company" className="text-xs font-medium text-slate-600">Company <span className="text-slate-400">(optional)</span></label>
                        <input id="rw-company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company name" className={inputCls} />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="rw-message" className="text-xs font-medium text-slate-600">Project details</label>
                        <textarea id="rw-message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What are you trying to build? Platforms, features, timeline - anything helps." className={`${inputCls} resize-none`} />
                      </div>

                      <div className="rounded-2xl border border-line bg-slate-50/60 p-5 text-sm">
                        <p className="font-semibold text-ink">Summary</p>
                        <p className="mt-2 text-slate-600"><span className="font-medium text-ink">Service:</span> {svc}</p>
                        {platforms.length > 0 && <p className="text-slate-600"><span className="font-medium text-ink">Platforms:</span> {platforms.join(', ')}</p>}
                        <p className="text-slate-600"><span className="font-medium text-ink">Budget:</span> {budgetValue === 'custom' ? `Custom (${currency} ${customAmountNum})` : budgetOption?.label ?? 'Not sure yet'}</p>
                        <p className="text-slate-600"><span className="font-medium text-ink">Estimate:</span> {formatMoney(estimate.min, currency)} - {formatMoney(estimate.max, currency)}</p>
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
                        {status === 'sending' ? 'Sending...' : 'Send request'}
                        <Icon name="send" className="size-4" />
                      </button>
                    )}
                  </div>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
