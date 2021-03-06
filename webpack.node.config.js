// webpack.node.config.js

var webpack = require('webpack');
var path = require('path');
var libraryName = 'WebDNNBackend';
var nodeExternals = require('webpack-node-externals');

var plugins = [
  new webpack.DefinePlugin({
    window: 'global',
    'process.env': {
      APP_ENV: JSON.stringify('node')
    }
  })
];
var outputFile = 'node.js';

module.exports = {
  externals: [nodeExternals()],
  mode: 'production',
  optimization: {
    portableRecords: true,
    removeAvailableModules: true,
    mergeDuplicateChunks: true,
    occurrenceOrder: true,
    // runtimeChunk: 'single',
    minimize: false,
    namedModules: true
    // splitChunks: {
    //   chunks: 'all'
    // }
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  module: {
    rules: [
      {
        loader: 'ts-loader',
        test: /\.tsx?$/,
        type: 'javascript/auto'
      },
      {
        loader: 'babel-loader',

        // Skip any files outside of your project's `src` directory
        include: [path.resolve(__dirname, 'src')],

        // Only run `.js` and `.jsx` files through Babel
        test: /\.jsx?$/,

        // Options to configure babel with
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0']
        }
      },
      // {
      //   test: /webcrypto-shim\.js$/,
      //   loader: 'string-replace-loader',
      //   query: {
      //     search: '_crypto.subtle = _subtle;',
      //     replace: 'try{_crypto.subtle = _subtle;}catch(e){}'
      //   }
      // },
      {
        test: /\.proto$/,
        use: ['json-loader', 'proto-loader6']
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  entry: [
    // Set up an ES6-ish environment
    // 'babel-polyfill',

    // Add your application's scripts below
    path.resolve(__dirname, './src/node.ts')
  ],
  target: 'node',
  devtool: 'source-map',
  plugins: plugins,
  resolve: {
    extensions: ['.ts', '.js', '.json']
  }
};
