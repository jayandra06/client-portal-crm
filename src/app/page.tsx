import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="flex w-full max-w-lg flex-col items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hctpl-logo.png"
          alt="VenSai CRM Logo"
          className="mb-4 h-24 sm:h-28 w-auto object-contain"
        />
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          {siteConfig.name}
        </h1>
        <p className="mt-3 text-base text-gray-600">{siteConfig.description}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/login"
            className="rounded-md bg-black px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          >
            Sign in
          </Link>
        </div>
      </div>
      <footer className="mt-12 text-center text-xs text-gray-500">
        Powered by{" "}
        <a
          href="https://hctpl.net"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-gray-700 hover:text-gray-900 hover:underline"
        >
          Hari Cornucopia Tech Pvt. Ltd
        </a>
      </footer>
    </main>
  );
}
