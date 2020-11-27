import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
let throttler = []
express() // You can also use Express
	.use((req, res, next) => {
		let i = throttler.findIndex(e => e.ip == req.ip)
		let user1 = throttler[i]
		if (user1) {
			if (Date.now() - 300 * 1000 > user1.timestamp) {
				user1.requests = 1
				user1.timestamp = Date.now()
				console.log("test")
			}
			//else if (user1.requests == 75) return res.sendStatus(429)
			else user1.requests += 1
			throttler[i] = user1
			next()
		} else {
			throttler.push({ ip: req.ip, requests: 1, timestamp: Date.now() })
			next()
		}
	})
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
