/**
 * Resolves the canonical base URL for application links, emails, and redirects.
 *
 * Precedence:
 * 1. APP_BASE_URL (explicit operator environment variable override)
 * 2. NEXT_PUBLIC_APP_URL / NEXT_PUBLIC_SITE_URL
 * 3. VERCEL_PROJECT_PRODUCTION_URL (Vercel system variable for custom production domain)
 * 4. Production fallback: https://crm.hctpl.net (when in production or on Vercel production)
 * 5. VERCEL_URL (for preview deployments: https://${VERCEL_URL})
 * 6. Local development fallback: http://localhost:3000
 */
export function getAppBaseUrl(): string {
  const explicit =
    process.env.APP_BASE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercelProdHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProdHost) return `https://${vercelProdHost}`.replace(/\/+$/, "");

  if (process.env.VERCEL_ENV === "production") {
    return "https://crm.hctpl.net";
  }

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) {
    if (process.env.NODE_ENV === "production" && process.env.VERCEL_ENV !== "preview") {
      return "https://crm.hctpl.net";
    }
    return `https://${vercelUrl}`.replace(/\/+$/, "");
  }

  if (process.env.NODE_ENV === "production") {
    return "https://crm.hctpl.net";
  }

  return "http://localhost:3000";
}
