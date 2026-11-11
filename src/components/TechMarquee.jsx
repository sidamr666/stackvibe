import { techStack } from '../data/site.js'

export default function TechMarquee() {
  return (
    <section aria-label="Technology stack" className="relative border-y border-white/[0.05] bg-white/[0.015] py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-base-950 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-base-950 to-transparent" aria-hidden="true" />
      <div className="mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-8 hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-8" aria-hidden={copy === 1}>
              {techStack.map((tech) => (
                <span key={`${copy}-${tech}`} className="flex items-center gap-8 whitespace-nowrap text-sm font-medium tracking-wide text-slate-500">
                  {tech}
                  <span className="size-1 rounded-full bg-cyan-400/40" aria-hidden="true" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}