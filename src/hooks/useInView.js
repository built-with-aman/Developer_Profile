import { useEffect, useRef, useState } from "react";

export function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const { once = true, rootMargin = "0px 0px -10% 0px", threshold = 0.15 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once, rootMargin, threshold]);

  return [ref, inView];
}
