import { useState } from 'react'
import { budgetOptions, services, site, socials } from '../data/site.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import Icon from './Icons.jsx'

const inputCls =
  'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-600 transition-colors focus:border-cyan-400/40 focus:bg-white/[0.05] focus:outline-none'

const selectCls = `${inputCls} appearance-none pr-10 [&>option]:bg-base-900 [&>option]:text-white`

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState('idle')

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
    } catch {
      const el = document.createElement('textarea')
      el.value = site.email
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const values = Object.fromEntries(data.entries())
    const endpoint = site.contact?.formEndpoint?.trim()

    if (endpoint) {
      setStatus('sending')
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(values),
        })
        if (res.ok) {
          setStatus('sent')
          form.reset()
        } else {
          setStatus('error')
        }
      } catch {
        setStatus('error')
      }
      return
    }

    const name = String(values.name || 'there')
    const email = String(values.email || '')
    const message = String(values.message || '')
    const subject = encodeURIComponent(`Project enquiry - ${name}`)
    const body = encodeURIComponent(
      `Service: ${values.service || 'Not selected'}\nBudget: ${values.budget || 'Not selected'}\n\n${message}\n\n- ${name}${email ? ` (${email})` : ''}`,
    )
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          align="center"
          kicker="Contact"
          title={<>Tell me about <span className="text-gradient">your project</span></>}
          description="No obligations, no pressure. Send a few details and I'll reply within 24 hours with honest feedback and a plan."
        />

        <Reveal delay={120}>
          <div className="glass relative mt-12 overflow-hidden rounded-5xl p-8 sm:p-12">
            <div aria-hidden="true" className="absolute -right-24 -top-24 size-72 rounded-full bg-cyan-500/10 blur-[100px]" />
            <div aria-hidden="true" className="absolute -bottom-24 -left-24 size-72 rounded-full bg-violet-500/10 blur-[100px]" />

            <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight text-white">Let's start the conversation</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-400">
                  Prefer email? Write to me directly, or copy the address below. Every message lands
                  straight in my inbox.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 px-5 py-3 text-sm font-semibold text-base-950 transition-transform hover:-translate-y-0.5"
                  >
                    <Icon name="mail" className="size-4" />
                    {site.email}
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/[0.08]"
                  >
                    <Icon name={copied ? 'check' : 'copy'} className="size-4" />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                  <span aria-live="polite" className="sr-only">{copied ? 'Email copied to clipboard' : ''}</span>
                </div>

                <div className="mt-8 flex items-center gap-2 text-sm text-slate-400">
                  <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
                  {site.availability.label} | {site.location}
                </div>

                <ul className="mt-6 space-y-2.5">
                  {['Fixed-price quote within 48h', 'Free initial consultation', 'NDA available on request'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-400">
                      <Icon name="check" className="size-4 text-emerald-400" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex gap-2.5">
                  {socials.map((social) => (
                    <a
                      key={social.id}
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
                      aria-label={social.label}
                      className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition-colors hover:text-white"
                    >
                      <Icon name={social.icon} className="size-4.5" />
                    </a>
                  ))}
                </div>
              </div>

              <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-name" className="text-xs font-medium text-slate-400">Name</label>
                    <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Your name" className={inputCls} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-email" className="text-xs font-medium text-slate-400">Email</label>
                    <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" className={inputCls} required />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="relative flex flex-col gap-1.5">
                    <label htmlFor="contact-service" className="text-xs font-medium text-slate-400">What do you need?</label>
                    <select id="contact-service" name="service" className={selectCls} defaultValue="">
                      <option value="" disabled>Choose a service</option>
                      {services.map((service) => (
                        <option key={service.id} value={service.name}>{service.name}</option>
                      ))}
                    </select>
                    <Icon name="chevronUp" className="pointer-events-none absolute bottom-3.5 right-3.5 size-4 rotate-180 text-slate-500" />
                  </div>
                  <div className="relative flex flex-col gap-1.5">
                    <label htmlFor="contact-budget" className="text-xs font-medium text-slate-400">Budget</label>
                    <select id="contact-budget" name="budget" className={selectCls} defaultValue="">
                      <option value="" disabled>Select a range</option>
                      {budgetOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <Icon name="chevronUp" className="pointer-events-none absolute bottom-3.5 right-3.5 size-4 rotate-180 text-slate-500" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="text-xs font-medium text-slate-400">Project details</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="What are you trying to build? Platforms, features, timeline - anything helps."
                    className={`${inputCls} resize-none`}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_-16px_rgba(99,102,241,0.8)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'sending' ? 'Sending...' : 'Request my project'}
                  {status !== 'sending' && <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-0.5" />}
                </button>

                <p aria-live="polite" role="status" className="min-h-5 text-center text-xs">
                  {status === 'sent' && <span className="text-emerald-400">Message sent - I'll get back to you within 24h.</span>}
                  {status === 'error' && <span className="text-amber-400">Something went wrong. Please email me directly at {site.email}.</span>}
                  {status === 'idle' && (
                    <span className="text-slate-600">
                      {site.contact?.formEndpoint ? 'Sent securely to my inbox.' : 'Opens your email client - nothing is stored on this site.'}
                    </span>
                  )}
                </p>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}