import { accentMeta, services } from '../data/site.js'
import { handlePointerGlow } from '../hooks/usePointerGlow.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import Icon from './Icons.jsx'

const accentText = {
  cyan: 'text-cyan-300',
  violet: 'text-violet-300',
  indigo: 'text-indigo-300',
  emerald: 'text-emerald-300',
}

export default function ServicesSection() {
  return (
    <section id="services" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          align="center"
          kicker="Services"
          title={<>What I can build <span className="text-gradient">for you</span></>}
          description="Design, development, deployment and support - handled end-to-end. Pick a lane, or mix several into one project."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map((service, index) => {
            const accent = accentMeta[service.accent] ?? accentMeta.cyan
            return (
              <Reveal key={service.id} delay={index * 80}>
                <article
                  onPointerMove={handlePointerGlow}
                  className={`card-spotlight group relative flex h-full flex-col rounded-4xl glass p-6 transition duration-500 hover:-translate-y-1 hover:border-white/20 sm:p-8 ${accent.glow}`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ring-1 ring-white/10 ${accent.tile}`}>
                      <Icon name={service.icon} className="size-6" />
                    </span>
                    <h3 className="text-xl font-semibold tracking-tight text-white">{service.name}</h3>
                  </div>

                  <p className="mt-4 text-[15px] leading-relaxed text-slate-400">{service.tagline}</p>

                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-slate-300">
                        <Icon name="check" className={`mt-0.5 size-4 shrink-0 ${accentText[service.accent] ?? 'text-cyan-300'}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6">
                    <a
                      href={service.href}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-base-950 transition-transform hover:-translate-y-0.5"
                    >
                      {service.cta}
                      <Icon name="arrowUpRight" className="size-4" />
                    </a>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}