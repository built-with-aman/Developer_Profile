import { useEffect, useRef, useState } from "react";

/**
 * useDragScroll — click-and-drag panning on top of a *native* scroller.
 *
 * Pointer capture is deferred until movement crosses a small threshold,
 * so simple clicks still dispatch to the actual clicked element instead
 * of being retargeted to the scroll container.
 */
export function useDragScroll() {
  const ref = useRef(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    let pointerId = null;
    let startX = 0;
    let startScroll = 0;
    let moved = 0;
    let isDragging = false;

    const onDown = (e) => {
      if (e.pointerType === "touch") return;
      if (e.button !== 0) return;

      pointerId = e.pointerId;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      moved = 0;
      isDragging = false;
      // Do NOT capture here — that retargets the upcoming click to `el`
      // and kills onClick on any child (cards, buttons).
    };

    const onMove = (e) => {
      if (pointerId === null || e.pointerId !== pointerId) return;
      const dx = e.clientX - startX;
      const abs = Math.abs(dx);

      if (!isDragging && abs > 4) {
        isDragging = true;
        setDragging(true);
        try {
          el.setPointerCapture(pointerId);
        } catch {
          /* already released */
        }
      }

      if (isDragging) {
        moved = Math.max(moved, abs);
        el.scrollLeft = startScroll - dx;
      }
    };

    const end = (e) => {
      if (pointerId === null || (e && e.pointerId !== pointerId)) return;
      try {
        el.releasePointerCapture(pointerId);
      } catch {
        /* noop */
      }
      pointerId = null;
      isDragging = false;
      setDragging(false);
    };

    const onClickCapture = (e) => {
      if (moved > 6) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", end);
    el.addEventListener("pointercancel", end);
    el.addEventListener("click", onClickCapture, true);

    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", end);
      el.removeEventListener("pointercancel", end);
      el.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  return { ref, dragging };
}