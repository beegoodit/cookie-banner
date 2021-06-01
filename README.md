# @beegoodit/cookie-banner

A EU GDPR compliant cookie banner.

## Usage

```
<div data-cookie-banner>
<script src="/assets/vendor/node_modules/@beegoodit/cookie-banner/dist/cookie-banner.js" crossorigin="anonymous"></script>
<script>
 $( document ).ready(() => {
  var cookies = {
    "basic": {
      "adjustable": false,
      "default": true,
      "allowedCookies": [
        { name: "example-eu_gdpr-basic", domain: "example.com", expiry: 1 * 60 * 24 * 365, description: { de: "Speichert Ihre Cookie-Einstellungen zwecks EU DS-GVO Konformität", en: "Used to track your cookie settings for EU GDPR compliance." }},
        { name: "example-eu_gdpr-analytics", domain: "example.com", expiry: 1 * 60 * 24 * 365, description: { de: "Speichert Ihre Cookie-Einstellungen zwecks EU DS-GVO Konformität", en: "Used to track your cookie settings for EU GDPR compliance." }},
        { name: "example-eu_gdpr-advertising", domain: "example.com", expiry: 1 * 60 * 24 * 365, description: { de: "Speichert Ihre Cookie-Einstellungen zwecks EU DS-GVO Konformität", en: "Used to track your cookie settings for EU GDPR compliance." }},
        { name: "example-eu_gdpr-social_media", domain: "example.com", expiry: 1 * 60 * 24 * 365, description: { de: "Speichert Ihre Cookie-Einstellungen zwecks EU DS-GVO Konformität", en: "Used to track your cookie settings for EU GDPR compliance." }},
        { name: "_ga", domain: ".example.com", expiry: 2 * 60 * 24 * 365, description: { de: "Google Analytics: Wird benutzt um Nutzungsstatistiken zu erstellen. Empfänger der Daten im Cookie ist Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043.", en: "Google Analytics: Used to distinguish users. The recipient of the data in the cookie is Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043." }, url: "https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage"  },
        { name: "_gat_UA-198381349-1", domain: ".example.com", expiry: 1 * 60, description: { de: "Google Analytics: Wird verwendet, um die Anforderungsrate zu drosseln. Empfänger der Daten im Cookie ist Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043.", en: "Google Analytics: Used to throttle request rate. The recipient of the data in the cookie is Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043." }, url: "https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage" },
        { name: "_gid", domain: ".example.com", expiry: 1 * 60 * 24, description: { de: "Google Analytics: Wird benutzt um Nutzungsstatistiken zu erstellen. Empfänger der Daten im Cookie ist Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043.", en: "Google Analytics: Used to distinguish users. The recipient of the data in the cookie is Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043." }, url: "https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage" }
      ]
    }
  }

  var i18n = window.cb.i18n({
    locale: document.documentElement.lang,
    availableLocales: ["en", "de"]
  })

  var cookieBanner = window.cb.cookieBanner({
    containerSelector: "[data-cookie-banner]",
    i18n: i18n,
    cookiePrefix: "example-eu_gdpr-",
    privacyPolicyPath: "/en/privacy-policy"
  })

  cookieBanner.on("acceptAll", () => {
    console.log("Accepted all cookies")
  })

  cookieBanner.on("acceptSelected", () => {
    console.log("Accepted selected cookies")
  })

  cookieBanner.cookieAccepted("basic", () => {
    var script = document.createElement("script");
    script.innerHTML = "console.log('basic is accepted')";
    document.head.appendChild(script);

    var gaTrackingIdTag = document.querySelector("meta[property='google_analytics_tracking_id']")

    if (gaTrackingIdTag !== null) {
      const trackingId = gaTrackingIdTag.getAttribute('content')

      var gtag = document.createElement("script")
      gtag.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`

      var gtagScript = document.createElement("script")
      gtagScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', '${trackingId}');
      `
      document.head.appendChild(gtag)
      document.head.appendChild(gtagScript)
    }
  })

  cookieBanner.cookieAccepted("analytics", () => {
    var script = document.createElement("script");
    script.innerHTML = "console.log('analytics is accepted')";
    document.head.appendChild(script);
  })

  cookieBanner.cookieAccepted("marketing", () => {
    var script = document.createElement("script");
    script.innerHTML = "console.log('social_media is accepted')";
    document.head.appendChild(script);
  })

  cookieBanner.cookieAccepted("social_media", () => {
    var script = document.createElement("script");
    script.innerHTML = "console.log('social_media is accepted')";
    document.head.appendChild(script);
  })

  cookieBanner.runCookieCallbacks()
})
```

## Building and running on localhost

First install dependencies:

```sh
yarn install
```

To create a production build:

```sh
yarn build:prod
```

To create a development build:

```sh
yarn build:dev
```

## Running

```sh
yarn server
```

## Testing

To run unit tests:

```sh
yarn guard
```

## Credits

Made with [createapp.dev](https://createapp.dev/)
