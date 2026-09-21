import { useRef, useState } from "react";
import { Link } from "react-router-dom";

/**
 * SweepButton — the fill enters where your cursor did.
 *
 * Standard hover fills always wipe from the same edge, which gives away that
 * nothing is actually being tracked. Here the entry point is measured on
 * pointerenter and the fill grows radially from that exact coordinate; leave
 * from the other side and it retreats back toward wherever you left. The label
 * exists twice — once normal, once inverted and clipped to the fill — so the
 * text flips colour progressively as the fill overtakes it, character by
 * character, instead of switching all at once.
 */
export default function SweepButton({
  children,
  to,
  href,
  onClick,
  variant = "solid", // "solid" | "line"
  className = "",
  type = "button",
  ...rest
}) {
  const ref = useRef(null);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [on, setOn] = useState(false);

  const trackOrigin = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setOrigin({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const base =
    "sweep group/sw relative inline-flex select-none items-center gap-2 overflow-hidden px-6 py-3 text-sm font-medium " +
    (variant === "solid"
      ? "border border-fg bg-fg text-bg"
      : "border border-line text-fg hover:border-fg");

  const props = {
    ref,
    className: base + " " + className,
    style: { "--ox": `${origin.x}%`, "--oy": `${origin.y}%` },
    "data-on": on ? "true" : "false",
    onPointerEnter: (e) => {
      trackOrigin(e);
      setOn(true);
    },
    onPointerLeave: (e) => {
      trackOrigin(e);
      setOn(false);
    },
    onFocus: () => setOn(true),
    onBlur: () => setOn(false),
    ...rest,
  };

  const content = (
    <>
      <span aria-hidden className="sweep-fill" />
      <span className="sweep-label relative z-[1] inline-flex items-center gap-2">{children}</span>
      <span aria-hidden className="sweep-label sweep-label--inverted">
        <span className="inline-flex items-center gap-2">{children}</span>
      </span>
    </>
  );

  if (to) {
    return (
      <Link to={to} {...props}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} {...props}>
        {content}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} {...props}>
      {content}
    </button>
  );
}
