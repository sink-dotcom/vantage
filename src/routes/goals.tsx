import { Link, createFileRoute } from "@tanstack/react-router";
import { Check, Circle } from "lucide-react";

import { AppShell } from "@/components/vantage/app-shell";
import { Meter, Panel, StatusPill } from "@/components/vantage/primitives";
import { getClient, goals } from "@/lib/vantage-data";

export const Route = createFileRoute("/goals")({
  head: () => ({
    meta: [
      { title: "Goals — Vantage" },
      { name: "description", content: "Client goals, milestones and momentum across every engagement." },
      { property: "og:title", content: "Goals — Vantage" },
      { property: "og:description", content: "Client goals, milestones and momentum across every engagement." },
    ],
  }),
  component: GoalsPage,
});

function GoalsPage() {
  const done = goals.reduce((sum, g) => sum + g.milestones.filter((m) => m.done).length, 0);
  const total = goals.reduce((sum, g) => sum + g.milestones.length, 0);

  return (
    <AppShell title="Goals" subtitle={`${goals.length} active goals · ${done}/${total} milestones complete`}>
      <div className="grid gap-4 md:grid-cols-2">
        {goals.map((g) => {
          const c = getClient(g.clientId)!;
          return (
            <Panel key={g.id} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold leading-snug">{g.title}</h2>
                  <Link
                    to="/clients/$clientId"
                    params={{ clientId: c.id }}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    {c.name} · {c.company} · {g.horizon}
                  </Link>
                </div>
                <StatusPill status={g.status} />
              </div>

              <div className="mt-3 flex items-center gap-2">
                <Meter
                  value={g.progress}
                  tone={g.status === "on-track" ? "bg-success" : g.status === "at-risk" ? "bg-ember" : "bg-rose"}
                />
                <span className="text-xs font-semibold tabular-nums">{g.progress}%</span>
              </div>

              <ul className="mt-4 space-y-1.5">
                {g.milestones.map((m) => (
                  <li key={m.label} className="flex items-center gap-2 text-sm">
                    {m.done ? (
                      <Check className="size-4 text-success" />
                    ) : (
                      <Circle className="size-4 text-muted-foreground" />
                    )}
                    <span className={m.done ? "text-muted-foreground line-through" : ""}>{m.label}</span>
                  </li>
                ))}
              </ul>
            </Panel>
          );
        })}
      </div>
    </AppShell>
  );
}
