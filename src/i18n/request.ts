import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";

const SUPPORTED_LOCALES = ["de", "en"] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

export default getRequestConfig(async () => {
  // 1️⃣ Locale aus Cookie (primär)
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("locale")?.value;

  // 2️⃣ Fallback: Accept-Language (optional, simpel)
  const headerLocale = (await headers())
    .get("accept-language")
    ?.startsWith("en")
    ? "en"
    : "de";

  const locale: Locale = SUPPORTED_LOCALES.includes(cookieLocale as Locale)
    ? (cookieLocale as Locale)
    : headerLocale;

  const messages = {
    common: (await import(`../../messages/${locale}/common.json`)).default,
    enums: (await import(`../../messages/${locale}/enums.json`)).default,
    signup: (await import(`../../messages/${locale}/signup.json`)).default,
    terms: (await import(`../../messages/${locale}/terms.json`)).default,
    // dashboard: (await import(`../messages/${locale}/dashboard.json`)).default,
    // security: (await import(`../messages/${locale}/security.json`)).default,
  };

  return {
    locale,
    messages,
  };
});
