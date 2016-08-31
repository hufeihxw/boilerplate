import path from 'path'
import webpack from 'webpack'
import base_configuration from './pageserver.babel'
import dotenv from 'dotenv'

dotenv.config({path: path.join(process.cwd(), 'config', 'env', 'dev')})

const {WEBPACK_DEV_SERVER_PROTOCOL, WEBPACK_DEV_SERVER_HOST, WEBPACK_DEV_SERVER_PORT} = process.env;

const configuration = Object.assign({},base_configuration)

// Network path for static files: fetch all statics from webpack development server
configuration.output.publicPath = `${WEBPACK_DEV_SERVER_PROTOCOL}://${WEBPACK_DEV_SERVER_HOST}:${WEBPACK_DEV_SERVER_PORT}${base_configuration.output.publicPath}`
console.log(configuration.output.publicPath)

export default configuration
