import Link from "next/link";
import { CARD_SURFACE_CLASSES } from "@/components/ui/surface";
import type { UpcomingOrOverdueTask, TodayCalendarEvent } from "@/app/(dashboard)/dashboard/query";

const itemLinkClass =
  "text-text-primary focus-visible:ring-focus-ring rounded text-sm font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

/**
 * Dashboard Redesign — the operational "Today" section: tasks due today
 * plus today's calendar events, side by side on desktop, stacked on
 * mobile. Each half shows its own small, non-oversized empty state when
 * its own list is empty — never a combined empty state here (unlike
 * Needs Attention, this task's own spec only asks for that collapsing
 * behavior there).
 */
export function TodaySection({
  tasks,
  events,
}: {
  tasks: UpcomingOrOverdueTask[];
  events: TodayCalendarEvent[];
}) {
  return (
    <div>
      <h2 className="text-text-primary text-lg font-bold tracking-tight mb-3">Today</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <section className="rounded-xl border border-border-default bg-surface p-5 shadow-xs transition-all hover:shadow-md">
          <div className="mb-3 flex items-center justify-between border-b border-border-subtle pb-3">
            <h3 className="text-text-primary text-sm font-bold tracking-tight">Tasks due today</h3>
            <span className="rounded-full bg-accent-subtle px-2.5 py-0.5 text-xs font-semibold text-accent">
              {tasks.length}
            </span>
          </div>
          {tasks.length === 0 ? (
            <p className="text-text-muted text-sm py-2">No tasks due today.</p>
          ) : (
            <ul className="divide-y divide-border-subtle">
              {tasks.map((task) => (
                <li key={task.id} className="py-2.5 first:pt-0 last:pb-0">
                  <Link href={`/tasks/${task.id}/edit`} className="text-text-primary text-sm font-semibold hover:text-accent hover:underline transition-colors">
                    {task.title}
                  </Link>
                  <p className="text-text-muted text-xs font-medium mt-0.5">{task.projectName}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-xl border border-border-default bg-surface p-5 shadow-xs transition-all hover:shadow-md">
          <div className="mb-3 flex items-center justify-between border-b border-border-subtle pb-3">
            <h3 className="text-text-primary text-sm font-bold tracking-tight">Today&rsquo;s events</h3>
            <span className="rounded-full bg-accent-subtle px-2.5 py-0.5 text-xs font-semibold text-accent">
              {events.length}
            </span>
          </div>
          {events.length === 0 ? (
            <p className="text-text-muted text-sm py-2">No events today.</p>
          ) : (
            <ul className="divide-y divide-border-subtle">
              {events.map((event) => (
                <li key={event.id} className="py-2.5 first:pt-0 last:pb-0">
                  <Link href="/calendar" className="text-text-primary text-sm font-semibold hover:text-accent hover:underline transition-colors">
                    {event.title}
                  </Link>
                  <p className="text-text-muted text-xs font-medium mt-0.5">{event.allDay ? "All day" : event.displayTime}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
