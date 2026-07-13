import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);
const MAINTENANCE_MODE = process.env.MAINTENANCE_MODE === "true";
const MAINTENANCE_ROUTE = "maintenance";

const PUBLIC_ROUTE_ALLOWLIST = new Set([
  "",
  "404",
  "home",
  "home-2",
  MAINTENANCE_ROUTE,
]);

export default function proxy(request: NextRequest) {
  const [, maybeLocale, ...rest] = request.nextUrl.pathname.split("/");
  const locale = routing.locales.find((value) => value === maybeLocale);
  const normalizedPath = rest.join("/");

  if (MAINTENANCE_MODE) {
    const targetLocale = locale ?? routing.defaultLocale;

    if (normalizedPath !== MAINTENANCE_ROUTE) {
      const url = request.nextUrl.clone();
      url.pathname = `/${targetLocale}/${MAINTENANCE_ROUTE}`;
      return NextResponse.redirect(url);
    }
  }

  if (!locale) {
    return intlMiddleware(request);
  }

  if (!PUBLIC_ROUTE_ALLOWLIST.has(normalizedPath)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/404`;
    return NextResponse.rewrite(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
