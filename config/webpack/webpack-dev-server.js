import express from 'express'
import webpack from 'webpack'
import client_configuration from './client.dev.babel'
import server_configuration from './pageserver.dev.babel'
import http_proxy from 'http-proxy'
import nodemon from 'nodemon';
import parallel from 'async/parallel';

function devServer() {
	const development_server_options = {
		//quiet       : true, // don’t output anything to the console
		noInfo      : true, // suppress boring information
		//hot         : true, // adds the HotModuleReplacementPlugin and switch the server to hot mode. Note: make sure you don’t add HotModuleReplacementPlugin twice
		//inline      : true, // also adds the webpack/hot/dev-server entry
		// network path for static files: fetch all statics from webpack development server
		publicPath  : client_configuration.output.publicPath,
		headers     : { "Access-Control-Allow-Origin": "*" },
		stats       : { colors: true }
	}
	const client_compiler = webpack(client_configuration)
	const development_server = new express()

	development_server.use(require('webpack-dev-middleware')(client_compiler, development_server_options))
	development_server.use(require('webpack-hot-middleware')(client_compiler))

	// serve assets directly
	development_server.use('/assets', express.static('build/assets'));

	// proxying other requests to PAGE server
	const rendering_proxy = http_proxy.createProxyServer({
		target: `${process.env.PAGE_SERVER_PROTOCOL}://${process.env.PAGE_SERVER_HOST}:${process.env.PAGE_SERVER_PORT}`
	});
	development_server.use((request, response) => {
	    // Do the proxy
	    rendering_proxy.web(request, response, (error) => {
	        response.writeHead(502)
	        response.end("There was an error proxying your request")
	    })
	})
	development_server.listen(process.env.WEBPACK_DEV_SERVER_PORT, process.env.WEBPACK_DEV_SERVER_HOST, (error) => {
		if (error) {
			console.error(error.stack || error)
			process.exit()
		}
		console.log(`[webpack-dev-server] Running: ${process.env.WEBPACK_DEV_SERVER_PROTOCOL}://${process.env.WEBPACK_DEV_SERVER_HOST}:${process.env.WEBPACK_DEV_SERVER_PORT}`)
	})
}

function pageServer() {
	const compiler = webpack(server_configuration)
	const run = function*() { //setup nodemon on first run, restart on n
	  yield ()=>{
	    nodemon({
	      script: './src/server/page/entry.js',
	      ext: 'abcdefg' // Donot monitor any files. webpack will do that
	    });
	    nodemon.on('start', function () {
	      console.log('Page server has started');
	    }).on('quit', function () {
	      console.log('Page server has quit. Shutting down process');
	      process.exit(0)
	    }).on('restart', function (files) {
	    });
	  };
	  while(true) {
	    yield ()=>nodemon.restart();
	  }
	}
	const nextFunc = run();

	compiler.watch({
	}, (err, stats) => {
	    if (err) {
	      console.error('Page server building failed.');
	      console.error(err)
	    } else {
	      console.log('Page server building finished. Starting app.')
	      nextFunc.next().value();
	    }
	});
}

parallel([devServer, pageServer])
