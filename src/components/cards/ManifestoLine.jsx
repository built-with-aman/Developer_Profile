import Reveal from "@/components/Reveal";
import { useHoverInvert } from "@/hooks/useHoverInvert";

/**
 * Premium principle block — oversized index, editorial measure, invert on hover.
 */
export default function ManifestoLine({ num, title, text, foot, delay = 0 }) {
  const inv = useHoverInvert();

  return (
    <Reveal delay={delay} y={28}>
      <article
        className="group relative grid gap-8 border-t border-line py-14 transition-colors duration-300 md:grid-cols-[140px_1fr] md:gap-12 md:py-20"
        style={inv.style}
        onMouseEnter={inv.bind.onMouseEnter}
        onMouseLeave={inv.bind.onMouseLeave}
      >
        <div className="md:pt-1">
          <span className="font-display text-5xl font-bold tracking-tighter opacity-25 md:text-7xl">
            {num}
          </span>
        </div>
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl md:leading-[1.1]">
            {title}
          </h2>
          <p className="mt-6 text-base leading-[1.75] opacity-70 md:text-lg md:leading-[1.8]">
            {text}
          </p>
          {foot && (
            <p className="mt-6 font-mono text-xs tracking-wide opacity-40">// {foot}</p>
          )}
        </div>
      </article>
    </Reveal>
  );
}
