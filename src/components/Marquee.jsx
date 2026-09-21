export default function Marquee({ items, dur = 48, className = "", separator = "◆" }) {
  const row = (keyPrefix) =>
    items.map((it, i) => (
      <span key={`${keyPrefix}-${i}`} className="mx-8 inline-flex items-center gap-8">
        <span>{it}</span>
        <span className="text-xs text-acc">{separator}</span>
      </span>
    ));
  return (
    <div
      className={"marquee-paused select-none overflow-hidden border-y border-lin py-5 " + className}
      aria-hidden
    >
      <div
        className="animate-marquee flex w-max whitespace-nowrap font-display text-2xl font-medium uppercase tracking-tight text-mut md:text-3xl"
        style={{ "--marquee-dur": dur + "s" }}
      >
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
