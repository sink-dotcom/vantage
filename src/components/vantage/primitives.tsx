import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";
import { statusClass, statusLabel, type Client, type Status } from "@/lib/vantage-data";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}

export function Panel({
  children,
  className,
  gradient,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className={cn(gradient ? "panel-gradient" : "panel", "shadow-panel", className)}>
      {children}
    </section>
  );
}

export function StatusPill({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-2 py-0.5 text-[11px] font-semibold",
        statusClass[status],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {statusLabel[status]}
    </span>
  );
}

export function Meter({ value, className, tone }: { value: number; className?: string; tone?: string }) {
  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-full bg-foreground/10", className)}>
      <div
        className={cn("h-full rounded-full", tone ?? "bg-foreground/70")}
        style={{ width: `${Math.max(2, Math.min(100, value))}%` }}
      />
    </div>
  );
}

export function Initials({ text, className }: { text: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-foreground/8 text-xs font-semibold tracking-wide text-foreground/80 ring-1 ring-border",
        className,
      )}
    >
      {text}
    </span>
  );
}

export function Sparkline({
  points,
  className,
  stroke = "currentColor",
}: {
  points: number[];
  className?: string;
  stroke?: string;
}) {
  const max = Math.max(...points, 1);
  const min = Math.min(...points, 0);
  const span = max - min || 1;
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * 100;
      const y = 30 - ((p - min) / span) * 26 - 2;
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
  return (
    <svg viewBox="0 0 100 30" preserveAspectRatio="none" className={cn("h-8 w-full", className)}>
      <path d={d} fill="none" stroke={stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

const bubbleRing: Record<Status, string> = {
  "on-track": "stroke-success",
  "at-risk": "stroke-ember",
  stalled: "stroke-rose",
  new: "stroke-info",
};

const bands = [
  { label: "Onboarding", to: 25 },
  { label: "Building", to: 55 },
  { label: "Consolidating", to: 80 },
  { label: "Finishing", to: 100 },
];

export function ProgressBubbleMap({ clients }: { clients: Client[] }) {
  const ordered = [...clients].sort((a, b) => a.progress - b.progress);

  return (
    <div className="w-full" aria-label="Client programme progress map">
      <div className="relative h-56 rounded-lg border border-border bg-foreground/[0.02] px-4">
        {/* zone bands */}
        <div className="absolute inset-0 flex overflow-hidden rounded-lg">
          {bands.map((band, i) => {
            const from = i === 0 ? 0 : bands[i - 1]!.to;
            return (
              <div
                key={band.label}
                className="relative border-r border-dashed border-foreground/12 last:border-r-0"
                style={{ width: `${band.to - from}%` }}
              >
                <span className="absolute left-2 top-2 text-[9px] font-bold uppercase tracking-wide text-foreground/35">
                  {band.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* baseline */}
        <div className="absolute inset-x-4 top-[62%] h-px bg-foreground/25" />

        {ordered.map((client, index) => {
          const size = 40 + client.progress * 0.2;
          const verticalOffset = index % 2 === 0 ? -6 : 14;
          const r = 22;
          const circumference = 2 * Math.PI * r;
          return (
            <Link
              key={client.id}
              to="/clients/$clientId"
              params={{ clientId: client.id }}
              className="group absolute top-[62%] z-[1] -translate-x-1/2 -translate-y-full"
              style={{
                left: `calc(1rem + ${client.progress * 0.94}% )`,
                marginTop: `${verticalOffset}px`,
              }}
              aria-label={`${client.name}, ${client.progress}% complete`}
            >
              {/* stem to axis */}
              <span
                className="absolute left-1/2 top-full block w-px -translate-x-1/2 bg-foreground/20"
                style={{ height: `${Math.abs(verticalOffset) + 8}px` }}
              />
              <span
                className="relative grid place-items-center transition-transform duration-150 group-hover:-translate-y-1"
                style={{ width: `${size}px`, height: `${size}px` }}
              >
                <svg viewBox="0 0 48 48" className="absolute inset-0 size-full -rotate-90">
                  <circle cx="24" cy="24" r={r} className="fill-card stroke-foreground/12" strokeWidth={3} />
                  <circle
                    cx="24"
                    cy="24"
                    r={r}
                    fill="none"
                    className={bubbleRing[client.status]}
                    strokeWidth={3.5}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference * (1 - client.progress / 100)}
                  />
                </svg>
                <span className="relative text-[11px] font-extrabold text-foreground">{client.initials}</span>
              </span>
              <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-32 -translate-x-1/2 translate-y-1 rounded-md border border-border bg-popover px-2 py-1.5 text-center opacity-0 shadow-lift transition-all group-hover:translate-y-0 group-hover:opacity-100">
                <span className="block text-xs font-bold text-foreground">{client.progress}%</span>
                <span className="block truncate text-[10px] text-muted-foreground">{client.name}</span>
              </span>
            </Link>
          );
        })}

        {/* axis labels */}
        <div className="absolute inset-x-4 bottom-2 flex justify-between text-[9px] font-bold uppercase tracking-wide text-foreground/45">
          <span>Start</span>
          <span>50%</span>
          <span>Finish</span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-muted-foreground">
        {(Object.keys(bubbleRing) as Status[]).map((s) => (
          <span key={s} className="inline-flex items-center gap-1.5">
            <span className={cn("size-2 rounded-full", statusDot[s])} />
            {statusLabel[s]}
          </span>
        ))}
        <span className="ml-auto">Ring shows programme completion</span>
      </div>
    </div>
  );
}

const statusDot: Record<Status, string> = {
  "on-track": "bg-success",
  "at-risk": "bg-ember",
  stalled: "bg-rose",
  new: "bg-info",
};


export function StatTile({
  label,
  value,
  delta,
  hint,
  children,
}: {
  label: string;
  value: string;
  delta?: string;
  hint?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 px-5 py-4">
      <Eyebrow>{label}</Eyebrow>
      <div className="flex items-baseline gap-2">
        <span className="display text-3xl leading-none">{value}</span>
        {delta ? <span className="text-xs font-semibold text-success">{delta}</span> : null}
      </div>
      {children}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
