/**
 * pointerBus — ONE pointermove listener and ONE requestAnimationFrame loop
 * for the entire app, no matter how many elements react to the cursor.
 *
 * Why: proximity effects need per-frame values. Doing that with React state
 * would re-render every subscribed row 60 times a second. Instead, subscribers
 * receive the raw pointer on each frame and write CSS custom properties
 * directly to their own DOM node — zero re-renders, compositor-only work.
 */

const subs = new Set();
let pos = { x: -99999, y: -99999, active: false };
let raf = 0;

function tick() {
  for (const fn of subs) fn(pos);
  raf = requestAnimationFrame(tick);
}

function onMove(e) {
  pos = { x: e.clientX, y: e.clientY, active: true };
}

function onOut(e) {
  // Only when the pointer truly leaves the window, not on child transitions.
  if (e.relatedTarget === null) pos = { x: -99999, y: -99999, active: false };
}

function onBlur() {
  pos = { x: -99999, y: -99999, active: false };
}

export function subscribePointer(fn) {
  if (typeof window === "undefined") return () => {};

  if (subs.size === 0) {
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    window.addEventListener("pointerout", onOut, { passive: true });
    window.addEventListener("blur", onBlur);
    raf = requestAnimationFrame(tick);
  }

  subs.add(fn);

  return () => {
    subs.delete(fn);
    if (subs.size === 0) {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      window.removeEventListener("pointerout", onOut);
      window.removeEventListener("blur", onBlur);
    }
  };
}

export function getPointer() {
  return pos;
}
