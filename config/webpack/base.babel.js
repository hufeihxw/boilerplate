import path from 'path';
import webpack from 'webpack';

const root = process.cwd();

const JsInclude = [path.join(root, 'src', 'client'), path.join(root, 'src', 'universal'), path.join(root, 'src', 'server', 'page')];
const srcDir = path.join(root, 'src');

export default {
  // devtool: 'source-maps',
  devtool: 'eval',
  context: srcDir,
  progress: true,
  entry: {
    app: 'client/entry.js'
  },
  output: {
    // https://github.com/webpack/webpack/issues/1752
    filename: 'app.js',
    chunkFilename: '[name]_[chunkhash].js',
    path: path.resolve(root, 'build/assets'),
    publicPath: '/assets/'
  },


  plugins: [],
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
        loader: 'style!css?name=assests/[hash].[ext]'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: JsInclude
      }
    ]
  }
};
