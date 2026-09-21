import { useState, useCallback } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Pop on hover: scale + slight lift.
 * Returns bind props + style to spread on the element.
 */
export function usePopHover({ scale = 1.03, y = -4 } = {}) {
  const reduced = usePrefersReducedMotion();
  const [on, setOn] = useState(false);

  const bind = {
    onMouseEnter: useCallback(() => setOn(true), []),
    onMouseLeave: useCallback(() => setOn(false), []),
  };

  const style = reduced
    ? {}
    : {
        transform: on ? `translateY(${y}px) scale(${scale})` : "translateY(0) scale(1)",
        transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "transform",
      };

  return { on, bind, style };
}
