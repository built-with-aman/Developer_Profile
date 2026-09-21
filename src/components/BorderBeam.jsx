import { useState } from "react";
import { useBorderBeam } from "@/hooks/useBorderBeam";

/** Animated conic border on hover. */
export default function BorderBeam({ children, className = "" }) {
  const [hot, setHot] = useState(false);
  const beam = useBorderBeam({ running: hot, speed: 50 });

  return (
    <div
      className={"relative rounded-2xl p-[1px] " + className}
      onMouseEnter={() => setHot(true)}
      onMouseLeave={() => setHot(false)}
      style={hot ? beam.style : { background: "var(--line)" }}
    >
      <div className="rounded-[15px] bg-bg">{children}</div>
    </div>
  );
}
