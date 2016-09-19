var path = require('path');
var webpack = require('webpack');

var dir_build = path.resolve(__dirname, 'src');
var dir_js = path.resolve(__dirname, 'src/js');

module.exports = {
  entry: [
    // Set up and ES6-ish environment
    'babel-polyfill',

    // Add you application's scripts below
    './src/js/app/main'
  ],
  output: {
    path: dir_js,
    filename: 'app.js'
  },
  devServer: {
    contentBase: dir_build
  },
  module: {
    loaders: [
      {
        loader: "babel-loader",

        // Skip any files outside of the project's 'src' directory
        include: [
          dir_build
        ],

        // Only run '.js' and '.jsx' files through Babel
        test: /\.jsx?$/,

        // Options to configure babel with
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015'],
        }
      },
    ]
  },
  stats: {
    // Nice colored output
    colors: true
  },
  devTool: 'source-map',
  debug: true
};