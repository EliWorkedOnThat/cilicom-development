import { NextResponse, type NextRequest } from "next/server";
import { albanianCountries, defaultLocale, hasLocale, LOCALE_COOKIE, type Locale } from "@/src/i18n/config";

// Hosts like Vercel and Cloudflare already put the visitor's country in a header
function countryFromHeaders(req: NextRequest) {
  return (
    req.headers.get("x-vercel-ip-country") ??
    req.headers.get("cf-ipcountry") ??
    req.headers.get("cloudfront-viewer-country") ??
    null
  );
}

function localeFromAcceptLanguage(req: NextRequest): Locale | null {
  const header = req.headers.get("accept-language");
  if (!header) return null;
  const first = header.split(",")[0]?.trim().toLowerCase() ?? "";
  if (header.toLowerCase().includes("sq")) return "sq";
  return first ? "en" : null;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const segment = pathname.split("/")[1] ?? "";
  if (hasLocale(segment)) return;

  // 1. The visitor's own choice from the flag switch
  const saved = req.cookies.get(LOCALE_COOKIE)?.value;
  let locale: Locale | null = saved && hasLocale(saved) ? saved : null;

  // 2. Country, when the host provides it (Vercel, Cloudflare, CloudFront)
  const country = countryFromHeaders(req);
  if (!locale && country) locale = albanianCountries.includes(country.toUpperCase()) ? "sq" : "en";

  // 3. Browser language, then the default
  locale ??= localeFromAcceptLanguage(req) ?? defaultLocale;

  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Everything except Next internals and files with an extension (sitemap.xml, images, flags…)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
