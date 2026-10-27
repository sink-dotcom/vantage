import { createFileRoute } from "@tanstack/react-router";
import { CalendarPlus, FileText, Search, Target, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { QuickActions } from "@/components/vantage/quick-actions";
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
import { clients, type Status } from "@/lib/vantage-data";

const title = "Component library — Vantage";
const description = "Every Vantage building block on one page, ready to import into Figma.";

export const Route = createFileRoute("/components")({
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
  component: LibraryPage,
});

const swatches = [
  ["Paper", "bg-background"],
  ["Ink", "bg-foreground"],
  ["Panel", "bg-card"],
  ["Muted", "bg-muted"],
  ["Lemon", "bg-lemon"],
  ["Leaf", "bg-leaf"],
  ["Ember", "bg-ember"],
  ["Rose", "bg-rose"],
  ["Sky", "bg-sky"],
  ["Pink", "bg-pink"],
  ["Violet", "bg-violet"],
] as const;

const statuses: Status[] = ["on-track", "at-risk", "stalled", "new"];

function Block({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4 border-t border-border pt-6">
      <Eyebrow>{name}</Eyebrow>
      {children}
    </section>
  );
}

function LibraryPage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 px-10 py-12">
      <header>
        <p className="display text-4xl">
          Vantage<span className="text-accent">.</span>
        </p>
        <p className="mt-2 text-muted-foreground">Component library</p>
      </header>

      <Block name="Colour">
        <div className="grid grid-cols-6 gap-3">
          {swatches.map(([label, cls]) => (
            <div key={label} className="flex flex-col gap-2">
              <div className={`h-16 rounded-lg border border-border ${cls}`} />
              <span className="text-xs font-semibold">{label}</span>
            </div>
          ))}
        </div>
      </Block>

      <Block name="Type">
        <p className="display text-5xl">Display 48 Sora</p>
        <h2 className="text-2xl">Heading 24 Sora</h2>
        <p className="text-base">Body 16 Manrope. Plain, everyday language.</p>
        <p className="text-xs text-muted-foreground">Caption 12 Manrope</p>
        <Eyebrow>Eyebrow label</Eyebrow>
      </Block>

      <Block name="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Delete</Button>
          <Button size="sm">Small</Button>
          <Button size="icon" aria-label="Search"><Search /></Button>
        </div>
      </Block>

      <Block name="Inputs">
        <div className="grid max-w-xl gap-3">
          <Input placeholder="Search clients" />
          <Textarea placeholder="Ask Vantage a question" />
          <div className="flex items-center gap-6 text-sm">
            <label className="flex items-center gap-2"><Checkbox defaultChecked /> Checkbox</label>
            <label className="flex items-center gap-2"><Switch defaultChecked /> Switch</label>
          </div>
        </div>
      </Block>

      <Block name="Status pills">
        <div className="flex flex-wrap gap-2">
          {statuses.map((s) => <StatusPill key={s} status={s} />)}
        </div>
      </Block>

      <Block name="Avatars and meters">
        <div className="flex items-center gap-3">
          {clients.slice(0, 4).map((c) => <Initials key={c.id} text={c.initials} />)}
        </div>
        <div className="grid max-w-md gap-2">
          <Meter value={25} tone="bg-rose" />
          <Meter value={55} tone="bg-ember" />
          <Meter value={84} tone="bg-success" />
        </div>
        <Sparkline points={[3, 5, 4, 7, 6, 9, 8]} className="max-w-xs" />
      </Block>

      <Block name="Stat tiles">
        <Panel className="grid max-w-3xl grid-cols-3 divide-x divide-border">
          <StatTile label="Active clients" value="12" delta="+2" hint="This quarter" />
          <StatTile label="Sessions" value="38" hint="Last 30 days" />
          <StatTile label="Goals met" value="71%" delta="+6%" />
        </Panel>
      </Block>

      <Block name="Quick actions">
        <div className="max-w-sm"><QuickActions /></div>
        <div className="flex gap-3 text-foreground/70">
          <CalendarPlus /><UserPlus /><FileText /><Target />
        </div>
      </Block>

      <Block name="Panels">
        <div className="grid grid-cols-2 gap-4">
          <Panel className="p-5"><Eyebrow>Panel</Eyebrow><p className="mt-2 text-sm">Default glass card.</p></Panel>
          <Panel gradient className="p-5"><Eyebrow>Panel gradient</Eyebrow><p className="mt-2 text-sm">Clipped variant.</p></Panel>
        </div>
      </Block>

      <Block name="Progress map">
        <Panel className="p-5"><ProgressBubbleMap clients={clients} /></Panel>
      </Block>
    </main>
  );
}
