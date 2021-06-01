import { CookieBanner } from "./CookieBanner"
import { I18n } from "./I18n"

export function cookieBanner(options = {}) { return new CookieBanner(options) }
export function i18n(options = {}) { return new I18n(options) }
