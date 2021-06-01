export let I18nConcern = (superclass) => class extends superclass {
  t(identifier, options = {}) {
    return this.i18n.translate(identifier, options)
  }
}
