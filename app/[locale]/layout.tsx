// app/[locale]/layout.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Locale } from "./types";
import ClientLocaleLayout from "./ClientLocaleLayout";
import { getMessages } from "@/i18n/messages";
import { getTranslations } from "next-intl/server";

const locales = [
  "en",
  "ru",
  "de",
  "es",
  "it",
  "pt-br",
  "fr",
  "pl",
  "cs",
  "tr",
  "ja",
  "th",
  "zh-cn",
  "zh-tw",
  "ko",
] as const;

function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "metadata.home" });

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL("https://example.com"),
    openGraph: {
      locale,
      title: t("title"),
      description: t("description"),
      images: ["/img/og_image.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const messages = await getMessages(locale);

  return (
    <ClientLocaleLayout locale={locale} messages={messages}>
      {children}
    </ClientLocaleLayout>
  );
}
