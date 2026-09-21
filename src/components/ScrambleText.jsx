import { useScramble } from "@/hooks/useScramble";

/** Scramble-on-hover text. */
export default function ScrambleText({ text, className = "", as: Tag = "span" }) {
  const { display, bind } = useScramble(text);
  return (
    <Tag className={className} {...bind}>
      {display}
    </Tag>
  );
}
