import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import ProjectArt from "@/components/ProjectArt";

const SLIDES = 3;

export default function ProjectCarousel({ id, testid }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const t = setInterval(() => setI((v) => (v + 1) % SLIDES), 3200);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <div
      className="relative overflow-hidden border border-lin bg-paper"
      data-testid={testid}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 48, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -48, scale: 0.97 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <ProjectArt id={id} variant={i} />
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5">
        {[0, 1, 2].map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setI(d)}
            aria-label={`Show slide ${d + 1}`}
            data-testid={`${testid}-dot-${d}`}
            className={
              "h-1.5 transition-[width,background-color] duration-300 " +
              (d === i ? "w-5 bg-acc" : "w-1.5 bg-lin hover:bg-mut")
            }
          />
        ))}
      </div>
    </div>
  );
}
