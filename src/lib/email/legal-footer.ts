import { getAppBaseUrl } from "@/lib/app-url";

/**
 * Appended to every transactional email this app sends (invitations,
 * Client Portal invitations, password resets, notification emails) — see
 * each module's renderHtml. Pure/synchronous and network-free, same shape
 * as buildPasswordResetEmailContent, so it's directly unit-testable.
 *
 * Deliberately just the two policy links, never the platform legal name —
 * several of these templates (e.g. the staff password reset email) are
 * intentionally audience-neutral and never say "Client Portal" anywhere in
 * the body; the legal name defaults to that same product name (see
 * platform-config.ts), so repeating it here would silently reintroduce the
 * exact branding this file's own getPlatformLegalConfig() call otherwise
 * has no reason to make, into every email regardless of audience.
 */
export function buildEmailLegalFooterHtml(): string {
  const base = getAppBaseUrl();

  return `<p style="color: #9ca3af; font-size: 11px; margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
      <a href="${base}/privacy" style="color: #9ca3af;">Privacy Policy</a> &middot;
      <a href="${base}/terms" style="color: #9ca3af;">Terms of Service</a>
    </p>`;
}

export function buildEmailLegalFooterText(): string {
  const base = getAppBaseUrl();

  return ["", `Privacy Policy: ${base}/privacy`, `Terms of Service: ${base}/terms`].join("\n");
}
