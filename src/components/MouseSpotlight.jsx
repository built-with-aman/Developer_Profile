import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Soft cinematic spotlight that follows the cursor.
 * Creates depth and draws the eye without being distracting.
 * Automatically disabled on touch / reduced-motion.
 */
export default function MouseSpotlight() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 80, damping: 22, mass: 0.8 });
  const sy = useSpring(y, { stiffness: 80, damping: 22, mass: 0.8 });
  const opacity = useSpring(0, { stiffness: 60, damping: 20 });
  const enabled = useRef(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return undefined;

    enabled.current = true;
    opacity.set(1);

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const leave = () => opacity.set(0);
    const enter = () => opacity.set(1);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [x, y, opacity]);

  if (!enabled.current && typeof window !== "undefined") {
    // On first render we don't know yet; the effect will handle it.
  }

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[4] overflow-hidden"
      style={{ opacity }}
    >
      <motion.div
        className="absolute h-[min(70vw,700px)] w-[min(70vw,700px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x: sx,
          y: sy,
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--acc) 18%, transparent) 0%, color-mix(in srgb, var(--acc) 6%, transparent) 35%, transparent 70%)",
          filter: "blur(2px)",
        }}
      />
    </motion.div>
  );
}
