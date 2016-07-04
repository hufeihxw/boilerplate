import path from 'path';
import webpack from 'webpack';

const root = process.cwd();

const clientInclude = [path.join(root, 'src', 'client'), path.join(root, 'src', 'universal')];
const globalCSS = path.join(root, 'src', 'universal', 'styles', 'global');
const srcDir = path.join(root, 'src');

export default {
  // devtool: 'source-maps',
  devtool: 'eval',
  context: srcDir,
  entry: {
    app: [
      'react-hot-loader/patch',
      'client/client.js',
      'webpack-hot-middleware/client'
    ]
  },
  output: {
    // https://github.com/webpack/webpack/issues/1752
    filename: 'app.js',
    chunkFilename: '[name]_[chunkhash].js',
    path: path.join(root, 'build'),
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      '__CLIENT__': true,
      '__PRODUCTION__': false,
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.EnvironmentPlugin([
      'PROTOCOL',
      'HOST',
      'PORT'
    ])
  ],
  resolve: {
    extensions: ['.js'],
    modules: [srcDir, 'node_modules']
  },
  module: {
    loaders: [
      {test: /\.json$/, loader: 'json-loader'},
      {test: /\.txt$/, loader: 'raw-loader'},
      {test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/, loader: 'url-loader?limit=10000'},
      {test: /\.(eot|ttf|wav|mp3)$/, loader: 'file-loader'},
      {
        test: /\.css$/,
        loader: 'style!css',
        include: Array.concat([globalCSS], clientInclude)
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: clientInclude
      }
    ]
  }
};
