import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/** Smoothed mouse position (lerp) for silky parallax. */
export function useLerpMouse(lerp = 0.08) {
  const reduced = usePrefersReducedMotion();
  const target = useRef({ x: 0, y: 0 });
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduced) return undefined;
    const onMove = (e) => {
      target.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    let raf;
    const cur = { x: 0, y: 0 };
    const tick = () => {
      cur.x += (target.current.x - cur.x) * lerp;
      cur.y += (target.current.y - cur.y) * lerp;
      setPos({ x: cur.x, y: cur.y });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [lerp, reduced]);

  return pos;
}
