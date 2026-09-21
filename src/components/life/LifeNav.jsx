import { NavLink } from "react-router-dom";

const TABS = [
  { to: "/life/books",   label: "Books" },
  { to: "/life/gym",     label: "Gym" },
  { to: "/life/travel",  label: "Travel" },
  { to: "/life/routine", label: "Routine" },
  { to: "/life/social",  label: "Social" },
];

export default function LifeNav() {
  return (
    <nav className="sticky top-0 z-30 -mx-5 mb-12 border-b border-line bg-bg/85 px-5 backdrop-blur md:-mx-8 md:px-8">
      <div className="no-scrollbar flex gap-1 overflow-x-auto py-3">
        {TABS.map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            className={({ isActive }) =>
              "border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] transition-colors " +
              (isActive
                ? "border-fg bg-fg text-bg"
                : "border-line text-muted hover:border-fg hover:text-fg")
            }
          >
            {t.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
