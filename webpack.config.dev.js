var path = require('path')
var webpack = require('webpack')


module.exports = {
  // The base directory for resolving the entry option
  context: __dirname + "/lib",

  // The entry point for the bundle
  entry: "curls",

  // Various output options, to give us a single bundle.js file with everything resolved and concatenated
  output: {
    path: __dirname + '/webpack',
    filename: "curls.dev.js",
    pathinfo: true
  },

  // Where to resolve our loaders
  resolveLoader: {
    modulesDirectories: ['node_modules']
  },

  resolve: {
    // Directories that contain our modules
    root: [path.join(__dirname, "/lib")],

    // Extensions used to resolve modules
    extensions: ['', '.js', '.react.js']
  },

  module: {
    loaders: [
      {
        test: /\/lib\/.*\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/]
      }
    ],
  },

  // Include mocks for when node.js specific modules may be required
  node: {
    fs: 'empty',
    vm: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
