import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: [
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
  ],
  defaultLocale: "en",
  localePrefix: "always",
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
