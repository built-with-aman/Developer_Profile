import { useRevealSequence } from "@/hooks/useRevealSequence";

/** Children appear one-by-one when scrolled into view. */
export default function SequenceList({ children, interval = 100, className = "" }) {
  const items = Array.isArray(children) ? children : [children];
  const { ref, visible } = useRevealSequence(items.length, { interval });

  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => (
        <div
          key={i}
          style={{
            opacity: visible(i) ? 1 : 0,
            transform: visible(i) ? "none" : "translateY(16px)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
