import { useSkewScroll } from "@/hooks/useSkewScroll";

/** Applies scroll-velocity skew to children. */
export default function SkewScope({ children, className = "", intensity = 3 }) {
  const style = useSkewScroll(intensity);
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
