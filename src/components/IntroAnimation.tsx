import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

interface Props {
  onComplete: () => void;
}

const LETTERS = ["V", "O", "I", "D"];

export default function IntroAnimation({ onComplete }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      onComplete();
      return;
    }

    document.body.classList.add("intro-active");

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.classList.remove("intro-active");
        onComplete();
      },
    });

    gsap.set(lettersRef.current, { yPercent: 110 });
    gsap.set(taglineRef.current, { opacity: 0, y: 16 });
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });

    tl.to(
      lettersRef.current,
      {
        yPercent: 0,
        duration: 1.05,
        stagger: 0.08,
        ease: "power3.out",
      },
      0.1,
    )
      .to(
        lineRef.current,
        {
          scaleX: 1,
          duration: 0.7,
          ease: "power2.out",
        },
        0.5,
      )
      .to(
        taglineRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        0.8,
      )
      .to(
        overlayRef.current,
        {
          yPercent: -100,
          duration: 1.0,
          ease: "power3.inOut",
        },
        2.1,
      );

    return () => {
      tl.kill();
      document.body.classList.remove("intro-active");
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a0a",
      }}
      aria-hidden="true"
    >
      {/* Letters */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: "0.04em" }}>
        {LETTERS.map((letter, i) => (
          <span
            key={letter}
            style={{ display: "block", overflow: "hidden", lineHeight: 1 }}
          >
            <span
              ref={(el) => {
                lettersRef.current[i] = el;
              }}
              style={{
                display: "block",
                fontFamily: '"Syne", sans-serif',
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "#f5f0e8",
                fontSize: "clamp(5rem, 18vw, 16rem)",
                lineHeight: 1,
              }}
            >
              {letter}
            </span>
          </span>
        ))}
      </div>

      {/* Underline */}
      <span
        ref={lineRef}
        style={{
          display: "block",
          height: "1px",
          background: "#c9a96e",
          marginTop: "0.75rem",
          width: "clamp(5rem, 18vw, 16rem)",
        }}
      />

      {/* Tagline */}
      <p
        ref={taglineRef}
        style={{
          marginTop: "1.5rem",
          fontFamily: '"Inter", sans-serif',
          color: "#6b6b6b",
          fontSize: "0.7rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
        }}
      >
        Fill the void.
      </p>
    </div>
  );
}
