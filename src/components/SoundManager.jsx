import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";

const SoundCtx = createContext({ enabled: false, toggle: () => {}, play: () => {} });

export const useSound = () => useContext(SoundCtx);

/**
 * Lightweight Web Audio click / whoosh system.
 * Starts muted. User can enable via the sound toggle.
 * Extremely subtle — designed for cinematic feedback, not game noise.
 */
export function SoundProvider({ children }) {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("as-sound");
      if (saved === "1") setEnabled(true);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("as-sound", enabled ? "1" : "0");
    } catch {}
  }, [enabled]);

  const ensureCtx = useCallback(() => {
    if (!ctxRef.current) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) ctxRef.current = new Ctx();
    }
    if (ctxRef.current?.state === "suspended") {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  const play = useCallback(
    (type = "click") => {
      if (!enabled) return;
      const ctx = ensureCtx();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "click") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(680, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.06);
        gain.gain.setValueAtTime(0.045, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.09);
      } else if (type === "whoosh") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(90, now + 0.18);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.22);
      } else if (type === "success") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.setValueAtTime(780, now + 0.06);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.16);
      }
    },
    [enabled, ensureCtx]
  );

  const toggle = useCallback(() => {
    setEnabled((v) => {
      const next = !v;
      if (next) {
        // play a tiny confirmation
        setTimeout(() => play("success"), 30);
      }
      return next;
    });
  }, [play]);

  return (
    <SoundCtx.Provider value={{ enabled, toggle, play }}>{children}</SoundCtx.Provider>
  );
}

export default function SoundToggle({ className = "" }) {
  const { enabled, toggle } = useSound();
  return (
    <button
      type="button"
      onClick={toggle}
      data-testid="sound-toggle"
      data-cursor={enabled ? "MUTE" : "SOUND"}
      aria-label={enabled ? "Mute sound" : "Enable sound"}
      className={
        "font-mono text-[10px] uppercase tracking-[0.2em] transition-colors " +
        (enabled ? "text-acc" : "text-mut hover:text-ink") +
        " " +
        className
      }
    >
      {enabled ? "snd·on" : "snd·off"}
    </button>
  );
}
