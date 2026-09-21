import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function useCountUp(target, { duration = 1200, suffix = "" } = {}) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || started.current) return;
        started.current = true;
        if (reduced) {
          setValue(target);
          return;
        }
        const t0 = performance.now();
        let raf;
        const tick = (now) => {
          const t = Math.min(1, (now - t0) / duration);
          setValue(Math.round((1 - Math.pow(1 - t, 3)) * target));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration, reduced]);

  return { ref, display: `${value}${suffix}` };
}
