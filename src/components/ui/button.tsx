import { ButtonHTMLAttributes } from "react";
import { SpinnerIcon } from "@/components/ui/icons";

/**
 * Two mutually exclusive, non-overlapping class sets — never combined with
 * a caller's own color-override className. A caller that instead appended
 * "bg-white text-gray-900 ..." on top of this component's own hardcoded
 * "bg-black ... text-white" produced a genuine, reproduced production bug:
 * Tailwind's own generated stylesheet order (which utility "wins" a
 * same-specificity conflict) is a build-time/content-scan-order detail,
 * not something a className string's own left-to-right order controls —
 * confirmed directly, this resolved to bg-white winning for
 * background-color while the base text-white still won for color,
 * rendering literally invisible white-on-white button text (see Invoice
 * System Slice 4 post-deploy correction — the reported "empty rectangle"
 * Issue/Send buttons). `variant` sidesteps the whole class of bug
 * structurally: exactly one variant's own class string is ever rendered,
 * so the two rule sets can never both be present to conflict at all.
 * Default (`primary`) is byte-identical to this component's previous sole
 * appearance, so no existing caller's rendered output changes.
 */
const VARIANT_CLASSES = {
  primary: "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xs shadow-indigo-500/20 hover:from-indigo-700 hover:to-violet-700 hover:shadow-md hover:shadow-indigo-500/30",
  secondary: "border border-border-default bg-surface text-text-primary shadow-2xs hover:border-border-strong hover:bg-[var(--hover)]",
  dangerOutline: "border border-danger/30 bg-surface text-danger hover:bg-danger-subtle hover:border-danger/60",
} as const;

export type ButtonVariant = keyof typeof VARIANT_CLASSES;

export function Button({
  className = "",
  variant = "primary",
  loading = false,
  disabled,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean; variant?: ButtonVariant }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100 ${VARIANT_CLASSES[variant]} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <SpinnerIcon className="h-4 w-4" />}
      {children}
    </button>
  );
}
