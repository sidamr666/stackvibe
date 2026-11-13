import { footerColumns, site, socials } from '../data/site.js'
import Logo from './Logo.jsx'
import Icon from './Icons.jsx'

export default function Footer({ basePath = '' }) {
  const resolve = (href) => (href.startsWith('#') ? `${basePath}${href}` : href)

  return (
    <footer className="relative border-t border-line bg-surface-2/60">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <a href={resolve('#home')} className="flex items-center gap-2.5" aria-label="StackVibe - home">
              <Logo className="size-9" />
              <span className="text-lg font-semibold tracking-tight text-ink">
                Stack<span className="text-gradient">Vibe</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600">
              Independent software studio crafting apps, desktop software, web and AI products - built clean,
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
                  className="grid size-10 place-items-center rounded-xl border border-line bg-white text-slate-600 transition-colors hover:text-ink"
                >
                  <Icon name={social.icon} className="size-4.5" />
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="text-sm font-semibold text-ink">{column.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={resolve(link.href)} className="text-sm text-slate-600 transition-colors hover:text-ink">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="text-sm font-semibold text-ink">Start a project</h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Have an idea worth building? We would love to hear about it.
            </p>
            <a
              href={resolve('#contact')}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              Get in touch
              <Icon name="arrowRight" className="size-4" />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            &copy; {site.copyrightYear} {site.name} &middot; {site.domain}
          </p>
          <div className="flex items-center gap-5 text-xs text-slate-500">
            <a href="/privacy.html" className="transition-colors hover:text-ink">Privacy Policy</a>
            <span aria-hidden="true">&middot;</span>
            <span>Built with React &amp; Tailwind CSS</span>
          </div>
          <a
            href={resolve('#home')}
            aria-label="Back to top"
            className="grid size-10 place-items-center rounded-xl border border-line bg-white text-slate-600 transition-colors hover:text-ink"
          >
            <Icon name="chevronUp" className="size-4.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
