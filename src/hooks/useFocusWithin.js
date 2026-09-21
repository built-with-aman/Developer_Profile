import { useState } from "react";

export function useFocusWithin() {
  const [focused, setFocused] = useState(false);
  return {
    focused,
    bind: {
      onFocus: () => setFocused(true),
      onBlur: () => setFocused(false),
    },
  };
}
