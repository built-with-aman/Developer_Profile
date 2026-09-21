import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const LINES = [
  { text: "boot:// portfolio.system", delay: 0 },
  { text: "→ loading core [react 19 · vite · motion]", delay: 350 },
  { text: "→ mounting gsap + scrolltrigger + motionpath", delay: 750 },
  { text: "→ hydrating themes [noir · editorial · blueprint]", delay: 1150 },
  { text: "→ calibrating cursor · ambient · spotlight systems", delay: 1600 },
  { text: "→ resolving routes & lenis smooth scroll", delay: 2050 },
  { text: "→ aman.soni@sde-2026  ·  status: ready", delay: 2550 },
];

export default function CinematicLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [visibleLines, setVisibleLines] = useState([]);
  const [done, setDone] = useState(false);
  const [exit, setExit] = useState(false);
  const raf = useRef(null);

  useEffect(() => {
    const start = performance.now();
    const duration = 3200;

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3.2);
      setProgress(Math.round(eased * 100));
      if (t < 1) raf.current = requestAnimationFrame(tick);
      else {
        setDone(true);
        setTimeout(() => setExit(true), 520);
        setTimeout(() => onComplete?.(), 1250);
      }
    };
    raf.current = requestAnimationFrame(tick);

    LINES.forEach((line) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, line.text]);
      }, line.delay);
    });

    return () => cancelAnimationFrame(raf.current);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[var(--paper)] text-[var(--ink)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03, filter: "blur(8px)" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Background grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage: `
                linear-gradient(var(--lin) 1px, transparent 1px),
                linear-gradient(90deg, var(--lin) 1px, transparent 1px)
              `,
              backgroundSize: "56px 56px",
              maskImage: "radial-gradient(ellipse 75% 60% at 50% 45%, black, transparent)",
            }}
          />

          {/* Soft ambient glow */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/3 h-[50vmax] w-[50vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
            style={{
              background: "radial-gradient(circle, var(--glow), transparent 65%)",
              filter: "blur(40px)",
            }}
          />

          {/* Brand */}
          <motion.div
            className="relative mb-12 font-display text-6xl font-semibold tracking-tighter md:text-8xl"
            initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-acc">A</span>S
            <span className="text-acc">®</span>
          </motion.div>

          {/* Terminal */}
          <div className="relative z-10 w-full max-w-lg px-6 font-mono text-[11px] leading-relaxed tracking-wide text-mut md:text-[12px]">
            {visibleLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="mb-1.5"
              >
                {line.startsWith("→") ? (
                  <>
                    <span className="text-acc">→</span>
                    {line.slice(1)}
                  </>
                ) : (
                  <span className="text-ink/80">{line}</span>
                )}
              </motion.div>
            ))}
            {!done && (
              <span className="mt-1 inline-block h-3.5 w-2 animate-blink bg-acc align-middle" />
            )}
          </div>

          {/* Progress */}
          <div className="absolute bottom-14 left-1/2 w-52 -translate-x-1/2 md:w-72">
            <div className="mb-2.5 flex justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-mut">
              <span>system</span>
              <span className="tabular text-acc">{progress}%</span>
            </div>
            <div className="h-[2px] w-full overflow-hidden rounded-full bg-lin">
              <motion.div
                className="h-full origin-left bg-acc"
                style={{ scaleX: progress / 100 }}
                transition={{ type: "spring", stiffness: 90, damping: 22 }}
              />
            </div>
          </div>

          {/* Corners */}
          <div className="pointer-events-none absolute left-6 top-6 font-mono text-[10px] uppercase tracking-[0.35em] text-mut/50">
            sys://boot
          </div>
          <div className="pointer-events-none absolute right-6 top-6 font-mono text-[10px] uppercase tracking-[0.35em] text-mut/50">
            v2.0 · maximized
          </div>
          <div className="pointer-events-none absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-[0.3em] text-mut/40">
            sde 2026
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
