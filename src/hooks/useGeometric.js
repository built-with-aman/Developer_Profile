import { useEffect, useRef, useState, useCallback } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Maps pointer position over an element to geometric offsets:
 * rotateX/Y, scale, and normalized u/v in [-1, 1].
 */
export function useGeometric({ maxTilt = 12, scale = 1.02 } = {}) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [style, setStyle] = useState({
    transform: "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)",
    "--gx": "50%",
    "--gy": "50%",
  });

  const onMove = useCallback(
    (e) => {
      if (reduced || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const u = ((e.clientX - r.left) / r.width) * 2 - 1;
      const v = ((e.clientY - r.top) / r.height) * 2 - 1;
      const rx = (-v * maxTilt).toFixed(2);
      const ry = (u * maxTilt).toFixed(2);
      setStyle({
        transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`,
        "--gx": `${((u + 1) / 2) * 100}%`,
        "--gy": `${((v + 1) / 2) * 100}%`,
      });
    },
    [maxTilt, scale, reduced]
  );

  const onLeave = useCallback(() => {
    setStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)",
      "--gx": "50%",
      "--gy": "50%",
    });
  }, []);

  return { ref, style, onMove, onLeave };
}
