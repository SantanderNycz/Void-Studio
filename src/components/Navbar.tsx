import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { studio } from '../content'
import { useLanguage } from '../LanguageContext'

interface Props {
  visible: boolean
}

export default function Navbar({ visible }: Props) {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const { lang, t, toggle } = useLanguage()

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

  const navLinks = [
    { label: t.nav.projects, href: '#projetos' },
    { label: t.nav.services, href: '#servicos' },
    { label: t.nav.studio,   href: '#estudio'  },
    { label: t.nav.contact,  href: '#contacto' },
  ]

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
      {/* Logo */}
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

      {/* Nav links */}
      <ul
        role="list"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2.5rem',
          listStyle: 'none',
        }}
      >
        {navLinks.map((item) => (
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

      {/* Language toggle */}
      <button
        onClick={toggle}
        aria-label={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: 0,
        }}
      >
        <span
          style={{
            fontFamily: '"Syne", sans-serif',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: lang === 'pt' ? '#f5f0e8' : '#4a4a4a',
            transition: 'color 0.3s ease',
          }}
        >
          PT
        </span>
        <span style={{ color: '#2a2a2a', fontSize: '0.65rem' }}>/</span>
        <span
          style={{
            fontFamily: '"Syne", sans-serif',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: lang === 'en' ? '#f5f0e8' : '#4a4a4a',
            transition: 'color 0.3s ease',
          }}
        >
          EN
        </span>
      </button>

      <style>{`.nav-link:hover { color: #f5f0e8 !important; }`}</style>
    </nav>
  )
}
