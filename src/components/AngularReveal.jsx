import { useAngularScroll } from "@/hooks/useAngularScroll";

/**
 * One-shot angular reveal on enter — same duration every time,
 * independent of how fast the user scrolls.
 */
export default function AngularReveal({
  children,
  className = "",
  curve = "sin",
  maxRotate = 5,
  maxX = 24,
  maxY = 36,
  duration = 700,
}) {
  const { ref, style } = useAngularScroll({ curve, maxRotate, maxX, maxY, duration });
  return (
    <div ref={ref} className={className} style={{ ...style, willChange: "transform, opacity" }}>
      {children}
    </div>
  );
}
