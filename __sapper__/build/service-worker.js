!function(){"use strict";const e=1644086128055,s=`cache${e}`,t=["/client/client.39c7caaf.js","/client/inject_styles.5607aec6.js","/client/index.0e9651d0.js","/client/Infos.d4c91c48.js","/client/index.f2cf2075.js","/client/account-transfer-id.bf4156b4.js","/client/Loading.da9fb984.js","/client/contact.e75ce484.js","/client/admin.29832728.js","/client/privacy.0aa42442.js","/client/status.7de0e7c0.js","/client/legal.1800c458.js","/client/login.2f50d7c3.js","/client/terms.ff1c0044.js","/client/[id].745f3c19.js","/client/ios.042fac6c.js"].concat(["/service-worker-index.html","/ad-blocker.js","/ads.txt","/app-ads.txt","/assets/app-store.png","/assets/google-play.png","/assets/screens/PLAY.png","/assets/screens/QUESTS.png","/assets/screens/screen1.png","/assets/screens/screen2.png","/assets/screens/screen3.png","/assets/screens/screen4.png","/assets/screens/SHOP.png","/assets/screens/test.png","/favicon.png","/logo_235.png","/manifest.json","/robots.txt","/sitemap.xml"]),n=new Set(t);self.addEventListener("install",(e=>{e.waitUntil(caches.open(s).then((e=>e.addAll(t))).then((()=>{self.skipWaiting()})))})),self.addEventListener("activate",(e=>{e.waitUntil(caches.keys().then((async e=>{for(const t of e)t!==s&&await caches.delete(t);self.clients.claim()})))})),self.addEventListener("fetch",(s=>{if("GET"!==s.request.method||s.request.headers.has("range"))return;const t=new URL(s.request.url),c=t.protocol.startsWith("http"),a=t.hostname===self.location.hostname&&t.port!==self.location.port,i=t.host===self.location.host&&n.has(t.pathname),l="only-if-cached"===s.request.cache&&!i;!c||a||l||s.respondWith((async()=>i&&await caches.match(s.request)||async function(s){const t=await caches.open(`offline${e}`);try{const e=await fetch(s);return t.put(s,e.clone()),e}catch(e){const n=await t.match(s);if(n)return n;throw e}}(s.request))())}))}();
