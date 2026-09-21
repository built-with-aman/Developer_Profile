import { useEffect, useState } from "react";
import { X, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1];

/* Pool of short rants — 1-2 lines each. 5 get picked at random per open. */
const RANTS = [
  "Four years in Jaipur and I still haven't seen Himachal.",
  "Everyone's a traveller until the bus is 6 hours late.",
  "Dharma yatra with family taught me patience, not wanderlust.",
  "Middle class travel: a temple, a blessing, one WhatsApp photo. That's the whole itinerary.",
  "My bucket list is doing great. My passport is embarrassed.",
  "Ladakh is on the list. Ladakh is always on the list.",
  "In my house, temple counts as travel. Always has, always will.",
  "I don't travel enough. That's not modesty, that's the truth.",
  "Someday is not a date on the calendar.",
  "The map is blank. Give me two years.",
];

function pickRandom(pool, n) {
  const copy = [...pool];
  const out = [];
  while (out.length < n && copy.length > 0) {
    const i = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(i, 1)[0]);
  }
  return out;
}

export default function RantBubble() {
  const [open, setOpen] = useState(false);
  const [rants, setRants] = useState([]);

  const openBubble = () => {
    setRants(pickRandom(RANTS, 5));
    setOpen(true);
  };

  // Escape + scroll lock while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      {/* Floating bubble — bottom-left, soft pulsing ring */}
      <button
        type="button"
        onClick={openBubble}
        aria-label="Open a few random thoughts"
        className="group fixed bottom-5 left-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-bg/85 text-muted backdrop-blur transition-all hover:border-fg hover:text-fg md:bottom-7 md:left-7"
      >
        {/* soft pulsing halo */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full motion-safe:animate-ping motion-safe:opacity-[0.08] motion-reduce:hidden"
          style={{ background: "var(--fg)" }}
        />
        <Sparkles size={16} className="relative" />
      </button>

      {/* Popup */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md select-none"
          >
            {/* Close — moved above cards so no overlap */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute -right-2 -top-12 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-bg text-muted transition-colors hover:border-fg hover:text-fg"
            >
              <X size={14} />
            </button>

            {/* 5 rants with minimal glow */}
            <div className="flex flex-col gap-3">
              {rants.map((r, i) => (
                <motion.div
                  key={r}
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.45, ease: EASE, delay: i * 0.08 }}
                  className="cursor-default select-none rounded-lg border border-line bg-bg/95 px-4 py-3 text-sm leading-relaxed text-muted shadow-[0_0_28px_-14px_var(--fg)]"
                >
                  {r}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}