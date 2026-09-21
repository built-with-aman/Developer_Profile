import { motion } from "motion/react";
import MaskedText from "@/components/MaskedText";

export default function SectionHeading({ index, kicker, lines, className = "", titleClassName = "" }) {
  return (
    <div className={className}>
      <div className="mb-8 flex items-center gap-5 font-mono text-[11px] uppercase tracking-[0.35em] text-mut">
        <span className="text-acc text-sm">{index}</span>
        <span>{kicker}</span>
        <motion.span
          aria-hidden
          className="h-px flex-1 origin-left bg-lin"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <MaskedText
        lines={lines}
        className={
          "font-display text-5xl font-semibold uppercase leading-[0.92] tracking-tighter sm:text-6xl lg:text-7xl " +
          titleClassName
        }
      />
    </div>
  );
}
