import { CookieBanner } from "../src/CookieBanner"
import { I18n } from "../src/I18n"

// const page = require("./support/page")
//const fs = require("fs");
//window.document.body.innerHTML = fs.readFileSync("./tests/support/index.html");


test("CookieBanner", () => {
    document.body.innerHTML = `<div id="cookie-banner"></div>`
    const cookieBanner = new CookieBanner("#cookie-banner", new I18n("de"))
    expect(cookieBanner.show()).toBe(undefined);
    expect(document.body.innerHTML).toContain("modal");
  });