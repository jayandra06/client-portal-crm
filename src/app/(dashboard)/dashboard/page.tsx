import { Suspense } from "react";
import { getCurrentMembership } from "@/lib/current-user";
import { DashboardActions } from "@/components/dashboard/dashboard-actions";
import { DashboardContent, DashboardHero } from "./dashboard-content";
import DashboardLoading from "./loading";

export default async function DashboardPage() {
  const { organizationId, membership } = await getCurrentMembership();

  return (
    <div className="flex flex-col gap-8">
      <section className="relative">
        <DashboardHero />
        <div className="absolute bottom-6 right-6 z-10 hidden sm:block">
          <DashboardActions />
        </div>
      </section>
      <Suspense fallback={<DashboardLoading />}>
        <DashboardContent organizationId={organizationId} membershipRole={membership.role} />
      </Suspense>
    </div>
  );
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
