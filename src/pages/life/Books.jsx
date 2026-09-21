import { useEffect, useRef, useState } from "react";
import PageEnter from "@/components/PageEnter";
import Reveal from "@/components/Reveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useDragScroll } from "@/hooks/useDragScroll";
import LifeNav from "@/components/life/LifeNav";
import { AntiqueCover, BookCard, SectionHead, StatusTag } from "@/components/life/atoms";
import { CURRENTLY_READING, SHELF } from "@/data/life";

/* ─────────────────────────────────────────────────────────────
   Reading now
   ───────────────────────────────────────────────────────────── */
function ReadingNow() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const progress = CURRENTLY_READING.progress;
  const shown = inView || reduced;

  return (
    <section ref={ref} className="border-t border-line pt-12 md:pt-16">
      <Reveal>
        <div className="flex items-baseline justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
            Reading now
          </p>
          <p className="font-mono text-[10px] tabular-nums text-muted">
            {Math.round(progress * 100)}%
          </p>
        </div>
      </Reveal>

      <div className="mt-6 grid gap-8 md:grid-cols-[200px_1fr] md:gap-10">
        <Reveal className="group">
          <AntiqueCover
            src={CURRENTLY_READING.cover}
            alt={CURRENTLY_READING.title}
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              {CURRENTLY_READING.title}
            </h2>
            {CURRENTLY_READING.status && (
              <StatusTag status={CURRENTLY_READING.status} />
            )}
          </div>

          <p className="mt-2 text-sm text-muted">
            {CURRENTLY_READING.author} · {CURRENTLY_READING.year}
          </p>

          <div className="mt-6 h-px w-full bg-line">
            <div
              className="h-px origin-left bg-fg transition-transform duration-1000 ease-out"
              style={{
                transform: `scaleX(${shown ? progress : 0})`,
                transitionDelay: reduced ? "0ms" : "250ms",
              }}
            />
          </div>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted md:text-lg">
            {CURRENTLY_READING.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Shelf — drag-scroll on mobile + grid on desktop
   ───────────────────────────────────────────────────────────── */
function Shelf() {
  const { ref, dragging } = useDragScroll();

  const counts = SHELF.reduce(
    (acc, b) => {
      if (b.status === "Completed") acc.completed += 1;
      else if (b.status === "Ongoing") acc.ongoing += 1;
      else if (b.status === "Wishlisted") acc.wishlisted += 1;
      return acc;
    },
    { completed: 0, ongoing: 0, wishlisted: 0 }
  );

  return (
    <section className="mt-20 border-t border-line pt-12 md:mt-28 md:pt-16">
      <SectionHead
        eyebrow="On the shelf"
        meta={`${String(SHELF.length).padStart(2, "0")} titles`}
        title="What shaped the thinking."
        sub="Tap a cover for the note. Drag to browse on mobile."
      />

      {/* Status legend */}
      <Reveal delay={0.08}>
        <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
            Completed {counts.completed}
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400/70" />
            Ongoing {counts.ongoing}
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400/70" />
            Wishlisted {counts.wishlisted}
          </span>
        </div>
      </Reveal>

      {/* Drag-scrollable shelf (mobile) / grid (desktop) */}
      <div className="mt-10">
        <div
          ref={ref}
          className={
            "no-scrollbar flex snap-x snap-mandatory items-start gap-5 overflow-x-auto pb-4 " +
            "md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0 " +
            "lg:grid-cols-5 " +
            (dragging ? "cursor-grabbing select-none" : "cursor-grab")
          }
        >
          {SHELF.map((b, i) => (
            <BookCard
              key={b.title}
              book={b}
              delay={Math.min(i * 0.05, 0.25)}
              className="w-[170px] shrink-0 snap-start md:w-auto"
            />
          ))}
        </div>
      </div>

      {/* Drag hint — mobile only */}
      <p className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted/60 md:hidden">
        Drag to see more →
      </p>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Page
   ───────────────────────────────────────────────────────────── */
export default function Books() {
  return (
    <PageEnter>
      <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
        <Reveal>
          <p className="text-sm text-muted">Life · Books</p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-6xl">
            What's on the desk.
          </h1>
          <p className="mt-4 max-w-md text-muted">
            The books that shaped the thinking — one open, the rest closed but
            not forgotten.
          </p>
        </Reveal>

        <div className="mt-12" />
        <LifeNav />

        <ReadingNow />
        <Shelf />
      </div>
    </PageEnter>
  );
}