"use client";

import { ReactNode, useEffect } from "react";
import { NextIntlClientProvider } from "next-intl";
import ClientLayout from "@/components/layout/ClientLayout";
import ConsentManager from "@/components/consent/ConsentManager";
import { Locale } from "./types";

interface Props {
  children: ReactNode;
  locale: Locale;
  messages: Record<string, unknown>;
}

/**
 * ClientLocaleLayout
 *
 * Handles locale-specific functionality:
 * 1. Provides translation messages for client components
 * 2. Sets appropriate fonts via data-font attribute (see public/css/styles.css)
 * 3. Sets lang attribute on <html> for proper language support
 *
 * Font mapping (provided via next/font in the root layout):
 * - Latin languages (en, de, es, it, pt-br, fr, pl, cs, tr) use Poppins
 * - Russian (ru) → Montserrat
 * - Japanese (ja) → Noto Sans JP
 * - Korean (ko) → Noto Sans KR
 * - Chinese Traditional (zh-tw) → Noto Sans TC
 * - Chinese Simplified (zh-cn) → Noto Sans SC
 */
export default function ClientLocaleLayout({
  children,
  locale,
  messages,
}: Props) {
  // Set fonts per locale via data attribute and lang
  useEffect(() => {
    const root = document.documentElement;

    // Map locale to font identifier
    const fontMap: Record<Locale, string> = {
      en: "latin",
      de: "latin",
      es: "latin",
      it: "latin",
      "pt-br": "latin",
      fr: "latin",
      pl: "latin",
      cs: "latin",
      tr: "latin",
      ru: "ru",
      ja: "ja",
      th: "th",
      ko: "ko",
      "zh-tw": "zh-tw",
      "zh-cn": "zh-cn",
    };

    // Set font data attribute for CSS
    root.setAttribute("data-font", fontMap[locale]);

    // Set lang attribute for proper language support
    root.setAttribute("lang", locale);
  }, [locale]);

  return (
  <NextIntlClientProvider
  locale={locale}
  messages={messages}
  timeZone="Europe/Berlin"
>
  <ClientLayout locale={locale}>{children}</ClientLayout>
  <ConsentManager />
</NextIntlClientProvider>
  );
}
