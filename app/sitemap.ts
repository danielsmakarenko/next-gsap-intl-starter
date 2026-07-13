import type { MetadataRoute } from "next";
import { SUPPORTED_LOCALES } from "./[locale]/types";

const BASE_URL = "https://example.com";

const PUBLIC_ROUTE_ALLOWLIST = [
  "home",
  "home-2",
  "maintenance",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return SUPPORTED_LOCALES.flatMap((locale) =>
    PUBLIC_ROUTE_ALLOWLIST.map((route) => ({
      url: `${BASE_URL}/${locale}/${route}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: route === "home" ? 1 : route === "home-2" ? 0.8 : 0.6,
    })),
  );
}
