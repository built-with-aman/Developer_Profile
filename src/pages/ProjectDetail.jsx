import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown, Github, ExternalLink, Play } from "lucide-react";
import PageEnter from "@/components/PageEnter";
import SplitReveal from "@/components/SplitReveal";
import Reveal from "@/components/Reveal";
import DetailChapter from "@/components/cards/DetailChapter";
import { PROJECTS } from "@/data/content";

/* ============ SCROLL PROGRESS BAR ============ */
function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-50 h-[2px] bg-transparent">
      <div
        className="h-full origin-left bg-fg transition-transform duration-100 ease-out"
        style={{ transform: `scaleX(${p})` }}
      />
    </div>
  );
}

/* ============ WORKING DEMO DROPDOWN ============ */
function DemoDropdown({ demoVideo }) {
  const [open, setOpen] = useState(false);

  if (!demoVideo?.src) {
    return (
      <div className="group relative overflow-hidden border border-dashed border-line p-6 text-sm text-muted transition-colors duration-500 hover:border-fg/40">
        {/* shimmer sweep on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-fg/5 to-transparent transition-transform duration-[1400ms] ease-out group-hover:translate-x-full"
        />
        <div className="relative">
          <p className="font-medium text-fg">Live demo video</p>
          <p className="mt-2">
            No video yet — add <code className="font-mono text-xs">demoVideo</code> on this project in{" "}
            <code className="font-mono text-xs">content.js</code> (local mp4 or YouTube embed).
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-line transition-colors duration-300 hover:border-fg/30">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-surface"
      >
        <span className="flex items-center gap-3 font-medium">
          <span className="relative flex h-4 w-4 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-fg/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <Play size={16} className="relative transition-transform duration-300 group-hover:scale-110" />
          </span>
          {open ? "Hide live walkthrough" : "Show live walkthrough"}
        </span>
        <ChevronDown
          size={18}
          className={"shrink-0 transition-transform duration-300 " + (open ? "rotate-180" : "")}
        />
      </button>
      {open && (
        <div className="border-t border-line bg-surface p-4 md:p-6">
          {demoVideo.type === "embed" ? (
            <div className="aspect-video w-full overflow-hidden bg-bg">
              <iframe
                title="Project demo"
                src={demoVideo.src}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <video
              className="aspect-video w-full bg-bg"
              controls
              playsInline
              poster={demoVideo.poster}
              src={demoVideo.src}
            >
              Your browser does not support the video tag.
            </video>
          )}
          {demoVideo.caption && (
            <p className="mt-3 text-sm text-muted">{demoVideo.caption}</p>
          )}
        </div>
      )}
    </div>
  );
}

/* ============ LINK PILL ============ */
function LinkPill({ href, icon: Icon, label, emptyLabel }) {
  if (!href) {
    return (
      <span className="inline-flex items-center gap-2 border border-dashed border-line px-4 py-2.5 text-sm text-muted">
        <Icon size={16} />
        {emptyLabel}
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center gap-2 overflow-hidden border border-line bg-fg px-4 py-2.5 text-sm font-medium text-bg transition-transform duration-300 hover:-translate-y-0.5"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
      <Icon size={16} className="relative" />
      <span className="relative">{label}</span>
      <ArrowUpRight
        size={14}
        className="relative transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}

/* ============ NAV CARD (prev / next) ============ */
function NavCard({ to, dir, project }) {
  const isNext = dir === "next";
  return (
    <Link
      to={to}
      className={`group relative overflow-hidden border border-line p-5 transition-all duration-300 hover:-translate-y-1 hover:border-fg ${
        isNext ? "text-right" : ""
      }`}
    >
      {/* hover glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: isNext
            ? "radial-gradient(400px circle at 100% 50%, rgba(255,255,255,0.06), transparent 60%)"
            : "radial-gradient(400px circle at 0% 50%, rgba(255,255,255,0.06), transparent 60%)",
        }}
      />
      <div className="relative">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
          {isNext ? "Next" : "Previous"}
        </p>
        <p className={`mt-2 flex items-center gap-2 font-display text-lg font-semibold ${isNext ? "justify-end" : ""}`}>
          {!isNext && (
            <ArrowLeft
              size={16}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
          )}
          <span className="transition-colors duration-300">{project.name}</span>
          {isNext && (
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          )}
        </p>
      </div>
    </Link>
  );
}

/* ============ MAIN ============ */
export default function ProjectDetail() {
  const { id } = useParams();
  const idx = PROJECTS.findIndex((x) => x.id === id);
  const p = PROJECTS[idx];
  const prev = idx > 0 ? PROJECTS[idx - 1] : null;
  const next = idx >= 0 && idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : null;

  if (!p) {
    return (
      <div className="mx-auto max-w-4xl px-5 py-24 text-center">
        <p className="text-muted">Project not found.</p>
        <Link to="/work" className="mt-4 inline-block underline">
          Back to work
        </Link>
      </div>
    );
  }

  return (
    <PageEnter>
      <ScrollProgress />

      {/* Ambient top glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[70vh]"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(255,255,255,0.045), transparent 70%)",
        }}
      />

      <article className="relative mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <Reveal>
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft
              size={16}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            All work
          </Link>
        </Reveal>

        <Reveal delay={0.05} className="mt-10">
          <p className="font-mono text-xs text-muted">
            {p.index} · {p.period}
          </p>
        </Reveal>

        <SplitReveal
          className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
          delay={0.08}
          lines={[p.name]}
        />

        <Reveal delay={0.15}>
          <p className="mt-3 text-lg text-muted md:text-xl">{p.tag}</p>
        </Reveal>

        <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-3">
          <LinkPill
            href={p.liveUrl}
            icon={ExternalLink}
            label="Live project"
            emptyLabel="Live link — add liveUrl"
          />
          <LinkPill
            href={p.githubUrl}
            icon={Github}
            label="GitHub"
            emptyLabel="GitHub — add githubUrl"
          />
        </Reveal>

        <Reveal delay={0.22} className="mt-6 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span
              key={s}
              className="border border-line px-3 py-1 font-mono text-xs text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-fg hover:text-fg"
            >
              {s}
            </span>
          ))}
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mt-4 text-sm font-medium">{p.status}</p>
        </Reveal>

        <Reveal delay={0.28} className="mt-12">
          <h2 className="mb-4 font-display text-xl font-semibold md:text-2xl">Working demo</h2>
          <DemoDropdown demoVideo={p.demoVideo} />
        </Reveal>

        <Reveal delay={0.3} className="mt-12">
          <p className="max-w-3xl text-lg leading-relaxed text-muted md:text-xl">{p.desc}</p>
          {p.note && <p className="mt-6 font-mono text-sm text-muted">// {p.note}</p>}
        </Reveal>

        {p.highlights?.length > 0 && (
          <div className="mt-16 max-w-3xl">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold">Chapters</h2>
            </Reveal>
            <div className="mt-8 space-y-8">
              {p.highlights.map((h, i) => (
                <DetailChapter key={i} num={String(i + 1).padStart(2, "0")} delay={i * 0.05}>
                  {h}
                </DetailChapter>
              ))}
            </div>
          </div>
        )}

        {p.media?.length > 0 && (
          <div className="mt-16">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold">Media</h2>
            </Reveal>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {p.media.map((m, i) =>
                m.type === "image" ? (
                  <Reveal key={i} delay={i * 0.05}>
                    <img src={m.src} alt={m.alt || p.name} className="w-full border border-line" />
                    {m.caption && <p className="mt-2 text-sm text-muted">{m.caption}</p>}
                  </Reveal>
                ) : null
              )}
            </div>
          </div>
        )}

        <div className="mt-20 grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
          {prev ? <NavCard to={`/work/${prev.id}`} dir="prev" project={prev} /> : <div />}
          {next ? <NavCard to={`/work/${next.id}`} dir="next" project={next} /> : null}
        </div>
      </article>
    </PageEnter>
  );
}