import { CookieBanner } from "./CookieBanner";
import { I18n } from "./I18n";

export function cookieBanner(css_id, i18n, cookiePrefix = "eu_gdpr-") { return new CookieBanner(css_id, i18n, cookiePrefix) }
export function i18n(locale, availableLocales = [], allTranslations = undefined) { return new I18n(locale, availableLocales, allTranslations) }
