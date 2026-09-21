import { useEffect, useRef, useState } from "react";
import {
  X,
  ArrowRight,
  Dumbbell,
  ChevronDown,
  MessageCircle,
  TrendingUp,
  Youtube,
} from "lucide-react";
import { motion, useInView, AnimatePresence } from "motion/react";
import PageEnter from "@/components/PageEnter";
import Reveal from "@/components/Reveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import LifeNav from "@/components/life/LifeNav";
import { AntiqueFrame, CountUp, SectionHead } from "@/components/life/atoms";
import { GYM_IMAGES, GYM_STATS, GYM_PRINCIPLES } from "@/data/life";

const EASE = [0.22, 1, 0.36, 1];
const WHATSAPP_URL = "https://wa.me/919352460755";
const YOUTUBE_URL = "https://www.youtube.com/@frogItguy";

/* ─────────────────────────────────────────────────────────────
   Weight journey — 4 phases
   ───────────────────────────────────────────────────────────── */
const WEIGHT_JOURNEY = [
  {
    phase: "Start",
    date: "Oct 2023",
    weight: "89 kg",
    note: "Where it began. No plan, no diet, no clue. Just decided to move.",
  },
  {
    phase: "The drop",
    date: "Oct 2023 → Feb 2024",
    weight: "89 → 70 kg",
    note: "19 kg gone in 4 months. Running mornings, gym evenings, basketball between. No protein powder, no supplements — just hostel food and hunger.",
  },
  {
    phase: "The rebuild",
    date: "Feb 2024 → Sep 2024",
    weight: "70 → 76 kg",
    note: "Started eating 200g packed paneer on alternate days, plus normal hostel food. Nothing else. Gained 6 kg back over 6–7 months — clean, not junk.",
  },
  {
    phase: "The hold",
    date: "Sep 2024 → Dec 2025",
    weight: "76 kg ± 1",
    note: "Held the line for over a year. Diet stayed the same. Lifting stayed the same. Weight barely moved — which was the whole point.",
  },
];

/* ─────────────────────────────────────────────────────────────
   PR data — last honest set, Dec 2025
   ───────────────────────────────────────────────────────────── */
const PRS = [
  {
    lift: "Bench Press",
    weight: 90,
    unit: "kg",
    reps: "1 rep",
    note: "Clean. Full pause. No bounce.",
  },
  {
    lift: "Deadlift",
    weight: 175,
    unit: "kg",
    reps: "1 rep",
    note: "Straps on, chalk in the air, zero drama.",
  },
  {
    lift: "Squat",
    weight: 135,
    unit: "kg",
    reps: "4 reps",
    note: "Below parallel. No excuses, no half reps.",
  },
  {
    lift: "Leg Press",
    weight: 345,
    unit: "kg",
    reps: "12 reps",
    note: "Machine doesn't lie, but it does judge.",
  },
  {
    lift: "Back Rowing",
    weight: 100,
    unit: "kg",
    reps: "1 rep",
    note: "Full stretch, full squeeze. No kipping.",
  },
  {
    lift: "Hip Thrust",
    weight: 120,
    unit: "kg",
    reps: "5 reps",
    note: "Felt easy. Never tried more. No reason.",
  },
];

/* ─────────────────────────────────────────────────────────────
   Clickable frame
   ───────────────────────────────────────────────────────────── */
