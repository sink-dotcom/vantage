import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vantage — Coaching Workspace Design System" },
      {
        name: "description",
        content:
          "The Vantage design system: warm parchment canvas, ink chrome, amber accent, Newsreader and Hanken Grotesk typography.",
      },
      { property: "og:title", content: "Vantage — Coaching Workspace Design System" },
      {
        property: "og:description",
        content:
          "Colors, type, panels and accents that make up the Vantage coaching workspace.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DesignSystem,
});

const swatches = [
  { name: "Background", token: "bg-background", note: "Parchment canvas" },
  { name: "Foreground", token: "bg-foreground", note: "Ink" },
  { name: "Accent", token: "bg-accent", note: "Vantage amber" },
  { name: "Muted", token: "bg-muted", note: "Warm sand" },
  { name: "Secondary", token: "bg-secondary", note: "Panel edge" },
  { name: "Sidebar", token: "bg-sidebar", note: "Chrome" },
];

const statuses = [
  { name: "Success", token: "bg-success" },
  { name: "Info", token: "bg-info" },
  { name: "Violet", token: "bg-violet" },
  { name: "Ember", token: "bg-ember" },
  { name: "Rose", token: "bg-rose" },
];

function DesignSystem() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-14 md:px-10">
      <p className="eyebrow">Design system</p>
      <h1 className="display mt-2 text-4xl md:text-5xl">
        Vantage<span className="text-accent">.</span>
      </h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Tokens, type and surfaces for the coaching workspace. Everything below is defined
        once in the stylesheet and reused across screens.
      </p>

      <section className="mt-12">
        <h2 className="text-xl">Typography</h2>
        <div className="panel mt-4 p-7">
          <p className="display text-3xl">Newsreader italic — display &amp; wordmark</p>
          <p className="mt-4 text-base">
            Hanken Grotesk — interface text, labels, tables and body copy.
          </p>
          <p className="eyebrow mt-4">Eyebrow label</p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl">Core palette</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
          {swatches.map((s) => (
            <div key={s.name} className="panel overflow-hidden">
              <div className={`h-20 w-full ${s.token}`} />
              <div className="p-4">
                <div className="text-sm font-semibold">{s.name}</div>
                <div className="text-xs text-muted-foreground">{s.note}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl">Status accents</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {statuses.map((s) => (
            <span
              key={s.name}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium"
            >
              <span className={`size-2.5 rounded-full ${s.token}`} />
              {s.name}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl">Surfaces</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="panel-gradient min-h-40 p-7">
            <div className="text-base font-semibold">Gradient panel</div>
            <p className="mt-1 text-sm text-muted-foreground">
              Used for the progress map and hero cards.
            </p>
          </div>
          <div className="panel min-h-40 p-7">
            <div className="text-base font-semibold">Flat panel</div>
            <p className="mt-1 text-sm text-muted-foreground">
              Used for quick actions, calendar and lists.
            </p>
            <button className="surface-accent mt-5 rounded-lg px-4 py-2 text-sm font-semibold">
              Accent action
            </button>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl">Chrome</h2>
        <div className="mt-4 flex overflow-hidden rounded-xl border border-border">
          <div className="w-56 bg-sidebar p-5">
            <div className="display text-xl text-sidebar-foreground">
              Vantage<span className="text-sidebar-primary">.</span>
            </div>
            <div className="mt-5 space-y-1">
              <div className="rounded-lg bg-sidebar-accent px-3 py-2 text-sm font-medium text-sidebar-accent-foreground">
                Dashboard
              </div>
              <div className="px-3 py-2 text-sm text-sidebar-muted">Coachees</div>
              <div className="px-3 py-2 text-sm text-sidebar-muted">Workflow</div>
            </div>
          </div>
          <div className="flex-1 bg-background p-6">
            <div className="text-sm text-muted-foreground">Main canvas</div>
          </div>
        </div>
      </section>
    </main>
  );
}
