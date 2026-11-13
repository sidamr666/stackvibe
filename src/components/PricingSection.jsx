import { packages } from '../data/site.js'
import { useRequestModal } from '../context/RequestModalContext.jsx'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import Icon from './Icons.jsx'

export default function PricingSection() {
  const openRequest = useRequestModal()

  return (
    <section id="pricing" className="relative scroll-mt-24 border-y border-line bg-surface-2/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          align="center"
          kicker="Pricing"
          title={<>Pick a package, <span className="text-gradient">we confirm the price</span></>}
          description="Ranges to give you a ballpark. Tell us your project and we reply within 24 hours with the exact price."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {packages.map((pkg, index) => (
            <Reveal key={pkg.id} delay={index * 80} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-3xl p-8 transition duration-500 hover:-translate-y-1 ${
                  pkg.highlighted ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20' : 'glass hover:border-slate-300'
                }`}
              >
                {pkg.highlighted && (
                  <span className="absolute right-6 top-6 rounded-full bg-indigo-500/25 px-3 py-1 text-[11px] font-semibold text-indigo-200">
                    Most popular
                  </span>
                )}
                <h3 className={`text-xl font-semibold ${pkg.highlighted ? 'text-white' : 'text-ink'}`}>{pkg.name}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${pkg.highlighted ? 'text-slate-300' : 'text-slate-600'}`}>{pkg.description}</p>

                <p className={`mt-5 text-3xl font-semibold tracking-tight ${pkg.highlighted ? 'text-white' : 'text-ink'}`}>
                  {pkg.priceLabel}
                </p>

                <ul className="mt-6 grid gap-2.5">
                  {pkg.features.map((feature) => (
                    <li key={feature} className={`flex items-start gap-2 text-sm ${pkg.highlighted ? 'text-slate-200' : 'text-slate-700'}`}>
                      <Icon name="check" className={`mt-0.5 size-4 shrink-0 ${pkg.highlighted ? 'text-indigo-300' : 'text-emerald-600'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => openRequest({ tier: pkg.id })}
                  className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors ${
                    pkg.highlighted ? 'bg-white text-slate-900 hover:bg-slate-100' : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {pkg.cta}
                  <Icon name="arrowRight" className="size-4" />
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-8 text-center text-sm text-slate-500">
            Not sure?{' '}
            <button type="button" onClick={() => openRequest()} className="font-medium text-indigo-600 hover:text-indigo-700">
              Start with your idea
            </button>{' '}
            and we will propose the right package.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
