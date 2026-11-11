import Icon from './Icons.jsx'

const bars = [42, 66, 50, 84, 58, 95, 74]

const kpis = [
  { label: 'Revenue', value: '$18.4k', delta: '+12.0%', up: true },
  { label: 'Active users', value: '8,120', delta: '+3.4%', up: true },
  { label: 'Churn', value: '1.2%', delta: '-0.3%', up: false },
]

const nav = ['grid', 'chart', 'box', 'bolt', 'shield']

export default function WindowMockup({ className = '' }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-white/10 bg-base-900/85 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.95)] ${className}`}>
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="ml-2 truncate rounded-md border border-white/[0.06] bg-base-950/50 px-2.5 py-1 font-mono text-[11px] text-slate-400">app.stackvibe.fyi</span>
      </div>

      <div className="grid grid-cols-[52px_1fr]">
        <div className="flex flex-col items-center gap-2 border-r border-white/[0.05] bg-white/[0.015] py-4">
          {nav.map((name, index) => (
            <span key={name} className={`grid size-9 place-items-center rounded-xl ${index === 0 ? 'bg-cyan-400/15 text-cyan-300' : 'text-slate-600'}`}>
              <Icon name={name} className="size-4.5" />
            </span>
          ))}
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Overview</p>
              <p className="text-[11px] text-slate-500">Last 30 days</p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium text-slate-400">Monthly</span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2.5">
            {kpis.map((kpi) => (
              <div key={kpi.label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <p className="truncate text-[10px] text-slate-500">{kpi.label}</p>
                <p className="mt-1 text-sm font-semibold text-white sm:text-base">{kpi.value}</p>
                <p className={`mt-0.5 text-[10px] font-medium ${kpi.up ? 'text-emerald-400' : 'text-amber-400'}`}>{kpi.delta}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="flex items-end justify-between gap-2" style={{ height: '96px' }}>
              {bars.map((height, index) => (
                <span
                  key={index}
                  className="w-full origin-bottom animate-bar rounded-md bg-gradient-to-t from-cyan-500/40 to-violet-500/80"
                  style={{ height: `${height}%`, animationDelay: `${index * 70}ms` }}
                />
              ))}
            </div>
            <div className="mt-3 flex justify-between text-[10px] text-slate-600">
              {['W1', 'W2', 'W3', 'W4'].map((week) => <span key={week}>{week}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}