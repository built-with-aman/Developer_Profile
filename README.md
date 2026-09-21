# Aman Soni — Portfolio (new design)

Clean, modern SDE portfolio. Content only from the original; styling and UI are fully new.

## Stack
- React 19 + Vite
- Tailwind CSS
- Motion (subtle page motion)
- React Router

## Themes
Light / Dark toggle in the navbar.

## Run
```bash
npm install
npm run dev
```

## Pages
- `/` Home
- `/work` Projects list
- `/work/:id` Case study
- `/journey` Level path
- `/manifesto` Principles
- `/certifications` Credentials
- `/outside-the-ide` Life system
- `/contact` Email + socials

---

## Interaction layer

Monochrome removes colour as a tool, so everything below uses the three
variables that are left: **weight, distance, and time**. None of it is a flip,
a tilt, or a border-colour swap.

| Piece | Mechanism |
|---|---|
| `KineticHeadline` | Per-character variable-font weight (Syne 400→800) interpolated against cursor distance. A swell travels through the word. |
| `ProximityRow` + `useProximity` | Rows react to *proximity*, not hover. Neighbours respond faintly, so a list behaves as one surface. Dock-style falloff applied to type. |
| `BlueprintFrame` | One continuous SVG hairline draws around the perimeter, registration ticks extend, and the card prints its own **real measured dimensions** (ResizeObserver) plus a live cursor readout. |
| `ScrollLitText` + `useScrollLit` | A reading head travels through the paragraph as you scroll; words light in sequence and un-light on the way back up. |
| `Odometer` | Mechanical digit strips, staggered right-to-left so the ones column settles last. |
| `SweepButton` | The fill grows radially from the exact point the cursor entered, and the label is duplicated + clipped so it inverts progressively. |
| `InvertBand` | A fixed window over a ticker using `backdrop-filter: invert(1)`. Names flip mid-word as they cross it. |
| `Filmstrip` + `useDragScroll` | Grab-to-scrub contact sheet built on a **native** scroll-snap container, so momentum, touch, Tab order and arrow keys come from the platform. |
| `HalftoneField` | A print halftone dot screen masked to a soft circle that follows the cursor — ink instead of a coloured glow. |

### Two engineering notes

**No re-renders.** Proximity, kinetic weight and the halftone mask all write CSS
custom properties straight to the DOM. A 24-character headline would otherwise
mean ~1,400 React renders per second. `src/lib/pointerBus.js` runs a single
`pointermove` listener and a single `requestAnimationFrame` loop for the whole
app, no matter how many elements subscribe.

**Variable fonts are load-bearing.** `index.html` requests the axis
(`Syne:wght@400..800`), not four static cuts. Without the continuous axis every
weight transition on the site would snap instead of glide.

Every effect has a `prefers-reduced-motion` path — the layout and hierarchy
still read with all travel removed.
