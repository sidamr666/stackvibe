import Icon from './Icons.jsx'

const chips = ['iOS', 'Android', 'macOS', 'Windows', 'Linux', 'Web', 'AI']

const tiles = [
  { icon: 'phone', label: 'Apps' },
  { icon: 'box', label: 'Desktop' },
  { icon: 'code', label: 'Web' },
  { icon: 'sparkles', label: 'AI' },
]

export default function HeroVisual() {
  return (
    <div className="relative mx-auto max-w-lg lg:max-w-none">
      <div aria-hidden="true" className="absolute -inset-8 rounded-[2.5rem] bg-gradient-to-tr from-cyan-500/15 via-indigo-500/10 to-violet-500/15 blur-2xl" />

      <div className="glass relative overflow-hidden rounded-3xl">
        <div className="flex items-center gap-3 border-b border-line bg-slate-50/60 px-4 py-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="ml-2 font-mono text-[11px] text-slate-500">stackvibe.fyi</span>
          <span className="ml-auto rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
            Taking projects
          </span>
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-base font-semibold tracking-tight text-ink">Your idea, turned into a working product</p>
          <p className="mt-1 text-sm text-slate-500">One team, end to end - design, code, launch and support.</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span key={chip} className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-slate-700">
                {chip}
              </span>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {tiles.map((item) => (
              <div key={item.label} className="rounded-2xl border border-line bg-white p-4 text-center">
                <span className="mx-auto grid size-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-500/15 to-violet-500/15 text-indigo-700">
                  <Icon name={item.icon} className="size-5" />
                </span>
                <p className="mt-2 text-xs font-semibold text-ink">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 border-t border-line pt-4">
            <Icon name="check" className="size-4 text-emerald-600" />
            <p className="text-xs text-slate-600">Fixed price &middot; Weekly demos &middot; You own the code</p>
          </div>
        </div>
      </div>
    </div>
  )
}
