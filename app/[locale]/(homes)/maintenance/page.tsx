import { getTranslations } from "next-intl/server";
import { Locale } from "@/app/[locale]/types";

export default async function MaintenancePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "maintenance" });

  return (
    <main className="maintenance-page">
      <div className="maintenance-page__inner">
        <div className="maintenance-page__content">
          <span className="maintenance-page__eyebrow">{t("eyebrow")}</span>
          <h1 className="maintenance-page__title">{t("title")}</h1>
          <div className="maintenance-page__copy">
            <p>{t("description")}</p>
            <p>{t("note")}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
