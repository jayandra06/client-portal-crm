import { formatCurrency } from "@/lib/format";
import { MetricCard } from "@/components/dashboard/metric-card";
import { NeedsAttention } from "@/components/dashboard/needs-attention";
import { TodaySection } from "@/components/dashboard/today-section";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { OnboardingCard, ONBOARDING_DISMISS_RETURN_FOCUS_ID } from "@/components/onboarding/onboarding-card";
import { StartWithSampleData } from "@/components/onboarding/start-with-sample-data";
import { DEFAULT_DASHBOARD_PERIOD } from "@/lib/dashboard/period";
import { getOrganizationOnboardingSignals } from "@/lib/onboarding/progress";
import { buildVisibleOnboardingProgress } from "@/lib/onboarding/visible-progress";
import { isEligibleForSampleData } from "@/lib/onboarding/sample-data";
import { getDashboardAnalytics } from "./query";
import type { Role } from "@/generated/prisma/enums";

export async function DashboardContent({ organizationId, membershipRole }: { organizationId: string; membershipRole: Role }) {
  const now = new Date();
  const [analytics, onboardingSignals, sampleDataEligible] = await Promise.all([
    getDashboardAnalytics({ organizationId, period: DEFAULT_DASHBOARD_PERIOD, now }),
    getOrganizationOnboardingSignals(organizationId),
    isEligibleForSampleData(organizationId),
  ]);
  const onboardingProgress = buildVisibleOnboardingProgress(onboardingSignals, membershipRole);
  const isOnboardingDismissed = onboardingSignals.actedStepKeys.has("FINISH");

  return (
    <>
      <OnboardingCard progress={onboardingProgress} isDismissed={isOnboardingDismissed} />
      <StartWithSampleData eligible={sampleDataEligible} />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        <MetricCard label="Clients" value={analytics.kpis.totalClients} href="/clients" />
        <MetricCard label="Active projects" value={analytics.kpis.activeProjects} href="/projects" />
        <MetricCard label="Open tasks" value={analytics.kpis.openTasks} href="/tasks" />
        <MetricCard label="Outstanding invoices" value={analytics.currency ? formatCurrency(analytics.kpis.outstandingAmount, analytics.currency) : "—"} href="/invoices" hint={`${analytics.kpis.outstandingCount} ${analytics.kpis.outstandingCount === 1 ? "invoice" : "invoices"}`} />
        <MetricCard label="Revenue" value={analytics.currency ? formatCurrency(analytics.kpis.paidThisMonth, analytics.currency) : "—"} href="/invoices" hint="Paid this month" />
      </div>
      <NeedsAttention overdueTasksCount={analytics.kpis.overdueTasksCount} overdueTasks={analytics.overdueTasks} overdueInvoicesCount={analytics.needsAttention.overdueInvoicesCount} overdueInvoices={analytics.needsAttention.overdueInvoices} unsignedContractsCount={analytics.needsAttention.unsignedContractsCount} unsignedContracts={analytics.needsAttention.unsignedContracts} />
      <TodaySection tasks={analytics.today.tasks} events={analytics.today.events} />
      <RecentActivity items={analytics.recentActivity} />
    </>
  );
}

export function DashboardHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border-default bg-[linear-gradient(135deg,var(--accent)_0%,#5148a0_58%,#8b7cff_100%)] p-6 text-white shadow-lg sm:p-8">
      <div className="relative z-10 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Workspace overview</p>
          <h1 id={ONBOARDING_DISMISS_RETURN_FOCUS_ID} tabIndex={-1} className="rounded text-3xl font-semibold tracking-tight focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-transparent sm:text-4xl">Dashboard</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/75">Your calm, focused view of the work that moves the business forward.</p>
        </div>
      </div>
      <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 left-1/3 size-64 rounded-full bg-fuchsia-300/20 blur-3xl" />
    </section>
  );
}
