const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
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
      templateContent: ({htmlWebpackPlugin}) => `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Demo</title>
          </head>
          
          <body>
            <h1>Hello World</h>
          </body>
        </html>
      `
    })
  ]
};

module.exports = config;