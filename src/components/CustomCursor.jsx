import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Premium cinematic cursor:
 * - Precise dot + lagging magnetic ring
 * - Soft trail of fading particles
 * - Morphs + labels on interactive elements
 * - Click feedback
 * - Fully disabled on touch / reduced motion
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState("");
  const [clicking, setClicking] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 320, damping: 24, mass: 0.45 });
  const ry = useSpring(y, { stiffness: 320, damping: 24, mass: 0.45 });
  const trailRef = useRef([]);
  const [trails, setTrails] = useState([]);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    setEnabled(true);

    let rafId;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);

      trailRef.current.push({
        x: e.clientX,
        y: e.clientY,
        id: performance.now() + Math.random(),
      });
      if (trailRef.current.length > 10) trailRef.current.shift();
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          setTrails([...trailRef.current]);
          rafId = null;
        });
      }
    };

    const over = (e) => {
      const t = e.target.closest("a, button, [data-cursor], [data-magnetic], input, textarea");
      setHover(!!t);
      setLabel(t?.dataset?.cursor || "");
    };

    const down = () => setClicking(true);
    const up = () => setClicking(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {trails.map((t, i) => (
        <div
          key={t.id}
          className="pointer-events-none fixed left-0 top-0 z-[297] rounded-full bg-acc"
          style={{
            width: 3 + (i / trails.length) * 2,
            height: 3 + (i / trails.length) * 2,
            transform: `translate(${t.x}px, ${t.y}px) translate(-50%, -50%)`,
            opacity: (i / trails.length) * 0.28,
          }}
        />
      ))}

      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[300]"
        style={{ x, y }}
      >
        <motion.div
          className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-acc"
          style={{ boxShadow: "0 0 14px var(--glow)" }}
          animate={{
            scale: clicking ? 0.55 : hover ? 0.4 : 1,
          }}
          transition={{ duration: 0.14 }}
        />
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[299]"
        style={{ x: rx, y: ry }}
      >
        <motion.div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border"
          style={{ borderColor: "var(--acc)" }}
          animate={{
            width: label ? 86 : hover ? 52 : 30,
            height: label ? 86 : hover ? 52 : 30,
            opacity: hover ? 0.95 : 0.4,
            backgroundColor: label ? "var(--acc)" : "transparent",
            scale: clicking ? 0.82 : 1,
            borderWidth: label ? 0 : 1.5,
          }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          {label && (
            <span className="font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-onacc">
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
