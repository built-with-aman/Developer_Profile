import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Loading screen: pan flips, egg lands & cooks, then plate is ready.
 * Metaphor: portfolio is "cooking" — then served.
 */
export default function PanEggLoader({ onDone }) {
  const [phase, setPhase] = useState(0); // 0 pan in, 1 flip, 2 egg, 3 ready, 4 exit
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1400),
      setTimeout(() => setPhase(3), 2400),
      setTimeout(() => setPhase(4), 3200),
      setTimeout(() => onDone?.(), 3800),
    ];
    const start = performance.now();
    let raf;
    const tick = (now) => {
      setProgress(Math.min(100, Math.round(((now - start) / 3200) * 100)));
      if (now - start < 3200) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {phase < 4 && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Stage */}
          <div className="relative h-40 w-48">
            {/* Pan */}
            <motion.div
              className="absolute left-1/2 top-1/2 origin-center"
              style={{ x: "-50%", y: "-50%" }}
              initial={{ rotate: -25, opacity: 0, y: 40 }}
              animate={
                phase === 0
                  ? { rotate: -12, opacity: 1, y: 0 }
                  : phase === 1
                    ? { rotate: [ -12, 180, 360 ], y: [0, -30, 0], opacity: 1 }
                    : { rotate: 0, opacity: 1, y: 0 }
              }
              transition={
                phase === 1
                  ? { duration: 0.75, ease: [0.22, 1, 0.36, 1] }
                  : { duration: 0.5 }
              }
            >
              {/* Handle */}
              <div className="absolute -right-10 top-1/2 h-2 w-12 -translate-y-1/2 rounded-full bg-muted/60" />
              {/* Pan body */}
              <div className="h-24 w-32 rounded-[40%] border-4 border-muted/50 bg-surface2 shadow-lg">
                {/* Egg */}
                <AnimatePresence>
                  {phase >= 2 && (
                    <motion.div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                      initial={{ scale: 0, y: -40, rotate: -20 }}
                      animate={{ scale: 1, y: 0, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 280, damping: 16 }}
                    >
                      <div className="relative h-12 w-14">
                        <div className="absolute inset-0 rounded-full bg-fg/90" />
                        <motion.div
                          className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
                          animate={phase >= 3 ? { scale: [1, 1.08, 1] } : {}}
                          transition={{ repeat: Infinity, duration: 1.2 }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          <motion.p
            className="mt-10 font-mono text-xs uppercase tracking-[0.3em] text-muted"
            key={phase}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {phase < 1 && "heating pan…"}
            {phase === 1 && "flip…"}
            {phase === 2 && "egg’s in…"}
            {phase >= 3 && "served."}
          </motion.p>

          <div className="mt-6 h-0.5 w-40 overflow-hidden rounded-full bg-line">
            <motion.div
              className="h-full bg-accent origin-left"
              style={{ scaleX: progress / 100 }}
            />
          </div>
          <p className="mt-2 font-mono text-[10px] tabular-nums text-muted">{progress}%</p>
        </motion.div>
      )}
      {phase >= 4 && (
        <motion.div
          className="fixed inset-0 z-[100] bg-bg"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        />
      )}
    </AnimatePresence>
  );
}
