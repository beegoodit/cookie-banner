const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'cookie-banner.js',
    library: "cookieBanner",
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
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Demo</title>
            ${ htmlWebpackPlugin.tags.headTags }
          </head>
          
          <body>
            ${ htmlWebpackPlugin.tags.bodyTags }
            <h1>Hello World</h>
            <script>
              window.cookieBanner.show();
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
