import type { MetadataRoute } from "next";
import { BASE_URL } from "./[locale]/seo";
import { SUPPORTED_LOCALES } from "./[locale]/types";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
