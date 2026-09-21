import { useEffect, useRef, useState } from "react";

/**
 * Smoothed scroll velocity — clamped so skew never jumps wildly.
 */
export function useScrollVelocity() {
  const last = useRef({ y: 0, t: performance.now() });
  const smooth = useRef(0);
  const [velocity, setVelocity] = useState(0);

  useEffect(() => {
    let raf = 0;
    let alive = true;

    const onScroll = () => {
      const now = performance.now();
      const y = window.scrollY;
      const dt = Math.max(8, now - last.current.t);
      const instant = (y - last.current.y) / dt;
      last.current = { y, t: now };
      // lerp toward instant, hard clamp
      smooth.current = smooth.current * 0.7 + instant * 0.3;
      smooth.current = Math.max(-1.2, Math.min(1.2, smooth.current));
      setVelocity(smooth.current);
    };

    const decay = () => {
      if (!alive) return;
      smooth.current *= 0.88;
      if (Math.abs(smooth.current) < 0.001) smooth.current = 0;
      setVelocity(smooth.current);
      raf = requestAnimationFrame(decay);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(decay);
    return () => {
      alive = false;
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return velocity;
}
