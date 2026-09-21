import { useMagnetic } from "@/hooks/useMagnetic";

export default function Magnetic({ children, strength = 0.4, className = "" }) {
  const m = useMagnetic(strength);
  return (
    <div
      ref={m.ref}
      className={"inline-block " + className}
      style={m.style}
      onMouseMove={m.onMove}
      onMouseLeave={m.onLeave}
    >
      {children}
    </div>
  );
}
