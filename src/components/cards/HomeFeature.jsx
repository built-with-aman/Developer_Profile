import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useHoverInvert } from "@/hooks/useHoverInvert";
import { usePopHover } from "@/hooks/usePopHover";
import Reveal from "@/components/Reveal";

/**
 * Home project tile — oversized index, stack chips, arrow cue, invert + pop.
 */
export default function HomeFeature({ to, index, name, tag, desc, stack = [], delay = 0, featured = false }) {
  const inv = useHoverInvert();
  const pop = usePopHover({ scale: 1.015, y: -4 });

  return (
    <Reveal delay={delay} y={32} pop>
      <Link
        to={to}
        className={
          "group relative flex h-full flex-col overflow-hidden border border-line bg-surface " +
          (featured ? "md:min-h-[420px] p-8 md:p-12" : "min-h-[280px] p-6 md:p-8")
        }
        style={{ ...inv.style, ...pop.style }}
        onMouseEnter={() => {
          inv.bind.onMouseEnter();
          pop.bind.onMouseEnter();
        }}
        onMouseLeave={() => {
          inv.bind.onMouseLeave();
          pop.bind.onMouseLeave();
        }}
      >
        {/* Giant watermark index */}
        <span
          aria-hidden
          className={
            "pointer-events-none absolute -right-2 -top-4 font-display font-bold leading-none tracking-tighter opacity-[0.07] " +
            (featured ? "text-[10rem] md:text-[14rem]" : "text-[7rem] md:text-[9rem]")
          }
        >
          {index}
        </span>

        <div className="relative z-[1] flex flex-1 flex-col">
          <div className="flex items-start justify-between gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-50">{index}</span>
            <ArrowUpRight
              size={featured ? 22 : 18}
              className="opacity-40 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
            />
          </div>

          <h3
            className={
              "mt-auto pt-10 font-display font-bold tracking-tight " +
              (featured ? "text-4xl md:text-5xl lg:text-6xl" : "text-2xl md:text-3xl")
            }
          >
            {name}
          </h3>
          <p className="mt-2 text-sm opacity-60 md:text-base">{tag}</p>
          <p
            className={
              "mt-4 leading-relaxed opacity-70 " +
              (featured ? "max-w-md text-base md:text-lg line-clamp-3" : "text-sm line-clamp-2")
            }
          >
            {desc}
          </p>

          {stack?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {stack.slice(0, featured ? 5 : 3).map((s) => (
                <span
                  key={s}
                  className="border border-current/25 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider opacity-60"
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </Reveal>
  );
}
