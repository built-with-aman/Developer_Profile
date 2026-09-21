import { useClipReveal } from "@/hooks/useClipReveal";

export default function ClipReveal({ children, className = "", shape = "wipe" }) {
  const { ref, style } = useClipReveal({ shape });
  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
