import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react";
import PageEnter from "@/components/PageEnter";
import Reveal from "@/components/Reveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useYouTubeStats } from "@/hooks/useYouTubeStats";
import LifeNav from "@/components/life/LifeNav";
import { CountUp, SectionHead } from "@/components/life/atoms";
import {
  SOCIAL_HERO,
  SOCIAL_CHANNEL,
  SOCIAL_STATS,
  SOCIAL_PRINCIPLES,
  SOCIAL_WORK,
} from "@/data/life";

const EASE = [0.22, 1, 0.36, 1];

/* ─────────────────────────────────────────────────────────────
   Cursor-tracking glow on the channel card
   ───────────────────────────────────────────────────────────── */
function ChannelCard({ channel, reduced }) {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const glowX = useTransform(mx, (v) => `${v * 100}%`);
  const glowY = useTransform(my, (v) => `${v * 100}%`);

  const onMove = (e) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <Reveal delay={0.08}>
      <motion.a
        ref={ref}
        href={channel.url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={onMove}
        whileHover={reduced ? undefined : { y: -4 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="group relative mt-10 block overflow-hidden border border-line p-6 md:p-8"
      >
        {!reduced && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: useTransform(
                [glowX, glowY],
                ([x, y]) =>
                  `radial-gradient(400px circle at ${x} ${y}, rgba(255,255,255,0.08), transparent 60%)`
              ),
            }}
          />
        )}

        <span className="pointer-events-none absolute left-0 top-0 h-px w-0 bg-fg transition-all duration-700 ease-out group-hover:w-full" />

        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              {channel.platform}
            </p>
            <p className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
              {channel.handle}
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted md:text-base">
              {channel.note}
            </p>
          </div>
          <span className="inline-flex items-center gap-2 border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted transition-colors group-hover:border-fg group-hover:bg-fg group-hover:text-bg">
            Open channel
            <ArrowUpRight
              size={14}
              className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </motion.a>
    </Reveal>
  );
}

/* ─────────────────────────────────────────────────────────────
   Live YouTube stats panel
   ───────────────────────────────────────────────────────────── */
function formatCompact(n) {
  if (n == null || Number.isNaN(n)) return "—";
  if (n < 1000) return String(n);
  if (n < 1_000_000) return (n / 1000).toFixed(n < 10_000 ? 1 : 0) + "K";
  return (n / 1_000_000).toFixed(1) + "M";
}

function LiveStats({ reduced }) {
  const { stats, loading, error } = useYouTubeStats();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3, once: true });

  // Silently hide if not configured (no env variables)
  if (error && !stats) return null;

  // Loading state
  if (loading && !stats) {
    return (
      <div className="mt-4 border border-line px-5 py-5 md:px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          Live · pulling from YouTube…
        </p>
      </div>
    );
  }

  if (!stats) return null;

  const items = [
    { label: "Subscribers", value: stats.subscribers },
    { label: "Total views", value: stats.views },
    { label: "Videos", value: stats.videos },
  ];

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
      className="mt-4 border border-line"
    >
      <div className="flex items-center gap-2 border-b border-line px-5 py-3 md:px-6">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          Live from YouTube · cached 10 min
        </p>
      </div>

      <div className="grid grid-cols-3 divide-x divide-line">
        {items.map((it, i) => (
          <motion.div
            key={it.label}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.08 }}
            className="px-4 py-5 md:px-6 md:py-6"
          >
            <p className="font-display text-2xl font-bold tracking-tight tabular-nums md:text-3xl">
              {formatCompact(it.value)}
            </p>
            <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
              {it.label}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Stat cell — static channel stats
   ───────────────────────────────────────────────────────────── */
function StatCell({ stat, index, shown, reduced }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={shown ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.1 }}
      whileHover={reduced ? undefined : { y: -3 }}
      className="group border-r border-line px-2 py-6 last:border-r-0 md:px-6 md:py-8"
    >
      <p className="font-display text-3xl font-bold tracking-tight tabular-nums md:text-5xl">
        <span className="inline-block origin-left transition-transform duration-500 group-hover:scale-[1.04]">
          <CountUp value={stat.value} run={shown} />
        </span>
        <span className="text-muted">{stat.suffix}</span>
      </p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
        {stat.label}
      </p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Principle card
   ───────────────────────────────────────────────────────────── */
function PrincipleCard({ p, index, reduced }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3, once: true });

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: EASE, delay: index * 0.08 }}
      whileHover={reduced ? undefined : { y: -4 }}
      className="group relative"
    >
      <p className="font-mono text-[10px] tabular-nums text-muted">
        {String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="mt-2 font-display text-lg font-semibold md:text-xl">
        <span className="bg-gradient-to-r from-fg to-fg bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
          {p.title}
        </span>
      </h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted md:text-base">
        {p.text}
      </p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Work lane
   ───────────────────────────────────────────────────────────── */
function WorkLane({ w, index, reduced }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4, once: true });

  return (
    <motion.li
      ref={ref}
      initial={reduced ? false : { opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.06 }}
      className="group relative grid grid-cols-[auto_1fr] items-baseline gap-4 py-5 md:grid-cols-[auto_1fr_auto] md:gap-8 md:py-6"
    >
      <span className="pointer-events-none absolute inset-y-0 left-0 w-0 bg-fg/[0.03] transition-all duration-500 group-hover:w-full" />
      <span className="relative font-mono text-[10px] tabular-nums text-muted transition-colors group-hover:text-fg">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="relative min-w-0">
        <h3 className="font-display text-lg font-semibold md:text-xl">{w.title}</h3>
        <p className="mt-1 max-w-md text-sm leading-relaxed text-muted">{w.note}</p>
      </div>
      <span className="relative font-mono text-[10px] uppercase tracking-widest text-muted md:text-right">
        {w.format}
      </span>
    </motion.li>
  );
}

