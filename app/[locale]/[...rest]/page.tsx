// app/[locale]/(other-pages)/404/page.tsx
import { notFound } from "next/navigation";

export default function CatchAllPage() {
  notFound(); // triggers [locale]/not-found.tsx
}
