import { afterEach, describe, expect, it, vi } from "vitest";
import { getAppBaseUrl } from "@/lib/app-url";

describe("getAppBaseUrl", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("prefers APP_BASE_URL when explicitly set", () => {
    vi.stubEnv("APP_BASE_URL", "https://crm.hctpl.net/");
    expect(getAppBaseUrl()).toBe("https://crm.hctpl.net");
  });

  it("uses NEXT_PUBLIC_APP_URL if APP_BASE_URL is not set", () => {
    vi.stubEnv("APP_BASE_URL", "");
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "https://crm.hctpl.net");
    expect(getAppBaseUrl()).toBe("https://crm.hctpl.net");
  });

  it("uses VERCEL_PROJECT_PRODUCTION_URL when set", () => {
    vi.stubEnv("APP_BASE_URL", "");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "crm.hctpl.net");
    expect(getAppBaseUrl()).toBe("https://crm.hctpl.net");
  });

  it("returns https://crm.hctpl.net when VERCEL_ENV is production", () => {
    vi.stubEnv("APP_BASE_URL", "");
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("VERCEL_URL", "client-portal-i0l5lp5h6-team1-31e8b594.vercel.app");
    expect(getAppBaseUrl()).toBe("https://crm.hctpl.net");
  });

  it("uses https://${VERCEL_URL} for preview deployments", () => {
    vi.stubEnv("APP_BASE_URL", "");
    vi.stubEnv("VERCEL_ENV", "preview");
    vi.stubEnv("VERCEL_URL", "preview-branch.vercel.app");
    expect(getAppBaseUrl()).toBe("https://preview-branch.vercel.app");
  });

  it("falls back to localhost:3000 in local dev when nothing is set", () => {
    vi.stubEnv("APP_BASE_URL", "");
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "");
    vi.stubEnv("VERCEL_URL", "");
    vi.stubEnv("NODE_ENV", "development");
    expect(getAppBaseUrl()).toBe("http://localhost:3000");
  });
});
