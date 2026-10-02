import Link from "next/link";
import { getPlatformLegalConfig } from "@/lib/legal/platform-config";

/**
 * Rendered once, globally, in the root layout — see src/app/layout.tsx.
 * There is no shared layout across the app's various auth pages
 * (login/signup/forgot-password, both staff and portal variants), so a
 * single root-level footer is the only way to cover every route with one
 * change, the same reasoning ToastProvider/ToastListener already use for
 * their own global, root-level placement.
 */
export function Footer() {
  return null;
}
