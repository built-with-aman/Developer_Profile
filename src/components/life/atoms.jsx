import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import Reveal from "@/components/Reveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function clamp01(n) {
  return Math.max(0, Math.min(1, n));
}

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = () => setMatches(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

export function AntiqueCover({ src, alt }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative aspect-[3/4] [perspective:1000px]">
      <div
        className="
          relative h-full w-full overflow-hidden bg-surface2
          shadow-[0_1px_0_rgba(0,0,0,0.25)]
          transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
          [transform-style:preserve-3d]
          group-hover:[transform:rotateY(-8deg)_rotateX(4deg)_translateZ(12px)_translateY(-4px)]
          group-hover:shadow-[0_18px_44px_-14px_rgba(0,0,0,0.6)]
        "
      >
        {!failed ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className="
              h-full w-full object-cover
              [filter:sepia(0.6)_saturate(0.75)_contrast(1.08)_brightness(0.92)]
              transition-[filter] duration-[900ms] ease-out
              group-hover:[filter:sepia(0)_saturate(1)_contrast(1.05)_brightness(1)]
            "
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
              {alt}
            </span>
          </div>
        )}

        <div className="pointer-events-none absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/55 via-black/25 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-45" />
        <div className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-70 transition-opacity duration-700 group-hover:opacity-20 [background:radial-gradient(ellipse_at_center,transparent_40%,rgba(74,42,16,0.5)_100%)]" />
        <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.08] [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.5)_0px,rgba(255,255,255,0.5)_1px,transparent_1px,transparent_3px)]" />
        <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-12deg] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-full" />
        <div className="pointer-events-none absolute inset-[4px] border border-amber-200/0 transition-colors duration-700 group-hover:border-amber-200/40" />
        <div className="pointer-events-none absolute right-0 top-0 h-10 w-10 opacity-90 transition-opacity duration-700 group-hover:opacity-30 [background:radial-gradient(circle_at_100%_0%,rgba(74,42,16,0.5),transparent_70%)]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-10 w-10 opacity-90 transition-opacity duration-700 group-hover:opacity-30 [background:radial-gradient(circle_at_0%_100%,rgba(74,42,16,0.45),transparent_70%)]" />
      </div>
    </div>
  );
}

export function AntiqueFrame({ src, alt, caption, ratio = "aspect-[4/3]", className = "" }) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className={className}>
      <div className={`relative ${ratio} [perspective:1200px]`}>
        <div
          className="
            group relative h-full w-full overflow-hidden bg-surface2
            shadow-[0_1px_0_rgba(0,0,0,0.25)]
            transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
            [transform-style:preserve-3d]
            [transform:rotateY(0deg)_rotateX(0deg)_translateZ(0px)]
            hover:[transform:rotateY(-3deg)_rotateX(2deg)_translateZ(10px)_translateY(-3px)]
            hover:shadow-[0_22px_50px_-16px_rgba(0,0,0,0.65)]
          "
        >
          {!failed ? (
            <img
              src={src}
              alt={alt}
              loading="lazy"
              decoding="async"
              onError={() => setFailed(true)}
              className="h-full w-full object-cover [filter:sepia(0.55)_saturate(0.7)_contrast(1.1)_brightness(0.88)] transition-[filter] duration-[900ms] ease-out group-hover:[filter:sepia(0)_saturate(1)_contrast(1.05)_brightness(1)]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                {alt}
              </span>
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 opacity-80 transition-opacity duration-700 group-hover:opacity-35 [background:linear-gradient(180deg,rgba(10,8,4,0.45)_0%,transparent_35%,transparent_60%,rgba(74,42,16,0.4)_100%)]" />
          <div className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-75 transition-opacity duration-700 group-hover:opacity-25 [background:radial-gradient(ellipse_at_center,transparent_45%,rgba(74,42,16,0.6)_100%)]" />
          <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.09] [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.5)_0px,rgba(255,255,255,0.5)_1px,transparent_1px,transparent_3px)]" />
          <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-14deg] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[1200ms] ease-out group-hover:translate-x-full" />
          <div className="pointer-events-none absolute inset-[5px] border border-amber-200/0 transition-colors duration-700 group-hover:border-amber-200/35" />
        </div>
      </div>
      {caption && (
        <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ─────────────────────────────────────────────────────────────
   Status pill — shared style map for book states
   ───────────────────────────────────────────────────────────── */
const STATUS_PILL = {
  Completed: "border-emerald-400/40 text-emerald-300/90",
  Ongoing: "border-sky-400/40 text-sky-300/90",
  Wishlisted: "border-amber-400/40 text-amber-300/90",
};

export function StatusTag({ status }) {
  if (!status) return null;
  const cls = STATUS_PILL[status] || "border-line text-muted";
  return (
    <span
      className={
        "inline-block border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] " +
        cls
      }
    >
      {status}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   BookCard — pointer-based tap detection.
   Works alongside drag-scroll: a quick tap toggles the note,
   a drag (movement > 8px) lets the shelf scroll instead.
   ───────────────────────────────────────────────────────────── */
export function BookCard({ book, delay = 0, className = "" }) {
  const [open, setOpen] = useState(false);
  const reduced = usePrefersReducedMotion();
  const downPos = useRef({ x: 0, y: 0, t: 0 });

  const handlePointerDown = (e) => {
    downPos.current = { x: e.clientX, y: e.clientY, t: Date.now() };
  };

  const handlePointerUp = (e) => {
    const dx = Math.abs(e.clientX - downPos.current.x);
    const dy = Math.abs(e.clientY - downPos.current.y);
    const dt = Date.now() - downPos.current.t;

    // Tap = little movement, short duration
    if (dx < 8 && dy < 8 && dt < 500) {
      setOpen((o) => !o);
    }
    // Otherwise it was a drag — let the shelf scroll, do nothing
  };

  return (
    <Reveal delay={delay} className={className}>
      <div className="group">
        <button
          type="button"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          aria-expanded={open}
          className="block w-full text-left focus-visible:outline-none"
          style={{ touchAction: "pan-x" }}
        >
          <AntiqueCover src={book.cover} alt={book.title} />
          <div className="mt-4 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-display text-sm font-semibold leading-snug">
                {book.title}
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted">
                {book.author}
              </p>
            </div>
            <ChevronDown
              size={14}
              aria-hidden
              className={
                "mt-1 shrink-0 text-muted " +
                (reduced ? "" : "transition-transform duration-500 ") +
                (open ? "rotate-180" : "")
              }
            />
          </div>
        </button>

        <div
          className={
            "grid " +
            (reduced
              ? ""
              : "transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ") +
            (open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")
          }
        >
          <div className="overflow-hidden">
            <div className="mt-3 border-t border-line pt-3">
              <StatusTag status={book.status} />
              <p className="mt-3 text-xs leading-relaxed text-muted">
                {book.takeaway}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function CountUp({ value, run, duration = 1200 }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, value, duration]);
  return <>{n}</>;
}

export function SectionHead({ eyebrow, meta, title, sub }) {
  return (
    <Reveal>
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
          {eyebrow}
        </p>
        {meta && (
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
            {meta}
          </p>
        )}
      </div>
      {title && (
        <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold leading-[1.08] tracking-tight md:text-5xl">
          {title}
        </h2>
      )}
      {sub && (
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          {sub}
        </p>
      )}
    </Reveal>
  );
}