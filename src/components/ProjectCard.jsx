import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import TiltCard from "@/components/TiltCard";
import ImageReveal from "@/components/ImageReveal";
import ProjectCarousel from "@/components/ProjectCarousel";

export default function ProjectCard({ p, i = 0 }) {
  return (
    <motion.article
      data-testid={`project-card-${p.id}`}
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: (i % 2) * 0.14 }}
    >
      <TiltCard className="card-shine border-glow elevated group h-full border border-lin bg-paper2 p-7 md:p-10">
        <ImageReveal className="mb-7 overflow-hidden rounded-sm">
          <ProjectCarousel id={p.id} testid={`project-carousel-${p.id}`} />
        </ImageReveal>
        <div className="flex items-baseline justify-between gap-4">
          <Link
            to={`/work/${p.id}`}
            data-testid={`project-card-title-link-${p.id}`}
            className="font-display text-3xl font-semibold uppercase tracking-tight transition-colors duration-300 group-hover:text-acc md:text-4xl"
          >
            {p.name}
          </Link>
          <span className="font-mono text-sm text-acc">{p.index}</span>
        </div>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.28em] text-acc2">{p.tag}</p>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-mut md:text-[15px]">{p.desc}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span
              key={s}
              className="border border-lin bg-paper3/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-mut"
            >
              {s}
            </span>
          ))}
        </div>
        <p className="mt-6 font-mono text-[11px] italic text-acc">// {p.note}</p>
        <Link
          to={`/work/${p.id}`}
          data-testid={`project-card-case-study-${p.id}`}
          data-cursor="OPEN"
          className="group/link mt-7 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-mut transition-colors duration-300 hover:text-acc"
        >
          Full case study
          <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1.5" />
        </Link>
      </TiltCard>
    </motion.article>
  );
}
