import { useState } from "react";

export function useHoverInvert() {
  const [on, setOn] = useState(false);
  return {
    on,
    bind: {
      onMouseEnter: () => setOn(true),
      onMouseLeave: () => setOn(false),
    },
    style: on
      ? { background: "var(--fg)", color: "var(--bg)", borderColor: "transparent" }
      : {},
  };
}
