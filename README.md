# @beegoodit/cookie-banner

A EU GDPR compliant cookie banner.

## Usage

```
<script src="/assets/vendor/node_modules/@beegoodit/cookie-banner/dist/cookie-banner.js" crossorigin="anonymous"></script>
<script>
  $( document ).ready(() => {
    var i18n = window.cb.i18n(document.documentElement.lang, ["en", "de"])
    var cookieBanner = window.cb.cookieBanner("#cookie-banner", i18n, "beegoodit-eu_gdpr-")

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
  </script>
})
```

## Building and running on localhost

First install dependencies:

```sh
npm install
```

To create a production build:

```sh
npm run build-prod
```

To create a development build:

```sh
npm run build-dev
```

## Running

```sh
node dist/cookie-banner.js
```

## Testing

To run unit tests:

```sh
npm test
```

## Credits

Made with [createapp.dev](https://createapp.dev/)
