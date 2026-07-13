import type { Metadata } from "next";
import { Locale, SUPPORTED_LOCALES } from "./types";

export const BASE_URL = "https://example.com";
export const SITE_NAME = "Next.js Starter Template";
export const OG_IMAGE_PATH = "/img/og_image.webp";

export function getLocalizedPath(locale: Locale, pathname: string) {
  return `/${locale}${pathname}`;
}

export function getLocalizedUrl(locale: Locale, pathname: string) {
  return `${BASE_URL}${getLocalizedPath(locale, pathname)}`;
}

export function getLanguageAlternates(pathname: string) {
  const languages: Record<string, string> = {};

  SUPPORTED_LOCALES.forEach((locale) => {
    languages[locale] = getLocalizedUrl(locale, pathname);
  });

  languages["x-default"] = getLocalizedUrl("en", pathname);

  return languages;
}

export function buildPageMetadata({
  locale,
  pathname,
  title,
  description,
  keywords,
}: {
  locale: Locale;
  pathname: string;
  title: string;
  description: string;
  keywords?: string[];
}): Metadata {
  const currentUrl = getLocalizedUrl(locale, pathname);

  return {
    title,
    description,
    keywords,
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    metadataBase: new URL(BASE_URL),
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: currentUrl,
      locale,
      type: "website",
      images: [
        {
          url: OG_IMAGE_PATH,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE_PATH],
    },
    alternates: {
      canonical: currentUrl,
      languages: getLanguageAlternates(pathname),
    },
  };
}

export function getStructuredData({
  locale,
  pathname,
  title,
  description,
}: {
  locale: Locale;
  pathname: string;
  title: string;
  description: string;
}) {
  const pageUrl = getLocalizedUrl(locale, pathname);

  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: SITE_NAME,
      url: BASE_URL,
      image: `${BASE_URL}${OG_IMAGE_PATH}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: SITE_NAME,
      inLanguage: locale,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: title,
      description,
      inLanguage: locale,
      isPartOf: {
        "@id": `${BASE_URL}/#website`,
      },
      about: {
        "@id": `${BASE_URL}/#organization`,
      },
    },
  ];
}
