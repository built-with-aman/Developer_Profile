import { useState, useCallback } from "react";

/**
 * Text style changes on hover:
 * underline grow, weight, tracking, invert, or letter-spacing expand.
 *
 * mode: 'underline' | 'weight' | 'tracking' | 'invert' | 'lift'
 */
export function useTextHover(mode = "underline") {
  const [on, setOn] = useState(false);

  const bind = {
    onMouseEnter: useCallback(() => setOn(true), []),
    onMouseLeave: useCallback(() => setOn(false), []),
  };

  const styles = {
    underline: {
      backgroundImage: on
        ? "linear-gradient(currentColor, currentColor)"
        : "linear-gradient(transparent, transparent)",
      backgroundPosition: "0 100%",
      backgroundRepeat: "no-repeat",
      backgroundSize: on ? "100% 1px" : "0% 1px",
      transition: "background-size 0.35s ease",
    },
    weight: {
      fontWeight: on ? 700 : 500,
      transition: "font-weight 0.2s ease",
    },
    tracking: {
      letterSpacing: on ? "0.06em" : "0em",
      transition: "letter-spacing 0.3s ease",
    },
    invert: {
      background: on ? "var(--fg)" : "transparent",
      color: on ? "var(--bg)" : "inherit",
      padding: on ? "0.1em 0.35em" : "0.1em 0",
      transition: "background 0.25s ease, color 0.25s ease, padding 0.25s ease",
    },
    lift: {
      transform: on ? "translateY(-2px)" : "translateY(0)",
      opacity: on ? 1 : 0.85,
      transition: "transform 0.25s ease, opacity 0.25s ease",
    },
  };

  return { on, bind, style: styles[mode] || styles.underline };
}
