import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 px-4 text-center text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.25),rgba(255,255,255,0))]" />
      <div className="pointer-events-none absolute -bottom-10 right-0 h-96 w-96 rounded-full bg-violet-600/15 blur-3xl" />
      <div className="pointer-events-none absolute top-1/4 -left-10 h-96 w-96 rounded-full bg-indigo-600/15 blur-3xl" />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        <div className="mb-6 rounded-3xl bg-white/10 p-4 backdrop-blur-md border border-white/15 shadow-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hctpl-logo.png"
            alt="VenSai CRM Logo"
            className="h-24 sm:h-28 w-auto object-contain filter drop-shadow"
          />
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          {siteConfig.name}
        </h1>
        <p className="mt-3 text-base text-slate-300 max-w-sm">{siteConfig.description}</p>

        <div className="mt-8 flex w-full flex-col items-center justify-center">
          <Link
            href="/login"
            className="w-full sm:w-auto min-w-[200px] rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:from-indigo-600 hover:to-violet-700 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Sign in to Dashboard →
          </Link>
        </div>
      </div>

      <footer className="relative z-10 mt-16 text-center text-xs text-slate-400">
        Powered by{" "}
        <a
          href="https://hctpl.net"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-indigo-300 hover:text-white hover:underline transition-colors"
        >
          Hari Cornucopia Tech Pvt. Ltd
        </a>
      </footer>
    </main>
  );
}
