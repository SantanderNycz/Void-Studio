import { useLayoutEffect, useRef, useState, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { studio } from '../content'
import { useLanguage } from '../LanguageContext'

// ─── EmailJS config ────────────────────────────────────────────────────────────
// 1. Create a free account at https://www.emailjs.com
// 2. Add a Gmail service → copy the Service ID below
// 3. Create an email template with variables {{from_name}}, {{from_email}}, {{message}}
//    and set "To Email" to santandernycz.ls@gmail.com → copy the Template ID below
// 4. Go to Account → API Keys → copy your Public Key below
const EMAILJS_SERVICE_ID  = 'service_2gf65lu'
const EMAILJS_TEMPLATE_ID = 'template_i5f1rdw'
const EMAILJS_PUBLIC_KEY  = 'hAFi5KXmkRyHiSmcZ'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)
  const { t, lang } = useLanguage()

  const navLinks = [
    { label: t.nav.projects, href: '#projetos' },
    { label: t.nav.services, href: '#servicos' },
    { label: t.nav.studio,   href: '#estudio'  },
    { label: t.nav.contact,  href: '#contacto' },
  ]

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      gsap.set([headingRef.current, formRef.current, infoRef.current], { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.set([headingRef.current, formRef.current, infoRef.current], { opacity: 0, y: 40 })

      gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      })
        .to(headingRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .to(formRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
        .to(infoRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.5')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError(false)
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current!,
        { publicKey: EMAILJS_PUBLIC_KEY }
      )
      setSent(true)
    } catch {
      setError(true)
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    fontFamily: '"Inter", sans-serif',
    fontSize: '0.9rem',
    color: '#f5f0e8',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid #1c1c1c',
    padding: '1.1rem 0',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  }

  return (
    <footer ref={sectionRef} id="contacto" style={{ backgroundColor: '#0a0a0a', borderTop: '1px solid #1c1c1c' }}>
      <div style={{ padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 5.5rem) clamp(3rem, 5vw, 5rem)' }}>
        {/* Heading */}
        <div ref={headingRef} style={{
          marginBottom: 'clamp(3rem, 5vw, 5rem)',
          paddingBottom: 'clamp(1.5rem, 2.5vw, 2rem)',
          borderBottom: '1px solid #1c1c1c',
          opacity: 0,
        }}>
          <span style={{
            display: 'block',
            fontFamily: '"Syne", sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(1.6rem, 3vw, 3rem)',
            letterSpacing: '-0.03em',
            color: '#f5f0e8',
            marginBottom: '0.6rem',
          }}>
            {t.footer.heading}
          </span>
          <a href={`mailto:${studio.email}`} style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.78rem',
            letterSpacing: '0.04em',
            color: '#6b6b6b',
            transition: 'color 0.3s ease',
          }} className="footer-email-link">
            {studio.email}
          </a>
        </div>

        {/* Form + info */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: 'clamp(3rem, 6vw, 6rem)',
        }}>
          {/* Form */}
          {!sent ? (
            <form ref={formRef} onSubmit={handleSubmit} style={{ opacity: 0 }} aria-label={lang === 'pt' ? 'Formulário de contacto' : 'Contact form'}>
              <input type="text" name="name" placeholder={t.footer.namePlaceholder} required style={inputStyle} className="footer-input" />
              <input type="email" name="email" placeholder={t.footer.emailPlaceholder} required style={inputStyle} className="footer-input" />
              <textarea name="message" placeholder={t.footer.messagePlaceholder} rows={4} required style={{ ...inputStyle, resize: 'none' }} className="footer-input" />
              <div style={{ marginTop: '2rem' }}>
                <button
                  type="submit"
                  disabled={submitting}
                  className="footer-submit"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '1rem',
                    background: 'none',
                    border: 'none',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    fontFamily: '"Syne", sans-serif',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: submitting ? '#4a4a4a' : '#f5f0e8',
                    padding: 0,
                    transition: 'color 0.3s ease',
                  }}
                >
                  {submitting ? t.footer.submitting : t.footer.submit}
                  <span className="footer-submit-line" style={{
                    display: 'block', height: '1px', width: '40px',
                    background: '#c9a96e', transition: 'width 0.4s ease',
                  }} />
                </button>
                {error && (
                  <p style={{
                    marginTop: '1rem',
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '0.8rem',
                    color: '#c0392b',
                  }}>
                    {t.footer.errorMsg}
                  </p>
                )}
              </div>
            </form>
          ) : (
            <div style={{ padding: '2rem 0' }}>
              <p style={{
                fontFamily: '"Syne", sans-serif',
                fontWeight: 600,
                fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
                color: '#f5f0e8',
                marginBottom: '0.75rem',
              }}>
                {t.footer.successTitle}
              </p>
              <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '0.9rem', color: '#6b6b6b' }}>
                {t.footer.successSub}
              </p>
            </div>
          )}

          {/* Studio info */}
          <div ref={infoRef} style={{ opacity: 0, display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div>
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase',
                color: '#4a4a4a', marginBottom: '0.9rem',
              }}>
                {t.footer.contactLabel}
              </p>
              <a href={`mailto:${studio.email}`} className="footer-email-link" style={{
                fontFamily: '"Syne", sans-serif', fontWeight: 600,
                fontSize: 'clamp(0.95rem, 1.6vw, 1.3rem)', color: '#f5f0e8',
                transition: 'color 0.3s ease', display: 'block', marginBottom: '0.5rem',
              }}>
                {studio.email}
              </a>
              <a href={`tel:${studio.phone.replace(/\s/g, '')}`} className="footer-phone-link" style={{
                fontFamily: '"Inter", sans-serif', fontSize: '0.85rem',
                color: '#6b6b6b', transition: 'color 0.3s ease',
              }}>
                {studio.phone}
              </a>
            </div>

            <div>
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase',
                color: '#4a4a4a', marginBottom: '0.9rem',
              }}>
                {t.footer.socialLabel}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {Object.entries(studio.social).map(([platform, url]) => (
                  <a key={platform} href={url} target="_blank" rel="noopener noreferrer"
                    className="footer-social-link"
                    style={{
                      fontFamily: '"Inter", sans-serif', fontSize: '0.85rem',
                      color: '#6b6b6b', textTransform: 'capitalize',
                      transition: 'color 0.3s ease', width: 'fit-content',
                    }}>
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom" style={{
        padding: '1.5rem clamp(1.5rem, 5vw, 5.5rem)',
        borderTop: '1px solid #1c1c1c',
      }}>
        <div className="footer-bottom-top" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
        }}>
          <span style={{
            fontFamily: '"Syne", sans-serif', fontWeight: 800,
            fontSize: '1rem', letterSpacing: '-0.04em', color: '#f5f0e8',
          }}>
            {studio.name}
          </span>

          <nav aria-label={lang === 'pt' ? 'Rodapé' : 'Footer'}>
            <ul role="list" style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}>
              {navLinks.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="footer-nav-link" style={{
                    fontFamily: '"Inter", sans-serif', fontSize: '0.75rem',
                    color: '#4a4a4a', letterSpacing: '0.04em', transition: 'color 0.3s ease',
                  }}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="footer-copyright" style={{
          marginTop: '1.25rem',
          textAlign: 'center',
        }}>
          <span style={{
            fontFamily: '"Inter", sans-serif', fontSize: '0.72rem',
            color: '#4a4a4a', letterSpacing: '0.04em',
          }}>
            © {new Date().getFullYear()} {studio.name}
          </span>
        </div>
      </div>

      <style>{`
        .footer-input:focus { border-bottom-color: #c9a96e !important; }
        .footer-submit:hover .footer-submit-line { width: 64px !important; }
        .footer-email-link:hover,
        .footer-phone-link:hover,
        .footer-social-link:hover,
        .footer-nav-link:hover { color: #f5f0e8 !important; }

        @media (max-width: 767px) {
          .footer-bottom-top { flex-wrap: wrap; gap: 1rem; }
          .footer-copyright { margin-top: 1rem; }
        }

        @media (min-width: 768px) {
          .footer-copyright { margin-top: 0.75rem; }
        }
      `}</style>
    </footer>
  )
}
