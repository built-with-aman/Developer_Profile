import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * useScrollLit — how far a block has travelled through the reading zone,
 * as a 0 → 1 value written to a CSS custom property.
 *
 * This is deliberately NOT a reveal-on-enter. The value keeps updating for the
 * whole time the block is on screen, which lets CSS light individual words in
 * sequence as the reader scrolls, rather than fading a paragraph in as one lump.
 *
 * Driven by rAF-throttled scroll, reading layout once per frame at most.
 */
export function useScrollLit({ prop = "--lit", start = 0.85, end = 0.35 } = {}) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (reduced) {
      el.style.setProperty(prop, "1");
      return undefined;
    }

    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Fully unlit when the top edge sits at `start` of the viewport,
      // fully lit once the bottom edge has climbed past `end`.
      const from = vh * start;
      const to = vh * end - rect.height;
      const p = (from - rect.top) / Math.max(from - to, 1);
      el.style.setProperty(prop, Math.min(1, Math.max(0, p)).toFixed(4));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [prop, start, end, reduced]);

  return ref;
}
