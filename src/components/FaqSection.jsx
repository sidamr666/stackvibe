import { useState } from 'react'
import { faqs } from '../data/site.js'
import SectionHeading from './SectionHeading.jsx'
import Icon from './Icons.jsx'

export default function FaqSection() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          align="center"
          kicker="FAQ"
          title={<>Questions, <span className="text-gradient">answered</span></>}
          description="Everything founders usually ask before starting. Anything else - just send a message."
        />

        <div className="mt-10 divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white">
          {faqs.map((item, index) => {
            const isOpen = open === index
            return (
              <div key={item.q}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    id={`faq-button-${index}`}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-medium text-ink transition-colors hover:bg-slate-50"
                  >
                    {item.q}
                    <span
                      className={`grid size-8 shrink-0 place-items-center rounded-full border border-line text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                      aria-hidden="true"
                    >
                      <Icon name="plus" className="size-4" />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-button-${index}`}
                  className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-[15px] leading-relaxed text-slate-600">{item.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
