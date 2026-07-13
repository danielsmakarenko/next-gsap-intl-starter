import { redirect } from "next/navigation";
import { Locale } from "./types";

export default async function LocaleRootPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  // Redirect to preview page as the default landing page
  redirect(`/${locale}/home`);
}
