import { accentMeta, statusMeta } from '../data/site.js'
import { handlePointerGlow } from '../hooks/usePointerGlow.js'
import Reveal from './Reveal.jsx'
import Icon from './Icons.jsx'
import PhoneMockup from './PhoneMockup.jsx'
import WindowMockup from './WindowMockup.jsx'

const accentText = {
  cyan: 'text-cyan-300',
  violet: 'text-violet-300',
  indigo: 'text-indigo-300',
  emerald: 'text-emerald-300',
}

export default function ProductCard({ product, delay = 0 }) {
  const status = statusMeta[product.status] ?? statusMeta.live
  const accent = accentMeta[product.accent] ?? accentMeta.cyan
  const featured = Boolean(product.featured)
  const isSoon = product.status === 'soon'

  return (
    <Reveal delay={delay} className={featured ? 'lg:col-span-3' : ''}>
      <article
        onPointerMove={handlePointerGlow}
        className={`card-spotlight group relative flex h-full flex-col overflow-hidden rounded-4xl glass p-6 transition duration-500 hover:-translate-y-1 hover:border-white/20 sm:p-8 ${accent.glow}`}
      >
        <div className={featured ? 'grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center' : 'flex h-full flex-col'}>
          <div className="flex h-full flex-col">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <span className={`grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ring-1 ring-white/10 ${accent.tile}`}>
                  <Icon name={product.icon} className="size-6" />
                </span>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">{product.category}</p>
                  <h3 className="mt-0.5 text-xl font-semibold tracking-tight text-white">{product.name}</h3>
                </div>
              </div>
              <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${status.pill}`}>
                <span className={`size-1.5 rounded-full ${status.dot} ${product.status === 'live' || product.status === 'beta' ? 'animate-pulse' : ''}`} />
                {status.label}
              </span>
            </div>

            <p className="mt-5 text-[15px] leading-relaxed text-slate-400">{product.tagline}</p>
            {product.description && <p className="mt-2 text-sm leading-relaxed text-slate-500">{product.description}</p>}

            <ul className="mt-5 space-y-2.5">
              {product.features.map((feature) => (
                <li key={feature} className="flex gap-2.5 text-sm text-slate-300">
                  <Icon name="check" className={`mt-0.5 size-4 shrink-0 ${accentText[product.accent] ?? 'text-cyan-300'}`} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
              {product.tech?.map((tech) => (
                <span key={tech} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-slate-400">
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-6">
              {product.metrics && (
                <dl className="mb-5 grid grid-cols-2 gap-3">
                  {product.metrics.map((metric) => (
                    <div key={metric.label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                      <dt className="text-[11px] text-slate-500">{metric.label}</dt>
                      <dd className="mt-0.5 text-lg font-semibold text-white">{metric.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <a
                href={product.href}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                  isSoon
                    ? 'border border-white/12 bg-white/[0.04] text-white hover:bg-white/[0.08]'
                    : 'bg-gradient-to-r from-cyan-400 to-indigo-500 text-base-950 hover:-translate-y-0.5'
                }`}
              >
                {product.cta}
                <Icon name="arrowUpRight" className="size-4" />
              </a>
            </div>
          </div>

          {featured && (
            <div className="relative hidden justify-center lg:flex">
              {product.preview === 'phone' ? <PhoneMockup /> : product.preview === 'window' ? <WindowMockup /> : null}
            </div>
          )}
        </div>
      </article>
    </Reveal>
  )
}