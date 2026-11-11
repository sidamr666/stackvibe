import { processSteps } from '../data/site.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

export default function ProcessSection() {
  return (
    <section id="process" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          align="center"
          kicker="Process"
          title={<>From idea to launch, <span className="text-gradient">no surprises</span></>}
          description="A transparent, milestone-based workflow. You always know what is happening, what is next, and how much it costs."
        />

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <Reveal as="li" key={step.step} delay={index * 90} className="h-full">
              <div className="glass relative flex h-full flex-col rounded-3xl p-6 transition-colors hover:border-white/20">
                <span className="text-gradient text-4xl font-bold tracking-tight">{step.step}</span>
                <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.text}</p>
                {index < processSteps.length - 1 && (
                  <span aria-hidden="true" className="absolute -right-3 top-8 hidden text-xl text-slate-600 lg:block">→</span>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}