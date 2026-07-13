"use client";

import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/routing";
import ThemeSwitcherButton from "./ColorSwitcher";
import LanguageButton from "../languageButton";
import { useTranslations } from "next-intl";

export default function Header1() {
  const t = useTranslations();
  const pathname = usePathname();
  const [isHidden, setIsHidden] = useState(false);
  const linksToPageTwo = pathname === "/home";
  const ctaHref = linksToPageTwo ? "/home-2" : "/home";
  const ctaLabel = linksToPageTwo
    ? t("header.call_button")
    : t("header.home");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsHidden(currentScrollPos > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header id="header" className={`mxd-header ${isHidden ? "is-hidden" : ""}`}>
      {/* header controls */}
      <div className="mxd-header__controls">
        <Link href={ctaHref} className="header-text-control">
          <span>{ctaLabel}</span>
        </Link>
        <LanguageButton />
        <ThemeSwitcherButton />
      </div>
    </header>
  );
}
