import { sanitizePortalRedirectPath } from "@/lib/safe-redirect";
import type { ValidPortalSignupInvitation } from "@/lib/invitations/resolve-portal-signup-invitation";
import { getAppBaseUrl } from "@/lib/app-url";

/**
 * Portal signup-confirmation defect fix. The Client Portal counterpart to
 * src/lib/auth/signup-confirm-redirect.ts's buildSignupConfirmationUrl —
 * same reasoning (own the whole confirmation link, never depend on
 * Supabase's native email/hosted-verify flow), but a deliberately
 * DIFFERENT route `type` value (`portal_signup`, not `signup`) so
 * src/app/auth/confirm/route.ts can tell the two apart and never run
 * Staff provisioning logic (getOrCreateUser/getOrCreateOrganizationId)
 * for a Portal-originated confirmation — see that route's own doc
 * comment. `next` is sanitized with sanitizePortalRedirectPath, never the
 * Staff sanitizer — a Portal confirmation must never be able to redirect
 * anywhere outside /portal.
 */
export function buildPortalSignupConfirmationUrl(params: {
  tokenHash: string;
  invitation: ValidPortalSignupInvitation | null;
}): string {
  const next = params.invitation
    ? sanitizePortalRedirectPath(`/portal/invite/${params.invitation.token}`)
    : "/portal";
  const query = new URLSearchParams({ token_hash: params.tokenHash, type: "portal_signup", next });
  return `${getAppBaseUrl()}/auth/confirm?${query.toString()}`;
}
