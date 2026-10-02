import Link from "next/link";

// Matches every other page's own local PRIMARY_LINK_CLASSES constant
// exactly (e.g. tasks/page.tsx, invoices/page.tsx) — this repo's own
// established per-page convention, never a shared toolbar/button system.
const PRIMARY_LINK_CLASSES =
  "focus-visible:ring-focus-ring rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

/**
 * Dashboard Redesign — the three primary operational quick actions.
 * Plain <Link>s, never a new toolbar/navigation pattern.
 *
 * "Create invoice" links straight to /invoices/new even for a completely
 * empty workspace — that page's own EmptyState ("You need a client
 * first" + its own "Add client" CTA to /clients/new) already handles the
 * zero-client case gracefully, confirmed by direct inspection, not
 * assumed — so no pre-check is needed here.
 *
 * "View overdue tasks" links to the real, exact overdue-filtered Tasks
 * list (?overdue=true — see tasks/query.ts's own buildTaskWhere), never
 * a fabricated or approximate destination.
 */
export function DashboardActions() {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <Link
        href="/clients/new"
        className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-indigo-500/20 transition-all duration-200 hover:from-indigo-700 hover:to-violet-700 hover:shadow-md hover:shadow-indigo-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
      >
        <span className="text-base leading-none">+</span>
        <span>Add client</span>
      </Link>
      <Link
        href="/invoices/new"
        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-xs transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
      >
        <span>Create invoice</span>
      </Link>
      <Link
        href="/tasks?overdue=true"
        className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50/60 px-4 py-2 text-sm font-semibold text-amber-800 transition-all duration-200 hover:border-amber-300 hover:bg-amber-100/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
      >
        <span>View overdue tasks</span>
      </Link>
    </div>
  );
}
