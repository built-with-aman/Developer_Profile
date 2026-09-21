import { useScrollLit } from "@/hooks/useScrollLit";

/**
 * ScrollLitText — the paragraph lights up word by word as you read down it.
 *
 * Not a fade-in. The scroll position maps continuously to a reading head that
 * travels through the sentence: words behind it are at full contrast, the word
 * under it is brightening, words ahead sit at the muted value. Scroll back up
 * and it un-reads. It gives a monochrome page a sense of depth that colour
 * usually has to provide.
 *
 * Each word carries only two CSS variables (its index and the total), so the
 * per-word interpolation is done entirely by CSS — one scroll handler for the
 * whole paragraph regardless of length.
 */
export default function ScrollLitText({
  children,
  as: Tag = "p",
  className = "",
  spread = 2.2, // how many words are mid-transition at once — lower is sharper
}) {
  const ref = useScrollLit();
  const text = typeof children === "string" ? children : String(children ?? "");
  const words = text.split(/(\s+)/).filter(Boolean);
  const total = words.filter((w) => w.trim()).length || 1;

  let i = -1;

  return (
    <Tag ref={ref} className={"lit " + className} style={{ "--n": total, "--spread": spread }}>
      <span aria-hidden="true">
        {words.map((w, idx) => {
          if (!w.trim()) return <span key={idx}>{w}</span>;
          i += 1;
          return (
            <span key={idx} className="lit-word" style={{ "--i": i }}>
              {w}
            </span>
          );
        })}
      </span>
      <span className="sr-only">{text}</span>
    </Tag>
  );
}
