import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import HomeTemplateParallaxSection from "@/components/homes/home/HomeTemplateParallaxSection";
import StructuredData from "@/components/seo/StructuredData";
import { Locale } from "../../types";
import { buildPageMetadata } from "../../seo";

const PATHNAME = "/home";
const DEFAULT_KEYWORDS = [
  "Next.js template",
  "next-intl starter",
  "GSAP starter",
  "Lenis smooth scroll",
  "multilingual starter",
  "React starter",
  "Next.js boilerplate",
  "animation-ready template",
  "internationalized starter",
  "frontend template",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });
  const keywords = t.has("keywords")
    ? (t.raw("keywords") as string[])
    : DEFAULT_KEYWORDS;

  return buildPageMetadata({
    locale,
    pathname: PATHNAME,
    title: t("title"),
    description: t("description"),
    keywords,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });

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
