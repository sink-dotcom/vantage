import { createFileRoute } from "@tanstack/react-router";
import { Phone, Users, Video } from "lucide-react";

import { AppShell } from "@/components/vantage/app-shell";
import { Eyebrow, Initials, Panel } from "@/components/vantage/primitives";
import { getClient, sessions } from "@/lib/vantage-data";

export const Route = createFileRoute("/sessions")({
  head: () => ({
    meta: [
      { title: "Sessions — Vantage" },
      { name: "description", content: "Upcoming and completed coaching sessions across your practice." },
      { property: "og:title", content: "Sessions — Vantage" },
      { property: "og:description", content: "Upcoming and completed coaching sessions across your practice." },
    ],
  }),
  component: SessionsPage,
});

const modeIcon = { Video: Video, Call: Phone, "In person": Users } as const;

function SessionsPage() {
  const upcoming = sessions.filter((s) => s.state !== "done");
  const past = sessions.filter((s) => s.state === "done");

  return (
    <AppShell title="Sessions" subtitle={`${upcoming.length} scheduled · ${past.length} completed recently`}>
      <div className="grid gap-4 lg:grid-cols-2">
        {[
          { label: "Scheduled", items: upcoming },
          { label: "Completed", items: past },
        ].map((group) => (
          <Panel key={group.label} className="p-5">
            <Eyebrow>{group.label}</Eyebrow>
            <ul className="mt-3 space-y-2.5">
              {group.items.map((s) => {
                const c = getClient(s.clientId)!;
                const Icon = modeIcon[s.mode];
                return (
                  <li
                    key={s.id}
                    className={`flex items-center gap-3 rounded-xl border p-3 ${
                      s.state === "today" ? "border-accent/50 bg-accent/10" : "border-border bg-background/40"
                    }`}
                  >
                    <Initials text={c.initials} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{s.title}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {c.name} · {c.company}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold">
                        {s.day} · {s.time}
                      </p>
                      <p className="flex items-center justify-end gap-1 text-[11px] text-muted-foreground">
                        <Icon className="size-3" /> {s.duration}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Panel>
        ))}
      </div>
    </AppShell>
  );
}
