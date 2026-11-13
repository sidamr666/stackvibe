import GlowBackground from '../components/GlowBackground.jsx'
import Icon from '../components/Icons.jsx'

export default function NotFoundPage() {
  return (
    <>
      <GlowBackground />
      <main className="flex min-h-[100dvh] flex-col items-center justify-center px-5 text-center">
        <p className="text-gradient text-[7rem] font-bold leading-none sm:text-[10rem]" aria-hidden="true">404</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">This page drifted out of orbit</h1>
        <p className="mt-3 max-w-md text-slate-600">The page you're looking for doesn't exist or has moved. Let's get you back home.</p>
        <a href="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800">
          <Icon name="arrowRight" className="size-4 rotate-180" />
          Back to StackVibe
        </a>
      </main>
    </>
  )
}