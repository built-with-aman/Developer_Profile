import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function useTypewriter(text, { speed = 28, start = true, delay = 0 } = {}) {
  const reduced = usePrefersReducedMotion();
  const [out, setOut] = useState(reduced ? text : "");
  const [done, setDone] = useState(reduced);

  useEffect(() => {
    if (!start) return undefined;
    if (reduced) {
      setOut(text);
      setDone(true);
      return undefined;
    }
    setOut("");
    setDone(false);
    let i = 0;
    const t0 = setTimeout(() => {
      const id = setInterval(() => {
        i += 1;
        setOut(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(id);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(id);
    }, delay);
    return () => clearTimeout(t0);
  }, [text, speed, start, delay, reduced]);

  return { text: out, done };
}
