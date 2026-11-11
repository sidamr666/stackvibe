export default function GlowBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-base-950" />
      <div className="absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(60%_100%_at_50%_0%,rgba(99,102,241,0.22),transparent_70%)]" />
      <div className="absolute -left-44 top-1/4 size-[560px] rounded-full bg-cyan-500/10 blur-[130px]" />
      <div className="absolute -right-40 top-[8%] size-[500px] rounded-full bg-fuchsia-500/10 blur-[140px]" />
      <div className="absolute bottom-0 left-1/2 h-[440px] w-[860px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[150px]" />
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-noise opacity-[0.035]" />
    </div>
  )
}