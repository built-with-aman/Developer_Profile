import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Sparkles, Hammer, CheckCircle2 } from "lucide-react";
import PageEnter from "@/components/PageEnter";
import Reveal from "@/components/Reveal";
import KineticHeadline from "@/components/KineticHeadline";
import ScrollLitText from "@/components/ScrollLitText";
import WorkCatalog from "@/components/cards/WorkCatalog";
import { Tabs } from "@/components/Tabs";
import { PROJECTS } from "@/data/content";

/* --- derived data --- */
const isInProgress = (p) => /progress|underway/i.test(p.status || "");
const isLive = (p) => Boolean(p.liveUrl);

/* unique stacks across all projects, sorted by frequency */
function useStacks(projects) {
  return useMemo(() => {
    const counts = new Map();
    projects.forEach((p) =>
      (p.stack || []).forEach((s) => counts.set(s, (counts.get(s) || 0) + 1))
    );
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));
  }, [projects]);
}

function StatPill({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 border border-line px-4 py-3">
      <Icon size={16} className="text-muted" />
      <div className="flex flex-col leading-tight">
        <span className="font-display text-lg font-bold tabular-nums">{value}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
          {label}
        </span>
      </div>
    </div>
  );
}

/* Stack chip row — extracted so it lives OUTSIDE <Tabs> and can't be
   swallowed by the Tabs context. Every button has type="button". */
function StackFilters({ stacks, activeStack, onPick }) {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onPick("all")}
        className={`border px-3 py-1 font-mono text-[11px] uppercase tracking-widest transition-colors ${
          activeStack === "all"
            ? "border-fg bg-fg text-bg"
            : "border-line text-muted hover:border-fg hover:text-fg"
        }`}
      >
        All stacks
      </button>

      {stacks.map(({ name, count }) => {
        // case-insensitive compare so "Node.js" === "node.js"
        const isActive =
          activeStack !== "all" &&
          activeStack.toLowerCase() === name.toLowerCase();

        return (
          <button
            key={name}
            type="button"
            onClick={() => onPick(name)}
            className={`border px-3 py-1 font-mono text-[11px] uppercase tracking-widest transition-colors ${
              isActive
                ? "border-fg bg-fg text-bg"
                : "border-line text-muted hover:border-fg hover:text-fg"
            }`}
          >
            {name} <span className="opacity-50">{count}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function Work() {
  const [params, setParams] = useSearchParams();
  const activeTab = params.get("view") || "all";
  const activeStack = params.get("stack") || "all";

  const stacks = useStacks(PROJECTS);
  const inProgress = useMemo(() => PROJECTS.filter(isInProgress), []);
  const shipped = useMemo(() => PROJECTS.filter(isLive), []);

  /* filter pipeline: tab first, then stack */
  const visible = useMemo(() => {
    let list = PROJECTS;
    if (activeTab === "active") list = inProgress;
    if (activeTab === "shipped") list = shipped;

    if (activeStack !== "all") {
      const target = activeStack.trim().toLowerCase();
      list = list.filter((p) =>
        (p.stack || []).some((s) => String(s).trim().toLowerCase() === target)
      );
    }
    return list;
  }, [activeTab, activeStack, inProgress, shipped]);

  const setTab = (view) => {
    const next = new URLSearchParams(params);
    next.set("view", view);
    setParams(next, { replace: true });
  };

  const setStack = (stack) => {
    const next = new URLSearchParams(params);
    if (!stack || stack === "all") next.delete("stack");
    else next.set("stack", stack);
    setParams(next, { replace: true });
  };

  // One combined reset — avoids the "second setParams overwrites the first" bug.
  const resetFilters = () => {
    const next = new URLSearchParams(params);
    next.set("view", "all");
    next.delete("stack");
    setParams(next, { replace: true });
  };

  return (
    <PageEnter>
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24 lg:max-w-7xl">
        {/* Eyebrow */}
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted">
            Build specs · {PROJECTS.length} entries
          </p>
        </Reveal>

        {/* Headline */}
        <KineticHeadline
          text={["Build specs."]}
          className="mt-4 max-w-3xl text-5xl tracking-tight md:text-7xl"
          radius={160}
        />

        {/* Sub copy */}
        <Reveal delay={0.12}>
          <ScrollLitText className="mt-5 max-w-lg text-base md:text-lg" spread={2.4}>
            One sheet per build. Each one opens a case study — the live link, the repo,
            and the decisions that shaped it. Filter by what's shipped, what's still
            moving, or by stack.
          </ScrollLitText>
        </Reveal>

        {/* Stat strip */}
        <Reveal delay={0.18}>
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
            <div className="bg-bg">
              <StatPill icon={CheckCircle2} label="Shipped" value={shipped.length} />
            </div>
            <div className="bg-bg">
              <StatPill icon={Hammer} label="In build" value={inProgress.length} />
            </div>
            <div className="bg-bg">
              <StatPill icon={Sparkles} label="Stacks" value={stacks.length} />
            </div>
          </div>
        </Reveal>

        {/* Tab filter — only tabs inside <Tabs> now */}
        <Tabs value={activeTab} onValueChange={setTab} className="mt-14">
          <Tabs.List className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <Tabs.Tab value="all">All ({PROJECTS.length})</Tabs.Tab>
            <Tabs.Tab value="shipped">Shipped ({shipped.length})</Tabs.Tab>
            <Tabs.Tab value="active">In build ({inProgress.length})</Tabs.Tab>
          </Tabs.List>
        </Tabs>

        {/* Stack filter — OUTSIDE <Tabs> so nothing can swallow its clicks */}
        <StackFilters
          stacks={stacks}
          activeStack={activeStack}
          onPick={setStack}
        />

        {/* Results — a single list, not three near-identical panels */}
        <div className="mt-10">
          {visible.length > 0 ? (
            <WorkCatalog projects={visible} />
          ) : (
            <EmptyState onReset={resetFilters} />
          )}
        </div>
      </div>
    </PageEnter>
  );
}

function EmptyState({ onReset }) {
  return (
    <div className="border border-dashed border-line px-6 py-16 text-center">
      <p className="font-display text-xl font-bold">Nothing matches that filter.</p>
      <p className="mt-2 text-sm text-muted">
        Try loosening the stack or switching back to all builds.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 inline-flex items-center gap-2 border border-fg px-4 py-2 font-mono text-[11px] uppercase tracking-widest hover:bg-fg hover:text-bg"
      >
        Reset filters
      </button>
    </div>
  );
}