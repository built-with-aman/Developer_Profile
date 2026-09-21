import { useEffect, useRef, useState } from "react";
import { X, ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useInView } from "motion/react";
import PageEnter from "@/components/PageEnter";
import Reveal from "@/components/Reveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import LifeNav from "@/components/life/LifeNav";
import { AntiqueFrame } from "@/components/life/atoms";
import RantBubble from "@/components/RantBubble";
import {
  TRAVEL_HERO,
  TRAVEL_IMAGES,
  TRAVEL_TRIPS,
} from "@/data/life";

const EASE = [0.22, 1, 0.36, 1];

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
   Section eyebrow
   ───────────────────────────────────────────────────────────── */
function SectionEyebrow({ children, reduced }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.6, once: true });

  return (
    <div ref={ref}>
      <motion.p
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE }}
        className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted"
      >
        {children}
      </motion.p>
      <motion.span
        aria-hidden
        initial={reduced ? false : { scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
        className="mt-2 block h-px w-10 origin-left bg-fg/40"
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Trip entry
   ───────────────────────────────────────────────────────────── */
function TripEntry({ trip, reduced }) {
  const isWishlist =
    (trip.region || "").toLowerCase().includes("wishlist") ||
    (trip.period || "").toLowerCase().includes("coming");

  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, once: true });

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE }}
      className="group grid grid-cols-1 gap-2 py-6 md:grid-cols-[140px_1fr] md:gap-8"
    >
      <div className="flex flex-col gap-1 md:pt-0.5">
        <p className="font-display text-base font-semibold tracking-tight md:text-lg">
          <span className="bg-gradient-to-r from-fg to-fg bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
            {trip.place}
          </span>
        </p>
        <p
          className={
            "font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 " +
            (isWishlist
              ? "text-sky-300/60 group-hover:text-sky-300/90"
              : "text-muted/70 group-hover:text-muted")
          }
        >
          {trip.period}
        </p>
      </div>

      <p className="text-[15px] leading-[1.7] text-muted transition-colors duration-300 group-hover:text-fg/85">
        {trip.note}
      </p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Help Popup — ask nicely, savagely
   ───────────────────────────────────────────────────────────── */
function HelpPopup({ onClose, reduced }) {
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
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center border border-line text-muted transition-colors hover:border-fg hover:text-fg"
        >
          <X size={16} />
        </button>

        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
          One ask
        </p>

        <h3 className="mt-4 font-display text-2xl font-bold leading-snug tracking-tight md:text-3xl">
          Travelled a lot? <span className="text-muted">Then adopt me.</span>
        </h3>

        <div className="mt-6 space-y-4 text-[15px] leading-[1.7] text-muted">
          <p>
            Not a plan. Not an itinerary. A reality check. Route, budget, backup,
            and what to do when the bus is six hours late.
          </p>
          <p className="text-fg/85">
            First,{" "}
            <span className="font-mono text-sm">"pahle jaan lenge 2–3 din."</span>{" "}
            Yes — that too. Otherwise, my parents won't allow.
          </p>
          <p className="italic text-muted/70">
            Middle class ka rule hai. You either travel with them, or convince
            them. There's no third option.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/contact"
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
          >
            Contact me
            <ArrowUpRight size={15} />
          </Link>
          <Link
            to="/life/social"
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:border-fg hover:text-fg"
          >
            Watch me try
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Help Button — ironically savage trigger
   ───────────────────────────────────────────────────────────── */
function HelpButton({ reduced }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4, once: true });

  return (
    <>
      <motion.div
        ref={ref}
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE }}
        className="mt-20 border-t border-line pt-12 text-center md:mt-28 md:pt-16"
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group inline-flex items-center gap-3 rounded-full border border-line bg-bg px-6 py-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted transition-all hover:border-fg hover:text-fg"
        >
          Travelled a lot? Adopt me
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>

        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted/50">
          (yes, seriously)
        </p>
      </motion.div>

      {open && <HelpPopup onClose={() => setOpen(false)} reduced={reduced} />}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────────── */
export default function Travel() {
  const reduced = usePrefersReducedMotion();
  const [lightbox, setLightbox] = useState(null);

  const visited = TRAVEL_TRIPS.filter(
    (t) =>
      !(t.region || "").toLowerCase().includes("wishlist") &&
      !(t.period || "").toLowerCase().includes("coming")
  );
  const wishlist = TRAVEL_TRIPS.filter(
    (t) =>
      (t.region || "").toLowerCase().includes("wishlist") ||
      (t.period || "").toLowerCase().includes("coming")
  );

  return (
    <PageEnter>
      <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        {/* Hero */}
        <Reveal>
          <p className="text-sm text-muted">Life · Travel</p>
        </Reveal>

        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.75, ease: EASE, delay: 0.05 }}
          className="mt-2 font-display text-4xl font-bold tracking-tight md:text-6xl"
        >
          {TRAVEL_HERO.headline}
        </motion.h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.2 }}
          className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted md:text-base"
        >
          {TRAVEL_HERO.sub}
        </motion.p>

        <div className="mt-12" />
        <LifeNav />

        {/* Images */}
        <Reveal className="mt-4">
          <ClickableFrame
            src={TRAVEL_IMAGES.road}
            alt="The road"
            caption="Somewhere between two cities, evening light"
            ratio="aspect-[16/9] md:aspect-[21/9]"
            onOpen={setLightbox}
          />
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Reveal delay={0.06}>
            <ClickableFrame
              src={TRAVEL_IMAGES.hills}
              alt="Hills"
              caption="Hills · cold air, quiet mornings"
              ratio="aspect-[4/3]"
              onOpen={setLightbox}
            />
          </Reveal>
          <Reveal delay={0.12}>
            <ClickableFrame
              src={TRAVEL_IMAGES.old}
              alt="Old streets"
              caption="Old streets · food and footfalls"
              ratio="aspect-[4/3]"
              onOpen={setLightbox}
            />
          </Reveal>
        </div>

        {/* Been there */}
        <section className="mt-20 border-t border-line pt-12 md:mt-24 md:pt-16">
          <SectionEyebrow reduced={reduced}>Been there</SectionEyebrow>

          {visited.length === 0 ? (
            <p className="mt-8 text-sm text-muted">
              Nothing yet — the map is still blank. Working on it.
            </p>
          ) : (
            <div className="mt-4 divide-y divide-line">
              {visited.map((t) => (
                <TripEntry key={t.place} trip={t} reduced={reduced} />
              ))}
            </div>
          )}
        </section>

        {/* Still coming */}
        <section className="mt-20 border-t border-line pt-12 md:mt-24 md:pt-16">
          <SectionEyebrow reduced={reduced}>Still coming</SectionEyebrow>

          <div className="mt-4 divide-y divide-line">
            {wishlist.map((t) => (
              <TripEntry key={t.place} trip={t} reduced={reduced} />
            ))}
          </div>
        </section>

        {/* Help button */}
        <HelpButton reduced={reduced} />
      </div>

      {lightbox && <Lightbox image={lightbox} onClose={() => setLightbox(null)} />}

      <RantBubble />
    </PageEnter>
  );
}