import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../content";
import { useLanguage } from "../LanguageContext";

gsap.registerPlugin(ScrollTrigger);

function lerpHex(a: string, b: string, t: number): string {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  const ch = pa.map((v, i) => Math.round(v + (pb[i] - v) * t));
  return "#" + ch.map((v) => v.toString(16).padStart(2, "0")).join("");
}

/** Even 0 → 1 ramp position for a given card index. */
const ramp = (i: number) =>
  projects.length === 1 ? 0 : i / (projects.length - 1);

/**
 * Card backgrounds: one warm-gold palette that starts at a near-black dark gold
 * (card 01) and lightens gradually to a muted mid-gold (last card). Kept dark
 * enough throughout that the light body text stays readable. Each card is a
 * soft vertical gradient (lighter top → darker bottom) built from two ramped
 * endpoints.
 */
const CARD_TOP_DARK = "#241a10"; // first card, top stop (matches the old bg)
const CARD_TOP_LIGHT = "#6a5230"; // last card, top stop
const CARD_BOT_DARK = "#100c07"; // first card, bottom stop
const CARD_BOT_LIGHT = "#453320"; // last card, bottom stop
const GRADIENTS = Array.from({ length: projects.length }, (_, i) => {
  const t = ramp(i);
  return `linear-gradient(160deg, ${lerpHex(CARD_TOP_DARK, CARD_TOP_LIGHT, t)} 0%, ${lerpHex(CARD_BOT_DARK, CARD_BOT_LIGHT, t)} 100%)`;
});

const ACCENT_COLORS = ["#8B6E45", "#8A7460", "#8B5E3C", "#2A4A7A", "#1A3A6A", "#8B5A3C", "#B8906A", "#5C3D1E", "#1A5C38", "#8B6914"];

/**
 * Tab colours: a gold → beige gradient across the whole stack, so the pile of
 * pinned tabs reads as one continuous ramp. Interpolated per index between a
 * deep gold (top) and a light beige (bottom).
 */
