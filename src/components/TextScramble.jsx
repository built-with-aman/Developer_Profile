import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#$%&0123456789";

/**
 * Terminal-style decode/scramble effect on hover or focus. Renders inline
 * (no layout box of its own), so it can drop into existing nav links,
 * headings, or buttons without affecting surrounding margins.
 */
export default function TextScramble({
  text,
  as: Tag = "span",
  className = "",
  speed = 22,
  ...rest
}) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef(null);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setDisplay(text);
  }, [text]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const scramble = () => {
    if (reducedRef.current) return;
    cancelAnimationFrame(rafRef.current);
    const start = performance.now();
    const total = Math.max(text.length * speed, 160);

    const tick = (now) => {
      const progress = Math.min((now - start) / total, 1);
      const revealCount = Math.floor(progress * text.length);
      const next = text
        .split("")
        .map((ch, i) => {
          if (ch === " ") return " ";
          if (i < revealCount) return ch;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      setDisplay(next);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
      else setDisplay(text);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  return (
    <Tag
      onMouseEnter={scramble}
      onFocus={scramble}
      className={className}
      {...rest}
    >
      {display}
    </Tag>
  );
}
