import { useRef } from "react";
import { useGSAP } from "@/lib/gsap"; // ← your existing gsap setup
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function useGsapScope(callback, deps = []) {
  const scope = useRef(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      if (!scope.current) return;
      callback(scope.current);
    },
    { scope, dependencies: [...deps, reduced] }
  );

  return scope;
}