import { NextResponse, type NextRequest } from "next/server";
import { albanianCountries, defaultLocale, hasLocale, LOCALE_COOKIE, type Locale } from "@/src/i18n/config";

const COUNTRY_COOKIE = "country";
const YEAR = 60 * 60 * 24 * 365;

// Hosts like Vercel and Cloudflare already put the visitor's country in a header
function countryFromHeaders(req: NextRequest) {
  return (
    req.headers.get("x-vercel-ip-country") ??
    req.headers.get("cf-ipcountry") ??
    req.headers.get("cloudfront-viewer-country") ??
    null
  );
}

function clientIp(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || req.headers.get("x-real-ip") || null;
}

// Loopback, private and Tailscale ranges can't be geolocated
const isPrivateIp = (ip: string) =>
  /^(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\.|::1$|fc|fd|fe80)/i.test(ip);

// Self-hosted fallback: ask country.is (free, open source) once per visitor.
// The result is kept in a cookie so the lookup doesn't repeat.
async function lookupCountry(ip: string) {
  try {
    const res = await fetch(`https://api.country.is/${encodeURIComponent(ip)}`, { signal: AbortSignal.timeout(800) });
    if (!res.ok) return null;
    const data = (await res.json()) as { country?: string };
    return data.country ?? null;
  } catch {
    return null;
  }
}

function localeFromAcceptLanguage(req: NextRequest): Locale | null {
  const header = req.headers.get("accept-language");
  if (!header) return null;
  const first = header.split(",")[0]?.trim().toLowerCase() ?? "";
  if (header.toLowerCase().includes("sq")) return "sq";
  return first ? "en" : null;
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const segment = pathname.split("/")[1] ?? "";
  if (hasLocale(segment)) return;

  // 1. The visitor's own choice from the flag switch
  const saved = req.cookies.get(LOCALE_COOKIE)?.value;
  let locale: Locale | null = saved && hasLocale(saved) ? saved : null;

  // 2. Country from the host's header, a cached lookup, or a fresh IP lookup
  let country = countryFromHeaders(req) ?? req.cookies.get(COUNTRY_COOKIE)?.value ?? null;
  let looked = false;
  if (!locale && !country) {
    const ip = clientIp(req);
    if (ip && !isPrivateIp(ip)) {
      country = await lookupCountry(ip);
      looked = true;
    }
  }
  if (!locale && country) locale = albanianCountries.includes(country.toUpperCase()) ? "sq" : "en";

  // 3. Browser language, then the default
  locale ??= localeFromAcceptLanguage(req) ?? defaultLocale;

  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  const res = NextResponse.redirect(url);
  if (looked && country) res.cookies.set(COUNTRY_COOKIE, country, { maxAge: YEAR, path: "/", sameSite: "lax" });
  return res;
}

export const config = {
  // Everything except Next internals and files with an extension (sitemap.xml, images, flags…)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
