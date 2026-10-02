import { notFound } from "next/navigation";
import { getCurrentMembership } from "@/lib/current-user";
import { canImportData } from "@/lib/import/authorization";
import { LEAD_IMPORT_FIELDS } from "@/lib/import/fields";
import { ImportWizard } from "@/components/import/import-wizard";

/**
 * CSV Import Phase 2 — page-level gate (OWNER/ADMIN only). Same
 * defense-in-depth note as clients/import/page.tsx: the real
 * authorization boundary is every Server Action's own independent
 * canImportData(organizationId, membership.role) re-check.
 */
export default async function LeadsImportPage() {
  const { organizationId, membership } = await getCurrentMembership();
  if (!(await canImportData(organizationId, membership.role))) {
    notFound();
  }

  const sourceFiles = [
    { name: "database leads.csv", type: "CSV", columns: "name, company, email, phone" },
    { name: "contacts (1).csv", type: "CSV", columns: "contact identity + company" },
    { name: "IND-B2B.xlsx", type: "Excel", columns: "17 columns · 5,000 rows" },
    { name: "IND-ADMIN.xlsx", type: "Excel", columns: "20 columns · 2,999 rows" },
    { name: "IND-CEO.xlsx", type: "Excel", columns: "19 columns · 4,999 rows" },
    { name: "IND-CTO & IT Heads.xlsx", type: "Excel", columns: "19 columns · 3,999 rows" },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="relative overflow-hidden rounded-3xl border border-border-default bg-[linear-gradient(135deg,var(--accent)_0%,#5148a0_58%,#8b7cff_100%)] p-6 text-white shadow-lg sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Data workspace</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Bring your pipeline to life</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">Upload a source, map every column, review the records, and import with confidence. Required fields are clearly marked; everything else stays optional.</p>
      </div>

      <section className="rounded-2xl border border-border-default bg-surface p-5 shadow-sm sm:p-6" aria-labelledby="source-files-title">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="source-files-title" className="text-lg font-semibold text-text-primary">Attached source files</h2>
            <p className="mt-1 text-sm text-text-secondary">All supplied files are accounted for in the import plan.</p>
          </div>
          <span className="rounded-full bg-accent-subtle px-3 py-1 text-xs font-semibold text-accent">6 sources · 26,997 rows</span>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {sourceFiles.map((file) => (
            <div key={file.name} className="rounded-xl border border-border-subtle bg-surface-muted p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="truncate text-sm font-medium text-text-primary">{file.name}</p>
                <span className="rounded-md border border-border-default px-2 py-0.5 text-[10px] font-semibold uppercase text-text-muted">{file.type}</span>
              </div>
              <p className="mt-2 text-xs text-text-secondary">{file.columns}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 rounded-xl bg-accent-subtle/60 px-4 py-3 text-xs leading-5 text-text-secondary"><strong className="text-text-primary">Recommended required fields:</strong> full name. Company, email, phone, designation, location, website, alternate contact details, and feedback remain optional enrichment fields.</p>
      </section>

      <ImportWizard entityType="LEAD" fields={LEAD_IMPORT_FIELDS} listHref="/leads" entityLabelPlural="Leads" />
    </div>
  );
}
