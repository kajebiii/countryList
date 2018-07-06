var webpack = require('webpack')
var path = require('path')
module.exports = {
  entry: ['babel-polyfill', path.resolve(__dirname, 'app')],
  mode: 'development',
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        pathRewrite: {"^/api" : ""}
      },
    }
  },
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
      {test: /(\.css)$/, loaders: ['style-loader', 'css-loader']}
    ]
  }
}