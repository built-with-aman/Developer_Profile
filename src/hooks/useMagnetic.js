import { useRef, useState, useCallback } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function useMagnetic(strength = 0.3) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [transform, setTransform] = useState("translate3d(0,0,0)");

  const onMove = useCallback(
    (e) => {
      if (reduced || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      setTransform(`translate3d(${x}px, ${y}px, 0)`);
    },
    [strength, reduced]
  );
  const onLeave = useCallback(() => setTransform("translate3d(0,0,0)"), []);

  return { ref, style: { transform, transition: "transform 0.2s ease-out" }, onMove, onLeave };
}
