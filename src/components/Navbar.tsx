import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { studio, nav } from '../content'

interface Props {
  visible: boolean
}

export default function Navbar({ visible }: Props) {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!visible) return
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.2 }
    )
  }, [visible])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      aria-label="Navegação principal"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.75rem clamp(1.5rem, 5vw, 5.5rem)',
        opacity: 0,
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
        background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
      }}
    >
      <a
        href="#"
        aria-label={`${studio.name} — página inicial`}
        style={{
          fontFamily: '"Syne", sans-serif',
          fontWeight: 800,
          fontSize: '1.1rem',
          letterSpacing: '-0.04em',
          color: '#f5f0e8',
        }}
      >
        {studio.name}
      </a>

      <ul
        role="list"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2.5rem',
          listStyle: 'none',
        }}
      >
        {nav.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="nav-link"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.78rem',
                letterSpacing: '0.04em',
                color: '#6b6b6b',
                transition: 'color 0.3s ease',
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <style>{`.nav-link:hover { color: #f5f0e8 !important; }`}</style>
    </nav>
  )
}
