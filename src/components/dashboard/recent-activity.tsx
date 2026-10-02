import Link from "next/link";
import type { ActivityDisplayModel } from "@/lib/activity/format-activity";
import { CARD_SURFACE_CLASSES } from "@/components/ui/surface";
import { ACTION_LINK_CLASSES } from "@/components/ui/action-link-classes";

/**
 * Compact preview of the Activity Timeline — reuses formatActivity()'s
 * already-computed display model (actorLabel/actionLabel/isDeleted/etc.)
 * as-is, no separate formatting logic. Deliberately not the full Timeline
 * UI: no day-grouping, no filters, no pagination — just the latest few
 * events with a link to the real page for anything more.
 */
export function RecentActivity({ items }: { items: { id: string; display: ActivityDisplayModel }[] }) {
  return (
    <div className="rounded-xl border border-border-default bg-surface p-5 shadow-xs transition-all hover:shadow-md">
      <div className="flex items-center justify-between border-b border-border-subtle pb-3">
        <h3 className="text-text-primary text-sm font-bold tracking-tight">Recent Activity</h3>
        <Link href="/activity" className="text-xs font-semibold text-accent hover:text-accent-hover hover:underline transition-colors">
          View activity log →
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="text-text-muted mt-3 text-sm py-2">No activity yet.</p>
      ) : (
        <ul className="divide-y divide-border-subtle mt-2">
          {items.map((item) => (
            <li key={item.id} className="py-2.5 first:pt-2 last:pb-0">
              <div className="flex items-start justify-between gap-3">
                <p className="text-text-primary text-sm">
                  <span className="font-semibold text-text-primary">{item.display.actorLabel}</span>{" "}
                  <span className="text-text-secondary">{item.display.actionLabel}</span>
                  {item.display.isDeleted && (
                    <span className="bg-surface-recessed text-text-muted ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold">
                      Deleted
                    </span>
                  )}
                </p>
                <time
                  dateTime={item.display.timestamp.toISOString()}
                  className="text-text-muted shrink-0 text-xs font-medium"
                >
                  {item.display.timestamp.toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>
              {item.display.detailLines.map((line, index) => (
                <p key={index} className="text-text-muted mt-0.5 text-xs">
                  {line}
                </p>
              ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
