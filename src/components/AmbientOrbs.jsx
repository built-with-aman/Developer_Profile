import { motion } from "motion/react";

/**
 * Soft floating light orbs that give the whole site a living cinematic atmosphere.
 * Theme-aware via CSS variables.
 */
export default function AmbientOrbs() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] overflow-hidden"
    >
      {/* Large slow orb – top left */}
      <motion.div
        className="absolute -left-[15%] -top-[10%] h-[55vmax] w-[55vmax] rounded-full opacity-55"
        style={{
          background:
            "radial-gradient(circle, var(--glow) 0%, transparent 68%)",
          filter: "blur(40px)",
        }}
        animate={{
          x: [0, 80, -40, 0],
          y: [0, 60, -30, 0],
          scale: [1, 1.12, 0.95, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Accent orb – bottom right */}
      <motion.div
        className="absolute -bottom-[20%] -right-[10%] h-[45vmax] w-[45vmax] rounded-full opacity-45"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--acc2) 55%, transparent) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{
          x: [0, -70, 50, 0],
          y: [0, -50, 40, 0],
          scale: [1, 0.9, 1.15, 1],
        }}
        transition={{
          duration: 34,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      {/* Small fast orb – mid right */}
      <motion.div
        className="absolute right-[8%] top-[35%] h-[18vmax] w-[18vmax] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, var(--acc) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 40, -25, 0],
          scale: [1, 1.3, 0.85, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  );
}
