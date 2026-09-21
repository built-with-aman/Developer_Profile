import { useEffect, useMemo, useRef, useState } from "react";
import PageEnter from "@/components/PageEnter";
import Reveal from "@/components/Reveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import LifeNav from "@/components/life/LifeNav";
import { SectionHead, clamp01, useMediaQuery } from "@/components/life/atoms";
import { HABITS } from "@/data/life";

function HabitFlow() {
  const wrapRef = useRef(null);
  const litRef = useRef(null);
  const rowRefs = useRef([]);
  const nodeState = useRef(HABITS.map(() => ({ revealed: false, startedAt: 0 })));

  const reduced = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");

  const [W, setW] = useState(0);
  const NODE_H = isMobile ? 300 : 240;
  const TOP_PAD = 80;
  const BOT_PAD = 80;
  const H = TOP_PAD + NODE_H * (HABITS.length - 1) + BOT_PAD;
  const REVEAL_MS = 600;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setW(Math.round(entry.contentRect.width)));
    ro.observe(el);
    setW(Math.round(el.getBoundingClientRect().width));
    return () => ro.disconnect();
  }, []);

  const { pathD, nodes } = useMemo(() => {
    if (!W) return { pathD: "", nodes: [] };
    const xLeft = W * (isMobile ? 0.12 : 0.2);
    const xRight = W * (isMobile ? 0.12 : 0.8);
    const pts = HABITS.map((_, i) => ({
      x: isMobile ? xLeft : i % 2 === 0 ? xLeft : xRight,
      y: TOP_PAD + i * NODE_H,
    }));
    let d = `M ${pts[0].x} 0 L ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1];
      const b = pts[i];
      const midY = (a.y + b.y) / 2;
      d += ` C ${a.x} ${midY} ${b.x} ${midY} ${b.x} ${b.y}`;
    }
    return { pathD: d, nodes: pts };
  }, [W, isMobile, NODE_H]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const lit = litRef.current;
    if (!wrap || !lit || !W) return;

    nodeState.current = HABITS.map(() => ({ revealed: false, startedAt: 0 }));

    if (reduced) {
      lit.style.strokeDashoffset = "0";
      rowRefs.current.forEach((r) => {
        if (!r) return;
        if (r.dot) {
          r.dot.style.opacity = "1";
          r.dot.style.transform = "translate(-50%, -50%) scale(1)";
        }
        if (r.body) {
          r.body.style.opacity = "1";
          r.body.style.transform = "translate3d(0, -50%, 0)";
        }
      });
      return;
    }

    let topPx = 0;
    let h = 0;
    let vh = 0;

    const measure = () => {
      vh = window.innerHeight;
      const r = wrap.getBoundingClientRect();
      topPx = r.top + window.scrollY;
      h = r.height;
    };
    measure();

    let raf = 0;
    let lastP = -1;

    const frame = () => {
      raf = 0;
      const now = performance.now();
      const sy = window.scrollY || window.pageYOffset || 0;
      const p = clamp01((sy + vh - topPx) / (h + vh));

      if (Math.abs(p - lastP) > 0.0005) {
        lastP = p;
        lit.style.strokeDashoffset = String(1 - p);
      }

      let stillAnimating = false;

      for (let i = 0; i < nodes.length; i++) {
        const r = rowRefs.current[i];
        const s = nodeState.current[i];
        if (!r || !s) continue;

        const yPct = nodes[i].y / H;

        if (!s.revealed && p >= yPct) {
          s.revealed = true;
          s.startedAt = now;
        }

        const elapsed = s.revealed ? now - s.startedAt : 0;
        const local = clamp01(elapsed / REVEAL_MS);

        if (s.revealed && local < 1) stillAnimating = true;

        if (r.dot) {
          r.dot.style.opacity = s.revealed ? "1" : "0";
          r.dot.style.transform = s.revealed
            ? "translate(-50%, -50%) scale(1)"
            : "translate(-50%, -50%) scale(0.6)";
        }

        if (r.body) {
          const onLeft = nodes[i].x < W / 2;
          const eased = 1 - Math.pow(1 - local, 3);
          const dx = (1 - eased) * (onLeft ? 20 : -20);
          r.body.style.opacity = String(eased);
          r.body.style.transform = `translate3d(${dx}px, -50%, 0)`;
        }
      }

      if (stillAnimating) raf = requestAnimationFrame(frame);
    };

    const kick = () => {
      if (raf) return;
      raf = requestAnimationFrame(frame);
    };

    const onResize = () => {
      measure();
      lastP = -1;
      kick();
    };

    frame();

    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [W, H, nodes, reduced, REVEAL_MS]);

  const setDot = (i) => (el) => {
    if (!rowRefs.current[i]) rowRefs.current[i] = {};
    rowRefs.current[i].dot = el;
  };
  const setBody = (i) => (el) => {
    if (!rowRefs.current[i]) rowRefs.current[i] = {};
    rowRefs.current[i].body = el;
  };

  return (
    <div ref={wrapRef} className="relative w-full" style={{ height: H }}>
      {W > 0 && (
        <svg
          aria-hidden
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          className="pointer-events-none absolute inset-0"
        >
          <path d={pathD} fill="none" stroke="var(--line)" strokeWidth="1" />
          <path
            ref={litRef}
            d={pathD}
            fill="none"
            stroke="var(--fg)"
            strokeWidth="1"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1}
            style={{ willChange: "stroke-dashoffset" }}
          />
        </svg>
      )}

      {W > 0 &&
        HABITS.map((habit, i) => {
          const node = nodes[i];
          const onLeft = node.x < W / 2;

          const boxStyle = isMobile
            ? { left: `${(node.x / W) * 100}%`, marginLeft: 24, right: 0 }
            : onLeft
              ? { left: `calc(${(node.x / W) * 100}% + 24px)`, right: 0, maxWidth: 400 }
              : {
                  right: `calc(${100 - (node.x / W) * 100}% + 24px)`,
                  left: 0,
                  maxWidth: 400,
                  marginLeft: "auto",
                };

          return (
            <div key={habit.key} className="absolute left-0 right-0" style={{ top: node.y }}>
              <div
                ref={setDot(i)}
                className="absolute h-2.5 w-2.5 rounded-full bg-fg opacity-0"
                style={{
                  left: node.x,
                  top: 0,
                  transform: "translate(-50%, -50%) scale(0.6)",
                  transformOrigin: "center",
                  willChange: "transform, opacity",
                }}
              />
              <div
                ref={setBody(i)}
                className="absolute top-0 opacity-0"
                style={{
                  ...boxStyle,
                  transform: `translate3d(${onLeft ? 20 : -20}px, -50%, 0)`,
                  willChange: "transform, opacity",
                }}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                    {habit.label}
                  </p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted">
                    {habit.cadence}
                  </p>
                </div>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted md:text-base">
                  {habit.note}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default function Routine() {
  return (
    <PageEnter>
      <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
        <Reveal>
          <p className="text-sm text-muted">Life · Routine</p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-6xl">
            The week isn't a schedule.
          </h1>
          <p className="mt-4 max-w-md text-muted">
            Learning, DSA, reading, rest, people. Five things that keep moving — the days
            just decide how they're distributed.
          </p>
        </Reveal>

        <div className="mt-12" />
        <LifeNav />

        <section>
          <SectionHead eyebrow="How the week runs" meta="Five habits" />
          <div className="mt-16 md:mt-24">
            <HabitFlow />
          </div>
        </section>
      </div>
    </PageEnter>
  );
}
