import Link from "next/link";
import { CARD_SURFACE_CLASSES } from "@/components/ui/surface";

export function MetricCard({
  label,
  value,
  href,
  hint,
}: {
  label: string;
  value: string | number;
  href: string;
  /** Small caption under the value — e.g. the period a figure is scoped to. */
  hint?: string;
}) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-xl border border-border-default bg-surface p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 opacity-80 group-hover:opacity-100 transition-opacity" />
      <p className="text-text-muted text-xs font-semibold tracking-wider uppercase">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold tracking-tight text-text-primary group-hover:text-accent transition-colors sm:text-3xl">
        {value}
      </p>
      {hint && (
        <p className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-text-muted">
          <span>{hint}</span>
        </p>
      )}
    </Link>
  );
}
