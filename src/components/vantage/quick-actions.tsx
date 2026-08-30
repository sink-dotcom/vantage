import { Link } from "@tanstack/react-router";
import * as motion from "motion/react-client";
import { CalendarPlus, FileText, Target, UserPlus } from "lucide-react";

const actions = [
  { to: "/sessions", label: "Book session", hint: "Find a slot", icon: CalendarPlus, tone: "bg-lemon" },
  { to: "/clients", label: "Add coachee", hint: "Start intake", icon: UserPlus, tone: "bg-leaf" },
  { to: "/clients", label: "Log note", hint: "Capture insight", icon: FileText, tone: "bg-sky" },
  { to: "/goals", label: "Set goal", hint: "Define outcome", icon: Target, tone: "bg-pink" },
] as const;

export function QuickActions() {
  return (
    <section id="tour-quick-actions" className="grid grid-cols-2 gap-3" aria-label="Quick actions">
      {actions.map(({ to, label, hint, icon: Icon, tone }, index) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3, ease: "easeOut" }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link to={to} className="group block h-full">
            <div className={`panel ${tone} flex h-full flex-col gap-2 p-3`}>
              <span className="grid size-8 place-items-center rounded-full bg-foreground/10">
                <Icon className="size-4" strokeWidth={1.9} />
              </span>
              <div>
                <p className="text-xs font-bold leading-tight">{label}</p>
                <p className="text-[10px] text-foreground/60">{hint}</p>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </section>
  );
}
