import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../LanguageContext'

gsap.registerPlugin(ScrollTrigger)

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const ctaRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      gsap.set(
        [headingRef.current, ...cardsRef.current, ctaRef.current],
        { opacity: 1, y: 0 }
      )
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(headingRef.current, { opacity: 0, y: 40 })
      gsap.set(cardsRef.current, { opacity: 0, y: 50 })
      gsap.set(ctaRef.current, { opacity: 0, y: 20 })

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      })
        .to(headingRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .to(cardsRef.current, { opacity: 1, y: 0, duration: 0.75, stagger: 0.14, ease: 'power2.out' }, '-=0.4')
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const { packages, cta } = t.pricing

  const cardStyle = (i: number): React.CSSProperties => {
    if (i === 0) return { border: '1px solid #2a2a2a', backgroundColor: 'transparent' }
    if (i === 1) return { backgroundColor: '#0a0a0a', border: 'none' }
    return { border: '1px solid #2a2a2a', backgroundColor: 'transparent' }
  }

  return (
    <section
      ref={sectionRef}
      id="servicos"
      style={{
        backgroundColor: '#111111',
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 5.5rem)',
        borderTop: '1px solid #1c1c1c',
      }}
    >
      {/* Section header */}
      <div
        ref={headingRef}
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: 'clamp(3rem, 5vw, 5rem)',
          paddingBottom: 'clamp(1.5rem, 2.5vw, 2rem)',
          borderBottom: '1px solid #1c1c1c',
          opacity: 0,
        }}
      >
        <span
          style={{
            fontFamily: '"Syne", sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(1.6rem, 3vw, 3rem)',
            letterSpacing: '-0.03em',
            color: '#f5f0e8',
          }}
        >
          {t.pricing.heading}
        </span>
        <span
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.7rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#4a4a4a',
          }}
        >
          {t.pricing.label}
        </span>
      </div>

      {/* Package cards */}
      <div
        className="pricing-cards"
        style={{
          display: 'grid',
          gap: 'clamp(1.5rem, 3vw, 2rem)',
          marginBottom: 'clamp(3.5rem, 6vw, 6rem)',
        }}
      >
        {packages.map((pkg, i) => (
          <div
            key={i}
            ref={(el) => { cardsRef.current[i] = el }}
            style={{
              opacity: 0,
              padding: 'clamp(2rem, 3.5vw, 3rem)',
              ...cardStyle(i),
            }}
          >
            <span
              style={{
                display: 'block',
                fontFamily: '"Syne", sans-serif',
                fontWeight: 500,
                fontSize: '0.68rem',
                letterSpacing: '0.14em',
                color: '#c9a96e',
                marginBottom: 'clamp(1.25rem, 2vw, 1.75rem)',
              }}
            >
              {pkg.number}
            </span>

            <h3
              style={{
                fontFamily: '"Syne", sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)',
                letterSpacing: '-0.02em',
                color: '#f5f0e8',
                marginBottom: pkg.price ? 'clamp(1.5rem, 2.5vw, 2rem)' : 'clamp(2rem, 3vw, 2.5rem)',
              }}
            >
              {pkg.name}
            </h3>

            {pkg.price && (
              <div style={{ marginBottom: 'clamp(2rem, 3vw, 2.5rem)' }}>
                <span
                  style={{
                    display: 'block',
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '0.68rem',
                    letterSpacing: '0.08em',
                    color: '#4a4a4a',
                    marginBottom: '0.3rem',
                  }}
                >
                  {pkg.from}
                </span>
                <span
                  style={{
                    fontFamily: '"Syne", sans-serif',
                    fontWeight: 800,
                    fontSize: 'clamp(2.4rem, 5vw, 3.5rem)',
                    letterSpacing: '-0.04em',
                    color: '#f5f0e8',
                    lineHeight: 1,
                  }}
                >
                  {pkg.price}
                </span>
              </div>
            )}

            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {pkg.features.map((feature, fi) => (
                <li
                  key={fi}
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: 'clamp(0.78rem, 1vw, 0.85rem)',
                    color: '#6b6b6b',
                    lineHeight: 1.65,
                    padding: '0.6rem 0',
                    borderBottom:
                      fi < pkg.features.length - 1 ? '1px solid #1c1c1c' : 'none',
                  }}
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div
        ref={ctaRef}
        style={{
          opacity: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 'clamp(0.78rem, 1vw, 0.85rem)',
            color: '#4a4a4a',
            fontStyle: 'italic',
            margin: 0,
            letterSpacing: '0.01em',
          }}
        >
          {cta.note}
        </p>
        <a
          href="#contacto"
          className="pricing-cta-link"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontFamily: '"Syne", sans-serif',
            fontWeight: 600,
            fontSize: '0.75rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#f5f0e8',
            textDecoration: 'none',
          }}
        >
          {cta.button}
          <span
            className="pricing-cta-line"
            aria-hidden="true"
            style={{
              display: 'block',
              height: '1px',
              width: '36px',
              backgroundColor: '#c9a96e',
              transition: 'width 0.4s ease',
            }}
          />
        </a>
      </div>

      <style>{`
        .pricing-cards { grid-template-columns: 1fr; }
        @media (min-width: 900px) {
          .pricing-cards { grid-template-columns: repeat(3, 1fr); }
        }
        .pricing-cta-link:hover .pricing-cta-line { width: 56px !important; }
      `}</style>
    </section>
  )
}
