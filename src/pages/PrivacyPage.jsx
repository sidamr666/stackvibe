import { privacySections, site } from '../data/site.js'
import GlowBackground from '../components/GlowBackground.jsx'
import Logo from '../components/Logo.jsx'
import Icon from '../components/Icons.jsx'
import Footer from '../components/Footer.jsx'

export default function PrivacyPage() {
  return (
    <>
      <GlowBackground />
      <header className="sticky top-0 z-50 border-b border-line bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-5">
          <a href="/" className="flex items-center gap-2.5" aria-label="StackVibe - home">
            <Logo className="size-8" />
            <span className="font-semibold tracking-tight text-ink">
              Stack<span className="text-gradient">Vibe</span>
            </span>
          </a>
          <a href="/" className="inline-flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-ink">
            <Icon name="arrowRight" className="size-4 rotate-180" />
            Back to home
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
        <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">Privacy Policy</h1>
        <p className="mt-3 text-sm text-slate-500">
          Last updated: {site.copyrightYear} &middot; {site.domain}
        </p>
        <div className="mt-12 space-y-10">
          {privacySections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold text-ink">{section.title}</h2>
              <p className="mt-3 leading-relaxed text-slate-600">{section.body}</p>
            </section>
          ))}
        </div>
      </main>

      <Footer basePath="/" />
    </>
  )
}