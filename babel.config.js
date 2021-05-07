module.exports = {
  "sourceType": "unambiguous",
  "plugins": [
    "@babel/plugin-transform-modules-umd",
    "@babel/plugin-proposal-class-properties"
  ],
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false
      }
    ]
  ]
}