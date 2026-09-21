import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ProximityRow from "@/components/ProximityRow";
import { EMAIL, LOCATION, SOCIALS, RESUME } from "@/data/content";

const PAGES = [
  { to: "/work", label: "Work" },
  { to: "/journey", label: "Journey" },
  { to: "/manifesto", label: "Manifesto" },
  { to: "/certifications", label: "Certifications" },
  { to: "/outside-the-ide", label: "Outside the IDE" },
  { to: "/contact", label: "Contact" },
];

/**
 * The footer is the last thing a recruiter sees, so it carries the same three
 * things the hero does: what I'm open to, how to reach me, and where the
 * receipts live. Proximity rows keep it monochrome but alive.
 */
export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          {/* Call */}
          <div className="md:col-span-5">
            <p className="inline-flex items-center gap-2 border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
              <span className="h-1.5 w-1.5 bg-fg" />
              Open for SDE 2026 roles
            </p>
            <p className="mt-6 font-display text-3xl font-bold tracking-tight md:text-4xl">
              Let’s build<span className="opacity-40">.</span>
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-3 inline-block break-all font-mono text-sm text-muted transition-colors hover:text-fg"
            >
              {EMAIL}
            </a>
            <p className="mt-1 font-mono text-xs text-muted">{LOCATION}</p>
          </div>

          {/* Pages */}
          <nav className="md:col-span-3" aria-label="Footer">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">Pages</p>
            <ul className="mt-5 space-y-2.5">
              {PAGES.map((p) => (
                <li key={p.to}>
                  <Link to={p.to} className="text-sm text-muted transition-colors hover:text-fg">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Elsewhere — LinkedIn first, because that's the first thing a recruiter checks */}
          <div className="md:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">Elsewhere</p>
            <ul className="mt-5 border-t border-line">
              {SOCIALS.map((s) => (
                <li key={s.id}>
                  <ProximityRow radius={130} axis="y" falloff={1.6}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-4 border-b border-line py-2.5"
                    >
                      <span className="prox-title font-display text-sm">{s.label}</span>
                      <span className="flex items-center gap-2">
                        <span className="prox-body font-mono text-[11px] text-muted">
                          {s.handle}
                        </span>
                        <ArrowUpRight size={14} className="prox-arrow" />
                      </span>
                    </a>
                  </ProximityRow>
                </li>
              ))}
            </ul>
            <a
              href={RESUME}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:border-fg hover:text-fg"
            >
              Download résumé <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-5 py-4 font-mono text-[11px] text-muted md:px-8">
          <span>© 2026 Aman Soni</span>
          <span>Built with React · Vite · Tailwind</span>
        </div>
      </div>
    </footer>
  );
}
