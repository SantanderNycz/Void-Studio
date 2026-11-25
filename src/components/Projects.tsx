import { useLayoutEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../content";
import { useLanguage } from "../LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const GOLD = "#c9a96e";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelImgRef = useRef<HTMLImageElement>(null);
  const rafRef = useRef(0);
  const posRef = useRef({ x: 0, y: 0 });

  const { t } = useLanguage();

  // Pointer / motion capabilities (client-only)
  const envRef = useRef<{ fine: boolean; reduce: boolean } | null>(null);
  if (envRef.current === null && typeof window !== "undefined") {
    envRef.current = {
      fine: window.matchMedia("(pointer: fine)").matches,
      reduce: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    };
  }

  const showPreview = useCallback((src: string, name: string) => {
    const img = panelImgRef.current;
    const panel = panelRef.current;
    if (!img || !panel) return;
    img.src = src;
    img.alt = `Screenshot — ${name}`;
    panel.classList.add("is-on");
  }, []);

  const hidePreview = useCallback(() => {
    panelRef.current?.classList.remove("is-on");
  }, []);

  const applyPos = useCallback(() => {
    rafRef.current = 0;
    const panel = panelRef.current;
    if (!panel) return;
    panel.style.left = `${posRef.current.x}px`;
    panel.style.top = `${posRef.current.y}px`;
  }, []);

  const movePreview = useCallback(
    (x: number, y: number) => {
      const panel = panelRef.current;
      if (!panel) return;
      // Reduced motion: pin to the right instead of following the cursor
      if (envRef.current?.reduce) {
        const w = Math.min(window.innerWidth * 0.42, 440);
        panel.style.left = `${window.innerWidth - w / 2 - 24}px`;
        panel.style.top = `${window.innerHeight / 2}px`;
        return;
      }
      posRef.current = { x, y };
      if (!rafRef.current) rafRef.current = requestAnimationFrame(applyPos);
    },
    [applyPos],
  );

  const onListMove = useCallback(
    (e: React.MouseEvent) => {
      if (envRef.current?.fine && !envRef.current?.reduce) {
        movePreview(e.clientX + 28, e.clientY);
      }
    },
    [movePreview],
  );

  // Heading reveal on scroll (unchanged motion language)
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

  useLayoutEffect(() => () => cancelAnimationFrame(rafRef.current), []);

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
          marginBottom: "clamp(2.5rem, 4vw, 4rem)",
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
            margin: 0,
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

      <div ref={listRef} className="pr-list" onMouseMove={onListMove} onMouseLeave={hidePreview}>
        {projects.map((project, i) => (
          <a
            key={project.id}
            className="pr-row"
            href={project.url ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} — ${project.category}, ${project.year}`}
            onMouseEnter={() => {
              if (envRef.current?.fine && project.image)
                showPreview(project.image, project.name);
            }}
            onMouseLeave={() => {
              if (envRef.current?.fine) hidePreview();
            }}
            onFocus={() => {
              if (project.image) showPreview(project.image, project.name);
              if (envRef.current?.reduce) movePreview(0, 0);
            }}
            onBlur={hidePreview}
          >
            <span className="pr-num">{project.id}</span>
            <span className="pr-body">
              <span className="pr-name">{project.name}</span>
              {t.projects.items[i]?.description && (
                <span className="pr-desc">{t.projects.items[i].description}</span>
              )}
            </span>
            <span className="pr-meta">
              <span className="pr-cat">{project.category}</span>
              <span className="pr-year">{project.year}</span>
            </span>
            {project.image && (
              <img
                className="pr-thumb"
                src={project.image}
                alt={`Screenshot do projeto ${project.name}`}
                loading="lazy"
                decoding="async"
              />
            )}
          </a>
        ))}
      </div>

      {/* Floating preview — desktop hover / keyboard focus */}
      <div ref={panelRef} className="pr-preview" aria-hidden="true">
        <div className="pr-mock">
          <div className="pr-bar">
            <i />
            <i />
            <i />
          </div>
          <img ref={panelImgRef} alt="" />
        </div>
      </div>

      <style>{`
        .pr-list { border-top: 1px solid rgba(245,240,232,0.22); }

        .pr-row {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: baseline;
          gap: clamp(1rem, 3vw, 2.5rem);
          padding-block: clamp(1rem, 2.4vw, 1.7rem);
          border-bottom: 1px solid rgba(245,240,232,0.10);
          text-decoration: none;
          color: inherit;
          position: relative;
          outline: none;
          transition: opacity 0.25s ease-out;
        }
        .pr-num {
          font-family: "Syne", sans-serif;
          font-weight: 600;
          font-size: 0.8rem;
          letter-spacing: 0.08em;
          color: ${GOLD};
        }
        .pr-body {
          display: flex; flex-direction: column; gap: 0.5rem; min-width: 0;
          transition: transform 0.25s ease-out; transform-origin: left center;
        }
        .pr-row:hover .pr-body,
        .pr-row:focus-visible .pr-body { transform: translateX(10px); }
        .pr-desc {
          font-family: "Onest", sans-serif;
          font-size: clamp(0.78rem, 1.1vw, 0.9rem);
          line-height: 1.5;
          color: #7a7a7a;
          max-width: 46ch;
          transition: color 0.25s ease-out;
        }
        .pr-row:hover .pr-desc,
        .pr-row:focus-visible .pr-desc { color: #a8a8a8; }
        .pr-name {
          font-family: "Syne", sans-serif;
          font-weight: 800;
          letter-spacing: -0.02em;
          font-size: clamp(1.5rem, 4.6vw, 3rem);
          line-height: 1;
          color: #f5f0e8;
          transition: transform 0.25s ease-out, color 0.25s ease-out;
          transform-origin: left center;
        }
        .pr-meta { display: flex; gap: 1.1rem; align-items: baseline; white-space: nowrap; }
        .pr-cat {
          font-family: "Onest", sans-serif;
          font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; color: #6b6b6b;
        }
        .pr-year { font-family: "Onest", sans-serif; font-size: 0.72rem; color: #3a3a3a; }

        /* dim the siblings of the active row */
        .pr-list:hover .pr-row:not(:hover),
        .pr-list:focus-within .pr-row:not(:focus-visible) { opacity: 0.38; }
        .pr-row:hover .pr-name,
        .pr-row:focus-visible .pr-name { color: #ffffff; }
        .pr-row:focus-visible { outline: 1px solid ${GOLD}; outline-offset: 6px; border-radius: 2px; }

        /* floating preview panel */
        .pr-preview {
          position: fixed; top: 0; left: 0; z-index: 50;
          width: min(67vw, 704px);
          pointer-events: none; opacity: 0; visibility: hidden;
          transform: translate(-50%, -50%) scale(0.96);
          transition: opacity 0.22s ease-out, transform 0.22s ease-out;
          will-change: transform;
        }
        .pr-preview.is-on { opacity: 1; visibility: visible; transform: translate(-50%, -50%) scale(1); }
        .pr-mock {
          background: #141210;
          border: 1px solid rgba(245,240,232,0.22);
          border-radius: 10px; overflow: hidden;
          box-shadow: 0 30px 70px rgba(0,0,0,0.6), 0 6px 18px rgba(0,0,0,0.4);
        }
        .pr-bar {
          display: flex; align-items: center; gap: 6px;
          padding: 9px 12px; background: #1c1916;
          border-bottom: 1px solid rgba(245,240,232,0.10);
        }
        .pr-bar i { width: 9px; height: 9px; border-radius: 50%; background: #3a352e; display: block; }
        .pr-bar i:nth-child(1) { background: #5c4a2e; }
        .pr-mock img { display: block; width: 100%; height: auto; }

        /* inline thumbnail — mobile only */
        .pr-thumb {
          display: none; grid-column: 1 / -1;
          width: 100%; height: auto; border-radius: 6px; margin-top: 1rem;
          border: 1px solid rgba(245,240,232,0.10);
          box-shadow: 0 14px 30px rgba(0,0,0,0.45);
        }

        @media (max-width: 767px) {
          .pr-row { grid-template-columns: auto 1fr; }
          .pr-meta { grid-column: 2; margin-top: 0.3rem; }
          .pr-thumb { display: block; }
          .pr-preview { display: none; }
          .pr-list:hover .pr-row:not(:hover) { opacity: 1; }
          .pr-row:hover .pr-body { transform: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .pr-row, .pr-name, .pr-body, .pr-preview { transition: opacity 0.2s ease-out; }
          .pr-row:hover .pr-body, .pr-row:focus-visible .pr-body { transform: none; }
          .pr-preview, .pr-preview.is-on { transform: translate(-50%, -50%); }
        }
      `}</style>
    </section>
  );
}
