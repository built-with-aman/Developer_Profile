import { useEffect } from "react";
import { gsap } from "@/lib/gsap"; // ← your existing gsap setup
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function useGsapParallax(ref, { depth = 40 } = {}) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -depth / 10 },
        {
          yPercent: depth / 10,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [ref, depth, reduced]);
}