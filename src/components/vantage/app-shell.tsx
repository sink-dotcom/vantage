import { Link, useRouterState } from "@tanstack/react-router";
import {
  CalendarDays,
  LayoutDashboard,
  Search,
  Target,
  Users,
  Plus,
  Bell,
} from "lucide-react";

import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/clients", label: "Clients", icon: Users },
  { to: "/sessions", label: "Sessions", icon: CalendarDays },
  { to: "/goals", label: "Goals", icon: Target },
] as const;

export function AppShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background lg:flex">
      <aside className="sticky top-0 z-20 flex h-auto shrink-0 flex-col gap-6 bg-sidebar px-4 py-4 text-sidebar-foreground lg:h-screen lg:w-60 lg:py-7">
        <Link to="/" className="flex items-center gap-2 px-2">
          <span className="surface-accent flex size-7 items-center justify-center rounded-lg text-sm font-bold">
            V
          </span>
          <span className="display text-xl text-sidebar-foreground">Vantage</span>
        </Link>

        <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
          {nav.map(({ to, label, icon: Icon }) => {
            const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  "flex items-center gap-2.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
                    : "text-sidebar-muted hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon className="size-4" strokeWidth={active ? 2.2 : 1.8} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto hidden rounded-xl border border-sidebar-border p-3 lg:block">
          <p className="text-xs font-semibold text-sidebar-accent-foreground">This week</p>
          <p className="mt-1 text-xs leading-relaxed text-sidebar-muted">
            7.5 coaching hours booked across 5 clients. Two slots still open on Wednesday.
          </p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex flex-wrap items-center gap-3 border-b border-border bg-background/85 px-5 py-4 backdrop-blur-md lg:px-8">
          <div className="min-w-0 flex-1">
            <h1 className="display truncate text-2xl">{title}</h1>
            {subtitle ? (
              <p className="truncate text-sm text-muted-foreground">{subtitle}</p>
            ) : null}
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground md:flex">
            <Search className="size-3.5" />
            <span className="pr-6">Search clients…</span>
            <kbd className="rounded border border-border px-1 text-[10px]">⌘K</kbd>
          </div>
          {actions ?? (
            <button className="surface-accent inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold shadow-lift transition-transform hover:-translate-y-px">
              <Plus className="size-4" /> New session
            </button>
          )}
          <button className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground">
            <Bell className="size-4" />
          </button>
        </header>

        <main className="flex-1 px-5 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
