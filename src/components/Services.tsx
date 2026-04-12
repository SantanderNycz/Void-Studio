import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services } from '../content'

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      gsap.set([headingRef.current, ...itemsRef.current], { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(headingRef.current, { opacity: 0, y: 40 })
      gsap.set(itemsRef.current, { opacity: 0, y: 50 })

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      })
      .to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
      .to(itemsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.14,
        ease: 'power2.out',
      }, '-=0.4')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

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
      {/* Header */}
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
        <span style={{
          fontFamily: '"Syne", sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(1.6rem, 3vw, 3rem)',
          letterSpacing: '-0.03em',
          color: '#f5f0e8',
        }}>
          Serviços
        </span>
        <span style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '0.7rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#4a4a4a',
        }}>
          O que fazemos
        </span>
      </div>

      {/* Service items */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
        gap: '0',
      }}>
        {services.map((service, i) => (
          <div
            key={service.number}
            ref={(el) => { itemsRef.current[i] = el }}
            className="service-item"
            style={{
              opacity: 0,
              paddingTop: 'clamp(2rem, 3.5vw, 3.5rem)',
              paddingBottom: 'clamp(2rem, 3.5vw, 3.5rem)',
              paddingLeft: i === 0 ? '0' : 'clamp(2rem, 3.5vw, 3.5rem)',
              paddingRight: i === services.length - 1 ? '0' : 'clamp(2rem, 3.5vw, 3.5rem)',
              borderRight: i < services.length - 1 ? '1px solid #1c1c1c' : 'none',
            }}
          >
            <span style={{
              display: 'block',
              fontFamily: '"Syne", sans-serif',
              fontWeight: 500,
              fontSize: '0.68rem',
              letterSpacing: '0.14em',
              color: '#c9a96e',
              marginBottom: 'clamp(1.5rem, 2.5vw, 2.5rem)',
            }}>
              {service.number}
            </span>

            <h3 style={{
              fontFamily: '"Syne", sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(1.6rem, 3vw, 2.8rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: '#f5f0e8',
              marginBottom: 'clamp(1rem, 1.8vw, 1.5rem)',
            }}>
              {service.title}
            </h3>

            <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 'clamp(0.85rem, 1.05vw, 0.95rem)',
              color: '#6b6b6b',
              lineHeight: 1.7,
              marginBottom: 'clamp(1.5rem, 2.5vw, 2.5rem)',
            }}>
              {service.description}
            </p>

            {/* Animated bottom line on hover */}
            <div
              className="service-hover-line"
              style={{ height: '1px', background: '#c9a96e', width: '0', transition: 'width 0.5s ease' }}
              aria-hidden="true"
            />
          </div>
        ))}
      </div>

      <style>{`
        .service-item:hover .service-hover-line { width: 100% !important; }
      `}</style>
    </section>
  )
}
