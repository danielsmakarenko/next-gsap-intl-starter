"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Header1 from "@/components/headers/Header1";
import ScrollTop from "@/components/scroll/ScrollTop";
const InitScroll = dynamic(() => import("@/components/scroll/InitScroll"), {
  ssr: false,
});
const LenisSmoothScroll = dynamic(
  () => import("@/components/scroll/LenisSmoothScroll"),
  { ssr: false },
);

interface ClientLayoutProps {
  children: React.ReactNode;
  locale: string; // <-- FIX: accept locale
}

export default function ClientLayout({ children, locale }: ClientLayoutProps) {
  const pathname = usePathname();
  const isMaintenanceRoute = pathname?.endsWith("/maintenance");

  return (
    <>
      {!isMaintenanceRoute && <Header1 />}
      {children}
      <InitScroll />
      {!isMaintenanceRoute && <ScrollTop />}
      <LenisSmoothScroll />
    </>
  );
}