function ClickableFrame({ src, alt, caption, ratio, className, onOpen }) {
  const open = () => onOpen({ src, alt, caption });
  return (
    <div
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View ${alt} full screen`}
      className="cursor-zoom-in focus:outline-none focus-visible:ring-1 focus-visible:ring-fg"
    >
      <AntiqueFrame
        src={src}
        alt={alt}
        caption={caption}
        ratio={ratio}
        className={className}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Lightbox
   ───────────────────────────────────────────────────────────── */
function Lightbox({ image, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8 md:p-12"
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center border border-white/30 bg-black/40 text-white transition-colors hover:border-white hover:bg-white hover:text-black sm:right-6 sm:top-6 md:h-11 md:w-11"
      >
        <X size={18} />
      </button>
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-full max-w-full flex-col items-center"
      >
        <img
          src={image.src}
          alt={image.alt}
          className="max-h-[80vh] max-w-[90vw] object-contain"
        />
        {image.caption && (
          <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-white/70">
            {image.caption}
          </p>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Weight journey — collapsible
   ───────────────────────────────────────────────────────────── */
function WeightJourney({ reduced }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3, once: true });

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE }}
      className="mt-10 border border-line"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-fg/[0.02] md:px-6 md:py-5"
      >
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
            The full weight story
          </p>
          <p className="mt-1.5 font-display text-base font-semibold tracking-tight md:text-lg">
            89 → 70 → 76 kg. The whole arc.
          </p>
        </div>
        <ChevronDown
          size={18}
          aria-hidden
          className={
            "shrink-0 text-muted transition-transform duration-500 " +
            (open ? "rotate-180" : "")
          }
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden border-t border-line"
          >
            <ol className="divide-y divide-line">
              {WEIGHT_JOURNEY.map((step) => (
                <li
                  key={step.phase}
                  className="grid grid-cols-1 gap-2 px-5 py-5 md:grid-cols-[140px_1fr_auto] md:gap-6 md:px-6 md:py-6"
                >
                  <div className="flex flex-col gap-0.5">
                    <p className="font-display text-sm font-semibold tracking-tight md:text-base">
                      {step.phase}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted/70">
                      {step.date}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-muted md:text-[15px]">
                    {step.note}
                  </p>
                  <p className="font-display text-lg font-bold tabular-nums tracking-tight md:text-right md:text-xl">
                    {step.weight}
                  </p>
                </li>
              ))}
            </ol>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PR Popup
   ───────────────────────────────────────────────────────────── */
function PRPopup({ onClose, reduced }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-8"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={reduced ? false : { opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative max-h-[90vh] w-full max-w-lg select-none overflow-y-auto border border-line bg-bg p-6 sm:p-8 md:p-10"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center border border-line text-muted transition-colors hover:border-fg hover:text-fg"
        >
          <X size={16} />
        </button>

        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
          PR sheet · Dec 2025
        </p>

        <h3 className="mt-4 font-display text-2xl font-bold leading-snug tracking-tight md:text-3xl">
          Numbers. <span className="text-muted">Since you asked.</span>
        </h3>

        <div className="mt-4 border-l-2 border-line pl-4">
          <p className="text-sm leading-relaxed text-muted">
            Last honest set — up to{" "}
            <span className="text-fg/85">Dec 2025</span>. Everything below is
            a starting line, not a highlight reel.
          </p>
        </div>

        <ul className="mt-6 divide-y divide-line border-y border-line">
          {PRS.map((pr, i) => (
            <motion.li
              key={pr.lift}
              initial={reduced ? false : { opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease: EASE, delay: i * 0.06 }}
              className="grid grid-cols-[1fr_auto] items-baseline gap-4 py-4"
            >
              <div className="min-w-0">
                <p className="font-display text-base font-semibold tracking-tight md:text-lg">
                  {pr.lift}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  {pr.note}
                </p>
              </div>
              <div className="text-right">
                <p className="font-display text-xl font-bold tabular-nums tracking-tight md:text-2xl">
                  {pr.weight}
                  <span className="ml-1 text-sm font-normal text-muted">
                    {pr.unit}
                  </span>
                </p>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted/60">
                  × {pr.reps}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>

        <p className="mt-6 text-sm italic leading-relaxed text-muted/70">
          Hip thrust felt easy at 120. Never tried more. Some lifts are just
          there to make you feel better about the others.
        </p>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Status Popup
   ───────────────────────────────────────────────────────────── */
function StatusPopup({ onClose, reduced }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-8"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={reduced ? false : { opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative max-h-[90vh] w-full max-w-lg select-none overflow-y-auto border border-line bg-bg p-6 sm:p-8 md:p-10"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center border border-line text-muted transition-colors hover:border-fg hover:text-fg"
        >
          <X size={16} />
        </button>

        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
          Current status
        </p>

        <h3 className="mt-4 font-display text-2xl font-bold leading-snug tracking-tight md:text-3xl">
          Where I'm at. <span className="text-muted">Honestly.</span>
        </h3>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted md:text-[15px]">
          <p>
            Haven't started again. Not yet. Doing home workouts — small
            stuff, just to reactivate the body before walking back into a
            real gym. Soon.
          </p>

          <p>
            <span className="text-fg/85">The honest part:</span> career
            stress and stress eating did a number on me. I'm at{" "}
            <span className="text-fg/85">85 kg now</span> — 15 up from my
            lowest (70), 4 down from my heaviest (89).
          </p>

          <p>
            Every number on that PR sheet feels far away. But improving every
            day, beating the shit out of stress, and hitting hard.
          </p>

          <p className="border-l-2 border-line pl-4 italic text-muted/75">
            The bar doesn't care where I've been. Only where I'm going.
          </p>
        </div>

        {/* YouTube CTA */}
        <div className="mt-8 border-t border-line pt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
            See it live
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Want to actually see where I'm at — the body, the face, the slow
            comeback? I'm posting all of it on YouTube. No filter, no fake
            motivation, no highlight reel. Just the honest middle.
          </p>
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 bg-fg px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-bg transition-opacity hover:opacity-90"
          >
            <Youtube size={14} />
            Visit the channel
          </a>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted/50">
            @frogItguy
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Diet Popup
   ───────────────────────────────────────────────────────────── */
function DietPopup({ onClose, reduced }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-8"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={reduced ? false : { opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative max-h-[90vh] w-full max-w-lg select-none overflow-y-auto border border-line bg-bg p-6 sm:p-8 md:p-10"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center border border-line text-muted transition-colors hover:border-fg hover:text-fg"
        >
          <X size={16} />
        </button>

        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
          Diet tips · serious
        </p>

        <h3 className="mt-4 font-display text-2xl font-bold leading-snug tracking-tight md:text-3xl">
          Want diet tips? <span className="text-muted">Cool. Not free.</span>
        </h3>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted md:text-[15px]">
          <p>
            I dropped{" "}
            <span className="text-fg/85">19 kg in 4 months</span> — no whey,
            no supplements, hostel food only, vegetarian the whole way. Not
            magic. Not genetics. Just a system that worked with{" "}
            <em>what I had</em>.
          </p>

          <p>
            If you want that system broken down for your body, your kitchen,
            and your budget — I'll help. But let's be clear about one thing:
          </p>

          <p className="border-l-2 border-fg pl-4 font-display text-base font-semibold tracking-tight text-fg md:text-lg">
            I'm definitely not doing this for free.
          </p>

          <p>
            <span className="text-fg/85">₹499</span> — minimal, upfront, and
            honestly cheaper than one month of a gym you'll stop going to in
            three weeks. Covers: diet plan adjusted to your food, a weekly
            check-in, and honest feedback when you're lying to yourself.
          </p>

          <p className="text-xs italic text-muted/70 md:text-sm">
            (Yes, I know someone will say "bhai free me bata do." No. That
            someone always stops messaging on day 3.)
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 border-t border-line pt-6">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-fg px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-bg transition-opacity hover:opacity-90"
          >
            <MessageCircle size={14} />
            WhatsApp 9352460755
          </a>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 border border-line px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-muted transition-colors hover:border-fg hover:text-fg"
          >
            Maybe later
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Gym action buttons — 3 triggers
   ───────────────────────────────────────────────────────────── */
function GymActions({ reduced }) {
  const [prOpen, setPrOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [dietOpen, setDietOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4, once: true });

  return (
    <>
      <motion.div
        ref={ref}
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE }}
        className="mt-6 flex flex-wrap items-center gap-3"
      >
        <button
          type="button"
          onClick={() => setPrOpen(true)}
          className="group inline-flex items-center gap-2 rounded-full border border-line bg-bg px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-muted transition-all hover:border-fg hover:text-fg"
        >
          <Dumbbell size={13} className="transition-transform group-hover:rotate-12" />
          Show the numbers
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </button>

        <button
          type="button"
          onClick={() => setStatusOpen(true)}
          className="group inline-flex items-center gap-2 rounded-full border border-line bg-bg px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-muted transition-all hover:border-fg hover:text-fg"
        >
          <TrendingUp size={13} className="transition-transform group-hover:-translate-y-0.5" />
          Where I'm at now
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </button>

        <button
          type="button"
          onClick={() => setDietOpen(true)}
          className="group inline-flex items-center gap-2 rounded-full border border-line bg-bg px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-muted transition-all hover:border-fg hover:text-fg"
        >
          <MessageCircle size={13} className="transition-transform group-hover:rotate-12" />
          Diet tips · ₹499
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </button>
      </motion.div>

      {prOpen && <PRPopup onClose={() => setPrOpen(false)} reduced={reduced} />}
      {statusOpen && <StatusPopup onClose={() => setStatusOpen(false)} reduced={reduced} />}
      {dietOpen && <DietPopup onClose={() => setDietOpen(false)} reduced={reduced} />}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────────── */
export default function Gym() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), {
      threshold: 0.25,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const shown = inView || reduced;

  return (
    <PageEnter>
      <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
        <Reveal>
          <p className="text-sm text-muted">Life · Gym</p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-6xl">
            The body that carries the work.
          </h1>
          <p className="mt-4 max-w-md text-muted">
            Running mornings, lifting evenings, basketball in between. Vegetarian, no whey.
          </p>
        </Reveal>

        <div className="mt-12" />
        <LifeNav />

        <section ref={ref}>
          <SectionHead
            eyebrow="The gym"
            meta="Still vegetarian · still no whey"
            title="Vegetarian, no whey, no shortcuts."
            sub="The deficit came from running every morning, lifting every evening, and basketball on the alternate evenings in between. The kitchen did its part — but the kitchen wasn't the trick."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Reveal>
              <ClickableFrame
                src={GYM_IMAGES.floor}
                alt="Training floor"
                caption="Evenings · squat, deadlift, bench, row, press"
                ratio="aspect-[4/3]"
                onOpen={setLightbox}
              />
            </Reveal>
            <Reveal delay={0.08}>
              <ClickableFrame
                src={GYM_IMAGES.build}
                alt="The work"
                caption="Alternate evenings · basketball, 90 minutes"
                ratio="aspect-[4/3]"
                onOpen={setLightbox}
              />
            </Reveal>
          </div>

          <Reveal delay={0.12} className="mt-6">
            <ClickableFrame
              src={GYM_IMAGES.long}
              alt="The long game"
              caption="Mornings · a run before anything else gets a vote"
              ratio="aspect-[16/9] md:aspect-[21/9]"
              onOpen={setLightbox}
            />
          </Reveal>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 border-y border-line">
            {GYM_STATS.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 0.08}
                className="border-r border-line px-2 py-6 last:border-r-0 md:px-6 md:py-8"
              >
                <p className="font-display text-3xl font-bold tracking-tight tabular-nums md:text-5xl">
                  <CountUp value={s.value} run={shown} />
                  <span className="text-muted">{s.suffix}</span>
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Weight journey */}
          <WeightJourney reduced={reduced} />

          {/* Actions */}
          <GymActions reduced={reduced} />

          {/* Principles */}
          <div className="mt-16 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {GYM_PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <p className="font-mono text-[10px] tabular-nums text-muted">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold md:text-xl">
                  {p.title}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted md:text-base">
                  {p.text}
                </p>
              </Reveal>
            ))}
          </div>
        </section>
      </div>

      {lightbox && <Lightbox image={lightbox} onClose={() => setLightbox(null)} />}
    </PageEnter>
  );
}