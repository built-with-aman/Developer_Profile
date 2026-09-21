import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Continuous sin/cos oscillator for organic motion.
 * Returns { x, y, s } scaled by amplitude.
 */
export function useTrigonometric({
  speed = 1,
  ampX = 8,
  ampY = 6,
  phase = 0,
} = {}) {
  const reduced = usePrefersReducedMotion();
  const [vals, setVals] = useState({ x: 0, y: 0, s: 1 });

  useEffect(() => {
    if (reduced) return undefined;
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const t = ((now - t0) / 1000) * speed + phase;
      setVals({
        x: Math.sin(t) * ampX,
        y: Math.cos(t * 0.85) * ampY,
        s: 1 + Math.sin(t * 0.5) * 0.02,
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed, ampX, ampY, phase, reduced]);

  return vals;
}
