import { useEffect, useRef } from "react";

/**
 * Ambient drifting dots rendered on a full-bleed canvas. Always
 * `absolute inset-0 pointer-events-none` — meant to sit *inside* an
 * existing `relative` section (like the hero) as a background layer, so it
 * never adds its own margin/padding or affects document flow.
 */
export default function FloatingParticles({ count = 36, className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf;
    let particles = [];
    let w = 0;
    let h = 0;

    const color =
      getComputedStyle(document.documentElement).getPropertyValue("--acc").trim() || "#10b981";

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.4,
        vy: Math.random() * 0.22 + 0.05,
        vx: (Math.random() - 0.5) * 0.12,
        o: Math.random() * 0.45 + 0.12,
      }));
    };

    const paint = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = p.o;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    };

    const step = () => {
      particles.forEach((p) => {
        p.y -= p.vy;
        p.x += p.vx;
        if (p.y < -8) p.y = h + 8;
        if (p.x < -8) p.x = w + 8;
        if (p.x > w + 8) p.x = -8;
      });
      paint();
      raf = requestAnimationFrame(step);
    };

    resize();
    init();
    if (reduced) paint();
    else raf = requestAnimationFrame(step);

    const onResize = () => {
      cancelAnimationFrame(raf);
      resize();
      init();
      if (reduced) paint();
      else raf = requestAnimationFrame(step);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={"pointer-events-none absolute inset-0 " + className}
    />
  );
}
