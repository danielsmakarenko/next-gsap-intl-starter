"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/app/[locale]/types";
import { usePathname, useRouter } from "@/i18n/routing";

export default function LanguageButton() {
  const t = useTranslations("language_switcher");
  const pathname = usePathname();
  const router = useRouter();
  const activeLocale = useLocale() as Locale;
  const [currentLocale, setCurrentLocale] = useState<Locale>(activeLocale);
  const [open, setOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement | null>(null);

  const localeGroups: Record<"europe" | "asia_pacific" | "americas", Locale[]> =
    {
      europe: ["en", "de", "fr", "es", "it", "pl", "cs", "tr", "ru"],
      asia_pacific: ["ja", "ko", "th", "zh-cn", "zh-tw"],
      americas: ["pt-br"],
    };

  const groupFallbacks: Record<keyof typeof localeGroups, string> = {
    europe: "Europe",
    asia_pacific: "Asia Pacific",
    americas: "Americas",
  };

  useEffect(() => {
    setCurrentLocale(activeLocale);
  }, [activeLocale, pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (
        switcherRef.current &&
        !switcherRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleChange = (newLocale: Locale) => {
    localStorage.setItem("user-locale", newLocale);
    setCurrentLocale(newLocale);
    setOpen(false);
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="language-switcher" ref={switcherRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="header-text-control btn-language"
        aria-expanded={open}
        aria-label={t("change_language")}
        style={{ fontWeight: 700 }}
      >
        {currentLocale.toUpperCase()}
      </button>

      {open ? (
        <div className="language-switcher__menu">
          {Object.entries(localeGroups).map(([groupKey, locales]) => {
            const group = groupKey as keyof typeof localeGroups;

            return (
              <div className="locale-group" key={group}>
                <div className="locale-group-title">
                  {t.has(group) ? t(group) : groupFallbacks[group]}
                </div>
                <div className="locale-options">
                  {locales.map((locale) => (
                    <button
                      type="button"
                      key={locale}
                      onClick={() => handleChange(locale)}
                      className={`locale-option ${
                        currentLocale === locale ? "active-locale" : ""
                      }`}
                      style={{
                        fontWeight: currentLocale === locale ? 700 : 500,
                      }}
                    >
                      {locale.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
