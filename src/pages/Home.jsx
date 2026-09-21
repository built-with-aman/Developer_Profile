import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Info, X, Github, MapPin, IndianRupee, Compass } from "lucide-react";
import { motion, useInView } from "motion/react";
import PageEnter from "@/components/PageEnter";
import Reveal from "@/components/Reveal";
import KineticHeadline from "@/components/KineticHeadline";
import ScrollLitText from "@/components/ScrollLitText";
import HalftoneField from "@/components/HalftoneField";
import Odometer from "@/components/Odometer";
import SweepButton from "@/components/SweepButton";
import InvertBand from "@/components/InvertBand";
import Filmstrip from "@/components/Filmstrip";
import BlueprintFrame from "@/components/BlueprintFrame";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { PROJECTS } from "@/data/content";

const EASE = [0.22, 1, 0.36, 1];

const MARQUEE = [
  "React",
  "Node.js",
  "REST APIs",
  "MySQL",
  "JavaScript",
  "Express",
  "Tailwind CSS",
  "MongoDB",
  "Git",
  "DSA",
  "SQL",
  "Artificial Intelligence",
  "Prompting",
  "Content Creation",
  "Video Editing",
];

/* ─────────────────────────────────────────────────────────────
   ABOUT-THIS-SITE — floating button + popup
   ───────────────────────────────────────────────────────────── */
function AboutSite() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="What's this?"
        className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 border border-line bg-bg/85 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted backdrop-blur transition-colors hover:border-fg hover:text-fg md:bottom-7 md:right-7"
      >
        <Info size={13} className="transition-transform group-hover:rotate-12" />
        <span className="hidden sm:inline">Read the room</span>
        <span className="sm:hidden">i</span>
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-line bg-bg p-6 text-fg sm:p-8 md:p-10"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center border border-line text-muted transition-colors hover:border-fg hover:text-fg"
            >
              <X size={16} />
            </button>

            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
              Meta · About this site
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight md:text-3xl">
              What this is.
            </h2>

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted md:text-base">
              <p>
                Not a template. No mascot. No parallax for its own sake. No banner in
                the corner asking you to hire me. A dark screen, sharp type, work that
                either ships or doesn't.
              </p>

              <p>
                Built with opinions and AI in equal measure — a person who reads every
                diff, and tools that don't get tired. Every animation was argued over.
                Every spacing value was nudged twice. Nothing was left "close enough."
              </p>

              <p>Not perfect. Deliberate. There's a difference.</p>

              <p className="text-fg">Stack:</p>

              <div className="flex flex-wrap gap-2">
                {[
                  "React",
                  "Vite",
                  "Tailwind CSS",
                  "motion/react",
                  "React Router",
                  "Lucide Icons",
                  "Custom animations",
                  "No component library",
                ].map((t) => (
                  <span
                    key={t}
                    className="border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <p>
                Maintained with the quiet stubbornness of someone who reads their own
                diff.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-line pt-6">
              <a
                href="https://github.com/built-with-aman"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted transition-colors hover:border-fg hover:bg-fg hover:text-bg"
              >
                <Github size={14} />
                Source on GitHub
              </a>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted/60">
                built-with-aman / profile-site
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   INTENT CARD — cursor-tracked spotlight + hover border
   ───────────────────────────────────────────────────────────── */
function IntentCard({ index, label, icon: Icon, children, delay = 0 }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [hover, setHover] = useState(false);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <Reveal delay={delay}>
      <article
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="group relative h-full overflow-hidden border border-line bg-bg p-6 transition-colors duration-500 hover:border-fg/40 md:p-8"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: hover ? 1 : 0,
            background:
              "radial-gradient(360px circle at var(--mx) var(--my), rgba(255,255,255,0.08), transparent 60%)",
            ["--mx"]: `${pos.x}%`,
            ["--my"]: `${pos.y}%`,
          }}
        />

        <span
          aria-hidden
          className="pointer-events-none absolute -right-2 bottom-2 select-none font-display text-[5.5rem] font-bold leading-none tracking-tighter opacity-[0.05] transition-opacity duration-500 group-hover:opacity-[0.09]"
        >
          {index}
        </span>

        <div className="relative z-[1] flex h-full flex-col">
          <div className="flex items-center gap-2 text-muted">
            {Icon && <Icon size={14} />}
            <p className="font-mono text-[10px] uppercase tracking-[0.3em]">
              {index} · {label}
            </p>
          </div>
          <div className="mt-6">{children}</div>
        </div>
      </article>
    </Reveal>
  );
}

/* ─────────────────────────────────────────────────────────────
   INTENT ARTICLE — "The brief"
   ───────────────────────────────────────────────────────────── */
