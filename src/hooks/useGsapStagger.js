import { gsap } from "@/lib/gsap"; // ← your existing gsap setup
import { useGsapScope } from "./useGsapScope";

export function useGsapStagger({
  selector = "[data-stagger]",
  y = 22,
  stagger = 0.06,
  start = "top 82%",
  from = "start",
} = {}) {
  return useGsapScope((root) => {
    const items = root.querySelectorAll(selector);
    if (!items.length) return;

    gsap.from(items, {
      opacity: 0,
      y,
      duration: 0.8,
      stagger: { each: stagger, from },
      scrollTrigger: {
        trigger: root,
        start,
        once: true,
      },
    });
  });
}