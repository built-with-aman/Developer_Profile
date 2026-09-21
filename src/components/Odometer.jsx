import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

/**
 * Odometer — a split-flap / mechanical counter, not a count-up.
 *
 * A count-up just renders increasing numbers, which reads as a loading state.
 * Here each digit column is a physical strip of 0–9 that rolls into place, and
 * the columns are staggered right-to-left so the ones settle last — the way a
 * real mechanical counter lands. Stationary digits don't move at all.
 *
 * Everything is one transform per column, so a 4-digit number costs 4
 * composited transitions total.
 */
export default function Odometer({ value = 0, suffix = "", className = "", duration = 1.1 }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const reduced = usePrefersReducedMotion();
  const [shown, setShown] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setShown(value);
      return;
    }
    // One deferred frame, so the strips mount at 0 and then roll.
    const id = requestAnimationFrame(() => setShown(value));
    return () => cancelAnimationFrame(id);
  }, [inView, value, reduced]);

  const target = String(value);
  const landed = shown === value;

  // Before it lands, every column parks on a *different* digit. Otherwise a
  // number like 300 would only move its hundreds column and the mechanism
  // would be invisible — the two zeroes would just sit there.
  const cols = landed
    ? target.split("")
    : target.split("").map((_, i) => String((i * 4 + 7) % 10));

  return (
    <span ref={ref} className={"odo " + className} style={{ "--odo-dur": `${duration}s` }}>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
      <span aria-hidden="true" className="inline-flex items-baseline">
        {cols.map((d, i) => (
          <span key={i} className="odo-col">
            <span
              className="odo-strip"
              style={{
                transform: `translate3d(0, ${-(Number(d) || 0) * 10}%, 0)`,
                transitionDelay: `${(cols.length - 1 - i) * 0.07}s`,
              }}
            >
              {DIGITS.map((n) => (
                <span key={n} className="odo-digit">
                  {n}
                </span>
              ))}
            </span>
          </span>
        ))}
        {suffix && <span className="odo-suffix">{suffix}</span>}
      </span>
    </span>
  );
}
