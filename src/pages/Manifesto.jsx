import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import PageEnter from "@/components/PageEnter";
import Reveal from "@/components/Reveal";
import ManifestoLine from "@/components/cards/ManifestoLine";
import { PRINCIPLES, PRACTICE_TRAIL, LIFE } from "@/data/content";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const EASE = [0.22, 1, 0.36, 1];

/* ─────────────────────────────────────────────────────────────
   Word reveal — each word slides up from a clipped mask
   ───────────────────────────────────────────────────────────── */
function WordReveal({ text, className = "", delay = 0, stagger = 0.07, reduced }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: "0.1em", marginBottom: "-0.1em" }}
        >
          <motion.span
            className="inline-block"
            initial={reduced ? false : { y: "115%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.85,
              ease: EASE,
              delay: delay + i * stagger,
            }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   Hero — cinematic word reveal + side progress
   ───────────────────────────────────────────────────────────── */
function Hero() {
  const pageRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const p = Math.max(0, Math.min(1, (vh - rect.top) / total));
      setProgress(p);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={pageRef} className="relative border-b border-line">
      {/* Side progress bar */}
      <div aria-hidden className="absolute left-0 top-0 h-full w-px bg-line">
        <div
          className="h-full w-px origin-top bg-fg transition-transform duration-150 ease-out"
          style={{ transform: `scaleY(${progress})` }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted"
        >
          Manifesto · {PRINCIPLES.length} rules
        </motion.p>

        <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl lg:text-8xl">
          <WordReveal
            text="Operating"
            delay={0.15}
            stagger={0.06}
            reduced={reduced}
          />
          <br />
          <WordReveal
            text="principles."
            delay={0.3}
            stagger={0.06}
            reduced={reduced}
          />
        </h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.7 }}
          className="mt-10 max-w-xl text-lg leading-relaxed text-muted md:text-xl"
        >
          Not slogans. Constraints. The lines I won't cross even when nobody's
          watching — especially then.
        </motion.p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Principles — timeline spine on the left, rows slide in
   ───────────────────────────────────────────────────────────── */
function PrincipleRow({ pr, index, reduced }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.35, once: true });
  const isLast = index === PRINCIPLES.length - 1;

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE, delay: (index % 2) * 0.05 }}
      className="group relative grid grid-cols-[40px_1fr] gap-4 md:grid-cols-[64px_1fr] md:gap-8"
    >
      {/* Timeline spine */}
      <div className="relative flex justify-center pt-8">
        {/* vertical line — extends full row */}
        {!isLast && (
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-line"
          />
        )}
        {/* dot */}
        <motion.span
          aria-hidden
          initial={reduced ? false : { scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
          className="relative z-10 mt-0 h-2 w-2 rounded-full bg-fg"
        />
      </div>

      {/* Content */}
      <div className="border-t border-line">
        <ManifestoLine
          num={pr.num}
          title={pr.title}
          text={pr.text}
          foot={pr.foot}
        />
      </div>
    </motion.div>
  );
}

function Principles() {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-5 md:px-8">
      {/* Section intro */}
      <div className="mb-12 grid grid-cols-[40px_1fr] gap-4 md:grid-cols-[64px_1fr] md:gap-8">
        <div />
        <div>
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
              The rules
            </p>
          </Reveal>
        </div>
      </div>

      {PRINCIPLES.map((pr, i) => (
        <PrincipleRow key={pr.num} pr={pr} index={i} reduced={reduced} />
      ))}

      {/* End cap */}
      <div className="grid grid-cols-[40px_1fr] gap-4 md:grid-cols-[64px_1fr] md:gap-8">
        <div className="flex justify-center">
          <span className="h-2 w-2 rounded-full border border-line" />
        </div>
        <div className="border-t border-line" />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Practice trail — sticky heading, rows slide right on hover
   ───────────────────────────────────────────────────────────── */
function PracticeTrail() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.15, once: true });

  return (
    <section className="mt-4 bg-fg text-bg">
      <div
        ref={ref}
        className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-12 md:gap-16 md:px-8 md:py-28"
      >
        {/* Sticky heading column */}
        <div className="md:col-span-4 md:sticky md:top-28 md:self-start">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
            className="font-mono text-[11px] uppercase tracking-[0.3em] opacity-50"
          >
            Practice trail
          </motion.p>
          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
            className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl"
          >
            The numbers, plainly.
          </motion.h2>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE, delay: 0.2 }}
            className="mt-5 max-w-xs text-sm leading-relaxed opacity-60 md:text-base"
          >
            No highlight reel. Just where the hours went and what stuck.
          </motion.p>
        </div>

        {/* Rows */}
        <div className="md:col-span-8">
          {PRACTICE_TRAIL.map((t, i) => (
            <motion.div
              key={t.title}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.14 }}
              className="group relative border-t border-current/15 py-8 first:border-t-0 first:pt-0"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <p className="font-display text-xl font-semibold md:text-2xl">
                  {t.title}
                </p>
                <p className="font-mono text-xs opacity-50">{t.author}</p>
              </div>
              <p className="mt-3 max-w-lg text-sm leading-relaxed opacity-70 md:text-base">
                "{t.quote}"
              </p>

              {/* Hover underline sweep */}
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-current transition-all duration-700 ease-out group-hover:w-full"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Life system — sticky heading, rows with proper alignment
   ───────────────────────────────────────────────────────────── */
function LifeSystem() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.1, once: true });
  const [ctaHover, setCtaHover] = useState(false);

  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <div ref={ref} className="grid gap-12 md:grid-cols-12 md:gap-16">
        {/* Sticky heading column */}
        <div className="md:col-span-4 md:sticky md:top-28 md:self-start">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted"
          >
            Life system
          </motion.p>
          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
            className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl"
          >
            A normal week. Roughly.
          </motion.h2>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE, delay: 0.2 }}
            className="mt-5 max-w-xs text-sm leading-relaxed text-muted md:text-base"
          >
            Four things that keep moving. The days decide the rest.
          </motion.p>
        </div>

        {/* Rows */}
        <div className="md:col-span-8">
          {LIFE.map((item, i) => (
            <motion.div
              key={item.id}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.12 }}
              className="group relative grid gap-2 border-t border-line py-8 sm:grid-cols-[160px_1fr] sm:gap-8"
            >
              <span className="whitespace-nowrap font-mono text-xs uppercase tracking-widest text-muted transition-colors duration-500 group-hover:text-fg">
                {item.time} · {item.label}
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">
                  {item.text}
                </p>
              </div>

              {/* Hover underline sweep */}
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-fg transition-all duration-700 ease-out group-hover:w-full"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Reveal className="mt-16 border-t border-line pt-12">
        <Link
          to="/contact"
          onMouseEnter={() => setCtaHover(true)}
          onMouseLeave={() => setCtaHover(false)}
          className="group inline-block font-display text-2xl font-bold tracking-tight md:text-3xl"
        >
          <motion.span
            className="inline-flex items-center gap-3"
            animate={reduced || !ctaHover ? { x: 0 } : { x: 6 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <span className="bg-gradient-to-r from-fg to-fg bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
              Ready to talk
            </span>
            <ArrowRight
              className="transition-transform duration-300 group-hover:translate-x-1"
              size={22}
            />
          </motion.span>
        </Link>
        <p className="mt-3 text-sm text-muted">The inbox is open.</p>
      </Reveal>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Page
   ───────────────────────────────────────────────────────────── */
export default function Manifesto() {
  return (
    <PageEnter>
      <Hero />
      <Principles />
      <PracticeTrail />
      <LifeSystem />
    </PageEnter>
  );
}