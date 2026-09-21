import { useCallback, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/** Local radial glow that follows pointer inside an element. */
export function usePointerGlow() {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [bg, setBg] = useState("transparent");

  const onMove = useCallback(
    (e) => {
      if (reduced || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      setBg(
        `radial-gradient(400px circle at ${x}px ${y}px, color-mix(in srgb, var(--fg) 8%, transparent), transparent 55%)`
      );
    },
    [reduced]
  );
  const onLeave = useCallback(() => setBg("transparent"), []);

  return {
    ref,
    style: { backgroundImage: bg, transition: "background 0.2s ease" },
    onMove,
    onLeave,
  };
}
