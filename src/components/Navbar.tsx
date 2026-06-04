import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { studio } from "../content";
import { useLanguage } from "../LanguageContext";

interface Props {
  visible: boolean;
}

export default function Navbar({ visible }: Props) {
  const navRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, t, toggle } = useLanguage();

  useEffect(() => {
    if (!visible) return;
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.2 },
    );
  }, [visible]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Animate drawer open/close
  useEffect(() => {
    if (!drawerRef.current) return;
    if (menuOpen) {
      gsap.fromTo(
        drawerRef.current,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
      );
    }
  }, [menuOpen]);

  // Close menu on link click
  const handleLinkClick = () => setMenuOpen(false);

  const navLinks = [
    { label: t.nav.projects, href: "#projetos" },
    { label: t.nav.studio, href: "#estudio" },
    { label: t.nav.services, href: "#servicos" },
    { label: t.nav.contact, href: "#contacto" },
  ];

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Navegação principal"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.5rem clamp(1.5rem, 5vw, 5.5rem)",
          opacity: 0,
          transition: "background 0.4s ease, backdrop-filter 0.4s ease",
          background:
            scrolled || menuOpen ? "rgba(10,10,10,0.96)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={handleLinkClick}
          aria-label={`${studio.name} - página inicial`}
          style={{
            fontFamily: '"Syne", sans-serif',
            fontWeight: 800,
            fontSize: "1.1rem",
            letterSpacing: "-0.04em",
            color: "#f5f0e8",
            zIndex: 1,
          }}
        >
          {studio.name}
        </a>

        {/* Desktop nav links */}
        <ul
          role="list"
          className="nav-desktop-links"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2.5rem",
            listStyle: "none",
          }}
        >
          {navLinks.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="nav-link"
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "0.78rem",
                  letterSpacing: "0.04em",
                  color: "#6b6b6b",
                  transition: "color 0.3s ease",
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side: lang toggle + hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          {/* Language toggle - always visible */}
          <button
            onClick={toggle}
            aria-label={
              lang === "pt" ? "Switch to English" : "Mudar para Português"
            }
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              padding: 0,
            }}
          >
            <span
              style={{
                fontFamily: '"Syne", sans-serif',
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: lang === "pt" ? "#f5f0e8" : "#4a4a4a",
                transition: "color 0.3s ease",
              }}
            >
              PT
            </span>
            <span style={{ color: "#2a2a2a", fontSize: "0.65rem" }}>/</span>
            <span
              style={{
                fontFamily: '"Syne", sans-serif',
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: lang === "en" ? "#f5f0e8" : "#4a4a4a",
                transition: "color 0.3s ease",
              }}
            >
              EN
            </span>
          </button>

          {/* Hamburger - mobile only */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            className="hamburger-btn"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              alignItems: "flex-end",
            }}
          >
            <span
              className={`ham-line ${menuOpen ? "ham-open-1" : ""}`}
              style={{
                display: "block",
                height: "1.5px",
                background: "#f5f0e8",
                width: "22px",
                transition: "transform 0.3s ease, opacity 0.3s ease",
              }}
            />
            <span
              className={`ham-line ${menuOpen ? "ham-open-2" : ""}`}
              style={{
                display: "block",
                height: "1.5px",
                background: "#f5f0e8",
                width: "14px",
                transition: "transform 0.3s ease, width 0.3s ease",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          ref={drawerRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 39,
            backgroundColor: "#0a0a0a",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 clamp(1.5rem, 8vw, 4rem)",
          }}
        >
          <ul
            role="list"
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "0",
            }}
          >
            {navLinks.map((item, i) => (
              <li key={item.href} style={{ borderBottom: "1px solid #1c1c1c" }}>
                <a
                  href={item.href}
                  onClick={handleLinkClick}
                  style={{
                    display: "block",
                    fontFamily: '"Syne", sans-serif',
                    fontWeight: 800,
                    fontSize: "clamp(2.2rem, 9vw, 4rem)",
                    letterSpacing: "-0.03em",
                    color: "#f5f0e8",
                    padding: "clamp(1rem, 2.5vw, 1.5rem) 0",
                    transition: "color 0.3s ease",
                  }}
                  className="drawer-link"
                >
                  <span
                    style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: "0.65rem",
                      letterSpacing: "0.12em",
                      color: "#c9a96e",
                      marginRight: "1rem",
                      verticalAlign: "middle",
                    }}
                  >
                    0{i + 1}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div
            style={{
              marginTop: "clamp(2rem, 5vw, 3rem)",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <span
              style={{
                display: "block",
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "#c9a96e",
              }}
            />
            <span
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#6b6b6b",
              }}
            >
              Porto, Portugal
            </span>
          </div>
        </div>
      )}

      <style>{`
        .nav-link:hover { color: #f5f0e8 !important; }
        .drawer-link:hover { color: #c9a96e !important; }
        .ham-open-1 { transform: translateY(6.5px) rotate(45deg) !important; }
        .ham-open-2 { transform: translateY(-6.5px) rotate(-45deg) !important; width: 22px !important; }

        /* Hide hamburger on desktop, hide desktop links on mobile */
        @media (min-width: 768px) {
          .hamburger-btn { display: none !important; }
        }
        @media (max-width: 767px) {
          .nav-desktop-links { display: none !important; }
        }
      `}</style>
    </>
  );
}
