export default function GlowBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(60%_100%_at_50%_0%,rgba(79,70,229,0.10),transparent_70%)]" />
      <div className="absolute -left-44 top-1/4 size-[560px] rounded-full bg-cyan-500/[0.06] blur-[130px]" />
      <div className="absolute -right-40 top-[8%] size-[500px] rounded-full bg-violet-500/[0.06] blur-[140px]" />
      <div className="absolute bottom-0 left-1/2 h-[440px] w-[860px] -translate-x-1/2 rounded-full bg-indigo-500/[0.05] blur-[150px]" />
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute inset-0 bg-noise opacity-[0.02]" />
    </div>
  )
}
