import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { about, studio } from '../content'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([])
  const subRef = useRef<HTMLParagraphElement>(null)
  const locationRef = useRef<HTMLDivElement>(null)

  const words = about.text.split(' ')

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      gsap.set([...wordsRef.current, subRef.current, locationRef.current], { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(wordsRef.current, { opacity: 0, y: 18 })
      gsap.set(subRef.current, { opacity: 0, y: 12 })
      gsap.set(locationRef.current, { opacity: 0 })

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          toggleActions: 'play none none none',
        },
      })
      .to(wordsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.04,
        ease: 'power2.out',
      })
      .to(subRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.15')
      .to(locationRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.15')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="estudio"
      style={{
        backgroundColor: '#0a0a0a',
        borderTop: '1px solid #1c1c1c',
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 5.5rem)',
      }}
    >
      <div style={{ maxWidth: '56rem' }}>
        {/* Main quote — word by word */}
        <p
          style={{
            fontFamily: '"Syne", sans-serif',
            fontWeight: 600,
            fontSize: 'clamp(1.8rem, 4vw, 4.2rem)',
            lineHeight: 1.12,
            letterSpacing: '-0.025em',
            color: '#f5f0e8',
            marginBottom: 'clamp(2rem, 3.5vw, 3.5rem)',
          }}
          aria-label={about.text}
        >
          {words.map((word, i) => (
            <span
              key={i}
              style={{ display: 'inline-block', marginRight: '0.3em' }}
            >
              <span
                ref={(el) => { wordsRef.current[i] = el }}
                style={{ display: 'inline-block', opacity: 0 }}
              >
                {word}
              </span>
            </span>
          ))}
        </p>

        {/* Subtext */}
        <p
          ref={subRef}
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 'clamp(0.8rem, 1vw, 0.9rem)',
            color: '#6b6b6b',
            opacity: 0,
            marginBottom: 'clamp(2.5rem, 4vw, 4rem)',
          }}
        >
          {about.subtext}
        </p>

        {/* Location */}
        <div
          ref={locationRef}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            opacity: 0,
          }}
          aria-label={studio.location}
        >
          <span style={{
            display: 'block',
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: '#c9a96e',
            flexShrink: 0,
          }} aria-hidden="true" />
          <span style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.7rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#6b6b6b',
          }}>
            {studio.location}
          </span>
        </div>
      </div>
    </section>
  )
}
