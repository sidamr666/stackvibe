import { hero } from '../data/site.js'
import Reveal from './Reveal.jsx'
import HeroVisual from './HeroVisual.jsx'
import Icon from './Icons.jsx'

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-10">
        <div className="max-w-2xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-slate-300">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-emerald-400" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              {hero.eyebrow}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-[2.7rem] font-semibold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-[4.1rem]">
              {hero.title}
              <br />
              <span className="text-gradient">{hero.highlight}</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">{hero.subtitle}</p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={hero.primaryCta.href}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_-16px_rgba(99,102,241,0.8)] transition-transform hover:-translate-y-0.5"
              >
                {hero.primaryCta.label}
                <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={hero.secondaryCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/[0.08]"
              >
                {hero.secondaryCta.label}
                <Icon name="arrowRight" className="size-4" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {hero.badges.map((badge) => (
                <li key={badge} className="flex items-center gap-2 text-sm text-slate-400">
                  <Icon name="check" className="size-4 text-emerald-400" />
                  {badge}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={400}>
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-4">
              {hero.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col bg-base-900/85 px-5 py-4">
                  <dt className="order-2 mt-0.5 text-xs text-slate-500">{stat.label}</dt>
                  <dd className="order-1 text-2xl font-semibold tracking-tight text-white">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative">
          <HeroVisual />
        </Reveal>
      </div>
    </section>
  )
}