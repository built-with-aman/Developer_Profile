import { useState } from "react";
import { Copy, Check, ArrowUpRight, Mail, Linkedin, X } from "lucide-react";
import PageEnter from "@/components/PageEnter";
import SplitReveal from "@/components/SplitReveal";
import Reveal from "@/components/Reveal";
import ProximityRow from "@/components/ProximityRow";
import SweepButton from "@/components/SweepButton";
import { usePopHover } from "@/hooks/usePopHover";
import { EMAIL, PHONE, LOCATION, SOCIALS, LINKEDIN, RESUME } from "@/data/content";

/**
 * One row of the "elsewhere" list. Proximity-driven: the handle gains weight
 * and the rule extends as the cursor approaches, so the whole column reads as
 * a single responsive surface instead of six separate hover targets.
 */
function SocialRow({ s, delay }) {
  const inner = (
    <div className="border-t border-line py-5 md:py-6">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="prox-title font-display text-xl md:text-2xl">{s.label}</p>
          <p className="prox-body mt-1 font-mono text-xs text-muted">@{s.handle}</p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="prox-body hidden text-sm text-muted sm:inline">{s.note}</span>
          {s.href && <ArrowUpRight size={18} className="prox-arrow" />}
        </div>
      </div>
      <span aria-hidden className="prox-rule mt-4 block w-full" />
    </div>
  );

  return (
    <Reveal delay={delay}>
      <ProximityRow radius={170} axis="y" falloff={1.5}>
        {s.href ? (
          <a href={s.href} target="_blank" rel="noopener noreferrer" className="block">
            {inner}
          </a>
        ) : (
          inner
        )}
      </ProximityRow>
    </Reveal>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [showMap, setShowMap] = useState(false); // State for the map popup
  const mailPop = usePopHover({ scale: 1.02, y: -3 });
  const liPop = usePopHover({ scale: 1.015, y: -2 });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <PageEnter>
      {/* Hero */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted">Contact</p>
          </Reveal>
          <SplitReveal
            className="mt-5 max-w-4xl font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl lg:text-8xl"
            delay={0.06}
            lines={[<>Let’s build</>, <>something.</>]}
          />
          <Reveal delay={0.2} className="mt-8 max-w-lg text-lg text-muted md:text-xl">
            Recruiters, collaborators, curious engineers — direct line, no form spam.
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Primary channel */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">Direct</p>
            </Reveal>

            <Reveal delay={0.05} className="mt-6">
              <a
                href={`mailto:${EMAIL}`}
                className="group block border border-line bg-surface p-8 md:p-10"
                style={mailPop.style}
                onMouseEnter={mailPop.bind.onMouseEnter}
                onMouseLeave={mailPop.bind.onMouseLeave}
              >
                <div className="flex items-center gap-2 text-muted">
                  <Mail size={16} />
                  <span className="font-mono text-xs uppercase tracking-widest">Email</span>
                </div>
                <p className="mt-4 font-display text-xl font-bold tracking-tight md:text-2xl lg:text-3xl group-hover:underline group-hover:underline-offset-4">
                  {EMAIL}
                </p>
                <p className="mt-3 text-sm text-muted">Tap to open mail client</p>
              </a>
            </Reveal>

            <Reveal delay={0.08} className="mt-4">
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border border-line bg-surface p-6 md:p-8"
                style={liPop.style}
                onMouseEnter={liPop.bind.onMouseEnter}
                onMouseLeave={liPop.bind.onMouseLeave}
              >
                <div className="flex items-center gap-2 text-muted">
                  <Linkedin size={16} />
                  <span className="font-mono text-xs uppercase tracking-widest">LinkedIn</span>
                </div>
                <div className="mt-3 flex items-end justify-between gap-4">
                  <p className="font-display text-xl font-bold tracking-tight md:text-2xl group-hover:underline group-hover:underline-offset-4">
                    /in/aman-updates
                  </p>
                  <ArrowUpRight
                    size={20}
                    className="shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </div>
                <p className="mt-2 text-sm text-muted">
                  Recruiters — full profile, experience and references live here.
                </p>
              </a>
            </Reveal>

            <Reveal delay={0.12} className="mt-4 flex flex-wrap gap-3">
              <SweepButton variant="solid" onClick={copyEmail}>
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied to clipboard" : "Copy email"}
              </SweepButton>
              <SweepButton variant="line" href={`mailto:${EMAIL}?subject=Hello%20Aman`}>
                Write a message <ArrowUpRight size={16} />
              </SweepButton>
              <SweepButton
                variant="line"
                href={RESUME}
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume <ArrowUpRight size={16} />
              </SweepButton>
            </Reveal>

            <div className="mt-12 grid gap-6 border-t border-line pt-10 sm:grid-cols-2">
              <Reveal delay={0.12}>
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted">Phone</p>
                <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="mt-2 block text-xl font-medium hover:underline">
                  {PHONE}
                </a>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted">Based in</p>
                {/* Clickable location to open map */}
                <button
                  onClick={() => setShowMap(true)}
                  className="mt-2 block text-xl font-medium text-left hover:underline focus:outline-none focus:underline transition-colors"
                >
                  {LOCATION}
                </button>
              </Reveal>
            </div>
          </div>

          {/* Elsewhere — real links */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">Elsewhere</p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight md:text-3xl">
                On the record.
              </h2>
            </Reveal>
            <div className="mt-8 border-b border-line">
              {SOCIALS.map((s, i) => (
                <SocialRow key={s.id} s={s} delay={0.05 + i * 0.04} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Map Popup Modal */}
      {showMap && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-opacity"
          onClick={() => setShowMap(false)} // Close when clicking the backdrop
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden border border-line bg-surface shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <div className="flex items-center justify-between border-b border-line p-4">
              <p className="font-display text-lg font-bold tracking-tight">Location</p>
              <button
                onClick={() => setShowMap(false)}
                className="rounded-full p-2 text-muted transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close map"
              >
                <X size={20} />
              </button>
            </div>
            <div className="h-[60vh] w-full md:h-[450px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3628.256976704087!2d76.14661!3d24.5803261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39653ee5a6efa053%3A0xe19c09d37d710e57!2sJhalawar%20City!5e0!3m2!1sen!2sin!4v1789621977334!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </PageEnter>
  );
}