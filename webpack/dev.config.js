import path from 'path';
import webpack from 'webpack';
import webpackIsomorphicAssets from './webpack-isomorphic-assets';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import autoprefixer from 'autoprefixer';

import serverConfig from './../platforms/shared/config';

const { host, hotPort: port } = serverConfig;
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(webpackIsomorphicAssets);

const assetsPath = path.resolve(__dirname, 'dist', 'build');

function stylesLoaders() {
  const loaders = {
    css: 'css-loader?modules&importLoaders=1&localIdentName=[path][name]__[local]__[hash:base64:5]!postcss-loader'
  };
  return Object.keys(loaders).map(ext => ({
    loader: `style-loader!${loaders[ext]}`,
    test: new RegExp(`\\.(${ext})$`)
  }));
}

export default {
  hotPort: port,
  cache: true,
  debug: true,
  devtools: 'cheap-module-eval-source-map',
  entry: {
    main: [
      `webpack-hot-middleware/client?path=http://${host}${port ? `:${port}` : ''}/__webpack_hmr`,
      './platforms/browser/index.js'
    ]
  },
  output: {
    path: assetsPath,
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: `http://${host}:${port}/dist/build/`
  },
  module: {
    loaders: [{
      loader: 'url-loader?limit=100000',
      test: /\.(gif|jpg|png|woff|woff2|eot|ttf|svg)$/
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        plugins: [
          ['react-transform', {
            transforms: [{
              transform: 'react-transform-hmr',
              imports: ['react'],
              locals: ['module']
            }]
          }]
        ]
      }
    }].concat(stylesLoaders())
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'platforms',
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx'],
    fallback: path.join(__dirname, '..', '..', 'node_modules')
  },
  resolveLoader: {
    root: path.join(__dirname, '..', '..', 'node_modules'),
  },
  plugins: [
    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
    }),
    webpackIsomorphicToolsPlugin.development()
  ],
  postcss: () => [autoprefixer({ browsers: 'last 2 version' })]
};
