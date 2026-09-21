import { useRef, useState } from "react";
import { useMeasure } from "@/hooks/useMeasure";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * BlueprintFrame — the card behaves like a part on a drafting sheet.
 *
 * On engage it does four things, none of which is a border-color change:
 *
 *  1. A single continuous hairline draws itself around the whole perimeter
 *     from the top-left corner (one SVG path, stroke-dashoffset). Not four
 *     divs racing each other — one stroke, one direction, one travel time.
 *  2. Corner ticks extend outward, the way registration marks do.
 *  3. The real measured width × height of the card prints on the edge,
 *     read live from a ResizeObserver. Resize the window and it updates.
 *  4. Horizontal and vertical rails track the cursor inside the card and
 *     print its position — a crosshair readout, not a glow.
 *
 * Everything is monochrome by construction: strokes are currentColor.
 */
export default function BlueprintFrame({
  children,
  className = "",
  label = "",
  active = false,
  dim = true,
  crosshair = true,
  radius = 0,
}) {
  const [hostRef, size] = useMeasure();
  const wrapRef = useRef(null);
  const [engaged, setEngaged] = useState(false);
  const [pt, setPt] = useState({ x: 0, y: 0 });
  const reduced = usePrefersReducedMotion();

  const on = engaged || active;

  const onPointerMove = (e) => {
    if (!crosshair || reduced) return;
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPt({
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top),
    });
  };

  const setRefs = (node) => {
    hostRef.current = node;
    wrapRef.current = node;
  };

  return (
    <div
      ref={setRefs}
      className={"bp group/bp relative overflow-hidden " + className}
      data-engaged={on ? "true" : "false"}
      onPointerEnter={() => setEngaged(true)}
      onPointerLeave={() => setEngaged(false)}
      onPointerMove={onPointerMove}
      onFocusCapture={() => setEngaged(true)}
      onBlurCapture={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget)) setEngaged(false);
      }}
    >
      {/* 1 — continuous perimeter stroke */}
      <svg aria-hidden className="bp-stroke pointer-events-none" preserveAspectRatio="none">
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          rx={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          pathLength="1"
        />
      </svg>

      {/* 2 — registration ticks */}
      <span aria-hidden className="bp-tick bp-tick--tl" />
      <span aria-hidden className="bp-tick bp-tick--tr" />
      <span aria-hidden className="bp-tick bp-tick--bl" />
      <span aria-hidden className="bp-tick bp-tick--br" />

      {/* 4 — cursor rails + readout */}
      {crosshair && !reduced && (
        <>
          <span
            aria-hidden
            className="bp-rail bp-rail--h"
            style={{ transform: `translate3d(0, ${pt.y}px, 0)` }}
          />
          <span
            aria-hidden
            className="bp-rail bp-rail--v"
            style={{ transform: `translate3d(${pt.x}px, 0, 0)` }}
          />
        </>
      )}

      {/* 3 — live dimensions + label */}
      {dim && (
        <span aria-hidden className="bp-dim bp-dim--size">
          {size.width} × {size.height}
        </span>
      )}
      {label && (
        <span aria-hidden className="bp-dim bp-dim--label">
          {label}
        </span>
      )}
      {crosshair && !reduced && (
        <span aria-hidden className="bp-dim bp-dim--cursor">
          x{String(pt.x).padStart(4, "0")} y{String(pt.y).padStart(4, "0")}
        </span>
      )}

      {children}
    </div>
  );
}
