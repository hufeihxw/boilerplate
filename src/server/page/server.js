import express from 'express';
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import { devtools } from 'universal-webpack';
import http_proxy from 'http-proxy';
import render from './render';

const PROD = process.env.NODE_ENV === 'production';

Object.assign = null;
Object.assign = require('object-assign'); //react server render

export default function(parameters) {
  const app = express();

  // setup middleware
  app.use(bodyParser.json()); //TODO remove as requests here will always be GET
  app.use(cors({origin: true, credentials: true})); //TODO no CORS will happen here
  app.use((req, res, next) => { //TODO remove maybe?
    if (/\/favicon\.?(jpe?g|png|ico|gif)?$/i.test(req.url)) {
      res.status(404).end();
    } else {
      next();
    }
  });
  if (PROD) {
    app.use(compression());
  }
  app.get('*', (req, res)=>render(req, res, parameters.chunks()));

  app.listen(process.env.PAGE_SERVER_PORT, process.env.PAGE_SERVER_HOST, function (error) {
  		if (error) {
  			console.log('Page server shutdown due to an error', error)
  			throw error
  		}
      console.log(`Page server running: ${process.env.PAGE_SERVER_PROTOCOL}://${process.env.PAGE_SERVER_HOST}:${process.env.PAGE_SERVER_PORT}`);
  });
}
