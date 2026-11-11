import { principles, stackGroups, site } from '../data/site.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import Icon from './Icons.jsx'

const snippet = [
  [{ t: '// stackvibe.config.ts', c: 'text-slate-600' }],
  [{ t: 'export', c: 'text-fuchsia-400' }, { t: ' const ', c: 'text-slate-400' }, { t: 'manifest', c: 'text-emerald-300' }, { t: ' = {', c: 'text-slate-400' }],
  [{ t: '  philosophy', c: 'text-white' }, { t: ': ', c: 'text-slate-400' }, { t: "'clean > clever'", c: 'text-amber-300' }, { t: ',', c: 'text-slate-400' }],
  [{ t: '  performance', c: 'text-white' }, { t: ': ', c: 'text-slate-400' }, { t: 'true', c: 'text-violet-300' }, { t: ',', c: 'text-slate-400' }],
  [{ t: '  shipping', c: 'text-white' }, { t: ': ', c: 'text-slate-400' }, { t: "'weekly'", c: 'text-cyan-300' }, { t: ',', c: 'text-slate-400' }],
  [{ t: '} satisfies ', c: 'text-slate-400' }, { t: 'Studio', c: 'text-sky-300' }],
]

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          kicker="About StackVibe"
          title={<>Full-stack engineering, <span className="text-gradient">obsessively refined</span></>}
          description="An independent studio that treats every project — an app, a desktop client, a web tool — like a product people will rely on every day."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div>
            <Reveal className="space-y-4 text-base leading-relaxed text-slate-400">
              <p>
                StackVibe is the studio behind a growing family of Android applications, cross-platform
                desktop SaaS and focused web tools. I design, build and ship the whole thing — from
                architecture and UI to deployment and monitoring.
              </p>
              <p>
                The stack changes per project, but the standard never does: readable code, honest
                performance budgets, accessible interfaces, and releases that happen on a schedule rather
                than “eventually”.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {principles.map((principle, index) => (
                <Reveal key={principle.title} delay={index * 80}>
                  <div className="glass h-full rounded-2xl p-5 transition-colors hover:border-white/20">
                    <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 text-cyan-300">
                      <Icon name={principle.icon} className="size-5" />
                    </span>
                    <h3 className="mt-4 text-sm font-semibold text-white">{principle.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{principle.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={120}>
            <div className="relative">
              <div aria-hidden="true" className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-indigo-500/10 via-transparent to-fuchsia-500/10 blur-xl" />
              <div className="glass relative overflow-hidden rounded-3xl shadow-[0_40px_90px_-40px_rgba(0,0,0,0.95)]">
                <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.03] px-4 py-3">
                  <span className="flex gap-1.5" aria-hidden="true">
                    <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="size-2.5 rounded-full bg-[#febc2e]" />
                    <span className="size-2.5 rounded-full bg-[#28c840]" />
                  </span>
                  <span className="ml-2 font-mono text-[11px] text-slate-500">stackvibe.config.ts</span>
                </div>
                <div className="p-5 font-mono text-[13px] leading-7">
                  {snippet.map((line, index) => (
                    <div key={index} className="whitespace-pre">
                      {line.map((token, tokenIndex) => (
                        <span key={tokenIndex} className={token.c}>{token.t}</span>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-white/[0.06] bg-white/[0.02] px-4 py-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
                    <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
                    {site.availability.label}
                  </span>
                  <span className="text-[11px] text-slate-500">{site.location}</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <div className="glass mt-8 rounded-3xl p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Engineering stack</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {stackGroups.map((group) => (
                <div key={group.label}>
                  <h4 className="text-sm font-semibold text-white">{group.label}</h4>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-slate-400">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}