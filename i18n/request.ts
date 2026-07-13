import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { getMessages } from "./messages";
import { Locale } from "@/app/[locale]/types";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: await getMessages(locale as Locale),
  };
});
