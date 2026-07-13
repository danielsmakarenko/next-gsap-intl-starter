"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import GoogleAnalyticsTag, { GA_MEASUREMENT_ID } from "./GoogleAnalyticsTag";

type ConsentValue = "accepted" | "rejected";

const STORAGE_KEY = "site-consent-v1";

function getStoredConsent(): ConsentValue | null {
  if (typeof window === "undefined") {
    return null;
  }

  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "accepted" || value === "rejected" ? value : null;
}

function clearAnalyticsCookies() {
  if (typeof document === "undefined") {
    return;
  }

  const cookieNames = document.cookie
    .split(";")
    .map((part) => part.trim().split("=")[0])
    .filter(
      (name) =>
        name === "_ga" ||
        name === "_gid" ||
        name === "_gat" ||
        name.startsWith("_ga_")
    );

  for (const name of cookieNames) {
    document.cookie = `${name}=; Max-Age=0; path=/`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=${window.location.hostname}`;
  }
}

export default function ConsentManager() {
  const t = useTranslations("consent");
  const [consent, setConsent] = useState<ConsentValue | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedConsent = getStoredConsent();
    setConsent(savedConsent);
    setIsOpen(savedConsent === null);
  }, []);

  useEffect(() => {
    const openBanner = () => setIsOpen(true);

    window.addEventListener("consent:open", openBanner);
    return () => window.removeEventListener("consent:open", openBanner);
  }, []);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) {
      return;
    }

    if (consent === "accepted") {
      window.localStorage.setItem(STORAGE_KEY, consent);
      window[`ga-disable-${GA_MEASUREMENT_ID}`] = false;
      return;
    }

    if (consent === "rejected") {
      window.localStorage.setItem(STORAGE_KEY, consent);
      window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
      if (typeof window.gtag === "function") {
        window.gtag("consent", "update", {
          analytics_storage: "denied",
        });
      }
      clearAnalyticsCookies();
    }
  }, [consent]);

  const updateConsent = (value: ConsentValue) => {
    setConsent(value);
    setIsOpen(false);
  };

  return (
    <>
      {consent === "accepted" ? <GoogleAnalyticsTag /> : null}
      {isOpen ? (
        <div aria-live="polite" className="consent-banner">
          <h3 className="consent-banner__title">{t("title")}</h3>
          <p className="consent-banner__text">{t("description")}</p>
          <p className="consent-banner__hint">{t("reopen_hint")}</p>
          <div className="consent-banner__actions">
            <button
              type="button"
              onClick={() => updateConsent("accepted")}
              className="btn btn-default btn-additional consent-banner__button consent-banner__button--accept"
            >
              {t("accept")}
            </button>
            <button
              type="button"
              onClick={() => updateConsent("rejected")}
              className="btn btn-default btn-outline consent-banner__button consent-banner__button--reject"
            >
              {t("reject")}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
