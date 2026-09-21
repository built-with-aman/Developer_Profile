import { usePopHover } from "@/hooks/usePopHover";

/** Wrapper: children pop (scale + lift) on hover. */
export default function PopHover({ children, className = "", scale = 1.03, y = -4, as: Tag = "div" }) {
  const { bind, style } = usePopHover({ scale, y });
  return (
    <Tag className={className} style={style} {...bind}>
      {children}
    </Tag>
  );
}
