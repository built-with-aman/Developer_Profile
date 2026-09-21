import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import BlueprintFrame from "@/components/BlueprintFrame";
import ProximityRow from "@/components/ProximityRow";

export default function WorkCatalog({ projects }) {
  return (
    <div className="mt-10 space-y-5">
      {projects.map((p, i) => (
        <Reveal key={p.id} delay={i * 0.05} y={18}>
          <ProximityRow radius={220} axis="y" falloff={1.5}>
            <Link to={`/work/${p.id}`} className="group block">
              <BlueprintFrame
                label={`SPEC / ${p.id}`}
                className="border border-line bg-surface p-5 transition-colors duration-500 group-hover:border-fg/40 md:p-8"
              >
                {/* Top row: index + period + status */}
                <div className="relative z-[1] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="prox-index font-mono text-xs tabular-nums">{p.index}</span>
                    <span className="prox-meta font-mono text-[10px] uppercase text-muted">
                      {p.period}
                    </span>
                  </div>
                  <span className="border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted transition-colors duration-300 group-hover:border-fg/40 group-hover:text-fg">
                    {p.status?.includes("progress") || p.status?.includes("underway")
                      ? "IN BUILD"
                      : "ENTRY"}
                  </span>
                </div>

                {/* Main grid */}
                <div className="relative z-[1] mt-6 grid gap-6 md:grid-cols-12 md:gap-8">
                  <div className="md:col-span-7">
                    <h2 className="prox-title font-display text-3xl transition-colors duration-300 md:text-5xl">
                      {p.name}
                    </h2>
                    <span aria-hidden className="prox-rule mt-4 block w-full" />
                    <p className="prox-body mt-4 text-sm text-muted md:text-base">{p.tag}</p>
                    <p className="prox-body mt-3 max-w-xl text-sm leading-relaxed text-muted line-clamp-2">
                      {p.desc}
                    </p>
                  </div>

                  <div className="md:col-span-5 md:border-l md:border-line md:pl-8">
                    <p className="prox-meta font-mono text-[10px] uppercase text-muted">
                      Parameters
                    </p>
                    <dl className="mt-3 space-y-0 font-mono text-xs">
                      <div className="flex justify-between gap-4 border-b border-line py-2.5">
                        <dt className="text-muted">Stack</dt>
                        <dd className="text-right">{p.stack?.slice(0, 3).join(" · ")}</dd>
                      </div>
                      <div className="flex justify-between gap-4 border-b border-line py-2.5">
                        <dt className="text-muted">Status</dt>
                        <dd className="text-right">{p.status?.split("—")[0]?.trim()}</dd>
                      </div>
                      <div className="flex items-center justify-between gap-4 py-2.5">
                        <dt className="text-muted">Case study</dt>
                        <dd className="flex items-center gap-1">
                          Open
                          <ArrowUpRight size={13} className="prox-arrow" />
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                {/* ============ CLICK TO KNOW MORE STRIP ============ */}
                <div className="relative z-[1] mt-6 flex items-center justify-between gap-4 overflow-hidden border-t border-line pt-4">
                  {/* subtle sweep on hover */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-fg/[0.04] to-transparent transition-transform duration-[1200ms] ease-out group-hover:translate-x-full"
                  />
                  <span className="relative font-mono text-[10px] uppercase tracking-[0.3em] text-muted transition-colors duration-300 group-hover:text-fg">
                    Click to know more
                  </span>
                  <span className="relative flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted transition-colors duration-300 group-hover:text-fg">
                    Open case study
                    <ArrowUpRight
                      size={13}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </BlueprintFrame>
            </Link>
          </ProximityRow>
        </Reveal>
      ))}
    </div>
  );
}