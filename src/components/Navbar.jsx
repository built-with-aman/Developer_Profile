import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, ArrowUpRight, Linkedin, Github } from "lucide-react";
import { useTheme } from "@/theme/ThemeContext";
import ScrollProgress from "@/components/ScrollProgress";
import { LINKEDIN, GITHUB, RESUME } from "@/data/content";

const LINKS = [
  { to: "/work", label: "Work" },
  { to: "/journey", label: "Journey" },
  { to: "/manifesto", label: "Manifesto" },
  { to: "/certifications", label: "Certs" },
  { to: "/life", label: "Life" },
  { to: "/contact", label: "Contact" },
];

const ICON_LINKS = [
  { href: LINKEDIN, label: "LinkedIn", Icon: Linkedin },
  { href: GITHUB, label: "GitHub", Icon: Github },
];

/**
 * Desktop nav item. The active state is a drawn rule rather than a colour
 * change — on a monochrome site, position and weight are the only accents
 * available, so they have to do the work a highlight colour normally would.
 */
function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        "group relative py-1 text-sm transition-colors " +
        (isActive ? "font-medium text-fg" : "text-muted hover:text-fg")
      }
    >
      {({ isActive }) => (
        <>
          {label}
          <span
            aria-hidden
            className={
              "absolute -bottom-0.5 left-0 block h-px bg-fg transition-all duration-300 ease-out " +
              (isActive ? "w-full" : "w-0 group-hover:w-full")
            }
          />
        </>
      )}
    </NavLink>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { pathname } = useLocation();

  /* Close the sheet on navigation, and don't leave the page scroll-locked. */
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <ScrollProgress />

      {/* Keyboard users land here first. Recruiters tab. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:border focus:border-fg focus:bg-bg focus:px-4 focus:py-2 focus:font-mono focus:text-xs"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 md:px-8">
          <Link
            to="/"
            className="shrink-0 font-display text-lg font-bold tracking-tight"
            aria-label="Aman Soni — home"
          >
            Aman<span className="opacity-40">.</span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {LINKS.map((l) => (
              <NavItem key={l.to} {...l} />
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            {ICON_LINKS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="border border-line p-2 text-muted transition-colors hover:border-fg hover:text-fg"
              >
                <Icon size={15} />
              </a>
            ))}
            <button
              type="button"
              onClick={toggle}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              className="border border-line p-2 text-muted transition-colors hover:border-fg hover:text-fg"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <a
              href={RESUME}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-fg bg-fg px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-bg transition-opacity hover:opacity-85"
            >
              Résumé <ArrowUpRight size={13} />
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={toggle}
              aria-label="Toggle theme"
              className="border border-line p-2 text-muted"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="border border-line p-2"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet — full-height, staggered, so it reads as a deliberate
          panel instead of a dropdown that fell out of the header. */}
      {open && (
        <div className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col overflow-y-auto border-t border-line bg-bg lg:hidden">
          <nav className="flex flex-col px-5 pt-2" aria-label="Mobile">
            {LINKS.map((l, i) => (
              <NavLink
                key={l.to}
                to={l.to}
                style={{ animationDelay: `${i * 40}ms` }}
                className={({ isActive }) =>
                  "nav-sheet-item flex items-center justify-between border-b border-line py-5 font-display text-2xl tracking-tight " +
                  (isActive ? "font-bold text-fg" : "font-semibold text-muted")
                }
              >
                {l.label}
                <span className="font-mono text-[11px] text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto flex flex-wrap items-center gap-3 px-5 py-8">
            <a
              href={RESUME}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-fg bg-fg px-5 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-bg"
            >
              Résumé <ArrowUpRight size={14} />
            </a>
            {ICON_LINKS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex items-center gap-2 border border-line px-4 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-muted"
              >
                <Icon size={14} /> {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
