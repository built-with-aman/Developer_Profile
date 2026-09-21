import Reveal from "@/components/Reveal";

export default function DetailChapter({ num, children, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div className="group relative border-l-2 border-line py-2 pl-6 transition-colors hover:border-fg md:pl-10">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">{num}</span>
        <div className="mt-2 text-base leading-relaxed text-muted group-hover:text-fg md:text-lg">
          {children}
        </div>
      </div>
    </Reveal>
  );
}
