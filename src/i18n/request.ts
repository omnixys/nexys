import { cookies, headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";

const SUPPORTED_LOCALES = ["de-DE", "en-US"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

const DEFAULT_LOCALE: Locale = "de-DE";

function isLocale(value: string | undefined): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}

function detectLocaleFromHeader(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE;

  const lang = header.toLowerCase();

  if (lang.startsWith("en")) return "en-US";

  return "de-DE";
}

export default getRequestConfig(async () => {
  // 1️⃣ Locale aus Cookie (primär)
  const cookieStore = await cookies();
  const headerStore = await headers();

    const cookieLocale = cookieStore.get("locale")?.value;
  const acceptLanguage = headerStore.get("accept-language");

    let locale: Locale;

      if (isLocale(cookieLocale)) {
    locale = cookieLocale;
  } else {
    locale = detectLocaleFromHeader(acceptLanguage);
  }


  const language = locale.split("-")[0]
    // console.log({locale, language})

  const messages = {
    common: (await import(`../../messages/${language}/common.json`)).default,
    enums: (await import(`../../messages/${language}/enums.json`)).default,
    signup: (await import(`../../messages/${language}/signup.json`)).default,
    terms: (await import(`../../messages/${language}/terms.json`)).default,
    login: (await import(`../../messages/${language}/login.json`)).default,
    recovery: (await import(`../../messages/${language}/recovery.json`)).default,
    home: (await import(`../../messages/${language}/home.json`)).default,
    command: (await import(`../../messages/${language}/command.json`)).default,
    security: (await import(`../../messages/${language}/security.json`)).default,
    settings: (await import(`../../messages/${language}/settings.json`)).default,
    profile: (await import(`../../messages/${language}/profile.json`)).default,
    support: (await import(`../../messages/${language}/support.json`)).default,
    layout: (await import(`../../messages/${language}/layout.json`)).default,
    // dashboard: (await import(`../messages/${language}/dashboard.json`)).default,
  };

  return {
    locale: language,
    messages,
  };
});
