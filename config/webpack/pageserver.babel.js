import { server_configuration } from 'universal-webpack'
import settings from './universal-webpack.babel'
import configuration from './base.babel'

export default server_configuration(configuration, settings)
