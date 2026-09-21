import { useEffect, useRef } from "react";
import { subscribePointer } from "@/lib/pointerBus";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * useProximity — continuous cursor-distance falloff, NOT a hover state.
 *
 * A row does not wait to be hovered. It responds the moment the cursor is
 * *near* it, and the strength of that response is a function of distance.
 * The neighbouring rows respond too, more faintly — the way a macOS dock
 * behaves, applied to typography instead of icons.
 *
 * The normalised intensity (0 → 1) is written to a CSS custom property on the
 * element, so all the actual animation lives in CSS and React never re-renders.
 *
 *   const ref = useProximity({ radius: 220 });
 *   <div ref={ref} className="prox">…</div>
 *
 * CSS then reads var(--prox): font-weight, letter-spacing, rule width, opacity.
 */
export function useProximity({
  radius = 240,
  prop = "--prox",
  axis = "both", // "both" | "x" | "y" — "y" makes a vertical list ignore horizontal distance
  falloff = 1.8, // >1 tightens the curve so the effect stays local
  damping = 0.16, // lerp factor — lower is heavier / more liquid
} = {}) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (reduced) {
      el.style.setProperty(prop, "0");
      return undefined;
    }

    let rect = el.getBoundingClientRect();
    let current = 0;

    const remeasure = () => {
      rect = el.getBoundingClientRect();
    };

    const ro = new ResizeObserver(remeasure);
    ro.observe(el);
    window.addEventListener("scroll", remeasure, { passive: true });
    window.addEventListener("resize", remeasure);

    const unsub = subscribePointer(({ x, y, active }) => {
      let target = 0;

      if (active) {
        // Distance to the element's *edge*, not its centre — so a wide row
        // doesn't feel weaker than a narrow one.
        const dx = axis === "y" ? 0 : Math.max(rect.left - x, 0, x - rect.right);
        const dy = axis === "x" ? 0 : Math.max(rect.top - y, 0, y - rect.bottom);
        const dist = Math.hypot(dx, dy);
        target = Math.pow(Math.max(0, 1 - dist / radius), falloff);
      }

      const next = current + (target - current) * damping;
      current = Math.abs(target - next) < 0.0008 ? target : next;
      el.style.setProperty(prop, current.toFixed(4));
    });

    return () => {
      unsub();
      ro.disconnect();
      window.removeEventListener("scroll", remeasure);
      window.removeEventListener("resize", remeasure);
    };
  }, [radius, prop, axis, falloff, damping, reduced]);

  return ref;
}
