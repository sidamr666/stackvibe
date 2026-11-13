import { audiences } from '../data/site.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import Icon from './Icons.jsx'

export default function AudienceSection() {
  return (
    <section className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          align="center"
          kicker="Who it's for"
          title={<>Built for <span className="text-gradient">founders and teams</span></>}
          description="Whether you are launching your first product or scaling an existing one, we meet you where you are."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {audiences.map((group, index) => (
            <Reveal key={group.id} delay={index * 90}>
              <div className="glass h-full rounded-3xl p-8">
                <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500/15 to-violet-500/15 text-indigo-700">
                  <Icon name={group.icon} className="size-6" />
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink">{group.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{group.text}</p>
                <ul className="mt-5 grid gap-2.5">
                  {group.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-slate-700">
                      <Icon name="checkCircle" className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
