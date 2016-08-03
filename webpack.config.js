var webpack = require('webpack')

module.exports = {
  entry: './index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  debug: true,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query:{
          presets:['react', 'es2015']
        }
      }
    ]
  }
}