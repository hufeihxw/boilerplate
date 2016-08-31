import express from 'express';
import webpack from 'webpack';
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
// import SSR from './server.render';

Object.assign = null;
Object.assign = require('object-assign'); //react server render

const PROD = process.env.NODE_ENV === 'production';

const app = express();

// HMR
if (!PROD) {
  const compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}

// setup middleware
app.use(bodyParser.json());
app.use(cors({origin: true, credentials: true}));
app.use((req, res, next) => {
  if (/\/favicon\.?(jpe?g|png|ico|gif)?$/i.test(req.url)) {
    res.status(404).end();
  } else {
    next();
  }
});
if (PROD) {
  app.use(compression());
  app.use('/static', express.static('build'));
}

app.get('*', SSR);

app.listen(process.env.PORT, process.env.HOST, function () {
  console.log('Example app listening on ' + process.env.HOST + ' ' + process.env.PORT);
});
