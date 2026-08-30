import { Link, createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/vantage/app-shell";
import { Initials, Meter, Panel, Sparkline, StatusPill } from "@/components/vantage/primitives";
import { clients, isRising } from "@/lib/vantage-data";

export const Route = createFileRoute("/clients/")({
  head: () => ({
    meta: [
      { title: "Clients — Vantage" },
      { name: "description", content: "Every coaching client with focus, progress and engagement at a glance." },
      { property: "og:title", content: "Clients — Vantage" },
      { property: "og:description", content: "Every coaching client with focus, progress and engagement at a glance." },
    ],
  }),
  component: ClientsPage,
});

function ClientsPage() {
  return (
    <AppShell title="Clients" subtitle={`${clients.length} active engagements`}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {clients.map((c) => (
          <Panel key={c.id} className="flex flex-col gap-3 p-5 transition-shadow hover:shadow-lift">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Initials text={c.initials} className="size-11 text-sm" />
                <div className="leading-tight">
                  <Link
                    to="/clients/$clientId"
                    params={{ clientId: c.id }}
                    className="display text-lg hover:underline"
                  >
                    {c.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {c.role} · {c.company}
                  </p>
                </div>
              </div>
              <StatusPill status={c.status} />
            </div>

            <p className="text-sm">
              <span className="text-muted-foreground">Focus:</span> {c.focus}
            </p>

            <div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>
                  {c.sessionsDone}/{c.sessionsTotal} sessions
                </span>
                <span className="tabular-nums">{c.progress}%</span>
              </div>
              <Meter
                value={c.progress}
                className="mt-1.5"
                tone={
                  c.status === "on-track"
                    ? "bg-success"
                    : c.status === "at-risk"
                      ? "bg-ember"
                      : c.status === "stalled"
                        ? "bg-rose"
                        : "bg-info"
                }
              />
            </div>

            <Sparkline
              points={c.engagementTrend}
              className={isRising(c.engagementTrend) ? "text-success" : "text-rose"}
            />

            <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{c.lastNote}</p>

            <div className="mt-auto flex flex-wrap items-center gap-1.5 border-t border-border pt-3">
              {c.tags.map((t) => (
                <span key={t} className="rounded-full bg-foreground/6 px-2 py-0.5 text-[11px] text-muted-foreground">
                  {t}
                </span>
              ))}
              <span className="ml-auto text-[11px] font-semibold text-muted-foreground">{c.nextSession}</span>
            </div>
          </Panel>
        ))}
      </div>
    </AppShell>
  );
}
