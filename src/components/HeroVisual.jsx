import { useRef } from 'react'
import Icon from './Icons.jsx'

const codeLines = [
  [{ t: 'export', c: 'text-fuchsia-400' }, { t: ' async ', c: 'text-slate-400' }, { t: 'function', c: 'text-sky-300' }, { t: ' deploy', c: 'text-white' }, { t: '() {', c: 'text-slate-400' }],
  [{ t: '  const ', c: 'text-slate-400' }, { t: 'build', c: 'text-emerald-300' }, { t: ' = await ', c: 'text-slate-400' }, { t: 'ci.run', c: 'text-cyan-300' }, { t: '(', c: 'text-slate-400' }, { t: "'main'", c: 'text-amber-300' }, { t: ')', c: 'text-slate-400' }],
  [{ t: '  const ', c: 'text-slate-400' }, { t: 'metrics', c: 'text-emerald-300' }, { t: ' = await ', c: 'text-slate-400' }, { t: 'track', c: 'text-cyan-300' }, { t: '(build)', c: 'text-slate-400' }],
  [{ t: '  await ', c: 'text-slate-400' }, { t: 'ship', c: 'text-white' }, { t: '(build, metrics)', c: 'text-slate-400' }],
  [{ t: '  return ', c: 'text-slate-400' }, { t: 'true', c: 'text-violet-300' }, { t: ';', c: 'text-slate-400' }],
  [{ t: '}', c: 'text-slate-400' }],
]

export default function HeroVisual() {
  const stageRef = useRef(null)

  const onPointerMove = (event) => {
    const el = stageRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = el.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(1200px) rotateY(${(px * 6).toFixed(2)}deg) rotateX(${(-py * 5).toFixed(2)}deg)`
  }

  const onPointerLeave = () => {
    if (stageRef.current) stageRef.current.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg)'
  }

  return (
    <div
      ref={stageRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative mx-auto max-w-lg transition-transform duration-300 ease-out will-change-transform lg:max-w-none"
    >
      <div aria-hidden="true" className="absolute -inset-8 rounded-[2.5rem] bg-gradient-to-tr from-cyan-500/20 via-indigo-500/10 to-fuchsia-500/20 blur-2xl" />

      {/* Main editor window */}
      <div className="glass relative overflow-hidden rounded-3xl shadow-[0_40px_90px_-40px_rgba(0,0,0,0.95)]">
        <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.03] px-4 py-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="ml-2 truncate rounded-md border border-white/[0.06] bg-base-950/50 px-2.5 py-1 font-mono text-[11px] text-slate-400">
            stackvibe.config.ts
          </span>
          <span className="ml-auto hidden items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300 sm:inline-flex">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Build passing
          </span>
        </div>

        <div className="grid grid-cols-[2.5rem_1fr] font-mono text-[12.5px] leading-6">
          <div className="select-none border-r border-white/[0.05] py-4 pr-3 text-right text-slate-600" aria-hidden="true">
            {codeLines.map((_, index) => (
              <div key={index}>{index + 1}</div>
            ))}
          </div>
          <div className="overflow-x-auto py-4 pl-4 pr-5">
            {codeLines.map((line, index) => (
              <div key={index} className="whitespace-pre">
                {line.map((token, tokenIndex) => (
                  <span key={tokenIndex} className={token.c}>
                    {token.t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <Icon name="check" className="size-3.5 text-emerald-400" />
            TypeScript · 0 errors
          </span>
          <span>compiled in 24ms</span>
        </div>
      </div>

      {/* Floating analytics card */}
      <div className="glass absolute -right-3 top-16 hidden w-52 rounded-2xl p-4 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] animate-float sm:block lg:-right-6">
        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">Monthly recurring</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight text-white">$18.4k</p>
        <p className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-emerald-400">
          <svg viewBox="0 0 12 12" className="size-3" aria-hidden="true"><path d="M6 10 2 6l1.4-1.4L6 7.2l4.6-4.6L12 4 6 10Z" fill="currentColor" /></svg>
          12.6%
        </p>
        <svg viewBox="0 0 160 44" className="mt-3 w-full" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,36 L160,36 L160,44 L0,44 Z" fill="url(#sparkFill)" />
          <path d="M0,32 L22,26 L44,28 L66,18 L88,22 L110,12 L132,16 L160,4" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Floating deploy card */}
      <div className="glass absolute -bottom-6 -left-2 flex items-center gap-3 rounded-2xl p-3.5 pr-5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] animate-float-slow sm:-left-6">
        <span className="grid size-10 place-items-center rounded-xl bg-emerald-400/15 text-emerald-300">
          <Icon name="rocket" className="size-5" />
        </span>
        <div>
          <p className="text-sm font-medium text-white">Deployed to production</p>
          <p className="mt-0.5 text-xs text-slate-500">v2.4.0 · 2 minutes ago</p>
        </div>
        <span className="ml-2 h-1.5 w-16 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
          <span className="block h-full w-3/4 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
        </span>
      </div>
    </div>
  )
}