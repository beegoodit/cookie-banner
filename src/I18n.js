export class I18n {
  constructor(locale, availableLocales = [], allTranslations = undefined) {
    this._locale = locale
    this._allTranslations = allTranslations
    this._availableLocales = availableLocales
  }

  locale() {
    return this._locale
  }

  translate(key, options = {}) {
    const translation = this.lookUp(key)
    if(translation === undefined) {
      return this.missingKeyWarning(key)
    } else if(typeof(translation) == "object" && "count" in options) {
      if (options.count > 1) {
        return this.interpolate(translation['other'], options)
      } else {
        return this.interpolate(translation['one'], options)
      }
    } else {
      return this.interpolate(translation, options)
    }
  }

  interpolate(templateString, templateVariables) {
    return templateString.replace(/\${(.*?)}/g, (_, g) => templateVariables[g])
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
