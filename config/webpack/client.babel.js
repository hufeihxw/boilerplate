import { client_configuration } from 'universal-webpack'
import settings from './universal-webpack.babel'
import configuration from './base.babel'

export default function(options)
{
	return client_configuration(configuration, settings, options)
}
