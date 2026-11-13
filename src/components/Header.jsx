import { useCallback, useEffect, useState } from 'react'
import { navLinks } from '../data/site.js'
import { useScrolled } from '../hooks/useScrolled.js'
import { useScrollSpy } from '../hooks/useScrollSpy.js'
import MobileNav from './MobileNav.jsx'
import Logo from './Logo.jsx'
import Icon from './Icons.jsx'
import { useRequestModal } from '../context/RequestModalContext.jsx'

const sectionIds = navLinks.map((link) => link.id)

export default function Header() {
  const scrolled = useScrolled(10)
  const active = useScrollSpy(sectionIds)
  const openRequest = useRequestModal()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const close = useCallback(() => setOpen(false), [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-line bg-white/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:h-18 sm:px-8 lg:px-10">
        <a href="#home" onClick={close} className="flex items-center gap-2.5 rounded-xl" aria-label="StackVibe - home">
          <Logo className="size-9" />
          <span className="text-[1.05rem] font-semibold tracking-tight text-ink">
            Stack<span className="text-gradient">Vibe</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              aria-current={active === link.id ? 'page' : undefined}
              className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                active === link.id ? 'text-ink' : 'text-slate-500 hover:text-ink'
              }`}
            >
              {active === link.id && (
                <span className="absolute inset-0 -z-10 rounded-full bg-slate-900/[0.05] ring-1 ring-slate-900/10" aria-hidden="true" />
              )}
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => openRequest()}
            className="group hidden items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800 sm:inline-flex"
          >
            Start a project
            <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid size-10 place-items-center rounded-xl border border-line bg-white text-ink transition-colors hover:bg-slate-50 lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <Icon name={open ? 'close' : 'menu'} className="size-5" />
          </button>
        </div>
      </div>

      <MobileNav open={open} onClose={close} activeId={active} />
    </header>
  )
}
