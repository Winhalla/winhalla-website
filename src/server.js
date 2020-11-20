import sirv from 'sirv';
import compression from 'compression';
import express from 'express'
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

express() // You can also use Express
	.use((req, res, next) => {
		if (req.hostname.includes("www") || req.hostname.includes(".ew.") || req.hostname.includes(".r.")) return res.redirect(301, "https://winhalla.appspot.com"+req.path)
		next();
	})
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.set("x-powered-by",false)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
