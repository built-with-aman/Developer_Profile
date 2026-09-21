import { useScrollVelocity } from "./useScrollVelocity";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/** Gentle skew from smoothed velocity — clamped, no wild jumps. */
export function useSkewScroll(intensity = 2) {
  const v = useScrollVelocity();
  const reduced = usePrefersReducedMotion();
  if (reduced) return { transform: "none" };

  const skew = Math.max(-intensity, Math.min(intensity, v * 2.2));
  return {
    transform: `skewY(${skew}deg)`,
    transition: "transform 0.12s linear",
    willChange: "transform",
  };
}
