import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../content";
import { useLanguage } from "../LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const GRADIENTS = [
  "linear-gradient(160deg, #241a10 0%, #100c07 100%)", // Fernanda Garcia
  "linear-gradient(160deg, #3a2616 0%, #1a0e08 100%)", // Casa Santé
  "linear-gradient(160deg, #0d1a2e 0%, #060e1a 100%)", // Bikcraft
  "linear-gradient(160deg, #0d1520 0%, #070b10 100%)", // Léo Nycz
  "linear-gradient(160deg, #2a1208 0%, #140901 100%)", // Vitor Sampaio
  "linear-gradient(160deg, #231c18 0%, #110e0b 100%)", // Le Clarté
  "linear-gradient(160deg, #1e1208 0%, #0d0804 100%)", // Dogs
  "linear-gradient(160deg, #0a1f14 0%, #060f0a 100%)", // Licittare
  "linear-gradient(160deg, #2a1c00 0%, #110c00 100%)", // Duck Shop
];

const ACCENT_COLORS = ["#8B6E45", "#8B5E3C", "#2A4A7A", "#1A3A6A", "#8B5A3C", "#B8906A", "#5C3D1E", "#1A5C38", "#8B6914"];

/**
 * How many tabs the stack may grow to before it stops offsetting.
 * Cards past this index all pin at the same spot, so older tabs tuck away
 * behind the active card. Without a cap, 8 accumulated tabs (~350px) plus the
 * navbar offset overflow the viewport on shorter laptop screens.
 */
const STACK_CAP = 4;

/**
 * One card in the stack.
 *
 * Each card is `position: sticky` with a `top` offset of `index × --tab-h`,
 * so as you scroll the cards pile up — every card that has been passed stays
 * pinned as a thin tab, and the incoming card slides over it. This is native
 * sticky behaviour, so scrolling back up unwinds the stack automatically and
 * it works with JS disabled.
 */
