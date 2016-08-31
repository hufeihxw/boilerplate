import path from 'path'
import webpack from 'webpack'
import base_configuration from './client.babel'
import dotenv from 'dotenv'

dotenv.config({path: path.join(process.cwd(), 'config', 'env', 'dev')})

const configuration = base_configuration({ development: true, css_bundle: true })

configuration.devtool = 'inline-eval-cheap-source-map'

configuration.plugins.push
(
	// faster code reload on changes
	new webpack.HotModuleReplacementPlugin(),

	// // extracts common javascript into a separate file (works)
	// new webpack.optimize.CommonsChunkPlugin('common', 'common.[hash].js')
)

// enable webpack development server
configuration.entry.app = [
  'react-hot-loader/patch',
  configuration.entry.app,
  'webpack-hot-middleware/client'
]
const {WEBPACK_DEV_SERVER_PROTOCOL, WEBPACK_DEV_SERVER_HOST, WEBPACK_DEV_SERVER_PORT} = process.env;
// network path for static files: fetch all statics from webpack development server
configuration.output.publicPath = `${WEBPACK_DEV_SERVER_PROTOCOL}://${WEBPACK_DEV_SERVER_HOST}:${WEBPACK_DEV_SERVER_PORT}${configuration.output.publicPath}`

export default configuration
