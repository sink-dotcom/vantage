import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  CalendarClock,
  CircleDollarSign,
  Clock,
  FileText,
  MessageSquare,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

import { AppShell } from "@/components/vantage/app-shell";
import {
  Eyebrow,
  Initials,
  Meter,
  Panel,
  ProgressBubbleMap,
  Sparkline,
  StatTile,
  StatusPill,
} from "@/components/vantage/primitives";
import {
  activity,
  clients,
  isRising,
  getClient,
  goals,
  practiceStats,
  sessions,
} from "@/lib/vantage-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vantage — Coaching practice dashboard" },
      {
        name: "description",
        content:
          "Track clients, sessions, goals and practice health in one dense coaching workspace.",
      },
      { property: "og:title", content: "Vantage — Coaching practice dashboard" },
      {
        property: "og:description",
        content:
          "Track clients, sessions, goals and practice health in one dense coaching workspace.",
      },
    ],
  }),
  component: Dashboard,
});

const kindIcon = {
  note: FileText,
  session: CalendarClock,
  goal: Target,
  message: MessageSquare,
} as const;

function Dashboard() {
  const upcoming = sessions.filter((s) => s.state !== "done");
  const attention = clients
    .filter((c) => c.status === "at-risk" || c.status === "stalled")
    .sort((a, b) => a.progress - b.progress);
  const maxLoad = Math.max(...practiceStats.weeklyLoad.map((d) => d.hours), 1);

  return (
    <AppShell
      title="Good afternoon, Elena"
      subtitle="Sunday, 30 August · 3 sessions left this week · 2 clients need attention"
    >
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex flex-col gap-4">
          {/* KPI strip */}
          <Panel gradient className="grid grid-cols-2 divide-border md:grid-cols-4 md:divide-x">
            <StatTile label="Active clients" value="6" hint="1 onboarding, 5 in programme">
              <div className="flex -space-x-2 pt-1">
                {clients.slice(0, 5).map((c) => (
                  <Initials key={c.id} text={c.initials} className="size-7 bg-background text-[10px]" />
                ))}
              </div>
            </StatTile>
            <StatTile label="Hours this week" value="7.5" delta="+1.5">
              <div className="flex items-end gap-1 pt-1.5">
                {practiceStats.weeklyLoad.map((d) => (
                  <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
                    <div
                      className="w-full rounded-sm bg-accent/70"
                      style={{ height: `${Math.max(3, (d.hours / maxLoad) * 28)}px` }}
                    />
                    <span className="text-[9px] text-muted-foreground">{d.day[0]}</span>
                  </div>
                ))}
              </div>
            </StatTile>
            <StatTile label="Utilisation" value="82%" hint="Target 75%">
              <Meter value={82} tone="bg-info" className="mt-1" />
            </StatTile>
            <StatTile label="Monthly revenue" value="£18.4k" delta="+7%">
              <Sparkline points={practiceStats.revenueTrend} className="text-success" />
            </StatTile>
          </Panel>

          <div className="grid gap-4 md:grid-cols-[minmax(0,1.45fr)_minmax(240px,.55fr)]">
            <Panel gradient className="min-h-64 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Eyebrow>Programme overview</Eyebrow>
                  <h2 className="mt-1 text-base font-semibold">Progress map</h2>
                </div>
                <Link
                  to="/clients"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground"
                >
                  Explore clients <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
              <ProgressBubbleMap clients={clients} />
            </Panel>

            <Panel className="grid min-h-64 grid-cols-2 divide-x divide-y divide-border overflow-hidden md:grid-cols-1 md:divide-x-0">
              <div className="p-4">
                <Eyebrow>Momentum</Eyebrow>
                <p className="mt-2 text-2xl font-bold tabular-nums text-success">+12%</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Average client progress this month</p>
              </div>
              <div className="p-4">
                <Eyebrow>Completing soon</Eyebrow>
                <p className="mt-2 text-2xl font-bold tabular-nums">2</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Clients above 75% programme progress</p>
              </div>
            </Panel>
          </div>

          {/* Client roster */}
          <Panel className="overflow-hidden">
            <header className="flex items-center justify-between gap-3 border-b border-border px-5 py-3.5">
              <div className="flex items-center gap-2">
                <Users className="size-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold">Client roster</h2>
              </div>
              <Link to="/clients" className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground">
                View all <ArrowUpRight className="size-3.5" />
              </Link>
            </header>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-sm">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                    <th className="px-5 py-2 font-semibold">Client</th>
                    <th className="hidden px-3 py-2 font-semibold xl:table-cell">Focus</th>
                    <th className="px-3 py-2 font-semibold">Progress</th>
                    <th className="px-3 py-2 font-semibold">Trend</th>
                    <th className="px-3 py-2 font-semibold">Next</th>
                    <th className="px-5 py-2 text-right font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((c) => (
                    <tr key={c.id} className="border-t border-border/70 transition-colors hover:bg-foreground/3">
                      <td className="px-5 py-3">
                        <Link
                          to="/clients/$clientId"
                          params={{ clientId: c.id }}
                          className="flex items-center gap-3"
                        >
                          <Initials text={c.initials} />
                          <span className="leading-tight">
                            <span className="block font-semibold">{c.name}</span>
                            <span className="block text-xs text-muted-foreground">
                              {c.role} · {c.company}
                            </span>
                          </span>
                        </Link>
                      </td>
                      <td className="hidden px-3 py-3 text-xs text-muted-foreground xl:table-cell">{c.focus}</td>
                      <td className="px-3 py-3">
                        <div className="flex w-28 items-center gap-2">
                          <Meter
                            value={c.progress}
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
                          <span className="w-8 text-xs tabular-nums text-muted-foreground">{c.progress}%</span>
                        </div>
                        <span className="text-[11px] text-muted-foreground">
                          {c.sessionsDone}/{c.sessionsTotal} sessions
                        </span>
                      </td>
                      <td className="w-20 px-3 py-3">
                        <Sparkline
                          points={c.engagementTrend}
                          className={
                            isRising(c.engagementTrend) ? "text-success" : "text-rose"
                          }
                        />
                      </td>
                      <td className="px-3 py-3 text-xs whitespace-nowrap text-muted-foreground">{c.nextSession}</td>
                      <td className="px-5 py-3 text-right whitespace-nowrap">
                        <StatusPill status={c.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          {/* Goals + attention */}
          <div className="grid gap-4 md:grid-cols-2">
            <Panel className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="size-4 text-muted-foreground" />
                  <h2 className="text-sm font-semibold">Goal momentum</h2>
                </div>
                <Link to="/goals" className="text-xs font-semibold text-muted-foreground hover:text-foreground">
                  All goals
                </Link>
              </div>
              <ul className="mt-3 space-y-3.5">
                {goals.slice(0, 4).map((g) => {
                  const c = getClient(g.clientId)!;
                  return (
                    <li key={g.id}>
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="truncate text-sm font-medium">{g.title}</p>
                        <span className="text-xs tabular-nums text-muted-foreground">{g.progress}%</span>
                      </div>
                      <Meter
                        value={g.progress}
                        className="mt-1.5"
                        tone={g.status === "on-track" ? "bg-success" : g.status === "at-risk" ? "bg-ember" : "bg-rose"}
                      />
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        {c.name} · {g.horizon}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </Panel>

            <Panel className="p-5">
              <div className="flex items-center gap-2">
                <TrendingUp className="size-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold">Needs attention</h2>
              </div>
              <ul className="mt-3 space-y-3">
                {attention.map((c) => (
                  <li key={c.id} className="rounded-xl border border-border bg-background/40 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <Link
                        to="/clients/$clientId"
                        params={{ clientId: c.id }}
                        className="text-sm font-semibold hover:underline"
                      >
                        {c.name}
                      </Link>
                      <StatusPill status={c.status} />
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{c.lastNote}</p>
                    <p className="mt-2 text-[11px] font-semibold text-muted-foreground">
                      Next: {c.nextSession}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-accent/40 bg-accent/10 p-3">
                <CircleDollarSign className="size-4 text-ember" />
                <p className="text-xs">
                  2 invoices unsent for August — £3,200 outstanding.
                </p>
              </div>
            </Panel>
          </div>
        </div>

        {/* Right rail */}
        <div className="flex flex-col gap-4">
          <Panel className="p-5">
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold">Up next</h2>
            </div>
            <ul className="mt-3 space-y-2.5">
              {upcoming.map((s) => {
                const c = getClient(s.clientId)!;
                return (
                  <li
                    key={s.id}
                    className={`rounded-xl border p-3 ${
                      s.state === "today" ? "border-accent/50 bg-accent/10" : "border-border bg-background/40"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      <span>{s.day}</span>
                      <span>
                        {s.time} · {s.duration}
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-medium">{s.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {c.name} · {s.mode}
                    </p>
                  </li>
                );
              })}
            </ul>
          </Panel>

          <Panel className="p-5">
            <Eyebrow>Recent activity</Eyebrow>
            <ul className="mt-3 space-y-3">
              {activity.map((a) => {
                const Icon = kindIcon[a.kind];
                const c = getClient(a.clientId)!;
                return (
                  <li key={a.id} className="flex gap-2.5">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-foreground/6 text-muted-foreground">
                      <Icon className="size-3" />
                    </span>
                    <p className="text-xs leading-relaxed">
                      <span className="font-semibold">{c.name}</span> {a.text}
                      <span className="block text-[11px] text-muted-foreground">{a.when}</span>
                    </p>
                  </li>
                );
              })}
            </ul>
          </Panel>

          <Panel gradient className="p-5">
            <Eyebrow>Practice health</Eyebrow>
            <div className="mt-3 space-y-3 text-sm">
              {[
                { label: "Client retention", value: 94, tone: "bg-success" },
                { label: "Session show-rate", value: 88, tone: "bg-info" },
                { label: "Notes filed within 24h", value: 71, tone: "bg-ember" },
              ].map((row) => (
                <div key={row.label}>
                  <div className="flex justify-between text-xs">
                    <span>{row.label}</span>
                    <span className="tabular-nums text-muted-foreground">{row.value}%</span>
                  </div>
                  <Meter value={row.value} tone={row.tone} className="mt-1.5" />
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}
