import GlowBackground from './components/GlowBackground.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import TechMarquee from './components/TechMarquee.jsx'
import ServicesSection from './components/ServicesSection.jsx'
import ProcessSection from './components/ProcessSection.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-cyan-400 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-base-950"
      >
        Skip to content
      </a>
      <GlowBackground />
      <Header />
      <main id="home">
        <Hero />
        <TechMarquee />
        <ServicesSection />
        <ProcessSection />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}