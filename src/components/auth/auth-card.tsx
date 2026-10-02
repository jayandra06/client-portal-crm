import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";

/**
 * Sale-Ready Phase E, S1.1 (P0). Shared presentational shell for every
 * staff auth page (login/signup/forgot-password/reset-password) —
 * previously each page duplicated the exact same unbranded
 * `<main>bg-gray-50<div>card</div></main>` wrapper with no product
 * identity anywhere on the page, so a buyer's very first screen carried
 * zero branding. Purely presentational: no auth logic, no new routes, no
 * behavior change — each page still owns its own heading/copy/form as
 * `children`, exactly as before, just wrapped in this shell instead of
 * duplicating it. `siteConfig` is the same existing branding source
 * `src/app/layout.tsx`'s own `<title>`/description already reads from —
 * not a new abstraction.
 */
export function AuthCard({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-6 overflow-hidden bg-slate-950 px-4 py-8 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.25),rgba(255,255,255,0))]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/4 left-0 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-md border border-white/10 shadow-xl">
          <img
            src="/hctpl-logo.png"
            alt="VenSai CRM Logo"
            className="h-20 w-auto object-contain filter drop-shadow"
          />
        </div>
        <span className="text-2xl font-extrabold tracking-tight text-white">{siteConfig.name}</span>
        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Enterprise Agency CRM</span>
      </div>

      <div className="relative z-10 w-full max-w-sm rounded-2xl border border-white/15 bg-white/95 p-8 text-gray-900 shadow-2xl backdrop-blur-xl">
        {children}
      </div>

      <p className="relative z-10 text-center text-xs text-slate-400">
        Powered by{" "}
        <a
          href="https://hctpl.net"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-indigo-300 hover:text-white hover:underline transition-colors"
        >
          Hari Cornucopia Tech Pvt. Ltd
        </a>
      </p>
    </main>
  );
}
