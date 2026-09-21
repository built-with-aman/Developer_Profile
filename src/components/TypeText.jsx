import { useTypewriter } from "@/hooks/useTypewriter";

/** Typewriter text effect. */
export default function TypeText({ text, speed = 26, delay = 0, className = "", cursor = true }) {
  const { text: out, done } = useTypewriter(text, { speed, delay });
  return (
    <span className={className}>
      {out}
      {cursor && !done && (
        <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.1em] animate-pulse bg-accent align-middle" />
      )}
    </span>
  );
}
