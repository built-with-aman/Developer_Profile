import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useMagnetic } from "@/hooks/useMagnetic";

export default function ContactSheet({ email, phone, location, onCopy }) {
  const [copied, setCopied] = useState(false);
  const m = useMagnetic(0.35);

  const handle = async () => {
    await onCopy?.();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-line bg-surface p-8 md:p-12">
      <p className="text-sm text-muted">Email</p>
      <div className="mt-2 flex flex-wrap items-center gap-4">
        <a href={`mailto:${email}`} className="font-display text-2xl font-bold tracking-tight md:text-3xl">
          {email}
        </a>
        <button
          type="button"
          ref={m.ref}
          style={m.style}
          onMouseMove={m.onMove}
          onMouseLeave={m.onLeave}
          onClick={handle}
          className="inline-flex items-center gap-2 border border-line px-4 py-2 text-xs uppercase tracking-wider text-muted transition hover:border-fg hover:text-fg"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="mt-10 grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
        <div>
          <p className="text-sm text-muted">Phone</p>
          <p className="mt-1 text-lg font-medium">{phone}</p>
        </div>
        <div>
          <p className="text-sm text-muted">Location</p>
          <p className="mt-1 text-lg font-medium">{location}</p>
        </div>
      </div>
    </div>
  );
}
