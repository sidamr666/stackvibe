import { useMemo, useState } from 'react'
import { work } from '../data/site.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import Icon from './Icons.jsx'

const types = ['All', ...Array.from(new Set(work.map((w) => w.type)))]

export default function WorkSection() {
  const [filter, setFilter] = useState('All')
  const items = useMemo(() => (filter === 'All' ? work : work.filter((w) => w.type === filter)), [filter])

  return (
    <section id="work" className="relative scroll-mt-24 border-y border-line bg-surface-2/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          align="center"
          kicker="Work"
          title={<>Work that <span className="text-gradient">pays for itself</span></>}
          description="A selection of recent products. Every one shipped, live in the App Store or in production, and earning its keep."
        />

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {types.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFilter(type)}
              aria-pressed={filter === type}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                filter === type
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-line bg-white text-slate-600 hover:text-ink'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={index * 60}>
              <article className="glass group relative flex h-full flex-col rounded-3xl p-6 transition duration-500 hover:-translate-y-1 hover:border-slate-300">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold text-slate-600">{item.type}</span>
                  <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-500/15 to-violet-500/15 text-indigo-700">
                    <Icon name="arrowUpRight" className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">{tag}</span>
                  ))}
                </div>
                <dl className="mt-auto grid grid-cols-3 gap-3 border-t border-line pt-5">
                  {item.results.map((result) => (
                    <div key={result.label}>
                      <dd className="text-lg font-semibold tracking-tight text-ink">{result.value}</dd>
                      <dt className="text-[11px] leading-tight text-slate-500">{result.label}</dt>
                    </div>
                  ))}
                </dl>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
