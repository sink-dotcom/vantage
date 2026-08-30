import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  CalendarClock,
  Clock,
  FileText,
  MessageSquare,
  Plus,
  Target,
  TrendingUp,
  UserPlus,
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
  StatusPill,
} from "@/components/vantage/primitives";
import { activity, clients, getClient, goals, isRising, practiceStats, sessions } from "@/lib/vantage-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vantage — Coaching practice dashboard" },
      { name: "description", content: "A visual coaching workspace for clients, sessions, goals and practice health." },
      { property: "og:title", content: "Vantage — Coaching practice dashboard" },
      { property: "og:description", content: "A visual coaching workspace for clients, sessions, goals and practice health." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const kindIcon = { note: FileText, session: CalendarClock, goal: Target, message: MessageSquare } as const;

function Dashboard() {
  const upcoming = sessions.filter((session) => session.state !== "done").slice(0, 4);
  const attention = clients.filter((client) => client.status === "at-risk" || client.status === "stalled");
  const maxLoad = Math.max(...practiceStats.weeklyLoad.map((day) => day.hours), 1);

  return (
    <AppShell title="Good afternoon, Elena" subtitle="Sunday, 30 August · 3 sessions left · 2 need attention">
      <div className="grid gap-3 xl:grid-cols-12">
        <section className="grid grid-cols-2 gap-3 xl:col-span-9 xl:grid-cols-4" aria-label="Practice summary">
          <Panel className="min-h-36 bg-lemon p-4">
            <Eyebrow className="text-foreground/60">Clients</Eyebrow>
            <div className="mt-3 flex items-end justify-between">
              <span className="display text-4xl">6</span>
              <Users className="size-7" strokeWidth={1.5} />
            </div>
            <div className="mt-5 flex -space-x-2">
              {clients.slice(0, 5).map((client) => <Initials key={client.id} text={client.initials} className="size-7 bg-card text-[9px]" />)}
            </div>
          </Panel>

          <Panel className="min-h-36 bg-pink p-4">
            <Eyebrow className="text-foreground/60">Coaching hours</Eyebrow>
            <p className="display mt-3 text-4xl">7.5</p>
            <div className="mt-4 flex h-8 items-end gap-1.5">
              {practiceStats.weeklyLoad.map((day) => (
                <div key={day.day} className="flex flex-1 items-end">
                  <div className="w-full bg-foreground/75" style={{ height: `${Math.max(4, (day.hours / maxLoad) * 32)}px` }} />
                </div>
              ))}
            </div>
          </Panel>

          <Link to="/clients" className="group">
            <Panel className="min-h-36 bg-leaf p-4 transition-transform duration-200 hover:-translate-y-px">
              <div className="flex items-start justify-between">
                <Eyebrow className="text-foreground/60">Quick action</Eyebrow>
                <ArrowUpRight className="size-4 opacity-60 transition-opacity group-hover:opacity-100" />
              </div>
              <div className="mt-5 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-foreground/10">
                  <UserPlus className="size-5" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="text-sm font-bold">Add client</p>
                  <p className="text-[10px] text-foreground/60">Start an intake</p>
                </div>
              </div>
            </Panel>
          </Link>

          <Link to="/clients" className="group">
            <Panel className="min-h-36 bg-sky p-4 transition-transform duration-200 hover:-translate-y-px">
              <div className="flex items-start justify-between">
                <Eyebrow className="text-foreground/60">Quick action</Eyebrow>
                <ArrowUpRight className="size-4 opacity-60 transition-opacity group-hover:opacity-100" />
              </div>
              <div className="mt-5 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-foreground/10">
                  <FileText className="size-5" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="text-sm font-bold">Log note</p>
                  <p className="text-[10px] text-foreground/60">Capture a session insight</p>
                </div>
              </div>
            </Panel>
          </Link>
        </section>

        <Panel className="row-span-2 p-4 xl:col-span-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><Clock className="size-4" /><h2 className="text-sm font-bold">Up next</h2></div>
            <Link to="/sessions" aria-label="View all sessions"><ArrowUpRight className="size-4" /></Link>
          </div>
          <ol className="relative mt-4 space-y-2 before:absolute before:bottom-4 before:left-[7px] before:top-4 before:w-px before:bg-foreground/15">
            {upcoming.map((session, index) => {
              const client = getClient(session.clientId);
              if (!client) return null;
              return (
                <li key={session.id} className="relative grid grid-cols-[16px_1fr_auto] gap-2 rounded-md p-2.5 hover:bg-muted/60">
                  <span className={`relative z-[1] mt-1 size-3 rounded-full border-2 border-card ${index === 0 ? "bg-pink" : "bg-foreground/25"}`} />
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold">{session.title}</p>
                    <p className="truncate text-[10px] text-muted-foreground">{client.name}</p>
                  </div>
                  <div className="text-right text-[10px] font-semibold"><p>{session.time}</p><p className="text-muted-foreground">{session.day}</p></div>
                </li>
              );
            })}
          </ol>
          <Link to="/sessions" className="mt-3 flex items-center justify-center rounded-md bg-primary py-2 text-xs font-bold text-primary-foreground">Open calendar</Link>
        </Panel>

        <Panel className="overflow-hidden bg-secondary xl:col-span-6">
          <header className="flex items-center justify-between px-5 pt-4">
            <div><Eyebrow className="text-foreground/60">Programme</Eyebrow><h2 className="mt-1 text-lg font-bold">Client progress</h2></div>
            <Link to="/clients" aria-label="Explore clients"><ArrowUpRight className="size-4" /></Link>
          </header>
          <div className="px-4 pb-1"><ProgressBubbleMap clients={clients} /></div>
        </Panel>

        <section className="grid grid-cols-2 gap-3 xl:col-span-3" aria-label="Programme highlights">
          <Panel className="flex min-h-40 flex-col justify-between bg-card p-4">
            <TrendingUp className="size-6 text-success" />
            <div><p className="display text-3xl text-success">+12%</p><p className="text-[11px] font-semibold text-muted-foreground">Momentum</p></div>
          </Panel>
          <Panel className="flex min-h-40 flex-col justify-between bg-lemon p-4">
            <Target className="size-6" />
            <div><p className="display text-3xl">2</p><p className="text-[11px] font-semibold">Near finish</p></div>
          </Panel>
        </section>

        <Panel className="overflow-hidden xl:col-span-9">
          <header className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2"><Users className="size-4" /><h2 className="text-sm font-bold">Client roster</h2></div>
            <Link to="/clients" className="text-xs font-bold">View all</Link>
          </header>
          <div className="grid divide-y divide-border md:grid-cols-2 md:divide-x md:divide-y-0">
            {clients.map((client) => (
              <Link key={client.id} to="/clients/$clientId" params={{ clientId: client.id }} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-border/70 px-4 py-2.5 transition-colors hover:bg-muted/60 md:[&:nth-last-child(-n+2)]:border-b-0">
                <Initials text={client.initials} className="size-8" />
                <div className="min-w-0">
                  <div className="flex items-baseline justify-between gap-2"><p className="truncate text-xs font-bold">{client.name}</p><span className="text-[10px] font-semibold">{client.progress}%</span></div>
                  <Meter value={client.progress} className="mt-1.5" tone={client.status === "on-track" ? "bg-success" : client.status === "at-risk" ? "bg-ember" : client.status === "stalled" ? "bg-rose" : "bg-info"} />
                </div>
                <Sparkline points={client.engagementTrend} className={`w-12 ${isRising(client.engagementTrend) ? "text-success" : "text-rose"}`} />
              </Link>
            ))}
          </div>
        </Panel>

        <Panel className="p-4 xl:col-span-3">
          <Eyebrow>Activity</Eyebrow>
          <ul className="mt-3 space-y-3">
            {activity.slice(0, 5).map((item) => {
              const Icon = kindIcon[item.kind];
              const client = getClient(item.clientId);
              if (!client) return null;
              return <li key={item.id} className="flex items-center gap-2"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-muted"><Icon className="size-3" /></span><div className="min-w-0"><p className="truncate text-[11px] font-semibold">{client.name}</p><p className="truncate text-[10px] text-muted-foreground">{item.text}</p></div><span className="ml-auto shrink-0 text-[9px] text-muted-foreground">{item.when}</span></li>;
            })}
          </ul>
        </Panel>

        <Panel className="p-4 xl:col-span-5">
          <div className="flex items-center justify-between"><div className="flex items-center gap-2"><Target className="size-4" /><h2 className="text-sm font-bold">Goal momentum</h2></div><Link to="/goals"><ArrowUpRight className="size-4" /></Link></div>
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
            {goals.slice(0, 4).map((goal) => <div key={goal.id}><div className="flex justify-between gap-2 text-[10px] font-semibold"><span className="truncate">{goal.title}</span><span>{goal.progress}%</span></div><Meter value={goal.progress} className="mt-1.5" tone={goal.status === "on-track" ? "bg-success" : goal.status === "at-risk" ? "bg-ember" : "bg-rose"} /></div>)}
          </div>
        </Panel>

        <Panel className="bg-lemon/55 p-4 xl:col-span-4">
          <div className="flex items-center gap-2"><TrendingUp className="size-4" /><h2 className="text-sm font-bold">Needs attention</h2></div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {attention.map((client) => <Link key={client.id} to="/clients/$clientId" params={{ clientId: client.id }} className="rounded-md border border-foreground/15 bg-card/55 p-2.5"><div className="flex items-center justify-between gap-2"><p className="text-xs font-bold">{client.name}</p><StatusPill status={client.status} /></div><p className="mt-2 text-[10px] font-semibold text-muted-foreground">{client.nextSession}</p></Link>)}
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}