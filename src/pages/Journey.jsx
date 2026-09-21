import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useInView } from "motion/react";
import PageEnter from "@/components/PageEnter";
import Reveal from "@/components/Reveal";
import { LEVELS as CHAPTERS, SIDE_QUESTS } from "@/data/content";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Immersive chapter: full-viewport focus.
 * Active chapter scales up from depth; giant watermark number; no line/channel/zigzag.
 */
function Chapter({ ch, index, total, onActive }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.45, once: false });
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (inView) onActive?.(index);
  }, [inView, index, onActive]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center px-5 py-24 md:px-8"
    >
      {/* Giant depth number — scales/fades with presence */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        initial={false}
        animate={
          reduced
            ? { opacity: 0.06, scale: 1 }
            : inView
              ? { opacity: 0.07, scale: 1 }
              : { opacity: 0, scale: 1.15 }
        }
        transition={{ duration: 0.9, ease: EASE }}
      >
        <span className="select-none font-display text-[42vw] font-bold leading-none tracking-tighter md:text-[28vw]">
          {String(ch.lvl).padStart(2, "0")}
        </span>
      </motion.div>

      {/* Content — rises from depth, clarifies */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-2xl text-center"
        initial={reduced ? false : { opacity: 0, y: 48, filter: "blur(12px)", scale: 0.92 }}
        animate={
          reduced
            ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }
            : inView
              ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }
              : { opacity: 0.15, y: 32, filter: "blur(8px)", scale: 0.94 }
        }
        transition={{ duration: 0.85, ease: EASE }}
      >
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-muted">
          {ch.year}
        </p>
        <h2 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-6xl md:leading-[1.05]">
          {ch.title}
        </h2>
        {ch.boss && (
          <span className="mt-5 inline-block border border-fg px-3 py-1 font-mono text-[10px] uppercase tracking-widest">
            Capstone
          </span>
        )}
        <p className="mx-auto mt-8 max-w-lg text-base leading-relaxed text-muted md:text-lg">
          {ch.text}
        </p>
      </motion.div>
    </section>
  );
}

/** Floating progress constellation — not a path line */
function ProgressOrb({ active, total }) {
  return (
    <div className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          className="rounded-full border border-line"
          animate={{
            width: i === active ? 10 : 6,
            height: i === active ? 10 : 6,
            backgroundColor: i === active ? "var(--fg)" : "transparent",
            opacity: i === active ? 1 : 0.35,
          }}
          transition={{ duration: 0.35, ease: EASE }}
        />
      ))}
      <p className="mt-2 font-mono text-[10px] tabular-nums text-muted">
        {String(active + 1).padStart(2, "0")}
      </p>
    </div>
  );
}

/** Full-width editorial card for a single side quest */
function SideQuestCard({ q, index }) {
  return (
    <Reveal
      delay={index * 0.06}
      pop
      className="group relative flex flex-col justify-between bg-bg p-7 transition-colors duration-500 hover:bg-fg md:p-10"
    >
      <div className="flex items-start justify-between gap-6">
        <span className="font-mono text-[10px] tabular-nums uppercase tracking-[0.3em] text-muted transition-colors duration-500 group-hover:text-bg/60">
          {String(index + 1).padStart(2, "0")}
        </span>
        <ArrowUpRight
          size={18}
          className="shrink-0 text-muted transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-bg"
        />
      </div>

      <div className="mt-14">
        {q.period && (
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted transition-colors duration-500 group-hover:text-bg/60">
            {q.period}
          </p>
        )}
        <h3 className="mt-3 font-display text-2xl font-bold tracking-tight transition-colors duration-500 group-hover:text-bg md:text-[28px]">
          {q.label}
        </h3>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted transition-colors duration-500 group-hover:text-bg/70">
          {q.detail}
        </p>
      </div>

      {/* underline sweep */}
      <span className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-fg transition-all duration-700 group-hover:w-full group-hover:bg-bg/40" />
    </Reveal>
  );
}

export default function Journey() {
  const [active, setActive] = useState(0);

  return (
    <PageEnter>
      {/* Intro */}
      <section className="mx-auto flex min-h-[70svh] max-w-4xl flex-col items-center justify-center px-5 text-center md:px-8">
        <Reveal>
          <p className="text-sm text-muted">Journey</p>
          <h1 className="mt-3 font-display text-5xl font-bold tracking-tight md:text-7xl">
            The path so far.
          </h1>
          <p className="mx-auto mt-6 max-w-md text-muted">
            Chapters, in order. Each one comes into focus as you reach it.
          </p>
          <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.3em] text-muted animate-pulse">
            Scroll to enter
          </p>
        </Reveal>
      </section>

      <ProgressOrb active={active} total={CHAPTERS.length} />

      {/* Mesmerizing chapters */}
      {CHAPTERS.map((ch, i) => (
        <Chapter
          key={ch.lvl}
          ch={ch}
          index={i}
          total={CHAPTERS.length}
          onActive={setActive}
        />
      ))}

      {/* Side quests */}
      <section className="relative mx-auto max-w-5xl px-5 py-24 md:px-8 md:py-32">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
              Off the main path
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Side quests
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-muted md:text-lg">
              The work that didn't fit on the main path — an internship, deep practice,
              and the projects built in between.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
          {SIDE_QUESTS.map((q, i) => (
            <SideQuestCard key={q.label} q={q} index={i} />
          ))}
        </div>

        <Reveal className="mt-20 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg"
          >
            Open the inbox <ArrowRight size={16} />
          </Link>
        </Reveal>
      </section>
    </PageEnter>
  );
}