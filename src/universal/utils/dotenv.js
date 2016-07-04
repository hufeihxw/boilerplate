import path from 'path';
/*
 * getDotenv()
 * processes .env file (if it exists). Sets process.env[VARS] as a
 * side-effect.
 *
 * Returns true.
 */
const root = process.cwd();

export function getDotenv() {
  var dotenv = require('dotenv');              // eslint-disable-line
  var myEnv = dotenv.config({silent: true, path:path.join(root, 'config', 'env', 'dev')});   // eslint-disable-line
  return true;
}
