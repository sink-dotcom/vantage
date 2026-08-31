import { createFileRoute } from "@tanstack/react-router";
import { Clock3, Repeat2 } from "lucide-react";

import { AppShell } from "@/components/vantage/app-shell";
import { Eyebrow, Panel } from "@/components/vantage/primitives";
import { playbook } from "@/lib/vantage-data";
import { cn } from "@/lib/utils";

const title = "Playbook — Vantage";
const description = "The exercises, frameworks and templates you reach for most across engagements.";

export const Route = createFileRoute("/playbook")({
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
  component: PlaybookPage,
});

const kindTone: Record<string, string> = {
  Exercise: "bg-lemon",
  Framework: "bg-sky",
  Assessment: "bg-pink",
  Template: "bg-leaf",
};

function PlaybookPage() {
  const kinds = [...new Set(playbook.map((p) => p.kind))];

  return (
    <AppShell title="Playbook" subtitle={`${playbook.length} tools across ${kinds.length} categories`}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {playbook.map((item) => (
          <Panel key={item.id} className="flex flex-col gap-3 p-5">
            <div className="flex items-center justify-between gap-2">
              <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold", kindTone[item.kind])}>
                {item.kind}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Clock3 className="size-3.5" /> {item.duration}
              </span>
            </div>

            <h2 className="text-base font-semibold leading-snug">{item.title}</h2>

            <div className="mt-auto border-t border-border pt-3">
              <Eyebrow>Best for</Eyebrow>
              <p className="mt-1 text-sm">{item.useCase}</p>
              <p className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Repeat2 className="size-3.5" /> used {item.used} times
              </p>
            </div>
          </Panel>
        ))}
      </div>
    </AppShell>
  );
}
