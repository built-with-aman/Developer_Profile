import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "@/theme/ThemeContext";
import { Search, Home, Briefcase, Map, BookOpen, Award, Heart, Mail, Moon, Sun, Cpu } from "lucide-react";

const ROUTES = [
  { id: "home", label: "Home", path: "/", icon: Home, kicker: "01" },
  { id: "work", label: "Work", path: "/work", icon: Briefcase, kicker: "02" },
  { id: "journey", label: "Journey", path: "/journey", icon: Map, kicker: "03" },
  { id: "manifesto", label: "Manifesto", path: "/manifesto", icon: BookOpen, kicker: "04" },
  { id: "certs", label: "Certifications", path: "/certifications", icon: Award, kicker: "05" },
  { id: "life", label: "Outside the IDE", path: "/outside-the-ide", icon: Heart, kicker: "06" },
  { id: "contact", label: "Contact", path: "/contact", icon: Mail, kicker: "07" },
];

const THEMES = [
  { id: "noir", label: "Noir Terminal", icon: Moon },
  { id: "editorial", label: "Editorial Paper", icon: Sun },
  { id: "blueprint", label: "Blueprint Spec", icon: Cpu },
  { id: "anime", label: "Anime Night", icon: Heart },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const items = [
    ...ROUTES.map((r) => ({ ...r, type: "route" })),
    ...THEMES.map((t) => ({ ...t, type: "theme", path: null })),
  ].filter((item) => {
    if (!query.trim()) return true;
    return item.label.toLowerCase().includes(query.toLowerCase());
  });

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const run = useCallback(
    (item) => {
      if (!item) return;
      if (item.type === "route") {
        navigate(item.path);
        close();
      } else if (item.type === "theme") {
        setTheme(item.id);
        close();
      }
    },
    [navigate, setTheme, close]
  );

  useEffect(() => {
    const onKey = (e) => {
      const isMod = e.metaKey || e.ctrlKey;
      if (isMod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setActive(0);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => Math.min(i + 1, items.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        run(items[active]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, items, active, run]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.div
            role="dialog"
            aria-label="Command palette"
            className="fixed left-1/2 top-[18%] z-[201] w-[min(92vw,480px)] -translate-x-1/2 overflow-hidden rounded-2xl border border-lin bg-paper2 shadow-2xl"
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 border-b border-lin px-4 py-3">
              <Search size={16} className="shrink-0 text-mut" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder="Jump to page or switch theme…"
                className="w-full bg-transparent font-mono text-sm text-ink outline-none placeholder:text-mut"
                data-testid="command-input"
              />
              <kbd className="hidden rounded border border-lin px-1.5 py-0.5 font-mono text-[10px] text-mut sm:inline">
                esc
              </kbd>
            </div>

            <div className="max-h-[50vh] overflow-y-auto py-2">
              {items.length === 0 && (
                <p className="px-4 py-6 text-center font-mono text-xs text-mut">No matches</p>
              )}
              {items.map((item, i) => {
                const Icon = item.icon;
                const isActive = i === active;
                const isCurrent =
                  (item.type === "route" && item.path === location.pathname) ||
                  (item.type === "theme" && item.id === theme);
                return (
                  <button
                    key={`${item.type}-${item.id}`}
                    type="button"
                    onClick={() => run(item)}
                    onMouseEnter={() => setActive(i)}
                    className={
                      "flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors " +
                      (isActive ? "bg-acc/15 text-ink" : "text-mut hover:bg-paper3")
                    }
                  >
                    <Icon size={15} className={isActive ? "text-acc" : ""} />
                    <span className="flex-1 font-mono text-[13px]">
                      {item.kicker && (
                        <span className="mr-2 text-[10px] text-acc">{item.kicker}</span>
                      )}
                      {item.label}
                    </span>
                    {isCurrent && (
                      <span className="font-mono text-[10px] uppercase tracking-widest text-acc">
                        current
                      </span>
                    )}
                    {item.type === "theme" && (
                      <span className="font-mono text-[10px] text-mut">theme</span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between border-t border-lin px-4 py-2 font-mono text-[10px] text-mut">
              <span>↑↓ navigate · ↵ select</span>
              <span className="hidden sm:inline">⌘K / Ctrl+K</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
