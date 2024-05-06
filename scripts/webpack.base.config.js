
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const devMode = process.env.NODE_ENV !== 'production'
function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

const webpackConfigBase = {
  entry: {
    client: resolve('../app/client.js'),
  },
  output: {
    path: resolve('../dist'),
    filename: devMode ?'js/[name].[hash].js' : 'js/[name].[contenthash].js',
    chunkFilename: devMode ? 'chunks/[name].[hash:4].js':'chunks/[name].[contenthash].js',
    // publicPath: './'
  },
  resolve: {// reduce suffix
    extensions: ['.js', '.jsx', '.json'],
    // modules: [ //Specify the following directories to search for third-party modules to prevent webpack from recursively searching in parent directories.
//   resolve('app'),
//   resolve('node_modules'),
// ],
    alias: { // Reduce the use of aliases to improve compilation speed
      '@app': path.join(__dirname, '../app'),
      '@actions': path.join(__dirname, '../app/redux/actions'),
      '@reducers': path.join(__dirname, '../app/redux/reducers'),
      '@apis': path.join(__dirname, '../app/apis'),
      '@components': path.join(__dirname, '../app/components'),
      '@configs': path.join(__dirname, '../app/configs'),
      '@config': path.join(__dirname, '../app/configs/config.js'),
      '@ajax': path.join(__dirname, '../app/configs/ajax.js'),
      '@reg': path.join(__dirname, '../app/configs/regular.config.js'),
      '@images': path.join(__dirname, '../app/images'),
      '@middleware': path.join(__dirname, '../app/middleware'),
      '@pages': path.join(__dirname, '../app/pages'),
      '@styles': path.join(__dirname, '../app/styles'),
      '@tableList': path.join(__dirname, '../app/components/tableList/tableList.js'),
      'react-dom': devMode ? '@hot-loader/react-dom' : 'react-dom', // React hot loader requires
    },
  },
  optimization: {
    usedExports: true,
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      chunks: "all", // There are three values ​​available: initial (initial module), async (load modules on demand) and all (all modules)
      minSize: 30000, // Modules exceeding 30k will be automatically extracted into public modules
      minChunks: 1, // If the module is referenced >= 1 time, it will be split.
      name: true, // By default, it is named by module name + hash. If the names are the same, multiple modules will be merged into one, which can be set to function.
      automaticNameDelimiter: '~', // Name separator
      cacheGroups: {
        default: { // Module cache rules, set to false and the default cache group will be disabled
          minChunks: 2, // The module is referenced >= 2 times and split into the vendors public module
          priority: -20, // priority
          reuseExistingChunk: true, // Use existing modules by default
        },
        vendor: {
          // Filter the modules that need to be entered
// test: module => {
//   if (module.resource) {
//     const include = [/[\\/]node_modules[\\/]/].every(reg => {
//       return reg.test(module.resource);
//     });
//     const exclude = [/[\\/]node_modules[\\/](react|redux|antd|react-dom|react-router)/].some(reg => {
//       return reg.test(module.resource);
//     });
//     return include && !exclude;
//   }
//   return false;
// },
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          // minChunks: 2,
          priority: -10,// Determine the priority of module entry
          reuseExistingChunk: true,// Use reuse existing modules
          enforce: true,
        },
        //  antd: {
//    test: /[\\/]node_modules[\\/]antd/,
//    name: 'antd',
//    priority: 15,
//    reuseExistingChunk: true,
//  },
        echarts: {
          test: /[\\/]node_modules[\\/]echarts/,
          name: 'echarts',
          priority: 16,
          reuseExistingChunk: true,
        },
        "draft-js": {
          test: /[\\/]node_modules[\\/]draft-js/,
          name: 'draft-js',
          priority: 18,
          reuseExistingChunk: true,
        }
      },
    },
  },
  module: {
    // noparse: /lodash/,
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        include: [resolve('../app')],
        // loader: 'babel',
//Handle the processing of .js files to the instance of HappyPack whose ID is happyBabel.
        loader: 'happypack/loader?id=happyBabel',
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMode,
              reloadAll: devMode,
            },
          },
          'happypack/loader?id=happyStyle',
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        exclude: /node_modules/,
        include: [resolve('../app/images')],
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[name].[hash:4].[ext]',
          outputPath: '/img'
        }
      },
      {
        test: /\.(woff|eot|ttf|svg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'font/[name].[hash:4].[ext]'
        }
      },
    ],
  },
  performance: false,
  plugins: [
    // Remove moment language pack
// new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|fr|hu/),

    new MiniCssExtractPlugin({
      filename: devMode ? 'css/style.css':'css/style.[contenthash].css',
      chunkFilename: devMode ? 'css/style.[id].css':'css/style.[contenthash].[id].css'
    }),

    new HappyPack({
      //Use id to identify where happypack processes the class files
      id: 'happyBabel',
      //How to handle it? The usage is the same as the loader configuration.
      loaders: [{
        loader: 'babel-loader',
        options: {
          // babelrc: true,
          cacheDirectory: true // Enable caching
        }
      }],
      //Represents a shared process pool, that is, multiple HappyPack instances use child processes in the same shared process pool to handle tasks to prevent excessive resource usage.
      threadPool: happyThreadPool,
      //Allow HappyPack to output logs
      verbose: false,
    }),
    new HappyPack({
      //Use id to identify where happypack processes the class files
      id: 'happyStyle',
      //How to handle it? The usage is the same as the loader configuration.
      loaders: [
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2, // There were 2 loaders before
// modules: true, //enable cssModules
            sourceMap: true,
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,//If it is true, during style tracing, the style when writing is displayed; if it is false, the style after compilation is displayed.
          }
        },
        {
          loader: 'less-loader',
          options: {
            sourceMap: true,
          }
        }
      ],
      //Represents a shared process pool, that is, multiple HappyPack instances use child processes in the same shared process pool to handle tasks to prevent excessive resource usage.
      threadPool: happyThreadPool,
      //Allow HappyPack to output logs
      verbose: false,
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ]
}

module.exports = webpackConfigBase
