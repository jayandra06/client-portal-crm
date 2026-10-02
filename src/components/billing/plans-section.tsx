import type { BillingPageViewModel } from "@/lib/billing/view-model";
import { PlanCard } from "./plan-card";

export function PlansSection({ data }: { data: BillingPageViewModel }) {
  if (data.availablePlans.length === 0) {
    return (
      <section aria-labelledby="billing-plans-heading" className="rounded-lg border border-border-default bg-surface p-5">
        <h2 id="billing-plans-heading" className="text-text-primary text-base font-semibold">
          Unlimited Lifetime Access
        </h2>
        <p className="text-text-muted mt-1 text-sm">
          Your organization is provisioned on the Internal Agency Unlimited Plan. All team seats, client portals, projects, and storage are fully unlocked.
        </p>
      </section>
    );
  }

  return (
    <section aria-labelledby="billing-plans-heading">
      <h2 id="billing-plans-heading" className="text-text-primary text-base font-semibold">
        Plans
      </h2>
      <p className="text-text-muted mt-1 text-sm">
        {data.providerAvailability.configured
          ? ""
          : "Connect a billing provider to publish pricing."}
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data.availablePlans.map((plan) => (
          <PlanCard key={plan.planKey} plan={plan} permissions={data.permissions} />
        ))}
      </div>
    </section>
  );
}
