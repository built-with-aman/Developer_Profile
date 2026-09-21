import { useGeometric } from "@/hooks/useGeometric";
import { useHoverInvert } from "@/hooks/useHoverInvert";

/**
 * 3D tilt + true B&W invert on hover + border that dissolves.
 */
export default function GeoCard({ children, className = "", maxTilt = 10, invert = true }) {
  const geo = useGeometric({ maxTilt, scale: 1.02 });
  const inv = useHoverInvert();

  return (
    <div
      ref={geo.ref}
      className={
        "geo-card group relative overflow-hidden rounded-2xl border bg-surface transition-[background,color,border-color,box-shadow] duration-400 " +
        className
      }
      style={{
        ...geo.style,
        ...(invert ? inv.style : {}),
        borderColor: inv.on ? "transparent" : "var(--line)",
      }}
      onMouseMove={geo.onMove}
      onMouseEnter={invert ? inv.bind.onMouseEnter : undefined}
      onMouseLeave={() => {
        geo.onLeave();
        if (invert) inv.bind.onMouseLeave();
      }}
    >
      {/* Border dissolve: solid edge fades out into soft glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
        style={{
          opacity: inv.on ? 1 : 0,
          boxShadow:
            "0 0 0 1px color-mix(in srgb, var(--bg) 0%, transparent), 0 0 40px 2px color-mix(in srgb, var(--fg) 25%, transparent)",
          background:
            "radial-gradient(ellipse at var(--gx, 50%) var(--gy, 50%), color-mix(in srgb, var(--bg) 8%, transparent), transparent 70%)",
        }}
      />
      {/* Glare */}
      <div
        className="geo-card-glare"
        style={{
          "--gx": geo.style["--gx"],
          "--gy": geo.style["--gy"],
          opacity: inv.on ? 0.5 : undefined,
        }}
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
