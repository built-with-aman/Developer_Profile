import { motion } from "motion/react";
import { useTheme } from "@/theme/ThemeContext";

const OPTIONS = [
  { id: "noir", label: "Noir" },
  { id: "editorial", label: "Paper" },
  { id: "blueprint", label: "Spec" },
  { id: "anime", label: "Anime" },
];

export default function ThemeToggle({ layoutId = "theme-thumb" }) {
  const { theme, setTheme } = useTheme();
  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      data-testid="navbar-theme-toggle"
      className="relative flex items-center rounded-full border border-lin bg-paper2 p-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
    >
      {OPTIONS.map((t) => (
        <button
          key={t.id}
          type="button"
          role="radio"
          aria-checked={theme === t.id}
          data-testid={`theme-option-${t.id}`}
          onClick={() => setTheme(t.id)}
          className="relative px-3 py-1.5"
        >
          {theme === t.id && (
            <motion.span
              layoutId={layoutId}
              className="absolute inset-0 rounded-full bg-acc"
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
            />
          )}
          <span className={"relative z-10 " + (theme === t.id ? "text-onacc" : "text-mut")}>
            {t.label}
          </span>
        </button>
      ))}
    </div>
  );
}
