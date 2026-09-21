import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * One-shot clip reveal when in view — fixed duration, independent of scroll speed.
 */
export function useClipReveal({ shape = "wipe", duration = 800 } = {}) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const played = useRef(false);

  const open =
    shape === "circle"
      ? "circle(150% at 50% 50%)"
      : shape === "diamond"
        ? "polygon(50% -20%, 120% 50%, 50% 120%, -20% 50%)"
        : "inset(0 0% 0 0)";

  const closed =
    shape === "circle"
      ? "circle(0% at 50% 50%)"
      : shape === "diamond"
        ? "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)"
        : "inset(0 100% 0 0)";

  const [clip, setClip] = useState(reduced ? open : closed);

  useEffect(() => {
    if (reduced) {
      setClip(open);
      return undefined;
    }
    const el = ref.current;
    if (!el) return undefined;

    const play = () => {
      if (played.current) return;
      played.current = true;
      const t0 = performance.now();
      let raf;
      const tick = (now) => {
        const raw = Math.min(1, (now - t0) / duration);
        const e = raw * raw * (3 - 2 * raw);
        if (shape === "circle") setClip(`circle(${e * 120}% at 50% 50%)`);
        else if (shape === "diamond") {
          const s = e * 70;
          setClip(`polygon(50% ${50 - s}%, ${50 + s}% 50%, 50% ${50 + s}%, ${50 - s}% 50%)`);
        } else setClip(`inset(0 ${(1 - e) * 100}% 0 0)`);
        if (raw < 1) raf = requestAnimationFrame(tick);
        else setClip(open);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    };

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [shape, duration, reduced, open]);

  return { ref, style: { clipPath: clip } };
}
