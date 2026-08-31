import { Link, createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Video, Phone, MapPin } from "lucide-react";

import { AppShell } from "@/components/vantage/app-shell";
import { Eyebrow, Initials, Panel } from "@/components/vantage/primitives";
import { getClient, logs } from "@/lib/vantage-data";
import { cn } from "@/lib/utils";

const title = "Session logs — Vantage";
const description = "Every session write-up, agreed action and read on how the coachee showed up.";

export const Route = createFileRoute("/logs")({
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
  component: LogsPage,
});

const modeIcon = { Video, Call: Phone, "In person": MapPin } as const;

const moodTone: Record<string, string> = {
  energised: "bg-leaf text-foreground",
  steady: "bg-sky text-foreground",
  strained: "bg-pink text-foreground",
};

function LogsPage() {
  const actions = logs.reduce((s, l) => s + l.actions.length, 0);

  return (
    <AppShell title="Session logs" subtitle={`${logs.length} write-ups · ${actions} open actions`}>
      <div className="grid gap-4 lg:grid-cols-2">
        {logs.map((log) => {
          const client = getClient(log.clientId)!;
          const Icon = modeIcon[log.mode];
          return (
            <Panel key={log.id} className="flex flex-col gap-3 p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <Initials text={client.initials} />
                  <div className="min-w-0">
                    <h2 className="truncate text-base font-semibold leading-snug">{log.title}</h2>
                    <Link
                      to="/clients/$clientId"
                      params={{ clientId: client.id }}
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      {client.name}
                    </Link>
                  </div>
                </div>
                <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize", moodTone[log.mood])}>
                  {log.mood}
                </span>
              </div>

              <p className="text-sm leading-relaxed text-foreground/85">{log.summary}</p>

              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Icon className="size-3.5" /> {log.mode}
                </span>
                <span>{log.duration}</span>
                <span>{log.date}</span>
              </div>

              <div className="border-t border-border pt-3">
                <Eyebrow>Agreed actions</Eyebrow>
                <ul className="mt-2 space-y-1.5">
                  {log.actions.map((action) => (
                    <li key={action} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="size-4 text-muted-foreground" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            </Panel>
          );
        })}
      </div>
    </AppShell>
  );
}
