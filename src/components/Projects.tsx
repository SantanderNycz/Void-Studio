import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../content";
import { useLanguage } from "../LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const GRADIENTS = [
  "linear-gradient(160deg, #241a10 0%, #100c07 100%)",
  "linear-gradient(160deg, #3a2616 0%, #1a0e08 100%)",
  "linear-gradient(160deg, #0d1a2e 0%, #060e1a 100%)",
  "linear-gradient(160deg, #1e1208 0%, #0d0804 100%)",
  "linear-gradient(160deg, #0a1f14 0%, #060f0a 100%)",
  "linear-gradient(160deg, #2a1c00 0%, #110c00 100%)",
];

const ACCENT_COLORS = ["#8B6E45", "#8B5E3C", "#2A4A7A", "#5C3D1E", "#1A5C38", "#8B6914"];

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
  const cardRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const isEven = index % 2 === 0;

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      gsap.set([cardRef.current], { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(cardRef.current, { opacity: 0, y: 80 });
      gsap.set(imageRef.current, { scale: 1.04 });
      gsap.set(numberRef.current, { opacity: 0, x: isEven ? -20 : 20 });
      gsap.set([nameRef.current, detailRef.current], { opacity: 0, y: 30 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        })
        .to(cardRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
        })
        .to(
          imageRef.current,
          { scale: 1, duration: 1.2, ease: "power2.out" },
          0,
        )
        .to(
          numberRef.current,
          { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
          0.15,
        )
        .to(
          nameRef.current,
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          0.2,
        )
        .to(
          detailRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          0.35,
        );
    }, cardRef);

    return () => ctx.revert();
  }, [isEven]);

  return (
    <article
      ref={cardRef}
      style={{
        opacity: 0,
        borderTop: "1px solid #1c1c1c",
        padding: "clamp(3rem, 5vw, 5rem) 0",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isEven ? "1fr 1.1fr" : "1.1fr 1fr",
          gap: "clamp(2rem, 4vw, 5rem)",
          alignItems: "center",
        }}
      >
        {/* Info panel */}
        <div ref={infoRef} style={{ order: isEven ? 1 : 2 }}>
          <span
            ref={numberRef}
            style={{
              display: "block",
              fontFamily: '"Syne", sans-serif',
              fontWeight: 500,
              fontSize: "0.72rem",
              letterSpacing: "0.16em",
              color: "#c9a96e",
              marginBottom: "clamp(1.2rem, 2vw, 2rem)",
              opacity: 0,
            }}
          >
            {project.id}
          </span>

          <h3
            ref={nameRef}
            style={{
              fontFamily: '"Syne", sans-serif',
              fontWeight: 800,
              fontSize: "clamp(2.4rem, 5.5vw, 6rem)",
              lineHeight: 0.93,
              letterSpacing: "-0.03em",
              color: "#f5f0e8",
              marginBottom: "clamp(1.5rem, 2.5vw, 2.5rem)",
              opacity: 0,
            }}
          >
            {project.name}
          </h3>

          <div ref={detailRef} style={{ opacity: 0 }}>
            <p
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)",
                color: "#6b6b6b",
                lineHeight: 1.65,
                marginBottom: "clamp(2rem, 3vw, 3rem)",
                maxWidth: "38ch",
              }}
            >
              {description}
            </p>

            <a
              href={project.url ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "1rem",
                fontFamily: '"Syne", sans-serif',
                fontWeight: 600,
                fontSize: "0.72rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#f5f0e8",
              }}
            >
              {ctaLabel}
              <span
                className="project-link-line"
                style={{
                  display: "block",
                  height: "1px",
                  width: "36px",
                  background: "#c9a96e",
                  transition: "width 0.4s ease",
                }}
              />
            </a>
          </div>
        </div>

        {/* Image panel */}
        <div
          style={{
            order: isEven ? 2 : 1,
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          {/* Category tag - above the image, same row as number */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "0.68rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#6b6b6b",
              }}
            >
              {project.category}
            </span>
            <span
              style={{
                width: "1px",
                height: "10px",
                background: "#2a2a2a",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "0.68rem",
                color: "#4a4a4a",
              }}
            >
              {project.year}
            </span>
          </div>

          {/* Image */}
          <div
            style={{
              overflow: "hidden",
              aspectRatio: "16/9",
              position: "relative",
            }}
          >
            <div
              ref={imageRef}
              style={{
                width: "100%",
                height: "100%",
                background: gradient,
                transformOrigin: "center center",
                position: "relative",
              }}
            >
              {project.image && (
                <img
                  src={project.image}
                  alt={`${project.name} - preview`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              )}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: accentColor,
                  opacity: 0.5,
                }}
              />
            </div>
          </div>
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
        <span
          style={{
            fontFamily: '"Syne", sans-serif',
            fontWeight: 800,
            fontSize: "clamp(1.6rem, 3vw, 3rem)",
            letterSpacing: "-0.03em",
            color: "#f5f0e8",
          }}
        >
          {t.projects.heading}
        </span>
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

      <div>
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

      <style>{`.project-link:hover .project-link-line { width: 56px !important; }`}</style>
    </section>
  );
}
