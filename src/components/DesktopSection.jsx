import { desktopProducts } from '../data/site.js'
import SectionHeading from './SectionHeading.jsx'
import ProductCard from './ProductCard.jsx'
import Reveal from './Reveal.jsx'
import Icon from './Icons.jsx'

export default function DesktopSection() {
  return (
    <section id="desktop" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            kicker="Desktop SaaS & Web Tools"
            title={<>Software that scales from <span className="text-gradient">desktop to browser</span></>}
            description="Cross-platform desktop clients and fast, focused web tools — with realtime sync, offline-first reliability and the polish users notice."
          />
          <Reveal delay={100}>
            <a href="#contact" className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-slate-300 transition-colors hover:text-white">
              Discuss a product
              <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {desktopProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} delay={index * 80} />
          ))}
        </div>
      </div>
    </section>
  )
}