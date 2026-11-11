import { androidApps } from '../data/site.js'
import SectionHeading from './SectionHeading.jsx'
import ProductCard from './ProductCard.jsx'
import Reveal from './Reveal.jsx'
import Icon from './Icons.jsx'

export default function AndroidSection() {
  return (
    <section id="android" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            kicker="Android Apps"
            title={<>Powerful mobile tools, <span className="text-gradient">polished to the pixel</span></>}
            description="Native Android applications engineered for speed, privacy and delightful detail — each one tuned to feel instant from the very first tap."
          />
          <Reveal delay={100}>
            <a href="#contact" className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-slate-300 transition-colors hover:text-white">
              Request a build
              <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {androidApps.map((app, index) => (
            <ProductCard key={app.id} product={app} delay={index * 80} />
          ))}
        </div>
      </div>
    </section>
  )
}