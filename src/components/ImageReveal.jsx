import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Wraps media (or any block) with a one-time clip-path wipe on scroll-in
 * plus a continuous, subtle parallax drift while it's on screen. Purely a
 * wrapper — pass your usual className (e.g. "mb-6") to keep existing
 * spacing untouched; the clip/parallax happen on inner elements only.
 */
export default function ImageReveal({ children, className = "", parallax = 28 }) {
  const wrapRef = useRef(null);
  const innerRef = useRef(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      gsap.fromTo(
        wrapRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: wrapRef.current, start: "top 88%" },
        }
      );

      gsap.fromTo(
        innerRef.current,
        { y: -parallax, scale: 1.12 },
        {
          y: parallax,
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: wrapRef }
  );

  return (
    <div ref={wrapRef} className={"relative overflow-hidden " + className}>
      <div ref={innerRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
