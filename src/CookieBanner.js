import { I18nConcern } from './I18nConcern';

export class CookieBanner extends I18nConcern(Object) {
  constructor(container_id, i18n) {
    super()
    this.container_id = container_id
    this.i18n = i18n
  }

  show() {
    this.container().innerHTML = this.bannerHtml()
  }

  container() {
    return document.querySelector(this.container_id)
  }

  bannerHtml() {
    return `
      <div class="modal fade" id="cookieModal" tabindex="-1" aria-labelledby="cookieModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="cookieModalLabel">${this.t("banner.title")}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-body">
              <p>${this.t("banner.body")}</p>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-primary mr-auto" data-dismiss="modal">${this.t("banner.accept_all_button_text")}</button>
              <button type="button" class="btn btn-link">${this.t("banner.customize_button_text")}</button>
            </div>
          </div>
        </div>
      </div>
    `
  }
}
