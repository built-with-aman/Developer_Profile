import { useTextHover } from "@/hooks/useTextHover";

/**
 * Text that restyles on hover.
 * mode: underline | weight | tracking | invert | lift
 */
export default function HoverText({
  children,
  mode = "underline",
  className = "",
  as: Tag = "span",
}) {
  const { bind, style } = useTextHover(mode);
  return (
    <Tag className={`inline-block cursor-default ${className}`} style={style} {...bind}>
      {children}
    </Tag>
  );
}
