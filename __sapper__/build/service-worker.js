!function(){"use strict";const e=1641683779900,s=`cache${e}`,t=["/client/client.f36ae7fd.js","/client/inject_styles.5607aec6.js","/client/index.a7dae50f.js","/client/Infos.12b4196d.js","/client/index.f2cf2075.js","/client/account-transfer-id.c625d4e4.js","/client/Loading.bb765063.js","/client/admin.760f518c.js","/client/privacy.478e871f.js","/client/status.46c19cb3.js","/client/legal.c109dad1.js","/client/login.4234b2a2.js","/client/terms.ad9c7794.js","/client/[id].91c467d0.js","/client/ios.6b66056f.js"].concat(["/service-worker-index.html","/ad-blocker.js","/ads.txt","/app-ads.txt","/assets/app-store.png","/assets/google-play.png","/assets/screens/screen1.png","/assets/screens/screen2.png","/assets/screens/screen3.png","/assets/screens/screen4.png","/favicon.png","/logo_235.png","/manifest.json","/sitemap.xml"]),n=new Set(t);self.addEventListener("install",(e=>{e.waitUntil(caches.open(s).then((e=>e.addAll(t))).then((()=>{self.skipWaiting()})))})),self.addEventListener("activate",(e=>{e.waitUntil(caches.keys().then((async e=>{for(const t of e)t!==s&&await caches.delete(t);self.clients.claim()})))})),self.addEventListener("fetch",(s=>{if("GET"!==s.request.method||s.request.headers.has("range"))return;const t=new URL(s.request.url),c=t.protocol.startsWith("http"),a=t.hostname===self.location.hostname&&t.port!==self.location.port,i=t.host===self.location.host&&n.has(t.pathname),l="only-if-cached"===s.request.cache&&!i;!c||a||l||s.respondWith((async()=>i&&await caches.match(s.request)||async function(s){const t=await caches.open(`offline${e}`);try{const e=await fetch(s);return t.put(s,e.clone()),e}catch(e){const n=await t.match(s);if(n)return n;throw e}}(s.request))())}))}();
