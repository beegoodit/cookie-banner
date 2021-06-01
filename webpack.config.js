const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'cookie-banner.js',
    library: "cb",
    libraryTarget: 'umd',
    // globalObject: "typeof self !== 'undefined' ? self : this",
    globalObject: "this",
    // library: {
    //   name: "cookieBanner",
    //   type: "umd"
    // }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.ya?ml$/,
        type: 'json', // Required by Webpack v4
        use: 'yaml-loader'
      }
    ]
  },
  plugins: [
    //new HtmlWebpackPlugin({
    //  appMountId: 'app',
    //  filename: 'index.html'
    //})
    new HtmlWebpackPlugin({
      title: 'Cookie Banner example',
      scriptLoading: 'blocking',
      inject: false,
      templateContent: ({htmlWebpackPlugin}) => `
        <!doctype html>
        <html lang="en">
          <head>
            <!-- Required meta tags -->
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

            <!-- Bootstrap CSS -->
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">

            <!-- Font Awesome CSS -->
            <link crossorigin="anonymous" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" rel="stylesheet">

            <title>Hello, world!</title>
            ${ htmlWebpackPlugin.tags.headTags }
          </head>
          <body>
            ${ htmlWebpackPlugin.tags.bodyTags }
            <h1>Hello, world!</h1>

            <!-- Option 1: jQuery and Bootstrap Bundle (includes Popper) -->
            <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>

            <div data-cookie-banner></div>
            <script>
              var cookies = {
                "basic": {
                  "adjustable": false,
                  "default": true,
                  "allowedCookies": [
                    { name: "basic-1", domain: "example.com", expiry: "session", description: { en: "basic-1 description en", de: "basic-1 beschreibung de" }, url: "https://www.google.de" },
                    { name: "basic-2", domain: "example.com", expiry: 1, description: { en: "basic-2 description en", de: "basic-2 beschreibung de" }},
                    { name: "basic-3", domain: "example.com", expiry: 1 * 60 * 24, description: { en: "basic-3 description en", de: "basic-3 beschreibung de" }},
                    { name: "basic-4", domain: "example.com", expiry: 1 * 60 * 24 * 365, description: { en: "basic-4 description en", de: "basic-4 beschreibung de" }},
                  ]
                },
                "analytics": {
                  "adjustable": true,
                  "default": true,
                  "allowedCookies": [
                    { name: "analytics-1", domain: "example.com", expiry: "session", description: { en: "analytics-1 description en", de: "analytics-1 beschreibung de" }},
                    { name: "analytics-2", domain: "example.com", expiry: "session", description: { en: "analytics-2 description en", de: "analytics-2 beschreibung de" }},
                    { name: "analytics-3", domain: "example.com", expiry: "session", description: { en: "analytics-3 description en", de: "analytics-3 beschreibung de" }},
                    { name: "analytics-4", domain: "example.com", expiry: "session", description: { en: "analytics-4 description en", de: "analytics-4 beschreibung de" }},
                  ]
                },
                "marketing": {
                  "adjustable": true,
                  "default": true,
                  "allowedCookies": [
                    { name: "socialMedia-1", domain: "example.com", expiry: "session", description: { en: "socialMedia-1 description en", de: "socialMedia-1 beschreibung de" }},
                    { name: "socialMedia-2", domain: "example.com", expiry: "session", description: { en: "socialMedia-2 description en", de: "socialMedia-2 beschreibung de" }},
                    { name: "socialMedia-3", domain: "example.com", expiry: "session", description: { en: "socialMedia-3 description en", de: "socialMedia-3 beschreibung de" }},
                    { name: "socialMedia-4", domain: "example.com", expiry: "session", description: { en: "socialMedia-4 description en", de: "socialMedia-4 beschreibung de" }},
                  ]
                },
                "social_media": {
                  "adjustable": true,
                  "default": false,
                  "allowedCookies": [
                    { name: "advertising-1", domain: "example.com", expiry: "session", description: { en: "advertising-1 description en", de: "advertising-1 beschreibung de" }},
                    { name: "advertising-2", domain: "example.com", expiry: "session", description: { en: "advertising-2 description en", de: "advertising-2 beschreibung de" }},
                    { name: "advertising-3", domain: "example.com", expiry: "session", description: { en: "advertising-3 description en", de: "advertising-3 beschreibung de" }},
                    { name: "advertising-4", domain: "example.com", expiry: "session", description: { en: "advertising-4 description en", de: "advertising-4 beschreibung de" }},
                  ]
                }
              }

              var i18n = window.cb.i18n({
                locale: "en",
                availableLocales: ["en", "de"]
              })

              var cookieBanner = window.cb.cookieBanner({
                containerSelector: "[data-cookie-banner]",
                i18n: i18n,
                cookiePrefix: "foo-eu_gdpr-",
                cookies: cookies,
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
          </body>
        </html>
      `
    })
  ],
  devServer: {
    injectClient: false,
  }
};
