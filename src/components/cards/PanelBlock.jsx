import Reveal from "@/components/Reveal";
import ProximityRow from "@/components/ProximityRow";

/**
 * PanelBlock — a logbook entry, not a manifesto line.
 *
 * ManifestoLine inverts on hover because a principle is a statement you plant
 * a flag on. This page is the opposite register — the unglamorous routine
 * behind the resume — so it gets a quieter treatment: a timestamp rail that
 * fills in as the cursor nears, the way a log fills in as the day happens.
 * No colour inversion, no lift. Reading is the whole interaction.
 */
export default function PanelBlock({ kicker, title, text, delay = 0 }) {
  return (
    <Reveal delay={delay} y={20}>
      <ProximityRow radius={190} axis="y" falloff={1.6} className="block">
        <div className="grid grid-cols-[auto_1fr] gap-5 border-t border-line py-7 md:gap-8 md:py-9">
          {/* Timestamp rail: a tick mark that grows into a full rule as the
              cursor approaches, and a kicker that gains weight with it. */}
          <div className="relative flex w-20 flex-col items-start pt-1 md:w-28">
            <span
              aria-hidden
              className="prox-rule absolute left-0 top-1.5 h-px w-3 origin-left"
              style={{ transform: "scaleX(calc(0.3 + var(--prox, 0) * 2.2))" }}
            />
            <p className="prox-meta mt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
              {kicker}
            </p>
          </div>

          <div className="min-w-0 max-w-xl">
            <h2 className="prox-title font-display text-2xl font-bold tracking-tight md:text-3xl">
              {title}
            </h2>
            <p className="prox-body mt-3 text-sm leading-relaxed text-muted md:text-base">
              {text}
            </p>
          </div>
        </div>
      </ProximityRow>
    </Reveal>
  );
}
