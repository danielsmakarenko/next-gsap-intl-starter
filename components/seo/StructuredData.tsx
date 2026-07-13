import { Locale } from "@/app/[locale]/types";
import { getStructuredData } from "@/app/[locale]/seo";

export default function StructuredData({
  locale,
  pathname,
  title,
  description,
}: {
  locale: Locale;
  pathname: string;
  title: string;
  description: string;
}) {
  const data = getStructuredData({
    locale,
    pathname,
    title,
    description,
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
