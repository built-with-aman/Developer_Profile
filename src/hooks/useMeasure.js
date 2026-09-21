import { useEffect, useRef, useState } from "react";

/**
 * useMeasure — live element dimensions, rounded to whole pixels.
 * Used by BlueprintFrame to print real measurements on the card, the way a
 * drafting tool annotates a part. The numbers are actual, not decoration:
 * resize the window and they update.
 */
export function useMeasure() {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const ro = new ResizeObserver(([entry]) => {
      const box = entry.contentRect;
      setSize((prev) => {
        const w = Math.round(box.width);
        const h = Math.round(box.height);
        return prev.width === w && prev.height === h ? prev : { width: w, height: h };
      });
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
}
