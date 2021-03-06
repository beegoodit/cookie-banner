import { I18nConcern } from './I18nConcern';

export class CookieBanner extends I18nConcern(Object) {
  constructor(options) {
    super()
    this.containerSelector = options.containerSelector
    this.i18n = options.i18n
    this.cookiePrefix = options.cookiePrefix
    this.cookies = options.cookies
    this.privacyPolicyPath = options.privacyPolicyPath
    
    this._callbacks = {}
    this.initializeCookieCallbacks()
    this.initializeActionCallbacks()

    $(document).ready(() => {
      this.registerButtons()
    })

    if(!this.allCookiesPresent() && (window.location.pathname != this.privacyPolicyPath)) {
      this.show()
    }
  }

  allCookiesPresent() {
    return Object.keys(this.cookies).every(key => {
      return this.cookieIsDefined(`${this.cookiePrefix}${key}`)
    })
  }

  getCurrentValue(key) {
    if (this.cookieIsDefined(`${this.cookiePrefix}${key}`)) {
      return this.getCookie(`${this.cookiePrefix}${key}`)
    } else {
      return this.cookies[key].default
    }
  }

  setCookie(name, value, expiryInDays) {
    let date = new Date();
    date.setTime(date.getTime() + (expiryInDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + "; " + expires + "; path=/";
  }

  getCookie(name) {
    name = name + "=";
    const cDecoded = decodeURIComponent(document.cookie); // to be careful
    const cArr = cDecoded .split('; ');
    let res;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res;
  }

  cookieIsUndefined(name) {
    return this.getCookie(name) === undefined
  }

  cookieIsDefined(name) {
    return !this.cookieIsUndefined(name)
  }

  acceptAllCookies() {
    Object.keys(this.cookies).map(key => {
      this.setCookie(`${this.cookiePrefix}${key}`, true, 365)
    })

    this._callbacks["acceptAll"].forEach(callback => {
      callback()
    })
  }

  acceptSelectedCookies() {
    const selected = document.querySelectorAll('[data-cookie]')

    Array.from(selected).map(item => {
      this.setCookie(`${this.cookiePrefix}${item.dataset.cookieName}`, item.checked, 365)
    })

    this._callbacks["acceptSelected"].forEach(callback => {
      callback()
    })
  }

  registerButtons() {
    const acceptAllButtons = document.querySelectorAll('[data-accept-all-cookies]')
    const acceptSelectedButtons = document.querySelectorAll('[data-accept-selected-cookies]')

    acceptAllButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.acceptAllCookies()
        $(`${this.containerSelector} .modal`).modal('hide')
      })
    })

    acceptSelectedButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.acceptSelectedCookies()
        $(`${this.containerSelector} .modal`).modal('hide')
      })
    })
  }

  show() {
    this.container().innerHTML = this.bannerHtml()
    $(`${this.containerSelector} .modal`).modal('show')
  }

  container() {
    return document.querySelector(this.containerSelector)
  }

  bannerHtml() {
    return `
      <div class="modal fade" id="cookieModal" tabindex="-1" aria-labelledby="cookieModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="cookieModalLabel">${this.t("banner.title")}</h5>
            </div>

            <div class="modal-body">
              <div class="row">
                <div class="col-12">
                  <div class="cookie_banner-info">
                    <p>${this.t("banner.body", { privacyPolicyPath: this.privacyPolicyPath })}</p>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-12 d-flex">
                  <div class="mr-auto">
                    <button type="button" class="btn btn-primary" data-accept-all-cookies>${this.t("banner.accept_all_button_text")}</button>
                  </div>
                  <div class="ml-auto">
                    <button type="button" class="btn btn-link" data-toggle="collapse" data-target="#cookie_banner-settings" aria-expanded="false" aria-controls="cookie_banner-settings">${this.t("banner.settings_button_text")}</button>
                  </div>
                </div>
              </div>

              <div class="cookie_banner-settings collapse mt-3" id="cookie_banner-settings">
                <div class="cookie_banner-cookie_settings">
                  ${ this.renderCookieSettings() }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }

  renderCookieSettings() {
    let output = ""
    Object.keys(this.cookies).map(key => {
      output = output.concat(`
        <div class="cookie_banner-cookie_settings border mb-3">
          <div class="container-fluid">
            <div class="row">
              <div class="col">
                <div class="cookie_banner-cookie_settings-heading pt-2 d-flex">
                  <h5>${ this.t(`banner.cookies.${ key }.name`) }</h5>
                  <span class="ml-auto">
                    <input class="cookie_banner-cookie_settings-accept" id="cookie_banner-cookie_settings-accept-${ key }" ${ this.cookies[key].adjustable ? null : 'disabled="disabled"' } type="checkbox" value="1" ${ this.getCurrentValue(key) ? "checked=checked" : "" } name="cookie_preferences[${ key }]" data-cookie data-cookie-name="${ key }">
                  </span>
                </div>
                <div class="cookie_banner-cookie_settings-hint">
                  <p>${ this.t(`banner.cookies.${ key }.hint`) }</p>
                </div>
              </div>
            </div>
          </div>

          <div class="cookie_banner-cookie_settings-cookies-title" data-toggle="collapse" href="#collapse-${ key }" role="button" aria-expanded="false" aria-controls="collapse-${key}">
            <div class="container-fluid">
              <div class="row">
                <div class="col py-2 bg-light d-flex">
                  <span class="mr-auto">
                    <h6 class="mb-0">${ this.t("banner.cookie_settings.cookies") }</h6>
                  </span>
                  <span class="ml-auto">
                    <i class="fa fa-chevron-down"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="cookie_banner-allowed_cookies body collapse" id="collapse-${key}">
            ${ this.renderAllowedCookies(this.cookies[key].allowedCookies) }
          </div>
        </div>
      `)
    })

    output = output.concat(`
      <div class="row">
        <div class="col-12 d-flex">
          <div class="mr-auto">
            <button type="button" class="btn btn-primary" data-accept-all-cookies>${this.t("banner.accept_all_button_text")}</button>
            <button type="button" class="btn btn-link" data-accept-selected-cookies>${this.t("banner.accept_selected_button_text")}</button>
          </div>
        </div>
      </div>
    `);
    return output
  }

  renderAllowedCookies(allowedCookies) {
    let output = `
      <div class="table-responsive"><table class="table-sm">
        <table class="table table-sm table-striped">
          <thead>
            <tr>
              <th>${ this.t("banner.cookie_settings.allowed_cookies.name") }</th>
              <th>${ this.t("banner.cookie_settings.allowed_cookies.domain") }</th>
              <th>${ this.t("banner.cookie_settings.allowed_cookies.expiry") }</th>
              <th>${ this.t("banner.cookie_settings.allowed_cookies.description") }</th>
              <th>${ this.t("banner.cookie_settings.allowed_cookies.url") }</th>
            </tr>
          </thead>
    `
    Object.keys(allowedCookies).map(key => (
      output = output.concat(`
        <tr>
          <td>
            ${ allowedCookies[key].name }
          </td>
          <td>
            ${ allowedCookies[key].domain }
          </td>
          <td>
            ${ (typeof(allowedCookies[key].expiry) === 'string') ? this.t(`banner.cookie_settings.expiry.${allowedCookies[key].expiry}`) : this.localizeTimeObject( this.secondsToObject(allowedCookies[key].expiry * 60) ) }
          </td>
          <td>
            ${ allowedCookies[key].description[this.i18n.locale()] }
          </td>
          <td>
            ${ (allowedCookies[key].url !== undefined) ? `<a href="${allowedCookies[key].url}" target="_blank">${ this.t("banner.cookie_settings.allowed_cookies.more") }</a>` : "" }
          </td>
        </tr>
      `)
    ))
    output = output.concat(`
      </table></div>
    `)
    return output
  }

  localizeTimeObject(value) {
    let translated = []
    Object.keys(value).map(key => {
      if (value[key] > 0) {
        translated.push(this.t(`datetime.distance_in_words.x_${key}`, { "count": value[key] }))
      }
    })
    return translated.join(", ")
  }

  secondsToObject(value) {
    var years = Math.floor(value / 31536000);
    var days = Math.floor((value % 31536000) / 86400);
    var hours = Math.floor(((value % 31536000) % 86400) / 3600);
    var minutes = Math.floor((((value % 31536000) % 86400) % 3600) / 60);
    var seconds = (((value % 31536000) % 86400) % 3600) % 60;

    return { years: years, days: days, hours: hours, minutes: minutes, seconds: seconds }
  }

  initializeCookieCallbacks() {
    Object.keys(this.cookies).map(key => {
      this._callbacks[key] = []
    })
  }

  initializeActionCallbacks() {
    ["acceptAll", "acceptSelected"].map(key => {
      this._callbacks[key] = []
    })
  }

  cookieAccepted(name, func) {
    this._callbacks[name].push(func)
  }

  runCookieCallbacks() {
    Object.keys(this.cookies).map(tier => {
      Object.keys(this._callbacks[tier]).map(key => {
        this._callbacks[tier][key]()
      })
    })
  }

  on(name, func) {
    this._callbacks[name].push(func)
  }
}
