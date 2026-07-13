import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";

export default function NotFoundPage() {
  const t = useTranslations("404");
  return <h1>Not found</h1>;
}
