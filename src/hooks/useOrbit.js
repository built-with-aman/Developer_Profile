import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/** Point orbiting on a circle — for decorative nodes. */
export function useOrbit({ radius = 40, speed = 0.6, offset = 0 } = {}) {
  const reduced = usePrefersReducedMotion();
  const [pos, setPos] = useState({ x: radius, y: 0 });

  useEffect(() => {
    if (reduced) return undefined;
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const a = ((now - t0) / 1000) * speed + offset;
      setPos({ x: Math.cos(a) * radius, y: Math.sin(a) * radius });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [radius, speed, offset, reduced]);

  return pos;
}
