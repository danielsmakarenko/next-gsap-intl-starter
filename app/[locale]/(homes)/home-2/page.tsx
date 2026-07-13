import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import HomeTemplateParallaxSection from "@/components/homes/home/HomeTemplateParallaxSection";
import StructuredData from "@/components/seo/StructuredData";
import { Locale } from "../../types";
import { buildPageMetadata } from "../../seo";

const PATHNAME = "/home-2";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home_2" });

  return buildPageMetadata({
    locale,
    pathname: PATHNAME,
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords") as string[],
  });
}

export default async function Home2Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home_2" });

  return (
    <>
      <StructuredData
        locale={locale}
        pathname={PATHNAME}
        title={t("title")}
        description={t("description")}
      />
      <main id="mxd-page-content" className="mxd-page-content">
        <HomeTemplateParallaxSection />
      </main>
    </>
  );
}
