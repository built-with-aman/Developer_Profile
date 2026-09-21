import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789!@#$%";

export function useScramble(text, { trigger = "hover", duration = 400 } = {}) {
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(text);
  const raf = useRef(null);

  useEffect(() => {
    setDisplay(text);
  }, [text]);

  const run = useCallback(() => {
    if (reduced) return;
    cancelAnimationFrame(raf.current);
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const reveal = Math.floor(t * text.length);
      const next = text
        .split("")
        .map((ch, i) => {
          if (ch === " ") return " ";
          if (i < reveal) return text[i];
          return CHARS[(Math.random() * CHARS.length) | 0];
        })
        .join("");
      setDisplay(next);
      if (t < 1) raf.current = requestAnimationFrame(tick);
      else setDisplay(text);
    };
    raf.current = requestAnimationFrame(tick);
  }, [text, duration, reduced]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const bind =
    trigger === "hover"
      ? { onMouseEnter: run, onFocus: run }
      : {};

  return { display, run, bind };
}
