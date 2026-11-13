import { packages, site } from '../data/site.js'
import { formatMoney } from '../lib/estimate.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import Icon from './Icons.jsx'

export default function PricingSection() {
  return (
    <section id="pricing" className="relative scroll-mt-24 border-y border-line bg-surface-2/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          align="center"
          kicker="Pricing"
          title={<>Clear prices, <span className="text-gradient">scoped to your budget</span></>}
          description="Starting points to anchor the conversation. The request form asks for your budget so we can propose something that fits - or phase the work."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {packages.map((pkg, index) => (
            <Reveal key={pkg.id} delay={index * 70} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-3xl p-7 transition duration-500 hover:-translate-y-1 ${
                  pkg.highlighted ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20' : 'glass hover:border-slate-300'
                }`}
              >
                {pkg.highlighted && (
                  <span className="absolute right-5 top-5 rounded-full bg-indigo-500/25 px-3 py-1 text-[11px] font-semibold text-indigo-200">
                    Most popular
                  </span>
                )}
                <h3 className={`text-lg font-semibold ${pkg.highlighted ? 'text-white' : 'text-ink'}`}>{pkg.name}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${pkg.highlighted ? 'text-slate-300' : 'text-slate-600'}`}>{pkg.description}</p>

                <div className="mt-5 flex items-baseline gap-2">
                  <span className={`text-xs ${pkg.highlighted ? 'text-slate-400' : 'text-slate-500'}`}>{pkg.cadence}</span>
                  <span className={`text-3xl font-semibold tracking-tight ${pkg.highlighted ? 'text-white' : 'text-ink'}`}>
                    {formatMoney(pkg.price, site.currency)}
                  </span>
                  {pkg.cadence === 'per month' && (
                    <span className={`text-sm ${pkg.highlighted ? 'text-slate-400' : 'text-slate-500'}`}>/mo</span>
                  )}
                </div>

                <ul className="mt-6 grid gap-2.5">
                  {pkg.features.map((feature) => (
                    <li key={feature} className={`flex items-start gap-2 text-sm ${pkg.highlighted ? 'text-slate-200' : 'text-slate-700'}`}>
                      <Icon name="check" className={`mt-0.5 size-4 shrink-0 ${pkg.highlighted ? 'text-indigo-300' : 'text-emerald-600'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a href="#contact" className="mt-auto pt-7">
                  <span
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                      pkg.highlighted ? 'bg-white text-slate-900 hover:bg-slate-100' : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    {pkg.cta}
                    <Icon name="arrowRight" className="size-4" />
                  </span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-8 text-center text-sm text-slate-500">
            Not sure which fits?{' '}
            <a href="#contact" className="font-medium text-indigo-600 hover:text-indigo-700">Tell us your budget</a>{' '}
            and we will propose a plan that works.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
