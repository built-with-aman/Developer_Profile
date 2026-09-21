import { useEffect, useState } from "react";
import { useInView } from "./useInView";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/** Reveals n items one-by-one when in view. Returns active count. */
export function useRevealSequence(count, { interval = 120, once = true } = {}) {
  const [ref, inView] = useInView({ once });
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(reduced ? count : 0);

  useEffect(() => {
    if (!inView) return undefined;
    if (reduced) {
      setActive(count);
      return undefined;
    }
    let i = 0;
    setActive(0);
    const id = setInterval(() => {
      i += 1;
      setActive(i);
      if (i >= count) clearInterval(id);
    }, interval);
    return () => clearInterval(id);
  }, [inView, count, interval, reduced]);

  return { ref, active, visible: (i) => i < active };
}
