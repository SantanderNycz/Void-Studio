import { useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import IntroAnimation from './components/IntroAnimation'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Services from './components/Services'
import About from './components/About'
import Footer from './components/Footer'

// Register GSAP plugins once at module level
gsap.registerPlugin(ScrollTrigger)

// Global ScrollTrigger defaults — no bounce, deliberate eases
ScrollTrigger.defaults({
  toggleActions: 'play none none none',
})

export default function App() {
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <>
      {/* Grain texture overlay — always on top */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Intro sequence */}
      {!introComplete && (
        <IntroAnimation onComplete={() => setIntroComplete(true)} />
      )}

      {/* Main site */}
      <div
        style={{
          // Prevent flash of content behind intro
          visibility: introComplete ? 'visible' : 'hidden',
        }}
      >
        <Navbar visible={introComplete} />

        <main>
          <Hero animate={introComplete} />
          <Projects />
          <Services />
          <About />
        </main>

        <Footer />
      </div>
    </>
  )
}
