import Link from "next/link";
import type { ReactNode } from "react";
import { formatCurrency } from "@/lib/format";
import { formatDateOnlyForDisplay } from "@/lib/invoices/date-only";
import { CARD_SURFACE_CLASSES } from "@/components/ui/surface";
import type {
  UpcomingOrOverdueTask,
  NeedsAttentionInvoice,
  NeedsAttentionContract,
} from "@/app/(dashboard)/dashboard/query";

const itemLinkClass =
  "text-text-primary focus-visible:ring-indigo-500 rounded text-sm font-semibold hover:text-accent hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-colors";

function CategoryCard({
  title,
  count,
  emptyLabel,
  viewAllHref,
  children,
}: {
  title: string;
  count: number;
  emptyLabel: string;
  viewAllHref?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border-default bg-surface p-5 shadow-xs transition-all hover:shadow-md">
      <div className="mb-4 flex items-center justify-between gap-2 border-b border-border-subtle pb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-text-primary text-sm font-bold tracking-tight">{title}</h3>
          <span className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-bold ${
            count > 0 ? "bg-warning-subtle text-warning" : "bg-surface-recessed text-text-muted"
          }`}>
            {count}
          </span>
        </div>
        {count > 0 && viewAllHref && (
          <Link href={viewAllHref} className="text-xs font-semibold text-accent hover:text-accent-hover hover:underline transition-colors">
            View all →
          </Link>
        )}
      </div>
      {count === 0 ? <p className="text-text-muted text-sm py-2">{emptyLabel}</p> : children}
    </section>
  );
}

export function NeedsAttention({
  overdueTasksCount,
  overdueTasks,
  overdueInvoicesCount,
  overdueInvoices,
  unsignedContractsCount,
  unsignedContracts,
}: {
  overdueTasksCount: number;
  overdueTasks: UpcomingOrOverdueTask[];
  overdueInvoicesCount: number;
  overdueInvoices: NeedsAttentionInvoice[];
  unsignedContractsCount: number;
  unsignedContracts: NeedsAttentionContract[];
}) {
  const allEmpty = overdueTasksCount === 0 && overdueInvoicesCount === 0 && unsignedContractsCount === 0;

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="h-2.5 w-2.5 rounded-full bg-amber-500 animate-pulse" />
        <h2 className="text-text-primary text-lg font-bold tracking-tight">Needs Attention</h2>
      </div>

      {allEmpty ? (
        <div className="rounded-xl border border-success-subtle bg-success-subtle/50 p-6 text-center shadow-2xs">
          <p className="text-success text-sm font-medium">✨ All clear! Nothing needs immediate attention right now.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <CategoryCard
            title="Overdue tasks"
            count={overdueTasksCount}
            emptyLabel="No overdue tasks."
            viewAllHref="/tasks?overdue=true"
          >
            <ul className="divide-y divide-border-subtle">
              {overdueTasks.map((task) => (
                <li key={task.id} className="py-2.5 first:pt-0 last:pb-0">
                  <Link href={`/tasks/${task.id}/edit`} className={itemLinkClass}>
                    {task.title}
                  </Link>
                  <p className="text-text-muted text-xs font-medium mt-0.5">{task.projectName}</p>
                  <p className="text-danger font-semibold mt-0.5 text-xs">Due {formatDateOnlyForDisplay(task.dueDate)}</p>
                </li>
              ))}
            </ul>
          </CategoryCard>

          <CategoryCard
            title="Overdue invoices"
            count={overdueInvoicesCount}
            emptyLabel="No overdue invoices."
            viewAllHref="/invoices"
          >
            <ul className="divide-y divide-border-subtle">
              {overdueInvoices.map((invoice) => (
                <li key={invoice.id} className="py-2.5 first:pt-0 last:pb-0">
                  <Link href={`/invoices/${invoice.id}/edit`} className={itemLinkClass}>
                    {invoice.invoiceNumber}
                  </Link>
                  <p className="text-text-muted text-xs font-medium mt-0.5">
                    {invoice.clientName} · {formatCurrency(invoice.amount, invoice.currency)}
                  </p>
                  <p className="text-danger font-semibold mt-0.5 text-xs">Due {formatDateOnlyForDisplay(invoice.dueDate)}</p>
                </li>
              ))}
            </ul>
          </CategoryCard>

          <CategoryCard
            title="Unsigned contracts"
            count={unsignedContractsCount}
            emptyLabel="No unsigned contracts."
            viewAllHref="/contracts"
          >
            <ul className="divide-y divide-border-subtle">
              {unsignedContracts.map((contract) => (
                <li key={contract.id} className="py-2.5 first:pt-0 last:pb-0">
                  <Link href={`/contracts/${contract.id}`} className={itemLinkClass}>
                    {contract.title}
                  </Link>
                  <p className="text-text-muted text-xs font-medium mt-0.5">{contract.clientName}</p>
                  {contract.sentAt && (
                    <p className="text-text-muted mt-0.5 text-xs">Sent {contract.sentAt.toLocaleDateString()}</p>
                  )}
                </li>
              ))}
            </ul>
          </CategoryCard>
        </div>
      )}
    </div>
  );
}
