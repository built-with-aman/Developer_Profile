import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useHoverInvert } from "@/hooks/useHoverInvert";
import Reveal from "@/components/Reveal";

/**
 * Work index row — full-bleed, huge type, stack rail, invert hover.
 */
export default function IndexRow({ to, index, title, tag, period, stack, status, children, delay = 0 }) {
  const inv = useHoverInvert();

  return (
    <Reveal delay={delay} y={24} pop>
      <Link
        to={to}
        className="group relative block border-b border-line py-10 transition-colors duration-300 md:py-14"
        style={inv.style}
        onMouseEnter={inv.bind.onMouseEnter}
        onMouseLeave={inv.bind.onMouseLeave}
      >
        <div className="grid gap-6 md:grid-cols-[88px_1fr_auto] md:items-end md:gap-10">
          <span className="font-display text-4xl font-bold tracking-tighter opacity-20 md:text-5xl">
            {index}
          </span>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] opacity-50">
              <span>{period}</span>
              {status && (
                <>
                  <span className="opacity-30">·</span>
                  <span className="line-clamp-1 max-w-[220px]">{status}</span>
                </>
              )}
            </div>
            <h2 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              {title}
              <span className="mt-3 block h-px max-w-0 bg-current transition-all duration-500 group-hover:max-w-[12rem]" />
            </h2>
            <p className="mt-3 text-base opacity-70 md:text-lg">{tag}</p>
            {children}
            {stack?.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {stack.map((s) => (
                  <span
                    key={s}
                    className="border border-current/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider opacity-55"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="hidden items-center justify-end md:flex">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-current/30 transition group-hover:scale-110">
              <ArrowUpRight size={20} />
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
