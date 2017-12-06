var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
//var ModernizrPlugin = require('modernizr-webpack-plugin');

/**
var modernizrConfig = {
  filename: 'modernizr.js',
  options: [
    'setClasses',
    'html5printshiv'
  ],
  feature-detects: [
    'inputtypes',
    'network/connection',
    'touchevents'
  ],
  minify: {
    output: {
      comments: false,
      beautify: false,
      screw_ie8: true
    }
  }
}
*/

var extractSass = new ExtractTextPlugin('curls.css')
var stripLogger = 'strip-loader?strip[]=console.error' +
                              '&strip[]=console.log' +
                              '&strip[]=console.warn'


module.exports = {
  // The base directory for resolving the entry option
  context: __dirname,

  entry: {
    app: 'index.dist'
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'curls.js',
    pathinfo: true,
    library: 'Curls',
    libraryTarget: 'umd'
  },

  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    immutable: {
      root: 'immutable',
      commonjs2: 'immutable',
      commonjs: 'immutable',
      amd: 'immutable'
    },
    reactDom: {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  },

  resolveLoader: {
    modules: [path.join(__dirname, 'node_modules')],
    moduleExtensions: ['-loader'],
  },

  resolve: {
    // Directories that contain our modules
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    descriptionFiles: ['package.json'],
    moduleExtensions: ['-loader'],
    // Extensions used to resolve modules
    extensions: ['.js', '.react.js', '.scss', '.css'],
    symlinks: false,
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
      immutable: path.resolve('./node_modules/immutable'),
      'core-js': path.resolve('./node_modules/core-js'),
      'react-immutable-proptypes': path.resolve('./node_modules/react-immutable-proptypes'),
      'react-cake': path.resolve('./node_modules/react-cake'),
      'prop-types': path.resolve('./node_modules/prop-types'),
      lodash: path.resolve('./node_modules/lodash')
    },
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractSass.extract({
          fallback: 'style',
          use: [
            'css',
            'group-css-media-queries',
            'sass'
          ]
        })
      },
      // {
      //   test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
      //   use: ['file']
      // },
      {
        test: /\.js$/,
        use: ['babel-loader', stripLogger],
        exclude: [/node_modules/]
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({'process.env': {NODE_ENV: '"production"'}}),
    /*
    new ModernizrPlugin(modernizrConfig),
    */
    /*
    new webpack.optimize.AggressiveSplittingPlugin({
                minSize: 30000,
                maxSize: 50000
    }),
    */
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    // new webpack.optimize.ModuleConcatenationPlugin(),
    extractSass
  ],

  // Include mocks for when node.js specific modules may be required
  node: {
    fs: 'empty',
    vm: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
