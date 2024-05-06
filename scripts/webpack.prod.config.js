
const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const Copy = require('copy-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

const webpackConfigProd = {
  mode: 'production',
  output: {
    publicPath: './',
  },
  devtool: 'cheap-module-source-map',
  optimization: {
    minimizer: [
      new TerserJSPlugin({ // multi-process compression
// Set cache directory
        cache: path.resolve('.cache'),
        parallel: 4,// Enable multi-process compression
// sourceMap,
        terserOptions: {
          compress: {
            // Remove all `console` statements
            drop_console: true,
          },
        },
      }),
    ]
  },
  plugins: [
    // Define environment variables for the development environment
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      IS_DEVELOPMETN: false,
    }),
    // Inject the packaged resources into the html file
    new HtmlWebpackPlugin({
      // inject: true, //will inject the main bundle to index.html
      template: resolve('../app/index.html'),
      // mapConfig:'http://192.168.0.1/map_config.js',
// Here is a list of js files to be added to html. Comments do not require dll.
      dlls: [
        // './resource/dll/vendor.dll.js',
// './resource/dll/redux.dll.js',
      ],
    }),
    // Analyze code
    new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
    new Copy([
      // { from: './app/resource/dll', to: '../dist/resource/dll' },
    ]),
    new OptimizeCSSAssetsPlugin(),
    new CleanWebpackPlugin(),
  ],
}

module.exports = merge(webpackConfigBase, webpackConfigProd)
