import { useOrbit } from "@/hooks/useOrbit";

export default function OrbitDot({ radius = 28, speed = 0.7, offset = 0, className = "" }) {
  const { x, y } = useOrbit({ radius, speed, offset });
  return (
    <span
      className={"absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg " + className}
      style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
    />
  );
}
