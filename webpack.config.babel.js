import path from 'path';
import webpack from 'webpack';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin';
import HappyPack from 'happypack';
import TerserPlugin from 'terser-webpack-plugin';
import { WebpackSweetEntry } from '@sect/webpack-sweet-entry';

const NODE_ENV = process.env.NODE_ENV ? 'production' : 'development';
const isDevelopment = NODE_ENV === 'development';

const sourcePath = path.join(__dirname, 'source');
const buildPath = path.join(__dirname, 'dest');

const options = {
  mode: NODE_ENV,
  entry: WebpackSweetEntry(
    path.resolve(sourcePath, 'scripts/*.js*').replace(/\\/g, '/'),
    'js',
    'scripts',
  ),
  output: {
    filename: '[name].js',
    path: path.join(buildPath, '/javascripts'),
    publicPath: '/javascripts/',
    chunkFilename: '[name].bundle.js',
    library: 'App',
  },
  resolve: {
    modules: ['node_modules', path.join(__dirname, 'source')],
    alias: {
      'lodash-es': 'lodash',
      '@': path.resolve(__dirname, 'source'),
    },
  },
  devtool: isDevelopment ? 'eval-source-map' : 'source-map',
  context: path.resolve(__dirname, 'source/scripts'),
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](jquery|micromodal)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
        sourceMap: true,
      }),
    ],
  },
  module: {
    noParse: /\/node_modules\/(jquery|backbone)/,
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{ loader: 'happypack/loader' }],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      global: {},
    }),
    new CaseSensitivePathsPlugin(),
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /a\.js|node_modules/,
      // add errors to webpack instead of warnings
      failOnError: true,
    }),
    new DuplicatePackageCheckerPlugin(),
    new HappyPack({
      loaders: ['babel-loader'],
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
};

export default options;
