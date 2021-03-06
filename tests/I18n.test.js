import { I18n } from "../src/I18n"

test("I18n", () => {
  const i18n = new I18n({ locale: "en", availableLocales: ["en"], allTranslations: { "en": { "helloWorld": "Hello World!" }} })
  expect(i18n.translate("helloWorld")).toBe("Hello World!")
});

test("I18n returns warning when translation is not found", () => {
  const i18n = new I18n({ locale: "en" })
  expect(i18n.translate("missingTranslation")).toBe("translation missing: missingTranslation")
});