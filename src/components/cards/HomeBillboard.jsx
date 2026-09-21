import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

/**
 * HOME ONLY — kinetic ticker + focus stage.
 * Pure black & white. No accent colors.
 */
export default function HomeBillboard({ projects }) {
  const [active, setActive] = useState(0);
  const p = projects[active] || projects[0];
  if (!p) return null;

  const ticker = [...projects, ...projects];

  return (
    <div className="mt-14">
      <div className="relative overflow-hidden border-y border-line py-3">
        <div className="ticker-track gap-10 px-4">
          {ticker.map((item, i) => (
            <button
              key={`${item.id}-${i}`}
              type="button"
              onClick={() => setActive(projects.findIndex((x) => x.id === item.id))}
              className={
                "shrink-0 font-display text-sm font-semibold tracking-wide transition " +
                (item.id === p.id ? "text-fg" : "text-muted hover:text-fg")
              }
            >
              <span className="mr-2 font-mono text-[10px] text-muted">{item.index}</span>
              {item.name}
              <span className="mx-6 text-muted/40">/</span>
            </button>
          ))}
        </div>
      </div>

      <Reveal y={24}>
        <div className="relative grid border-b border-line md:grid-cols-12">
          <div className="flex items-end border-b border-line p-6 md:col-span-3 md:border-b-0 md:border-r md:p-10">
            <span className="font-display text-[6rem] font-bold leading-none tracking-tighter text-fg/10 md:text-[8rem]">
              {p.index}
            </span>
          </div>

          <div className="flex flex-col justify-between p-6 md:col-span-6 md:p-10">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                ● {p.status?.split("—")[0]?.trim() || "Build"}
              </p>
              <h3 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
                {p.name}
              </h3>
              <p className="mt-2 text-muted">{p.tag}</p>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted md:text-base">
                {p.desc}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to={`/work/${p.id}`}
                className="inline-flex items-center gap-2 bg-fg px-5 py-3 text-sm font-semibold text-bg transition hover:opacity-90"
              >
                Open case study <ArrowRight size={16} />
              </Link>
              <div className="flex flex-wrap gap-2">
                {p.stack?.slice(0, 4).map((s) => (
                  <span key={s} className="border border-line px-2 py-1 font-mono text-[10px] text-muted">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex border-t border-line md:col-span-3 md:flex-col md:border-l md:border-t-0">
            {projects.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(i)}
                className={
                  "flex flex-1 flex-col justify-center border-line px-5 py-4 text-left transition md:border-b md:last:border-b-0 " +
                  (i === active ? "bg-fg text-bg" : "text-muted hover:bg-surface hover:text-fg")
                }
              >
                <span className="font-mono text-[10px] opacity-60">{item.index}</span>
                <span className="mt-1 font-display text-lg font-semibold tracking-tight">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
