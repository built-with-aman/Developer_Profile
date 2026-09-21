import { useRef } from "react";
import { motion, useMotionValue, useMotionTemplate } from "motion/react";

/**
 * Wraps content in a cursor-following radial glow using the theme's
 * `--glow` token. Lighter-weight than TiltCard (no 3D tilt) — meant for
 * list rows / flat panels. Renders as a plain relative div, so pass the
 * same className you'd have used on the wrapped element to preserve
 * existing spacing.
 */
export default function SpotlightCard({ children, className = "", contentClassName = "", size = 380 }) {
  const ref = useRef(null);
  const mx = useMotionValue(-999);
  const my = useMotionValue(-999);
  const opacity = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(${size}px circle at ${mx}px ${my}px, var(--glow), transparent 72%)`;

  const onMove = (e) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
    opacity.set(1);
  };
  const onLeave = () => {
    opacity.set(0);
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={"relative " + className}>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background, opacity }}
        transition={{ duration: 0.3 }}
      />
      <div className={"relative z-[1] " + contentClassName}>{children}</div>
    </div>
  );
}