/* ─────────────────────────────────────────────────────────────
   Hero
   ───────────────────────────────────────────────────────────── */
function Hero({ reduced }) {
  return (
    <div>
      <motion.p
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="text-sm text-muted"
      >
        Life · Social
      </motion.p>

      <motion.h1
        initial={reduced ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.75, ease: EASE, delay: 0.06 }}
        className="mt-2 font-display text-4xl font-bold tracking-tight md:text-6xl"
      >
        {SOCIAL_HERO.headline}
      </motion.h1>

      <motion.p
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
        className="mt-4 max-w-md text-muted"
      >
        {SOCIAL_HERO.sub}
      </motion.p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────────── */
export default function Social() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const shown = inView || reduced;

  return (
    <PageEnter>
      <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
        <Hero reduced={reduced} />

        <div className="mt-12" />
        <LifeNav />

        <section ref={ref}>
          <SectionHead
            eyebrow="The channel"
            meta="YouTube · new"
            title="frogItguy — a channel still learning what it is."
            sub="Gym clips, singing shorts, vlogs. No genre locked, no rush to lock one. The lane is being drawn live."
          />

          <ChannelCard channel={SOCIAL_CHANNEL} reduced={reduced} />

          {/* LIVE YouTube stats — real numbers from API */}
          <LiveStats reduced={reduced} />

          {/* Static channel stats */}
          <div className="mt-10 grid grid-cols-3 border-y border-line">
            {SOCIAL_STATS.map((s, i) => (
              <StatCell
                key={s.label}
                stat={s}
                index={i}
                shown={shown}
                reduced={reduced}
              />
            ))}
          </div>

          {/* Principles */}
          <div className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {SOCIAL_PRINCIPLES.map((p, i) => (
              <PrincipleCard key={p.title} p={p} index={i} reduced={reduced} />
            ))}
          </div>

          {/* Work lanes */}
          <div className="mt-20 border-t border-line pt-12 md:mt-28 md:pt-16">
            <SectionHead
              eyebrow="What gets made"
              meta={`${String(SOCIAL_WORK.length).padStart(2, "0")} lanes`}
              title="Formats, not a content calendar."
            />

            <ul className="mt-10 divide-y divide-line border-y border-line">
              {SOCIAL_WORK.map((w, i) => (
                <WorkLane key={w.title} w={w} index={i} reduced={reduced} />
              ))}
            </ul>
          </div>
        </section>
      </div>
    </PageEnter>
  );
}