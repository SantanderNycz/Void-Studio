import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { hero } from '../content'

interface Props {
  animate: boolean
}

export default function Hero({ animate }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const line0Ref = useRef<HTMLSpanElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!animate) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lines = [line0Ref.current, line1Ref.current, line2Ref.current]

    if (prefersReduced) {
      gsap.set([...lines, ctaRef.current, metaRef.current], { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      // Start invisible + shifted — no overflow clipping needed
      gsap.set(lines, { opacity: 0, y: 70 })
      gsap.set(ctaRef.current, { opacity: 0, y: 24 })
      gsap.set(metaRef.current, { opacity: 0 })

      gsap.timeline({ delay: 0.05 })
        .to(lines, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.11,
          ease: 'power3.out',
        })
        .to(ctaRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
        }, '-=0.55')
        .to(metaRef.current, {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        }, '-=0.4')
    }, sectionRef)

    return () => ctx.revert()
  }, [animate])

  const lineRefs = [line0Ref, line1Ref, line2Ref]

  return (
    <section
      ref={sectionRef}
      id="inicio"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(7rem, 12vw, 11rem) clamp(1.5rem, 5vw, 5.5rem) clamp(4rem, 8vw, 7rem)',
        backgroundColor: '#0a0a0a',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-15%',
          right: '-5%',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* Tagline — micro label */}
      <div
        ref={metaRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
          opacity: 0,
        }}
      >
        <span style={{
          display: 'block',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: '#c9a96e',
          flexShrink: 0,
        }} />
        <span style={{
          fontFamily: '"Inter", sans-serif',
          color: '#6b6b6b',
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}>
          Porto, Portugal — Estúdio Digital
        </span>
      </div>

      {/* Headline */}
      <h1 aria-label={hero.lines.join(' ')}>
        {hero.lines.map((line, i) => (
          <span
            key={i}
            ref={lineRefs[i]}
            style={{
              display: 'block',
              fontFamily: '"Syne", sans-serif',
              fontWeight: 800,
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
              fontSize: 'clamp(3.5rem, 9vw, 9.5rem)',
              color: i === hero.accentLineIndex ? '#c9a96e' : '#f5f0e8',
              opacity: 0,
            }}
          >
            {line}
          </span>
        ))}
      </h1>

      {/* CTA */}
      <div
        ref={ctaRef}
        style={{ marginTop: 'clamp(3rem, 5vw, 5rem)', opacity: 0 }}
      >
        <a
          href={hero.cta.href}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1.25rem',
            fontFamily: '"Syne", sans-serif',
            fontWeight: 600,
            fontSize: '0.78rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#f5f0e8',
          }}
          className="hero-cta-link"
        >
          {hero.cta.label}
          <span
            className="hero-cta-line"
            style={{
              display: 'block',
              height: '1px',
              width: '48px',
              background: '#c9a96e',
              transition: 'width 0.4s ease',
            }}
          />
        </a>
      </div>

      {/* Scroll hint */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(1.5rem, 3vw, 2.5rem)',
          left: 'clamp(1.5rem, 5vw, 5.5rem)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
        aria-hidden="true"
      >
        <span style={{
          fontFamily: '"Inter", sans-serif',
          color: '#4a4a4a',
          fontSize: '0.68rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
        }}>
          Scroll
        </span>
        <span style={{ display: 'block', width: '2rem', height: '1px', background: '#1c1c1c' }} />
      </div>

      {/* Year marker */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(1.5rem, 3vw, 2.5rem)',
          right: 'clamp(1.5rem, 5vw, 5.5rem)',
        }}
        aria-hidden="true"
      >
        <span style={{
          fontFamily: '"Inter", sans-serif',
          color: '#4a4a4a',
          fontSize: '0.68rem',
          letterSpacing: '0.12em',
        }}>
          © {new Date().getFullYear()}
        </span>
      </div>
    </section>
  )
}

// Hover style via a <style> tag to avoid inline limitations
const style = document.createElement('style')
style.textContent = `
  .hero-cta-link:hover .hero-cta-line { width: 72px !important; }
`
document.head.appendChild(style)
