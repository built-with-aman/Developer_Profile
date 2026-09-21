import { useCallback, useEffect, useRef, useState } from "react";
import { useDragScroll } from "@/hooks/useDragScroll";

export default function Filmstrip({
  items,
  active,
  onActive,
  renderFrame,
  align = "center",
  onFrameClick,
}) {
  const { ref, dragging } = useDragScroll();
  const frames = useRef([]);
  const [progress, setProgress] = useState(0);

  const isCenter = align === "center";

  const sync = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);

    const line = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    frames.current.forEach((node, i) => {
      if (!node) return;
      const centre = node.offsetLeft + node.offsetWidth / 2;
      const dist = Math.abs(centre - line);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    onActive?.(best);
  }, [onActive, ref]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        sync();
      });
    };
    sync();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sync, ref]);

  const scrollTo = (i) => {
    const node = frames.current[i];
    const el = ref.current;
    if (!node || !el) return;

    const left = isCenter
      ? node.offsetLeft - (el.clientWidth - node.offsetWidth) / 2
      : node.offsetLeft;

    el.scrollTo({ left, behavior: "smooth" });
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollTo(Math.min(items.length - 1, active + 1));
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollTo(Math.max(0, active - 1));
    }
  };

  return (
    <div className="strip" style={{ touchAction: "manipulation" }}>
      <div
        ref={ref}
        role="listbox"
        aria-label="Project frames"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className={
          "strip-track no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 outline-none md:gap-6 " +
          (dragging ? "cursor-grabbing select-none" : "cursor-grab")
        }
      >
        {isCenter && (
          <span aria-hidden className="shrink-0 basis-[8vw] md:basis-[18vw]" />
        )}

        {items.map((item, i) => (
          <div
            key={item.id}
            ref={(n) => {
              frames.current[i] = n;
            }}
            role="option"
            aria-selected={i === active}
            className={"shrink-0 " + (isCenter ? "snap-center" : "snap-start")}
          >
            <button
              type="button"
              onDoubleClick={() => {
                onFrameClick?.(item, i);
              }}
              onClick={() => {
                scrollTo(i);
              }}
              style={{ all: "unset", cursor: "pointer", display: "block" }}
              aria-label={`Double-click to open ${item.name} details`}
            >
              {renderFrame(item, i, i === active)}
            </button>
          </div>
        ))}

        {isCenter && (
          <span aria-hidden className="shrink-0 basis-[8vw] md:basis-[18vw]" />
        )}
      </div>

      <div className="mt-4 flex items-center gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
        <div className="relative h-px flex-1 bg-line">
          <span
            className="absolute top-[-1px] bg-fg"
            style={{
              left: `${progress * (100 - 100 / items.length)}%`,
              width: `${100 / items.length}%`,
              height: "3px",
            }}
          />
        </div>
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-muted sm:inline">
          Double-click a frame to open
        </span>
      </div>
    </div>
  );
}