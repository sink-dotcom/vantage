import { createFileRoute } from "@tanstack/react-router";
import * as motion from "motion/react-client";
import { CalendarClock, Lock, Target } from "lucide-react";

import { AppShell } from "@/components/vantage/app-shell";
import { Eyebrow, Meter, Panel, StatusPill } from "@/components/vantage/primitives";
import { getClient, goals, sessions } from "@/lib/vantage-data";
import { useRole } from "@/lib/use-role";

export const Route = createFileRoute("/coachee")({
  head: () => ({
    meta: [
      { title: "My coaching journey — Vantage" },
      { name: "description", content: "The coachee view: your goals, upcoming sessions and programme progress in one place." },
      { property: "og:title", content: "My coaching journey — Vantage" },
      { property: "og:description", content: "The coachee view: your goals, upcoming sessions and programme progress in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CoacheeView,
});

const ME = "maya-okonkwo";

function CoacheeView() {
  const { role, setRole } = useRole();
  const me = getClient(ME);

  if (role !== "coachee") {
    return (
      <AppShell title="Coachee view" subtitle="Private space — only visible when signed in as a coachee">
        <Panel className="mx-auto max-w-md p-6 text-center">
          <span className="mx-auto grid size-10 place-items-center rounded-full bg-muted">
            <Lock className="size-4" />
          </span>
          <h2 className="mt-3 text-sm font-bold">This view belongs to your coachee</h2>
          <p className="mt-2 text-xs text-muted-foreground">
            Coaches can preview it, but nothing here is shared back to the practice dashboard.
          </p>
          <button
            type="button"
            onClick={() => setRole("coachee")}
            className="mt-4 rounded-md bg-primary px-4 py-2 text-xs font-bold text-primary-foreground"
          >
            Preview as coachee
          </button>
        </Panel>
      </AppShell>
    );
  }

  if (!me) return null;

  const mySessions = sessions.filter((s) => s.clientId === ME);
  const myGoals = goals.filter((g) => g.clientId === ME);

  return (
    <AppShell title={`Hi ${me.name.split(" ")[0]}`} subtitle={`${me.focus} · ${me.sessionsDone} of ${me.sessionsTotal} sessions`}>
      <div className="grid gap-3 xl:grid-cols-12">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="xl:col-span-8">
          <Panel className="h-full bg-leaf p-5">
            <Eyebrow className="text-foreground/60">My programme</Eyebrow>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="display text-5xl leading-none">{me.progress}%</span>
              <StatusPill status={me.status} />
            </div>
            <Meter value={me.progress} className="mt-4 h-2 bg-foreground/15" tone="bg-foreground/80" />
            <p className="mt-3 text-xs text-foreground/70">Next session · {me.nextSession}</p>
          </Panel>
        </motion.div>

        <Panel className="p-4 xl:col-span-4">
          <div className="flex items-center gap-2">
            <CalendarClock className="size-4" />
            <h2 className="text-sm font-bold">My sessions</h2>
          </div>
          <ul className="mt-3 space-y-2">
            {mySessions.map((session) => (
              <li key={session.id} className="flex items-center justify-between gap-2 rounded-md bg-muted/60 px-3 py-2">
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold">{session.title}</p>
                  <p className="text-[10px] text-muted-foreground">{session.mode} · {session.duration}</p>
                </div>
                <div className="text-right text-[10px] font-semibold">
                  <p>{session.time}</p>
                  <p className="text-muted-foreground">{session.day}</p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel className="p-4 xl:col-span-7">
          <div className="flex items-center gap-2">
            <Target className="size-4" />
            <h2 className="text-sm font-bold">My goals</h2>
          </div>
          <div className="mt-3 space-y-3">
            {myGoals.map((goal) => (
              <div key={goal.id}>
                <div className="flex justify-between gap-2 text-[11px] font-semibold">
                  <span className="truncate">{goal.title}</span>
                  <span>{goal.progress}%</span>
                </div>
                <Meter value={goal.progress} className="mt-1.5" tone="bg-success" />
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {goal.milestones.map((m) => (
                    <li
                      key={m.label}
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${m.done ? "border-success/25 bg-success/12 text-success" : "border-border text-muted-foreground"}`}
                    >
                      {m.label}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="bg-sky p-4 xl:col-span-5">
          <Eyebrow className="text-foreground/60">From my coach</Eyebrow>
          <p className="mt-2 text-sm leading-relaxed">{me.lastNote}</p>
          <p className="mt-3 text-[10px] font-semibold text-foreground/60">Coaching since {me.since}</p>
        </Panel>
      </div>
    </AppShell>
  );
}
