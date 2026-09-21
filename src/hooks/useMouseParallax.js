import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/** Global mouse → parallax offsets (normalized). */
export function useMouseParallax(strength = 20) {
  const reduced = usePrefersReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduced) return undefined;
    const onMove = (e) => {
      const x = ((e.clientX / window.innerWidth) * 2 - 1) * strength;
      const y = ((e.clientY / window.innerHeight) * 2 - 1) * strength;
      setOffset({ x, y });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [strength, reduced]);

  return offset;
}
