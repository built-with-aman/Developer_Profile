import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play } from "lucide-react";

/**
 * Renders a project's real media (images / video / embeds) as a main
 * viewer with a thumbnail strip below. Pass an array built from the
 * `media` field on a PROJECTS entry — see data/content.js for the shape.
 * Returns null if there's nothing to show, so callers can fall back to
 * placeholder art (e.g. <ProjectCarousel />) when `media` is empty.
 */
export default function MediaGallery({ media, testid = "media-gallery" }) {
  const [i, setI] = useState(0);
  if (!media || media.length === 0) return null;
  const current = media[i];

  return (
    <div data-testid={testid} className="border border-lin bg-paper">
      <div className="relative aspect-video overflow-hidden bg-paper2">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0"
          >
            {current.type === "video" && (
              <video
                key={current.src}
                src={current.src}
                poster={current.poster}
                controls
                playsInline
                className="h-full w-full object-cover"
              />
            )}
            {current.type === "embed" && (
              <iframe
                src={current.src}
                title={current.caption || `${testid}-${i}`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
            {(!current.type || current.type === "image") && (
              <img
                src={current.src}
                alt={current.alt || ""}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {media.length > 1 && (
        <div className="flex gap-2 overflow-x-auto border-t border-lin p-3">
          {media.map((m, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setI(idx)}
              data-testid={`${testid}-thumb-${idx}`}
              className={
                "relative h-14 w-20 shrink-0 overflow-hidden border transition-colors duration-300 " +
                (idx === i ? "border-acc" : "border-lin opacity-60 hover:opacity-100")
              }
            >
              {m.type === "video" ? (
                <>
                  <video src={m.src} className="h-full w-full object-cover" muted />
                  <span className="absolute inset-0 flex items-center justify-center bg-ink/30">
                    <Play size={14} className="text-onacc" fill="currentColor" />
                  </span>
                </>
              ) : m.type === "embed" ? (
                <span className="flex h-full w-full items-center justify-center bg-paper2">
                  <Play size={14} className="text-mut" fill="currentColor" />
                </span>
              ) : (
                <img src={m.thumb || m.src} alt="" className="h-full w-full object-cover" />
              )}
            </button>
          ))}
        </div>
      )}

      {current.caption && (
        <p className="border-t border-lin px-4 py-3 font-mono text-[11px] text-mut">{current.caption}</p>
      )}
    </div>
  );
}