function IntentArticle() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2, once: true });
  const reduced = usePrefersReducedMotion();

  const PRINCIPLES = [
    {
      n: "01",
      t: "Reads the diff",
      d: "Before the PR. Before the review. Every time.",
    },
    {
      n: "02",
      t: "Asks early",
      d: "A two-minute question beats a two-day guess.",
    },
    {
      n: "03",
      t: "Ships working",
      d: "Then refines. Perfect is the enemy of merged.",
    },
    {
      n: "04",
      t: "AI as a power tool",
      d: "Used hard. Reviewed line by line. Owned end to end.",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative z-[1] border-b border-line bg-bg py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial={reduced ? false : { scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.1, ease: EASE }}
          style={{ transformOrigin: "left" }}
          className="h-px w-full bg-line"
        />

        <div className="mt-8 flex flex-wrap items-baseline justify-between gap-4">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
              Chapter 02 · The brief
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted/70">
              Intent, in plain terms
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            What I want.{" "}
            <span className="text-muted">Stated once, in plain English.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-10 grid gap-8 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-7">
              <p className="text-base leading-relaxed text-muted md:text-lg">
                <span className="float-left mr-3 mt-1 font-display text-5xl font-bold leading-none text-fg md:text-6xl">
                  I
                </span>
                don't have a full-time SDE title yet. What I do have: three hundred
                problems logged in a failure journal, projects that run in production,
                and a habit of shipping code that works rather than code that merely
                looks like it might. The first seat is the one I'm here for — the one
                where learning in public is the job description, not a perk.
              </p>

              <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
                No preamble, then. I'll move for the right team. I know what a first seat
                is worth. I know what I want the next five years to build.
              </p>
            </div>

            <div className="md:col-span-5 md:pt-2">
              <div className="group relative border-l-2 border-line pl-6">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -left-1 -top-6 select-none font-display text-[6rem] leading-none text-fg/10 transition-transform duration-700 group-hover:scale-110"
                >
                  &ldquo;
                </span>
                <p className="relative font-display text-xl font-semibold leading-snug tracking-tight md:text-2xl">
                  Give me a hard problem, teammates who tell the truth, and a codebase
                  that doesn't flinch. I'll do the same.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  On AI, plainly: I use it hard, read every line, and own what ships.
                </p>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                  — A.&nbsp;SONI
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <IntentCard index="01" label="Mobility" icon={MapPin} delay={0.05}>
            <p className="font-display text-2xl font-bold leading-tight tracking-tight md:text-3xl">
              Open to relocate.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
              Good teams beat familiar cities. I'll pack light, be useful on day one,
              and know the local coffee by week two.
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted/70">
              Bengaluru · Hyderabad · Pune · Remote-first
            </p>
          </IntentCard>

          <IntentCard index="02" label="Compensation" icon={IndianRupee} delay={0.12}>
            <div className="flex items-baseline gap-2">
              <Odometer
                value={6}
                suffix=" LPA"
                className="font-display text-4xl font-bold tracking-tight md:text-5xl"
              />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
              In hand — the floor, not the ceiling. Without a full-time SDE title on the
              résumé, that's the honest number for a first seat. Everything after it is
              earned on the job.
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted/70">
              Minimum expectation · in-hand
            </p>
          </IntentCard>

          <IntentCard index="03" label="Five-year mindset" icon={Compass} delay={0.19}>
            <p className="font-display text-2xl font-bold leading-tight tracking-tight md:text-3xl">
              Learn. Connect. Go deep.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
              Five years out: skills I can't predict today, a network built across teams
              I haven't met yet, and a career deep in this stream — senior engineer, or
              product developer who owns what ships.
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted/70">
              Senior engineer · product developer
            </p>
          </IntentCard>
        </div>

        <Reveal delay={0.22}>
          <div className="mt-16 border-t border-line pt-10 md:mt-20">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
                How I work
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted/60">
                Four rules, no exceptions
              </p>
            </div>

            <div className="mt-8 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {PRINCIPLES.map((p) => (
                <div
                  key={p.n}
                  className="group bg-bg p-6 transition-colors duration-500 hover:bg-surface md:p-7"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted/70">
                    {p.n}
                  </p>
                  <p className="mt-4 font-display text-lg font-bold tracking-tight md:text-xl">
                    {p.t}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.26} className="mt-16 border-t border-line pt-10 md:mt-20">
          <ScrollLitText
            className="max-w-4xl font-display text-2xl font-semibold leading-snug tracking-tight md:text-4xl"
            spread={3}
          >
            Titles will follow the work. The work is already happening.
          </ScrollLitText>
        </Reveal>

        <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-3">
          <SweepButton to="/contact" variant="solid">
            Talk to me <ArrowRight size={16} />
          </SweepButton>
          <SweepButton
            href="/resume.pdf"
            variant="line"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download resume <ArrowUpRight size={15} />
          </SweepButton>
        </Reveal>
      </div>
    </section>
  );
}

