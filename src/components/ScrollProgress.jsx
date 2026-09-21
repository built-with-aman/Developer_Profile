import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useSpring } from "@/hooks/useSpring";

/** Top progress line driven by useScrollProgress + spring. */
export default function ScrollProgress() {
  const p = useScrollProgress();
  const s = useSpring(p, { stiffness: 100, damping: 20 });
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-line">
      <div
        className="h-full origin-left bg-fg"
        style={{ transform: `scaleX(${Math.min(1, Math.max(0, s))})` }}
      />
    </div>
  );
}
