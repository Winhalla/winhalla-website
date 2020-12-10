import sirv from "sirv";
import express from "express";
import compression from "compression";
import * as sapper from "@sapper/server";
import https from "https";
import fs from "fs"

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";
let throttler = [];
const app = express() // You can also use Express
    .use((req, res, next) => {
        if (req.path.includes("assets") || req.path.includes("css")) return next();
        let i = throttler.findIndex(e => e.ip == req.ip);
        let user1 = throttler[i];
        if (user1) {
            if (Date.now() - 300 * 1000 > user1.timestamp) {
                user1.requests = 1;
                user1.timestamp = Date.now();
                console.log("test");
            }
            //else if (user1.requests == 75) return res.sendStatus(429)
            else user1.requests += 1;
            throttler[i] = user1;
            next();
        } else {
            throttler.push({ ip: req.ip, requests: 1, timestamp: Date.now() });
            next();
        }
    })
    .use(
        compression({ threshold: 0 }),
        sirv("static", { dev }),
        sapper.middleware()
    )
    .set("x-powered-by", false);
try {
    https.createServer({
        key: fs.readFileSync("/etc/letsencrypt/live/winhalla.app/privkey.pem"),
        cert: fs.readFileSync("/etc/letsencrypt/live/winhalla.app/fullchain.pem")
    }, app).listen(443, err => {
        if (err) console.log("error", err);
    });
}catch (e) {
    app.listen(3000)
}