function ProjectCard({
  project,
  index,
  gradient,
  accentColor,
  description,
  ctaLabel,
}: {
  project: (typeof projects)[number];
  index: number;
  gradient: string;
  accentColor: string;
  description: string;
  ctaLabel: string;
}) {
  return (
    <article
      className="stack-card"
      style={{
        top: `calc(var(--stack-offset) + ${Math.min(index, STACK_CAP)} * var(--tab-h))`,
        zIndex: index + 1,
        background: gradient,
        borderTop: `2px solid ${accentColor}`,
      }}
    >
      {/* Tab — the only strip that stays visible once the card is covered */}
      <header className="stack-tab">
        <span className="stack-num" style={{ color: accentColor }}>
          {project.id}
        </span>
        <h3 className="stack-name">{project.name}</h3>
        <span className="stack-cat">{project.category}</span>
        <span className="stack-year">{project.year}</span>
      </header>

      {/* Body — revealed while this card is the active one */}
      <div className="stack-body">
        {project.image && (
          <img
            className="stack-img"
            src={project.image}
            alt={`${project.name} — ${project.category}, ${project.year}`}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        )}
        <div className="stack-scrim" />

        <div className="stack-meta">
          <p className="stack-desc">{description}</p>
          <a
            href={project.url ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            {ctaLabel}
            <span
              className="project-link-line"
              style={{ background: accentColor }}
            />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      gsap.set(headingRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(headingRef.current, { opacity: 0, y: 40 });
      gsap.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projetos"
      style={{
        backgroundColor: "#0a0a0a",
        padding: "clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 5.5rem)",
      }}
    >
      <div
        ref={headingRef}
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "clamp(3rem, 5vw, 5rem)",
          opacity: 0,
        }}
      >
        <h2
          style={{
            fontFamily: '"Syne", sans-serif',
            fontWeight: 800,
            fontSize: "clamp(1.6rem, 3vw, 3rem)",
            letterSpacing: "-0.03em",
            color: "#f5f0e8",
          }}
        >
          {t.projects.heading}
        </h2>
        <span
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: "0.7rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#4a4a4a",
          }}
        >
          ({projects.length.toString().padStart(2, "0")}) {t.projects.label}
        </span>
      </div>

      <div className="stack">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            gradient={GRADIENTS[i] ?? GRADIENTS[0]}
            accentColor={ACCENT_COLORS[i] ?? ACCENT_COLORS[0]}
            description={
              t.projects.items[i]?.description ?? project.description
            }
            ctaLabel={t.projects.cta}
          />
        ))}
      </div>

      {/* Trailing space so the last card can settle before the next section */}
      <div style={{ height: "10vh" }} />

      <style>{`
        .stack {
          /* Tab scales with viewport height: on short screens it shrinks so the
             accumulated stack never crowds out the active card. */
          --tab-h: clamp(44px, 5.5vh, 60px);
          --stack-cap: ${STACK_CAP};
          /* The navbar is fixed and always visible, so the stack pins below it
             instead of at top:0 — otherwise the first tab slides under it. */
          --nav-h: 74px;
          --stack-offset: calc(var(--nav-h) + 0.5rem);
        }

        .stack-card {
          position: sticky;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border-radius: 4px;
          /* Card shrinks as the stack grows so the whole pile stays on screen */
          height: clamp(
            280px,
            calc(
              100svh - var(--stack-offset) -
              var(--stack-cap) * var(--tab-h) - 2rem
            ),
            560px
          );
          box-shadow: 0 -12px 40px rgba(0, 0, 0, 0.55);
        }

        /* ── Tab ───────────────────────────────────────────────── */
        .stack-tab {
          flex: 0 0 var(--tab-h);
          display: flex;
          align-items: center;
          gap: clamp(0.9rem, 2vw, 2rem);
          padding: 0 clamp(1rem, 2.5vw, 2rem);
        }
        .stack-num {
          font-family: "Syne", sans-serif;
          font-weight: 500;
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          flex-shrink: 0;
        }
        .stack-name {
          font-family: "Syne", sans-serif;
          font-weight: 800;
          font-size: clamp(1.1rem, 2.2vw, 1.9rem);
          letter-spacing: -0.02em;
          color: #f5f0e8;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-right: auto;
        }
        .stack-cat, .stack-year {
          font-family: "Inter", sans-serif;
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #6b6b6b;
          flex-shrink: 0;
        }
        .stack-year { color: #4a4a4a; }

        /* ── Body ──────────────────────────────────────────────── */
        .stack-body {
          position: relative;
          flex: 1 1 auto;
          min-height: 0;
        }
        .stack-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          display: block;
        }
        .stack-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(10, 10, 10, 0.62) 0%,
            rgba(10, 10, 10, 0.22) 42%,
            rgba(10, 10, 10, 0) 72%
          );
        }
        .stack-meta {
          position: absolute;
          left: clamp(1rem, 2.5vw, 2rem);
          right: clamp(1rem, 2.5vw, 2rem);
          bottom: clamp(1rem, 2.5vw, 1.8rem);
          display: flex;
          flex-direction: column;
          gap: clamp(0.8rem, 1.5vw, 1.2rem);
          align-items: flex-start;
          /* Frosted panel: keeps the copy readable over any thumbnail
             without darkening the whole image. */
          padding: clamp(0.9rem, 1.8vw, 1.3rem) clamp(1rem, 2vw, 1.5rem);
          border-radius: 3px;
          background: rgba(12, 12, 12, 0.42);
          -webkit-backdrop-filter: blur(16px) saturate(120%);
          backdrop-filter: blur(16px) saturate(120%);
          border: 1px solid rgba(245, 240, 232, 0.08);
        }
        .stack-desc {
          font-family: "Inter", sans-serif;
          font-size: clamp(0.85rem, 1.1vw, 0.95rem);
          color: #c4c4c4;
          line-height: 1.6;
          max-width: 46ch;
        }

        .project-link {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          font-family: "Syne", sans-serif;
          font-weight: 600;
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #f5f0e8;
        }
        .project-link-line {
          display: block;
          height: 1px;
          width: 36px;
          transition: width 0.4s ease;
        }
        .project-link:hover .project-link-line { width: 56px; }

        /* ── Mobile ────────────────────────────────────────────── */
        @media (max-width: 767px) {
          .stack { --tab-h: clamp(42px, 5vh, 52px); }
          .stack-cat, .stack-year { display: none; }
          .stack-desc {
            font-size: 0.82rem;
            -webkit-line-clamp: 3;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }

        /* ── Reduced motion: no stacking, plain vertical list ──── */
        @media (prefers-reduced-motion: reduce) {
          .stack-card {
            position: static;
            height: auto;
            min-height: 340px;
            margin-bottom: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
