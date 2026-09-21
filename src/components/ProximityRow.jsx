import { useProximity } from "@/hooks/useProximity";

/**
 * ProximityRow — gives a row a continuous sense of the cursor.
 *
 * The row it wraps doesn't wait for hover. As the cursor approaches, its type
 * gains weight, its rule extends, its number slides out of the margin — all
 * proportional to distance, all easing back as the cursor moves on. Rows either
 * side react faintly at the same time, so a list reads as one responsive
 * surface rather than a stack of independent hover targets.
 *
 * Because the intensity lands in a CSS variable, nothing here re-renders.
 */
export default function ProximityRow({
  children,
  className = "",
  as: Tag = "div",
  radius = 200,
  axis = "y",
  falloff = 1.6,
}) {
  const ref = useProximity({ radius, axis, falloff });
  return (
    <Tag ref={ref} className={"prox " + className}>
      {children}
    </Tag>
  );
}
