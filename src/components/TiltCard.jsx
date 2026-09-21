import { useRef } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "motion/react";

/**
 * Premium 3D tilt card with dynamic glare.
 * Higher default tilt for more dramatic presence.
 */
export default function TiltCard({ children, className = "", max = 12 }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 180, damping: 16, mass: 0.4 });
  const sry = useSpring(ry, { stiffness: 180, damping: 16, mass: 0.4 });
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, color-mix(in srgb, var(--acc) 22%, transparent), transparent 58%)`;

  const onMove = (e) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * max * 2);
    rx.set(-(py - 0.5) * max * 2);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1100 }}
      className={"relative will-change-transform " + className}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 mix-blend-soft-light"
        style={{ background: glare }}
      />
      {children}
    </motion.div>
  );
}
