import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const EASE = [0.22, 1, 0.36, 1];

export default function SplitReveal({ lines, className = "", delay = 0 }) {
  const reduced = usePrefersReducedMotion();
  if (reduced) {
    return (
      <div className={className}>
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    );
  }
  return (
    <div className={className}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden pb-[0.06em] -mb-[0.06em]">
          <motion.div
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.75, delay: delay + i * 0.1, ease: EASE }}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
