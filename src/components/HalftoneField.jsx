import { useEffect, useRef } from "react";
import { subscribePointer } from "@/lib/pointerBus";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * HalftoneField — a printed halftone dot grid, revealed only around the cursor.
 *
 * The usual move here is a coloured radial glow, which a monochrome palette
 * can't have. So instead of light, this uses *ink*: a real dot screen at print
 * density, masked to a soft circle that follows the pointer. The dots get finer
 * toward the edge of the mask, so the page reads as paper being lit rather than
 * a gradient sitting on top of it.
 *
 * The mask position is a CSS variable updated on the shared rAF loop — the
 * component renders exactly once.
 */
export default function HalftoneField({ className = "", size = 11, reveal = 320, opacity = 0.5 }) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return undefined;

    let cur = { x: window.innerWidth / 2, y: window.innerHeight * 0.3 };

    const unsub = subscribePointer(({ x, y, active }) => {
      if (!active) return;
      cur = { x: cur.x + (x - cur.x) * 0.12, y: cur.y + (y - cur.y) * 0.12 };
      el.style.setProperty("--mx", `${cur.x}px`);
      el.style.setProperty("--my", `${cur.y}px`);
    });

    return unsub;
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className={"halftone pointer-events-none fixed inset-0 z-0 " + className}
      style={{ "--dot": `${size}px`, "--reveal": `${reveal}px`, "--ink": opacity }}
    />
  );
}
