module.exports = {
  "sourceType": "unambiguous",
  "plugins": ["@babel/plugin-transform-modules-umd"],
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false
      }
    ]
  ]
}