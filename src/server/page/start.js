import 'source-map-support/register';
import { server } from 'universal-webpack';
import settings from '../../../config/webpack/universal-webpack.babel';
import configuration from '../../../config/webpack/base.babel';

server(configuration, settings)
