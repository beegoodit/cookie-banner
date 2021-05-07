export let I18nConcern = (superclass) => class extends superclass {
  t(identifier) {
    return this.i18n.translate(identifier)
  }
}
