'use strict'

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  stats: { colors: true },
  historyApiFallback: true
}).listen(3009, 'localhost', function (err, result) {
  if (err) 
    console.log(err)

  console.log('Webpack Dev Server starts at localhost:3009')
})