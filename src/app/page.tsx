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
          className="mb-4 h-16 w-auto object-contain"
        />
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          {siteConfig.name}
        </h1>
        <p className="mt-3 text-base text-gray-600">{siteConfig.description}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/login"
            className="rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="rounded-md border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          >
            Create an account
          </Link>
        </div>
      </div>
    </main>
  );
}
