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
}: {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
}) {
  return (
    <section className={cn(gradient ? "panel-gradient" : "panel", "shadow-panel", className)}>
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

const bubbleTone: Record<Status, string> = {
  "on-track": "text-success",
  "at-risk": "text-ember",
  stalled: "text-rose",
  new: "text-info",
};

export function ProgressBubbleMap({ clients }: { clients: Client[] }) {
  const ordered = [...clients].sort((a, b) => a.progress - b.progress);

  return (
    <div className="relative min-h-48" aria-label="Client programme progress map">
      <div className="absolute inset-x-4 top-[58%] h-0.5 bg-foreground/15" />
      <div className="absolute inset-x-4 top-[58%] flex justify-between text-[9px] font-bold uppercase text-foreground/50">
        <span className="mt-3">Start</span>
        <span className="mt-3">50%</span>
        <span className="mt-3">Finish</span>
      </div>
      {ordered.map((client, index) => {
        const size = 42 + client.progress * 0.22;
        const verticalOffset = index % 2 === 0 ? -4 : 12;
        return (
          <Link
            key={client.id}
            to="/clients/$clientId"
            params={{ clientId: client.id }}
            className="group absolute top-[58%] z-[1] -translate-x-1/2 -translate-y-full"
            style={{ left: `${7 + client.progress * 0.86}%`, marginTop: `${verticalOffset}px` }}
            aria-label={`${client.name}, ${client.progress}% complete`}
          >
            <span
              className={cn(
                "bubble-node grid place-items-center rounded-full text-[11px] font-extrabold transition-transform duration-150 group-hover:-translate-y-1",
                bubbleTone[client.status],
              )}
              style={{ width: `${size}px`, height: `${size}px` }}
            >
              <span className="text-foreground">{client.initials}</span>
            </span>
            <span className="pointer-events-none absolute left-1/2 top-full mt-2 w-28 -translate-x-1/2 translate-y-1 rounded-md border border-border bg-popover/90 px-2 py-1.5 text-center opacity-0 shadow-lift backdrop-blur-md transition-all group-hover:translate-y-0 group-hover:opacity-100">
              <span className="block text-xs font-bold text-foreground">{client.progress}%</span>
              <span className="block truncate text-[10px] text-muted-foreground">{client.name}</span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}

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
