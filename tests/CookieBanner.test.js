import { CookieBanner } from "../src/CookieBanner"
import { I18n } from "../src/I18n"

// const page = require("./support/page")
//const fs = require("fs");
//window.document.body.innerHTML = fs.readFileSync("./tests/support/index.html");

const page = `
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">

    <title>Hello, world!</title>
  </head>
  <body>
    <h1>Hello, world!</h1>

    <!-- Option 1: jQuery and Bootstrap Bundle (includes Popper) -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>

    <div id="cookie-banner"></div>
    <script>
      var i18n = window.cb.i18n({
        locale: "en",
        availableLocales: ["en", "de"]
      })

      var cookieBanner = window.cb.cookieBanner({
        containerId: "#cookie-banner",
        i18n: i18n
      })
    </script>
  </body>
</html>
`

require('../node_modules/jquery/dist/jquery.js')

var $ = require('jquery');
window.$ = $
require('../node_modules/bootstrap/dist/js/bootstrap.js')

test("CookieBanner", () => {
  document.body.innerHTML = page

  const cookieBanner = new CookieBanner({ containerId: "#cookie-banner", i18n: new I18n("de") })
  expect(cookieBanner.show()).toBe(undefined);
  expect(document.body.innerHTML).toContain("modal");
});