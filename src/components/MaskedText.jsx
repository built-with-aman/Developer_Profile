import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1];

export default function MaskedText({
  lines,
  as: Tag = "h2",
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 0.1,
  mode = "inview",
  ...rest
}) {
  return (
    <Tag className={className} {...rest}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
          <motion.span
            className={"block will-change-transform " + lineClassName}
            initial={{ y: "115%", rotate: 4 }}
            {...(mode === "mount"
              ? { animate: { y: "0%", rotate: 0 } }
              : {
                  whileInView: { y: "0%", rotate: 0 },
                  viewport: { once: true, margin: "-8% 0px -8% 0px" },
                })}
            transition={{ duration: 1.1, ease: EASE, delay: delay + i * stagger }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
