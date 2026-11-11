import { footerColumns, site, socials } from '../data/site.js'
import Logo from './Logo.jsx'
import Icon from './Icons.jsx'

export default function Footer({ basePath = '' }) {
  const resolve = (href) => (href.startsWith('#') ? `${basePath}${href}` : href)

  return (
    <footer className="relative border-t border-white/[0.06] bg-base-900/40">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <a href={resolve('#home')} className="flex items-center gap-2.5" aria-label="StackVibe â€” home">
              <Logo className="size-9" />
              <span className="text-lg font-semibold tracking-tight text-white">
                Stack<span className="text-gradient">Vibe</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Independent software studio crafting Android apps, desktop SaaS and web tools â€” built clean,
              shipped on time.
            </p>
            <div className="mt-5 flex gap-2.5">
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

          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="text-sm font-semibold text-white">{column.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={resolve(link.href)} className="text-sm text-slate-400 transition-colors hover:text-white">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="text-sm font-semibold text-white">Start a project</h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Have an idea worth building? I'd love to hear about it.
            </p>
            <a
              href={resolve('#contact')}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 px-4 py-2.5 text-sm font-semibold text-base-950 transition-transform hover:-translate-y-0.5"
            >
              Get in touch
              <Icon name="arrowRight" className="size-4" />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            Â© {site.copyrightYear} {site.name} Â· {site.domain}
          </p>
          <div className="flex items-center gap-5 text-xs text-slate-500">
            <a href="/privacy.html" className="transition-colors hover:text-white">Privacy Policy</a>
            <span aria-hidden="true">Â·</span>
            <span>Built with React & Tailwind CSS</span>
          </div>
          <a
            href={resolve('#home')}
            aria-label="Back to top"
            className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition-colors hover:text-white"
          >
            <Icon name="chevronUp" className="size-4.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}