const TAB_GOLD = "#a67c3d"; // deep gold — first tab
const TAB_BEIGE = "#e7dcc2"; // light beige — last tab
const TAB_COLORS = Array.from({ length: projects.length }, (_, i) =>
  lerpHex(TAB_GOLD, TAB_BEIGE, ramp(i)),
);

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
  tabColor,
  description,
  ctaLabel,
}: {
  project: (typeof projects)[number];
  index: number;
  gradient: string;
  accentColor: string;
  tabColor: string;
  description: string;
  ctaLabel: string;
}) {
  return (
    <article
      className="stack-card"
      style={{
        top: `calc(var(--stack-offset) + ${index} * var(--tab-h))`,
        zIndex: index + 1,
        background: gradient,
      }}
    >
      {/* Tab — the only strip that stays visible once the card is covered */}
      <header className="stack-tab" style={{ background: tabColor }}>
        <span className="stack-num">{project.id}</span>
        <h3 className="stack-name">{project.name}</h3>
        <span className="stack-cat">{project.category}</span>
        <span className="stack-year">{project.year}</span>
      </header>

      {/* Body — revealed while this card is the active one.
          Split: text panel | full thumbnail. */}
      <div className="stack-body">
        <div className="stack-info">
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

        <div className="stack-media">
          {project.image && (
            <img
              className="stack-img"
              src={project.image}
              alt={`${project.name} - ${project.category}, ${project.year}`}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          )}
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
            fontFamily: '"Onest", sans-serif',
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
            tabColor={TAB_COLORS[i] ?? TAB_COLORS[0]}
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
          /* Every tab stays visible so the reader can jump back to any project,
             so the whole pile (${projects.length - 1} tabs) has to fit above the active card.
             The tab therefore scales hard with viewport height. */
          --tab-h: clamp(42px, 5.6vh, 66px);
          --stack-n: ${projects.length};
          /* The navbar is fixed and always visible, so the stack pins below it
             instead of at top:0 — otherwise the first tab slides under it. */
          --nav-h: 74px;
          --stack-offset: calc(var(--nav-h) + 0.5rem);
          /* Thumbnail aspect ratio (5:3). The media box matches it exactly so
             the whole image is shown with no cropping. */
          --img-ar: 5 / 3;
          /* Height the thumbnail may take once every tab is pinned. Because the
             image sits in a column (not full width) its width follows from this,
             so the whole card stays short enough to never be clipped. */
          --media-h: calc(
            100svh - var(--stack-offset) - var(--stack-n) * var(--tab-h) - 7rem
          );
        }

        .stack-card {
          position: sticky;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border-radius: 4px;
          height: auto;
          /* Fills the section content width, left-aligned with the rest of the
             site. The body keeps the thumbnail's 5:3 ratio, so the card is as
             tall as needed to show the whole image — no cropping. */
          width: 100%;
          box-shadow: 0 -12px 40px rgba(0, 0, 0, 0.55);
        }

        /* ── Tab ───────────────────────────────────────────────── */
        .stack-tab {
          flex: 0 0 var(--tab-h);
          display: flex;
          align-items: center;
          gap: clamp(0.9rem, 2vw, 2rem);
          padding: 0 clamp(1rem, 2.5vw, 2rem);
          /* Hairline to separate one gold tab from the next in the stack */
          border-top: 1px solid rgba(255, 255, 255, 0.22);
          box-shadow: inset 0 -1px 0 rgba(60, 40, 12, 0.18);
        }
        /* Dark ink for legibility on the light gold/beige tabs */
        .stack-num {
          font-family: "Syne", sans-serif;
          font-weight: 600;
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          color: rgba(40, 27, 8, 0.7);
          flex-shrink: 0;
        }
        .stack-name {
          font-family: "Syne", sans-serif;
          font-weight: 800;
          /* Scales with viewport *height* so it stays proportional to the tab */
          font-size: clamp(1.15rem, 2.7vh, 2.2rem);
          letter-spacing: -0.02em;
          color: #241a0a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-right: auto;
        }
        .stack-cat, .stack-year {
          font-family: "Onest", sans-serif;
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(40, 27, 8, 0.62);
          flex-shrink: 0;
        }
        .stack-year { color: rgba(40, 27, 8, 0.42); }

        /* ── Body: text panel | full thumbnail ─────────────────── */
        .stack-body {
          flex: none;
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: clamp(1.2rem, 3vw, 3rem);
          padding: clamp(1.3rem, 2.6vw, 2.2rem);
        }
        .stack-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: clamp(1rem, 2vw, 1.6rem);
          min-width: 0;
        }
        .stack-media {
          /* Sized by height so the image is always fully visible and the card
             stays short; width follows from the 5:3 ratio. */
          height: clamp(190px, var(--media-h), 460px);
          aspect-ratio: var(--img-ar);
          overflow: hidden;
          border-radius: 4px;
          flex-shrink: 0;
        }
        .stack-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }
        .stack-desc {
          font-family: "Onest", sans-serif;
          font-size: clamp(0.9rem, 1.15vw, 1.05rem);
          /* Warm light grey — kept bright enough to stay legible on the lighter
             gold cards at the end of the ramp. */
          color: #d6cfc3;
          line-height: 1.7;
          max-width: 48ch;
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
          .stack { --tab-h: clamp(40px, 5.2vh, 54px); }
          .stack-cat, .stack-year { display: none; }
          /* Single column: thumbnail on top, text below */
          .stack-body {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .stack-media {
            order: -1;
            height: auto;
            width: 100%;
          }
          .stack-desc {
            font-size: 0.86rem;
            -webkit-line-clamp: 4;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }

        /* ── Reduced motion: no stacking, plain vertical list ──── */
        @media (prefers-reduced-motion: reduce) {
          .stack-card {
            position: static;
            width: 100%;
            margin-bottom: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
