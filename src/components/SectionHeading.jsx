export default function SectionHeading({ kicker, title, description, align = 'left', className = '' }) {
  const alignCls = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'
  return (
    <div className={`flex max-w-2xl flex-col ${alignCls} ${className}`}>
      {kicker && (
        <span className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-brand-indigo">
          <span className="h-px w-8 bg-gradient-to-r from-indigo-500 to-transparent" aria-hidden="true" />
          {kicker}
        </span>
      )}
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]">
        {title}
      </h2>
      {description && <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{description}</p>}
    </div>
  )
}
