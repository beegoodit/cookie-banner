export class I18n {
  constructor(locale, availableLocales = [], allTranslations = undefined) {
    this._locale = locale
    this._allTranslations = allTranslations
    this._availableLocales = availableLocales
  }

  locale() {
    return this._locale
  }

  translate(key) {
    const translation = this.lookUp(key)
    if(translation === undefined) {
      return this.missingKeyWarning(key)
    } else {
      return translation
    }
  }

  lookUp(key) {
    return this.resolve(`${this._locale}.${key}`, this.allTranslations())
  }

  allTranslations() {
    if(this._allTranslations === undefined) {
      this._allTranslations = this.loadTranslations()
      return this._allTranslations
    } else {
      return this._allTranslations
    }
  }

  loadTranslations() {
    var translations = {}
    this._availableLocales.forEach(element => {
      translations = {...translations, ...require(`./config/locales/${element}.json`)}
    });
    return translations
  }

  missingKeyWarning(key) {
    return `translation missing: ${key}`
  }

  resolve(path, obj=self, separator='.') {
    var properties = Array.isArray(path) ? path : path.split(separator)
    return properties.reduce((prev, curr) => prev && prev[curr], obj)
  }
}
