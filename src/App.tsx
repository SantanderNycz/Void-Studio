import { useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LanguageProvider } from './LanguageContext'
import IntroAnimation from './components/IntroAnimation'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Pricing from './components/Pricing'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.defaults({ toggleActions: 'play none none none' })

export default function App() {
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <LanguageProvider>
      {/* Grain texture overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {!introComplete && (
        <IntroAnimation onComplete={() => setIntroComplete(true)} />
      )}

      <div style={{ visibility: introComplete ? 'visible' : 'hidden' }}>
        <Navbar visible={introComplete} />

        <main>
          <Hero animate={introComplete} />
          <Projects />
          <About />
          <Pricing />
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  )
}
