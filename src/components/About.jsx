import { principles, stackGroups, site } from '../data/site.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import Icon from './Icons.jsx'

const snippet = [
  [{ t: '// stackvibe.config.ts', c: 'text-slate-400' }],
  [{ t: 'export', c: 'text-fuchsia-600' }, { t: ' const ', c: 'text-slate-500' }, { t: 'manifest', c: 'text-emerald-700' }, { t: ' = {', c: 'text-slate-500' }],
  [{ t: '  philosophy', c: 'text-ink' }, { t: ': ', c: 'text-slate-500' }, { t: "'clean > clever'", c: 'text-amber-600' }, { t: ',', c: 'text-slate-500' }],
  [{ t: '  performance', c: 'text-ink' }, { t: ': ', c: 'text-slate-500' }, { t: 'true', c: 'text-violet-600' }, { t: ',', c: 'text-slate-500' }],
  [{ t: '  ownership', c: 'text-ink' }, { t: ': ', c: 'text-slate-500' }, { t: "'yours'", c: 'text-cyan-700' }, { t: ',', c: 'text-slate-500' }],
  [{ t: '} satisfies ', c: 'text-slate-500' }, { t: 'Studio', c: 'text-sky-600' }],
]

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          kicker="About the studio"
          title={<>A senior team, <span className="text-gradient">your whole product</span></>}
          description="No agencies, no hand-offs, no project-manager telephone. You work directly with the people writing the code."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div>
            <Reveal className="space-y-4 text-base leading-relaxed text-slate-600">
              <p>
                We are a small senior team building across every platform: iOS and Android apps, desktop
                software for macOS, Windows and Linux, web products, AI features, document automation
                and custom calculations. One team, end to end: architecture, UI, backend, deployment
                and monitoring.
              </p>
              <p>
                The stack changes per project, but the standard never does: readable code, honest
                performance budgets, and releases that land on schedule. You own everything at the
                end - the repo, the accounts, the docs.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {principles.map((principle, index) => (
                <Reveal key={principle.title} delay={index * 80}>
                  <div className="glass h-full rounded-2xl p-5 transition-colors hover:border-slate-300">
                    <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-500/15 to-violet-500/15 text-indigo-700">
                      <Icon name={principle.icon} className="size-5" />
                    </span>
                    <h3 className="mt-4 text-sm font-semibold text-ink">{principle.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{principle.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={120}>
            <div className="relative">
              <div aria-hidden="true" className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-indigo-500/10 via-transparent to-violet-500/10 blur-xl" />
              <div className="glass relative overflow-hidden rounded-3xl">
                <div className="flex items-center gap-3 border-b border-line bg-slate-50/60 px-4 py-3">
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
                <div className="flex items-center justify-between border-t border-line bg-slate-50/60 px-4 py-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                    <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
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
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Technologies we work with</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {stackGroups.map((group) => (
                <div key={group.label}>
                  <h4 className="text-sm font-semibold text-ink">{group.label}</h4>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item} className="rounded-full border border-line bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600">
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
