import { hero } from '../data/site.js'
import { useRequestModal } from '../context/RequestModalContext.jsx'
import Reveal from './Reveal.jsx'
import HeroVisual from './HeroVisual.jsx'
import Icon from './Icons.jsx'

export default function Hero() {
  const openRequest = useRequestModal()
  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-10">
        <div className="max-w-2xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-emerald-500" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              {hero.eyebrow}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-[2.7rem] font-semibold leading-[1.04] tracking-tight text-ink sm:text-6xl lg:text-[4.1rem]">
              {hero.title}
              <br />
              <span className="text-gradient">{hero.highlight}</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">{hero.subtitle}</p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => openRequest()}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-all hover:-translate-y-0.5 hover:bg-slate-800"
              >
                {hero.primaryCta.label}
                <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <a
                href={hero.secondaryCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-slate-50"
              >
                {hero.secondaryCta.label}
                <Icon name="arrowRight" className="size-4" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {hero.badges.map((badge) => (
                <li key={badge} className="flex items-center gap-2 text-sm text-slate-600">
                  <Icon name="check" className="size-4 text-emerald-600" />
                  {badge}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative">
          <HeroVisual />
        </Reveal>
      </div>
    </section>
  )
}
