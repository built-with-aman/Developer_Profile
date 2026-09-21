import { useEffect, useRef, useState } from "react";

/** Simple spring toward a target number (for progress, opacity, etc.). */
export function useSpring(target, { stiffness = 120, damping = 18 } = {}) {
  const [value, setValue] = useState(target);
  const vel = useRef(0);
  const current = useRef(target);

  useEffect(() => {
    let raf;
    const tick = () => {
      const force = (target - current.current) * (stiffness / 1000);
      vel.current = vel.current * (1 - damping / 100) + force;
      current.current += vel.current;
      setValue(current.current);
      if (Math.abs(target - current.current) > 0.001 || Math.abs(vel.current) > 0.001) {
        raf = requestAnimationFrame(tick);
      } else {
        current.current = target;
        setValue(target);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, stiffness, damping]);

  return value;
}
