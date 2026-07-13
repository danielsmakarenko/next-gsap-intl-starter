"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

type ColorScheme = "light" | "dark";

const STORAGE_KEY = "color-scheme";

function getPreferredScheme(): ColorScheme {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyScheme(scheme: ColorScheme) {
  document.documentElement.setAttribute("color-scheme", scheme);
  window.localStorage.setItem(STORAGE_KEY, scheme);
}

export default function ThemeSwitcherButton() {
  const t = useTranslations("theme");
  const [scheme, setScheme] = useState<ColorScheme>("light");

  useEffect(() => {
    const initialScheme = getPreferredScheme();
    applyScheme(initialScheme);
    setScheme(initialScheme);
  }, []);

  const toggleScheme = () => {
    const appliedScheme = document.documentElement.getAttribute("color-scheme");
    const currentScheme =
      appliedScheme === "light" || appliedScheme === "dark"
        ? appliedScheme
        : getPreferredScheme();
    const nextScheme = currentScheme === "dark" ? "light" : "dark";
    applyScheme(nextScheme);
    setScheme(nextScheme);
  };

  const nextScheme = scheme === "dark" ? "light" : "dark";
  const currentSchemeLabel = t(scheme);
  const nextSchemeLabel = t(nextScheme);

  return (
    <button
      id="color-switcher"
      className="mxd-color-switcher header-text-control"
      type="button"
      role="switch"
      aria-label={t("switch_to", { theme: nextSchemeLabel })}
      aria-checked={scheme === "dark"}
      onClick={toggleScheme}
    >
      <span>{currentSchemeLabel}</span>
    </button>
  );
}
