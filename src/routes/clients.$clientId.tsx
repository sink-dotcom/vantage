import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, Circle } from "lucide-react";

import { AppShell } from "@/components/vantage/app-shell";
import { Eyebrow, Initials, Meter, Panel, Sparkline, StatusPill } from "@/components/vantage/primitives";
import { activity, getClient, goals, isRising, sessions } from "@/lib/vantage-data";

export const Route = createFileRoute("/clients/$clientId")({
  loader: ({ params }) => {
    const client = getClient(params.clientId);
    if (!client) throw notFound();
    return { client };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.client.name ?? "Client";
    return {
      meta: [
        { title: `${name} — Vantage` },
        { name: "description", content: `Coaching record for ${name}: goals, sessions and notes.` },
        { property: "og:title", content: `${name} — Vantage` },
        { property: "og:description", content: `Coaching record for ${name}: goals, sessions and notes.` },
        ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  component: ClientDetail,
});

function ClientDetail() {
  const { client } = Route.useLoaderData();
  const clientSessions = sessions.filter((s) => s.clientId === client.id);
  const clientGoals = goals.filter((g) => g.clientId === client.id);
  const clientActivity = activity.filter((a) => a.clientId === client.id);

  return (
    <AppShell title={client.name} subtitle={`${client.role} · ${client.company} · client since ${client.since}`}>
      <Link
        to="/clients"
        className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" /> All clients
      </Link>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="flex flex-col gap-4">
          <Panel gradient className="flex flex-wrap items-center gap-5 p-5">
            <Initials text={client.initials} className="size-14 text-base" />
            <div className="min-w-40">
              <Eyebrow>Focus area</Eyebrow>
              <p className="mt-1 text-sm font-semibold">{client.focus}</p>
              <div className="mt-2 flex gap-1.5">
                {client.tags.map((t) => (
                  <span key={t} className="rounded-full bg-foreground/6 px-2 py-0.5 text-[11px] text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="min-w-40 flex-1">
              <Eyebrow>Programme progress</Eyebrow>
              <div className="mt-2 flex items-center gap-2">
                <Meter value={client.progress} tone="bg-accent" />
                <span className="text-sm font-semibold tabular-nums">{client.progress}%</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {client.sessionsDone} of {client.sessionsTotal} sessions completed
              </p>
            </div>
            <div className="min-w-32">
              <Eyebrow>Engagement</Eyebrow>
              <Sparkline
                points={client.engagementTrend}
                className={isRising(client.engagementTrend) ? "text-success" : "text-rose"}
              />
            </div>
            <StatusPill status={client.status} />
          </Panel>

          <Panel className="p-5">
            <h2 className="text-sm font-semibold">Goals</h2>
            <ul className="mt-3 space-y-4">
              {clientGoals.length === 0 ? (
                <li className="text-sm text-muted-foreground">No goals set yet.</li>
              ) : null}
              {clientGoals.map((g) => (
                <li key={g.id} className="rounded-xl border border-border bg-background/40 p-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-sm font-semibold">{g.title}</p>
                    <span className="text-xs text-muted-foreground">{g.horizon}</span>
                  </div>
                  <Meter
                    value={g.progress}
                    className="mt-2"
                    tone={g.status === "on-track" ? "bg-success" : g.status === "at-risk" ? "bg-ember" : "bg-rose"}
                  />
                  <ul className="mt-3 grid gap-1.5 sm:grid-cols-3">
                    {g.milestones.map((m) => (
                      <li key={m.label} className="flex items-center gap-1.5 text-xs">
                        {m.done ? (
                          <Check className="size-3.5 text-success" />
                        ) : (
                          <Circle className="size-3.5 text-muted-foreground" />
                        )}
                        <span className={m.done ? "text-muted-foreground line-through" : ""}>{m.label}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel className="p-5">
            <h2 className="text-sm font-semibold">Session history</h2>
            <ul className="mt-3 divide-y divide-border">
              {clientSessions.map((s) => (
                <li key={s.id} className="flex items-center gap-3 py-2.5 text-sm">
                  <span
                    className={`size-2 rounded-full ${s.state === "done" ? "bg-muted-foreground/50" : "bg-accent"}`}
                  />
                  <span className="flex-1 font-medium">{s.title}</span>
                  <span className="text-xs text-muted-foreground">{s.mode}</span>
                  <span className="w-28 text-right text-xs text-muted-foreground">
                    {s.day} · {s.time}
                  </span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        <div className="flex flex-col gap-4">
          <Panel className="p-5">
            <Eyebrow>Latest note</Eyebrow>
            <p className="mt-2 text-sm leading-relaxed">{client.lastNote}</p>
            <p className="mt-3 text-[11px] text-muted-foreground">Next session: {client.nextSession}</p>
          </Panel>

          <Panel className="p-5">
            <Eyebrow>Activity</Eyebrow>
            <ul className="mt-3 space-y-2.5 text-xs">
              {clientActivity.length === 0 ? (
                <li className="text-muted-foreground">Nothing logged this week.</li>
              ) : null}
              {clientActivity.map((a) => (
                <li key={a.id} className="leading-relaxed">
                  {a.text}
                  <span className="block text-[11px] text-muted-foreground">{a.when}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}
