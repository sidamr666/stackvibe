import Icon from './Icons.jsx'

const tasks = [
  { label: 'Deploy backend', tag: 'Done', done: true },
  { label: 'Design review', tag: 'In progress', done: false },
  { label: 'Performance audit', tag: 'Queued', done: false },
]

export default function PhoneMockup({ className = '' }) {
  return (
    <div className={`relative mx-auto w-[236px] ${className}`}>
      <div aria-hidden="true" className="absolute -inset-8 rounded-full bg-gradient-to-tr from-cyan-500/20 via-indigo-500/10 to-fuchsia-500/20 blur-2xl" />
      <div className="relative rounded-[2.3rem] border border-white/12 bg-base-900/90 p-2.5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
        <div className="overflow-hidden rounded-[1.8rem] border border-white/[0.06] bg-gradient-to-b from-base-850 to-base-950">
          <div className="flex items-center justify-between px-5 pb-1 pt-3.5 text-[10px] font-medium text-slate-400">
            <span>9:41</span>
            <span className="flex items-center gap-1" aria-hidden="true">
              <span className="h-1.5 w-3 rounded-sm bg-slate-500" />
              <span className="h-1.5 w-3 rounded-sm bg-slate-500" />
              <span className="size-2 rounded-full bg-slate-500" />
            </span>
          </div>

          <div className="px-4 pb-4 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-500">Good morning</p>
                <p className="text-sm font-semibold text-white">Dashboard</p>
              </div>
              <span className="grid size-8 place-items-center rounded-full bg-gradient-to-tr from-cyan-400 to-violet-500 text-xs font-bold text-base-950">S</span>
            </div>

            <div className="mt-3 rounded-2xl bg-gradient-to-br from-indigo-500/30 via-violet-500/20 to-transparent p-3.5 ring-1 ring-white/10">
              <p className="text-[10px] text-slate-300/80">Today's focus</p>
              <p className="mt-1 text-lg font-semibold text-white">Ship v2.4</p>
              <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
                <span className="block h-full w-2/3 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400" />
              </div>
              <p className="mt-1.5 text-[10px] text-slate-300/70">6 / 9 tasks completed</p>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <div className="rounded-xl bg-white/[0.04] p-2.5 ring-1 ring-white/[0.06]">
                <span className="grid size-6 place-items-center rounded-lg bg-cyan-400/15 text-cyan-300"><Icon name="grid" className="size-3.5" /></span>
                <p className="mt-2 text-sm font-semibold text-white">128</p>
                <p className="text-[9px] text-slate-500">Events</p>
              </div>
              <div className="rounded-xl bg-white/[0.04] p-2.5 ring-1 ring-white/[0.06]">
                <span className="grid size-6 place-items-center rounded-lg bg-violet-400/15 text-violet-300"><Icon name="chart" className="size-3.5" /></span>
                <p className="mt-2 text-sm font-semibold text-white">+24%</p>
                <p className="text-[9px] text-slate-500">Growth</p>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              {tasks.map((task) => (
                <div key={task.label} className="flex items-center gap-2.5 rounded-xl bg-white/[0.03] p-2.5 ring-1 ring-white/[0.05]">
                  <span className={`grid size-5 place-items-center rounded-full ${task.done ? 'bg-emerald-400/20 text-emerald-300' : 'bg-white/10 text-slate-400'}`}>
                    {task.done ? <Icon name="check" className="size-3" /> : <span className="size-1.5 rounded-full bg-slate-400" />}
                  </span>
                  <span className="flex-1 text-[11px] font-medium text-slate-200">{task.label}</span>
                  <span className="text-[9px] text-slate-500">{task.tag}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-around rounded-2xl bg-white/[0.04] p-2 ring-1 ring-white/[0.06]">
              <span className="grid size-7 place-items-center rounded-lg bg-cyan-400/15 text-cyan-300"><Icon name="grid" className="size-3.5" /></span>
              <span className="grid size-7 place-items-center rounded-lg text-slate-500"><Icon name="chart" className="size-3.5" /></span>
              <span className="grid size-7 place-items-center rounded-lg text-slate-500"><Icon name="box" className="size-3.5" /></span>
              <span className="grid size-7 place-items-center rounded-lg text-slate-500"><Icon name="bolt" className="size-3.5" /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}