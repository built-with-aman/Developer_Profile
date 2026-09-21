import { motion } from "motion/react";

const EASE = [0.76, 0, 0.24, 1];
const EASE_OUT = [0.16, 1, 0.3, 1];

/**
 * High-end multi-stage route transition.
 * Two accent panels shutter closed → brief label flash → panels open while
 * content rises in. Feels intentional and cinematic rather than generic fade.
 */
export default function PageWipe({ children, className = "" }) {
  return (
    <motion.div className={className} initial="init" animate="enter" exit="exit">
      {/* Top shutter */}
      <motion.div
        aria-hidden
        variants={{
          init: { scaleY: 1 },
          enter: { scaleY: 0, transition: { duration: 0.55, ease: EASE, delay: 0.08 } },
          exit: { scaleY: 1, transition: { duration: 0.4, ease: EASE } },
        }}
        className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-[52%] origin-top bg-acc"
      />
      {/* Bottom shutter */}
      <motion.div
        aria-hidden
        variants={{
          init: { scaleY: 1 },
          enter: { scaleY: 0, transition: { duration: 0.55, ease: EASE, delay: 0.08 } },
          exit: { scaleY: 1, transition: { duration: 0.4, ease: EASE } },
        }}
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[90] h-[52%] origin-bottom bg-acc"
      />

      {/* Center label during full coverage */}
      <motion.div
        aria-hidden
        variants={{
          init: { opacity: 1, scale: 1 },
          enter: { opacity: 0, scale: 0.96, transition: { duration: 0.25, delay: 0.05 } },
          exit: { opacity: 1, scale: 1, transition: { duration: 0.2, delay: 0.12 } },
        }}
        className="pointer-events-none fixed inset-0 z-[91] flex flex-col items-center justify-center gap-3"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-onacc/80">
          // switching context
        </span>
        <span className="font-display text-2xl font-semibold tracking-tight text-onacc md:text-3xl">
          AS®
        </span>
      </motion.div>

      {/* Content reveal */}
      <motion.div
        variants={{
          init: { opacity: 0, y: 28 },
          enter: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.65, delay: 0.38, ease: EASE_OUT },
          },
          exit: { opacity: 0, y: -12, transition: { duration: 0.22 } },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
