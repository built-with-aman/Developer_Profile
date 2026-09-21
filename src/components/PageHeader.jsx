import Reveal from "@/components/Reveal";

/** Presentational — only UI, no data logic. */
export default function PageHeader({ kicker, title, description }) {
  return (
    <Reveal>
      {kicker && <p className="text-sm text-muted">{kicker}</p>}
      <h1 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-6xl">{title}</h1>
      {description && <p className="mt-4 max-w-xl text-muted">{description}</p>}
    </Reveal>
  );
}
