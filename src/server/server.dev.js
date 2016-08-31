import express from 'express';
import webpack from 'webpack';
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';


const app = express();

app.listen(process.env.PORT, process.env.HOST, function () {
  console.log('Example app listening on ' + process.env.HOST + ' ' + process.env.PORT);
});
