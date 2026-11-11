import { useState } from 'react'
import { site, socials } from '../data/site.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import Icon from './Icons.jsx'

const inputCls =
  'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-600 transition-colors focus:border-cyan-400/40 focus:bg-white/[0.05] focus:outline-none'

export default function Contact() {
  const [copied, setCopied] = useState(false)

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

  const onSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') || 'there')
    const email = String(data.get('email') || '')
    const message = String(data.get('message') || '')
    const subject = encodeURIComponent(`Project enquiry — ${name}`)
    const body = encodeURIComponent(`${message}\n\n— ${name}${email ? ` (${email})` : ''}`)
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          align="center"
          kicker="Contact"
          title={<>Let's build something <span className="text-gradient">worth shipping</span></>}
          description="Have an app idea, a SaaS concept or a web tool you want built right? Tell me about it — I reply fast, with honest scoping and a plan."
        />

        <Reveal delay={120}>
          <div className="glass relative mt-12 overflow-hidden rounded-5xl p-8 sm:p-12">
            <div aria-hidden="true" className="absolute -right-24 -top-24 size-72 rounded-full bg-cyan-500/10 blur-[100px]" />
            <div aria-hidden="true" className="absolute -bottom-24 -left-24 size-72 rounded-full bg-violet-500/10 blur-[100px]" />

            <div className="relative grid gap-10 lg:grid-cols-[1fr_0.9fr]">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight text-white">Start a conversation</h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-slate-400">
                  Prefer email? Reach me directly at the address below, or use the form and it opens your
                  mail client pre-filled.
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
                  {site.availability.label} · {site.location}
                </div>

                <div className="mt-6 flex gap-2.5">
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
                    <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" className={inputCls} />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="text-xs font-medium text-slate-400">Message</label>
                  <textarea id="contact-message" name="message" rows={4} placeholder="Tell me about the project..." className={`${inputCls} resize-none`} />
                </div>
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_-16px_rgba(99,102,241,0.8)] transition-transform hover:-translate-y-0.5"
                >
                  Send message
                  <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-0.5" />
                </button>
                <p className="text-center text-xs text-slate-600">Opens your email client — no data is stored on this site.</p>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}