import PageEnter from "@/components/PageEnter";
import PageHeader from "@/components/PageHeader";
import StampCard from "@/components/cards/StampCard";
import { Tabs } from "@/components/Tabs";
import { CREDENTIALS } from "@/data/content";

const certified = CREDENTIALS.filter((c) => c.status === "Certified");
const ongoing = CREDENTIALS.filter((c) => c.status === "Ongoing");

export default function Certifications() {
  return (
    <PageEnter>
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <PageHeader
          kicker="Credentials"
          title="Certifications."
          description="Coursework, assessments and the paperwork behind the practice — filterable, with what each one actually covered."
        />

        <Tabs defaultValue="all" className="mt-12">
          <Tabs.List>
            <Tabs.Tab value="all">All ({CREDENTIALS.length})</Tabs.Tab>
            <Tabs.Tab value="certified">Certified ({certified.length})</Tabs.Tab>
            <Tabs.Tab value="ongoing">Ongoing ({ongoing.length})</Tabs.Tab>
          </Tabs.List>

          {[
            ["all", CREDENTIALS],
            ["certified", certified],
            ["ongoing", ongoing.length ? ongoing : CREDENTIALS],
          ].map(([key, list]) => (
            <Tabs.Panel key={key} value={key}>
              <div className="grid gap-6 sm:grid-cols-2">
                {list.map((c, i) => (
                  <StampCard
                    key={c.id}
                    title={c.title}
                    status={c.status}
                    note={c.note}
                    num={String(i + 1).padStart(2, "0")}
                    total={String(list.length).padStart(2, "0")}
                    delay={i * 0.04}
                    verifyUrl={c.verifyUrl}
                  />
                ))}
              </div>
            </Tabs.Panel>
          ))}
        </Tabs>
      </div>
    </PageEnter>
  );
}