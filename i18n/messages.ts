import { Locale } from "@/app/[locale]/types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function mergeMessages(
  fallback: Record<string, unknown>,
  override: Record<string, unknown>,
): Record<string, unknown> {
  const merged = { ...fallback };

  for (const [key, value] of Object.entries(override)) {
    if (isRecord(value) && isRecord(merged[key])) {
      merged[key] = mergeMessages(merged[key], value);
    } else {
      merged[key] = value;
    }
  }

  return merged;
}

export async function getMessages(
  locale: Locale,
): Promise<Record<string, unknown>> {
  const fallbackMessages = (await import("../components/messages/en.json"))
    .default;

  if (locale === "en") {
    return fallbackMessages;
  }

  const localeMessages = (await import(`../components/messages/${locale}.json`))
    .default;

  return mergeMessages(fallbackMessages, localeMessages);
}
