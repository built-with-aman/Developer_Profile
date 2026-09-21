import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/** Animated border beam angle 0–360 for hover/focus frames. */
export function useBorderBeam({ running = true, speed = 40 } = {}) {
  const reduced = usePrefersReducedMotion();
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    if (reduced || !running) return undefined;
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      setAngle(((now - t0) / 1000) * speed % 360);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, speed, reduced]);

  return {
    angle,
    style: {
      background: `conic-gradient(from ${angle}deg, transparent 0deg, var(--fg) 60deg, transparent 120deg)`,
    },
  };
}
