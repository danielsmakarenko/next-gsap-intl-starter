import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.404");

  return {
    title: t("title"),
  };
}

export default async function NotFoundPage() {
  const t = await getTranslations("404");

  return (
    <main id="mxd-page-content" className="mxd-page-content">
      <div className="mxd-section simple-not-found">
        <div className="mxd-container">
          <div className="simple-not-found__content">
            <h1>{t("404_title")}</h1>
            <p>{t("404_title2")}</p>
            <Link href="/home" className="simple-not-found__link">
              {t("404_button")}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
