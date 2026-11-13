import { useEffect, useRef } from 'react'
import { navLinks, socials } from '../data/site.js'
import { useScrollLock } from '../hooks/useScrollLock.js'
import { useRequestModal } from '../context/RequestModalContext.jsx'
import Logo from './Logo.jsx'
import Icon from './Icons.jsx'

export default function MobileNav({ open, onClose, activeId }) {
  useScrollLock(open)
  const openRequest = useRequestModal()
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const first = panelRef.current?.querySelector('a[href], button')
    const timer = setTimeout(() => first?.focus(), 80)
    return () => clearTimeout(timer)
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key !== 'Tab') return
      const nodes = panelRef.current?.querySelectorAll('a[href], button:not([disabled])')
      if (!nodes || nodes.length === 0) return
      const list = Array.from(nodes)
      const first = list[0]
      const last = list[list.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <div id="mobile-nav" className="lg:hidden" aria-hidden={!open}>
      <div
        onClick={onClose}
        className={`fixed inset-0 top-16 bg-slate-900/20 backdrop-blur-sm transition-opacity duration-300 sm:top-18 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <div
        ref={panelRef}
        inert={!open}
        className={`fixed inset-x-0 top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line bg-white/95 px-5 pb-10 pt-3 backdrop-blur-2xl transition-all duration-300 sm:top-18 ${
          open ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-4 opacity-0'
        }`}
      >
        <nav className="flex flex-col gap-1" aria-label="Mobile">
          {navLinks.map((link, index) => (
            <a
              key={link.id}
              href={link.href}
              onClick={onClose}
              aria-current={activeId === link.id ? 'page' : undefined}
              className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium transition-colors ${
                activeId === link.id ? 'bg-slate-900/[0.05] text-ink' : 'text-slate-600 hover:bg-slate-100 hover:text-ink'
              }`}
              style={{ transitionDelay: open ? `${index * 30}ms` : '0ms' }}
            >
              {link.label}
              <Icon name="arrowRight" className="size-4 text-slate-400" />
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => {
            onClose()
            openRequest()
          }}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3.5 text-sm font-semibold text-white"
        >
          Start a project
          <Icon name="arrowRight" className="size-4" />
        </button>

        <div className="mt-8 border-t border-line pt-6">
          <div className="flex items-center gap-3">
            <Logo className="size-8" />
            <div>
              <p className="text-sm font-semibold text-ink">StackVibe</p>
              <p className="text-xs text-slate-500">Independent software studio</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2.5">
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
      </div>
    </div>
  )
}
