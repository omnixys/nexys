import { NextRequest, NextResponse } from "next/server";

const SUPPORTED_LOCALES = ["de", "en", "fr"] as const;
const DEFAULT_LOCALE = "de";

type Locale = (typeof SUPPORTED_LOCALES)[number];

function detectLocale(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE;

  const languages = header
    .split(",")
    .map((l) => l.split(";")[0].trim().toLowerCase());

  for (const lang of languages) {
    const base = lang.split("-")[0];

    if (SUPPORTED_LOCALES.includes(base as Locale)) {
      return base as Locale;
    }
  }

  return DEFAULT_LOCALE;
}

export function proxy(req: NextRequest) {
  const res = NextResponse.next();
    const path = req.nextUrl.pathname;


  if (
    path.startsWith("/_next") ||
    path.startsWith("/api") ||
    path.includes(".")
  ) { }
      const cookieLocale = req.cookies.get("locale")?.value;

      if (!cookieLocale) {
        const header = req.headers.get("accept-language");
        const locale = detectLocale(header);

        console.log("Detected locale:", locale);

        res.cookies.set("locale", locale, {
          path: "/",
          maxAge: 60 * 60 * 24 * 365,
        });
      }
  
  const header = req.headers.get("accept-language");
  const pathLocale = path.split("/")[1];

  console.log("-----------");
  console.log("Path:", path);
  console.log("URL locale:", pathLocale);
  console.log("Cookie locale:", cookieLocale);
  console.log("Accept-Language:", header);
  console.log("-----------");
}




export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
