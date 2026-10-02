/**
 * Design System Phase 2 — the one shared class-string builder for
 * Input/Select/Textarea. Before this, all three files hand-maintained
 * byte-identical copies of the same raw-Tailwind class string (confirmed
 * via direct comparison during the Phase 2 primitive audit) — this
 * consolidates that triplication into one definition rather than
 * migrating three separate copies to semantic tokens and risking them
 * silently drifting apart later.
 *
 * Semantic-token mapping (see globals.css for each token's Light/Dark
 * value): bg-surface is the control's own opaque fill (never bg-white,
 * so it renders correctly on Dark's own surface tokens); border-strong
 * is the resting border (a visible-but-quiet stroke, matching gray-300's
 * existing weight); focus swaps to the accent-tinted --focus-ring token
 * (the same token Button/the Appearance selector already use) rather
 * than a literal black, which is illegible on a Dark surface;
 * placeholder/disabled text use --text-muted/--disabled respectively.
 * Invalid state uses --danger for border+ring — a text/border color, not
 * a solid white-on-fill button color, so it's safe to use directly (see
 * this PR's own audit notes on why --danger must NOT be used as a solid
 * button fill in Dark).
 */
export function formControlClasses(invalid: boolean): string {
  return `mt-1 block w-full rounded-lg border bg-surface px-3.5 py-2 text-sm text-text-primary shadow-2xs placeholder:text-text-muted transition-all duration-200 focus:outline-none disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-[var(--disabled)] ${
    invalid
      ? "border-danger focus:border-danger focus:ring-2 focus:ring-danger/20"
      : "border-border-default focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 hover:border-border-strong"
  }`;
}
