import { ShieldCheck } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function StampCard({
  title,
  status,
  note,
  num,
  total,
  delay = 0,
  verifyUrl,
}) {
  return (
    <Reveal delay={delay}>
      <article className="group relative border border-line p-6 transition-colors hover:border-fg/60">
        {/* Header — counter + status pill */}
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          <span>
            {num} / {total}
          </span>
          <span
            className={
              "border px-2 py-0.5 text-[9px] " +
              (status === "Certified"
                ? "border-emerald-400/40 text-emerald-300/90"
                : "border-sky-400/40 text-sky-300/90")
            }
          >
            {status}
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-5 font-display text-lg font-semibold leading-snug tracking-tight md:text-xl">
          {title}
        </h3>

        {/* Note */}
        <p className="mt-3 text-sm leading-relaxed text-muted">{note}</p>

        {/* Verify button — only if URL exists */}
        {verifyUrl && (
          <a
            href={verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-muted transition-colors hover:border-fg hover:text-fg"
          >
            <ShieldCheck size={13} />
            Verify
          </a>
        )}
      </article>
    </Reveal>
  );
}