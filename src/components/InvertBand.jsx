import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * InvertBand — a ticker with a fixed reading window cut into it.
 *
 * The band doesn't move and the band has no content of its own. It inverts
 * whatever scrolls underneath it (backdrop-filter: invert), so names flip from
 * white-on-black to black-on-white mid-word as they cross the threshold and
 * flip back on the way out. One declaration does the work, which means the two
 * halves can never fall out of sync the way stacked duplicate tracks do.
 *
 * In a two-colour system this is the closest thing to a highlight you can build.
 */
export default function InvertBand({ items, renderItem, speed = 34, className = "" }) {
  const reduced = usePrefersReducedMotion();
  const doubled = [...items, ...items];

  return (
    <div className={"band relative overflow-hidden border-y border-line " + className}>
      <div
        className={"band-track " + (reduced ? "band-track--static" : "")}
        style={{ "--band-speed": `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="band-item" aria-hidden={i >= items.length ? "true" : undefined}>
            {renderItem(item, i % items.length)}
          </span>
        ))}
      </div>

      {/* The threshold itself */}
      <span aria-hidden className="band-window" />
    </div>
  );
}
