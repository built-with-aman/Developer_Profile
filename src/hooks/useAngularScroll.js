import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * One-shot angular reveal when element enters the viewport.
 * Fixed duration — NOT tied to scroll speed (fixes fast/slow inconsistency).
 *
 * curve only affects the *easing shape* of the timed animation, not scroll mapping.
 */
export function useAngularScroll({
  curve = "sin",
  maxRotate = 8,
  maxX = 40,
  maxY = 60,
  duration = 700,
  threshold = 0.15,
} = {}) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const played = useRef(false);
  const [style, setStyle] = useState(() =>
    reduced
      ? { opacity: 1, transform: "none" }
      : {
          opacity: 0,
          transform: `translate3d(${maxX}px, ${maxY}px, 0) rotate(${maxRotate}deg) scale(0.96)`,
        }
  );

  useEffect(() => {
    if (reduced) {
      setStyle({ opacity: 1, transform: "none" });
      return undefined;
    }
    const el = ref.current;
    if (!el) return undefined;

    const ease = (raw) => {
      if (curve === "sin") return Math.sin(raw * Math.PI * 0.5);
      if (curve === "cos") return 1 - Math.cos(raw * Math.PI * 0.5);
      if (curve === "easeArc") return raw * raw * (3 - 2 * raw);
      if (curve === "spiral") return Math.pow(Math.sin(raw * Math.PI * 0.5), 1.25);
      return raw;
    };

    const play = () => {
      if (played.current) return;
      played.current = true;
      const t0 = performance.now();
      let raf;
      const tick = (now) => {
        const raw = Math.min(1, (now - t0) / duration);
        const t = ease(raw);
        const rot = (1 - t) * maxRotate;
        const x = (1 - t) * maxX;
        const y = (1 - t) * maxY;
        const sc = 0.96 + t * 0.04;
        setStyle({
          opacity: t,
          transform: `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg) scale(${sc})`,
        });
        if (raw < 1) raf = requestAnimationFrame(tick);
        else
          setStyle({ opacity: 1, transform: "none" });
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    };

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [curve, maxRotate, maxX, maxY, duration, threshold, reduced]);

  return { ref, style };
}