/* ── MODAL (project) ─────────────────────────────────────── */
function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        background: "rgba(0, 0, 0, 0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#0b0f19",
          color: "#e8edf7",
          maxWidth: "640px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          border: "1px solid rgba(255,255,255,0.15)",
          padding: "1.75rem",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            width: "36px",
            height: "36px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "transparent",
            color: "#e8edf7",
            cursor: "pointer",
            fontSize: "18px",
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        <p style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.6, marginBottom: "0.5rem" }}>
          SPEC / {project.id} · {project.period}
        </p>
        <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.25rem" }}>
          {project.name}
        </h2>
        <p style={{ fontSize: "0.9rem", opacity: 0.7, marginBottom: "1.5rem" }}>
          {project.tag}
        </p>

        <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.6 }}>
          ● {project.status}
        </p>

        <p style={{ fontSize: "0.95rem", lineHeight: 1.7, opacity: 0.85, marginTop: "1.5rem" }}>
          {project.desc}
        </p>

        {project.highlights?.length > 0 && (
          <div style={{ marginTop: "2rem" }}>
            <p style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.6, marginBottom: "1rem" }}>
              Notes
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {project.highlights.map((h, i) => (
                <li key={i} style={{ display: "flex", gap: "0.75rem", fontSize: "0.9rem", lineHeight: 1.6, opacity: 0.85, marginBottom: "0.75rem" }}>
                  <span style={{ opacity: 0.4, fontFamily: "monospace", flexShrink: 0 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.stack?.length > 0 && (
          <div style={{ marginTop: "2rem" }}>
            <p style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.6, marginBottom: "1rem" }}>
              Stack
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {project.stack.map((s) => (
                <span key={s} style={{ border: "1px solid rgba(255,255,255,0.2)", padding: "0.25rem 0.6rem", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.75 }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {project.note && (
          <p style={{ marginTop: "2rem", paddingLeft: "1rem", borderLeft: "2px solid rgba(255,255,255,0.2)", fontSize: "0.9rem", fontStyle: "italic", opacity: 0.7 }}>
            {project.note}
          </p>
        )}

        <div style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          
          {/* YAHAN FIX KIYA GAYA HAI: <a> ko <Link> se replace kiya gaya hai */}
          <Link
            to={`/work/${project.id}`}
            onClick={onClose}
            style={{ 
              background: "#e8edf7", 
              color: "#0b0f19", 
              padding: "0.6rem 1rem", 
              fontSize: "11px", 
              letterSpacing: "0.2em", 
              textTransform: "uppercase", 
              textDecoration: "none", 
              fontWeight: 600,
              display: "inline-block" // Padding ke liye zaroori hai
            }}
          >
            Full case study →
          </Link>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ border: "1px solid rgba(255,255,255,0.2)", color: "#e8edf7", padding: "0.6rem 1rem", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}
            >
              Source
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── FRAME ──────────────────────────────────────────────── */
function Frame({ project, isActive }) {
  return (
    <BlueprintFrame
      label={`SPEC / ${project.id}`}
      active={isActive}
      className={
        "h-[300px] w-[72vw] max-w-[380px] shrink-0 bg-surface p-6 transition-colors duration-500 md:h-[340px] md:w-[340px] md:p-8 " +
        (isActive ? "border border-line" : "border border-line/60")
      }
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-1 bottom-2 select-none font-display text-[7rem] font-bold leading-none tracking-tighter opacity-[0.06]"
      >
        {project.index}
      </span>

      <div className="relative z-[1] flex h-full flex-col">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          {project.period}
        </p>
        <h3 className="mt-4 font-display text-3xl font-bold tracking-tight">{project.name}</h3>
        <p className="mt-2 text-sm text-muted">{project.tag}</p>
        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted">{project.desc}</p>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
          {project.stack?.slice(0, 4).map((s) => (
            <span
              key={s}
              className="border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </BlueprintFrame>
  );
}

/* ── LIVE BUILDS ────────────────────────────────────────── */
function LiveBuilds({ active, setActive, current, onOpenProject }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.15, once: true });
  const reduced = usePrefersReducedMotion();

  return (
    <section ref={ref} className="relative z-[1] py-20 md:py-28">
      <motion.div
        className="mx-auto max-w-6xl px-5 md:px-8"
        initial={reduced ? false : { opacity: 0, x: 80 }}
        animate={reduced ? { opacity: 1, x: 0 } : inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
        transition={{ duration: 1.5, ease: EASE }}
      >
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
            Chapter 03 · Build log
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl">
            Live builds.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-8 border-t border-line pt-10 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              ● {current.status?.split("—")[0]?.trim() || "Build"}
            </p>
            <h3 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-5xl">
              {current.name}
            </h3>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted md:text-base">
              {current.desc}
            </p>
          </div>
          <div className="flex items-end md:col-span-5 md:justify-end">
            <SweepButton to={`/work/${current.id}`} variant="solid">
              Open case study <ArrowRight size={16} />
            </SweepButton>
          </div>
        </div>

        <div className="mt-16 flex items-center gap-2 md:mt-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
            Drag · scroll
          </p>
          <ArrowRight
            size={14}
            className="text-muted motion-safe:animate-pulse"
            aria-hidden
          />
        </div>

        <div className="mt-4">
          <Filmstrip
            items={PROJECTS}
            active={active}
            onActive={setActive}
            align="start"
            onFrameClick={(item) => onOpenProject(item)}
            renderFrame={(project, i, isActive) => (
              <Frame project={project} isActive={isActive} />
            )}
          />
        </div>

        <div className="mt-16 md:mt-20">
          <Link
            to="/work"
            className="group inline-flex items-center gap-3 border-b border-line pb-1 font-display text-lg font-semibold tracking-tight transition-colors hover:border-fg"
          >
            Full spec index
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

/* ── HOME ───────────────────────────────────────────────── */
export default function Home() {
  const [active, setActive] = useState(0);
  const [modalProject, setModalProject] = useState(null);
  const current = PROJECTS[active] || PROJECTS[0];

  return (
    <PageEnter>
      <HalftoneField opacity={0.55} reveal={340} />

      <section className="relative z-[1] mx-auto max-w-6xl px-5 pb-20 pt-16 md:px-8 md:pb-24 md:pt-24">
        <Reveal>
          <p className="inline-flex items-center gap-2 border border-line bg-surface px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
            <span className="h-1.5 w-1.5 bg-fg" />
            Open · SDE 2026
          </p>
        </Reveal>

        <KineticHeadline
          text={["Engineer", "who ships."]}
          className="mt-8 max-w-4xl text-6xl leading-[0.95] tracking-tight md:text-8xl lg:text-[7.5rem]"
          radius={170}
          min={500}
          max={800}
          lift={8}
        />

        <ScrollLitText className="mt-8 max-w-2xl text-lg leading-relaxed md:text-xl" spread={3}>
          Ships responsive React interfaces and full-stack systems — Node.js, REST APIs,
          MySQL. DSA in a failure journal. Pattern recognition over memorization.
        </ScrollLitText>

        <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
          <SweepButton to="/work" variant="solid">
            View work <ArrowRight size={16} />
          </SweepButton>
          <SweepButton to="/contact" variant="line">Get in touch</SweepButton>
          <SweepButton href="/resume.pdf" variant="line" target="_blank" rel="noopener noreferrer">
            Resume <ArrowUpRight size={15} />
          </SweepButton>
        </Reveal>
      </section>

      <InvertBand
        items={MARQUEE}
        speed={38}
        className="relative z-[1] bg-bg"
        renderItem={(label) => (
          <span className="flex items-center gap-10">
            <span className="font-display text-xl font-semibold tracking-tight md:text-2xl">
              {label}
            </span>
            <span className="text-muted">/</span>
          </span>
        )}
      />

      <section className="relative z-[1] border-b border-line bg-surface">
        <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="px-5 py-10 md:px-8 md:py-12">
            <Odometer value={300} suffix="+" className="font-display text-4xl font-bold tracking-tight md:text-5xl" />
            <p className="mt-3 text-sm text-muted">Problems in the log</p>
          </div>
          <div className="px-5 py-10 md:px-8 md:py-12">
            <Odometer value={PROJECTS.length} className="font-display text-4xl font-bold tracking-tight md:text-5xl" />
            <p className="mt-3 text-sm text-muted">Projects in production</p>
          </div>
          <div className="px-5 py-10 md:px-8 md:py-12">
            <p className="font-display text-4xl font-bold tracking-tight md:text-5xl">SDE</p>
            <p className="mt-3 text-sm text-muted">First role · target 2026</p>
          </div>
        </div>
      </section>

      <IntentArticle />

      <LiveBuilds
        active={active}
        setActive={setActive}
        current={current}
        onOpenProject={setModalProject}
      />

      <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />

      <AboutSite />
    </PageEnter>
  );
}