var path = require('path')
var fs = require('fs')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
const Util = require('util');

var searchDir = ['components']
var entry = {}

searchDir.forEach(function (dir) {
  var srcBasePath = path.join(__dirname, './', dir)
  var files = fs.readdirSync(srcBasePath)
  var ignore = ['.DS_Store']
  
  files.map(function (file) {
    if (ignore.indexOf(file) < 0) {
      entry[dir + '/' + file] = path.join(srcBasePath, )

      var demofile = path.join(srcBasePath, file, 'demo.js')
      if (fs.existsSync(demofile)) {
        entry[dir + '/' + file + '/demo'] = demofile
      }

      var reduxfile = path.join(srcBasePath, file, 'redux.js')
      if (fs.existsSync(reduxfile)) {
        entry[dir + '/' + file + '/redux'] = reduxfile
      }
    }
  })
})

// console.log(Util.inspect(entry))

Object.keys(entry).forEach(function (key) {
  entry[key] = [entry[key], 'webpack-hot-middleware/client']
})

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/static/'
  },
  plugins: [
    new ExtractTextPlugin('[name]/index.css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      include: __dirname,
      query: {
        presets: ['es2015', 'react']
      }
    }, {
      test: /\.less/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
      exclude: /node_modules/
    }]
  }
}