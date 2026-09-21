import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageEnter from "@/components/PageEnter";
import Reveal from "@/components/Reveal";
import PanelBlock from "@/components/cards/PanelBlock";
import { LIFE } from "@/data/content";

export default function OutsideTheIDE() {
  return (
    <PageEnter>
      <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
        <Reveal>
          <p className="text-sm text-muted">Life</p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-6xl">Outside the IDE.</h1>
          <p className="mt-4 text-muted">Four chapters. Open one.</p>
        </Reveal>

        <div className="mt-16 space-y-5">
          {LIFE.map((item, i) => (
            <Link key={item.id} to={`/outside-the-ide/${item.slug}`} className="block group">
              <PanelBlock
                kicker={`${item.time} — ${item.label}`}
                title={item.title}
                text={item.text}
                delay={i * 0.06}
              />
            </Link>
          ))}
        </div>

        <Reveal className="mt-12">
          <Link
            to={`/outside-the-ide/${LIFE[0].slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg"
          >
            Start with chapter 01 <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
    </PageEnter>
  );
}
