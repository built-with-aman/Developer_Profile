import { usePointerGlow } from "@/hooks/usePointerGlow";

/** Wrapper: soft pointer-follow glow inside bounds. */
export default function PointerGlow({ children, className = "" }) {
  const g = usePointerGlow();
  return (
    <div
      ref={g.ref}
      className={"relative " + className}
      style={g.style}
      onMouseMove={g.onMove}
      onMouseLeave={g.onLeave}
    >
      {children}
    </div>
  );
}
