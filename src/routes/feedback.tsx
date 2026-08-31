import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight, Users } from "lucide-react";

import { AppShell } from "@/components/vantage/app-shell";
import { Eyebrow, Meter, Panel } from "@/components/vantage/primitives";
import { feedbackCycles, getClient } from "@/lib/vantage-data";
import { cn } from "@/lib/utils";

const title = "360 feedback — Vantage";
const description = "Run, review and share 360 feedback cycles across every coaching engagement.";

export const Route = createFileRoute("/feedback")({
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
  component: FeedbackPage,
});

const stateTone: Record<string, string> = {
  collecting: "bg-lemon text-foreground",
  review: "bg-sky text-foreground",
  shared: "bg-leaf text-foreground",
};

function FeedbackPage() {
  const responses = feedbackCycles.reduce((s, c) => s + c.responded, 0);
  const invited = feedbackCycles.reduce((s, c) => s + c.invited, 0);

  return (
    <AppShell
      title="360 feedback"
      subtitle={`${feedbackCycles.length} cycles · ${responses}/${invited} responses in`}
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {feedbackCycles.map((cycle) => {
          const client = getClient(cycle.clientId)!;
          const rate = Math.round((cycle.responded / cycle.invited) * 100);
          return (
            <Panel key={cycle.id} className="flex flex-col gap-4 p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <Eyebrow>{cycle.window}</Eyebrow>
                  <h2 className="mt-1 text-base font-semibold leading-snug">{cycle.title}</h2>
                  <Link
                    to="/clients/$clientId"
                    params={{ clientId: client.id }}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    {client.name} · {client.company}
                  </Link>
                </div>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize",
                    stateTone[cycle.state],
                  )}
                >
                  {cycle.state}
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="size-3.5" /> {cycle.responded}/{cycle.invited} raters
                  </span>
                  <span className="font-semibold tabular-nums text-foreground">{rate}%</span>
                </div>
                <Meter value={rate} className="mt-2" tone="bg-foreground/70" />
              </div>

              <ul className="space-y-2.5 border-t border-border pt-3">
                {cycle.themes.map((theme) => (
                  <li key={theme.label} className="text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate">{theme.label}</span>
                      <span
                        className={cn(
                          "inline-flex items-center gap-0.5 text-xs font-semibold tabular-nums",
                          theme.delta >= 0 ? "text-success" : "text-rose",
                        )}
                      >
                        {theme.delta >= 0 ? (
                          <ArrowUpRight className="size-3.5" />
                        ) : (
                          <ArrowDownRight className="size-3.5" />
                        )}
                        {Math.abs(theme.delta)}
                      </span>
                    </div>
                    <Meter
                      value={theme.score}
                      className="mt-1.5"
                      tone={theme.score >= 75 ? "bg-success" : theme.score >= 50 ? "bg-ember" : "bg-rose"}
                    />
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
