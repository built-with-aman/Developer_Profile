import { useEffect, useRef } from "react";
import { subscribePointer } from "@/lib/pointerBus";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * KineticHeadline — the headline has weight, and the cursor has mass.
 *
 * Every character measures its own horizontal distance to the pointer and
 * interpolates its variable-font weight (Syne, 400 → 800) plus a hair of
 * vertical lift. The result is a travelling swell through the word rather
 * than a hover state: letters ahead of the cursor are already thickening,
 * letters behind are still settling back down.
 *
 * This is only possible because index.html loads the *variable* axis
 * (wght@400..800) instead of four static cuts. In a black-and-white design
 * weight is the only accent you have, so it needs to be continuous.
 *
 * Per-character values are written straight to the DOM as CSS variables —
 * a 30-character headline would otherwise mean 1,800 React renders a second.
 */
export default function KineticHeadline({
  text,
  as: Tag = "h1",
  className = "",
  radius = 150,
  min = 500,
  max = 800,
  lift = 6,
}) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const host = ref.current;
    if (!host || reduced) return undefined;

    const chars = Array.from(host.querySelectorAll("[data-kc]"));
    if (!chars.length) return undefined;

    let boxes = [];
    const measure = () => {
      boxes = chars.map((el) => {
        const r = el.getBoundingClientRect();
        return { el, cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(host);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);

    // Let the font load before trusting the geometry.
    document.fonts?.ready?.then(measure).catch(() => {});

    const state = chars.map(() => 0);

    const unsub = subscribePointer(({ x, y, active }) => {
      for (let i = 0; i < boxes.length; i += 1) {
        const b = boxes[i];
        let target = 0;
        if (active) {
          const dx = b.cx - x;
          const dy = (b.cy - y) * 0.55; // vertical distance counts less
          target = Math.max(0, 1 - Math.hypot(dx, dy) / radius);
          target *= target; // tighten the falloff
        }
        const next = state[i] + (target - state[i]) * 0.2;
        state[i] = Math.abs(target - next) < 0.001 ? target : next;
        b.el.style.setProperty("--k", state[i].toFixed(3));
      }
    });

    return () => {
      unsub();
      ro.disconnect();
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [text, radius, reduced]);

  const lines = Array.isArray(text) ? text : [text];

  return (
    <Tag
      ref={ref}
      className={"kinetic " + className}
      style={{ "--kmin": min, "--kmax": max, "--klift": `${lift}px` }}
    >
      {lines.map((line, li) => (
        <span key={li} className="block">
          <span aria-hidden="true">
            {Array.from(line).map((ch, ci) => (
              <span key={`${li}-${ci}`} data-kc className="kinetic-char">
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </span>
          <span className="sr-only">{line}</span>
        </span>
      ))}
    </Tag>
  );
}
