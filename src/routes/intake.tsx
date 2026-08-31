import { createFileRoute } from "@tanstack/react-router";
import { Clock3 } from "lucide-react";

import { AppShell } from "@/components/vantage/app-shell";
import { Eyebrow, Initials, Panel } from "@/components/vantage/primitives";
import { intake, intakeStages } from "@/lib/vantage-data";

const title = "Intake — Vantage";
const description = "Track new coaching enquiries from first contact through chemistry, contracting and onboarding.";

export const Route = createFileRoute("/intake")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: IntakePage,
});

const stageTint: Record<string, string> = {
  enquiry: "bg-sky/35",
  chemistry: "bg-lemon/45",
  contracting: "bg-pink/35",
  onboarding: "bg-leaf/40",
};

function IntakePage() {
  return (
    <AppShell title="Intake" subtitle={`${intake.length} prospects in the pipeline`}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {intakeStages.map((stage) => {
          const people = intake.filter((p) => p.stage === stage.key);
          return (
            <Panel key={stage.key} className="flex flex-col gap-3 p-4">
              <div className="flex items-center justify-between">
                <Eyebrow>{stage.label}</Eyebrow>
                <span className="rounded-full bg-foreground/8 px-2 text-[11px] font-bold tabular-nums">
                  {people.length}
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                {people.map((person) => (
                  <article
                    key={person.id}
                    className={`rounded-lg border border-border p-3 ${stageTint[stage.key]}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Initials text={person.initials} className="size-8 bg-card/70" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{person.name}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {person.role} · {person.company}
                        </p>
                      </div>
                    </div>
                    <p className="mt-2.5 text-xs font-medium">{person.next}</p>
                    <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Clock3 className="size-3" /> waiting {person.waiting}
                    </p>
                  </article>
                ))}
                {people.length === 0 ? (
                  <p className="rounded-lg border border-dashed border-border px-3 py-6 text-center text-xs text-muted-foreground">
                    Nothing here
                  </p>
                ) : null}
              </div>
            </Panel>
          );
        })}
      </div>
    </AppShell>
  );
}
