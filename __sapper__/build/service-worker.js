!function(){"use strict";const e=1645459981754,s=`cache${e}`,t=["/client/client.7728d850.js","/client/inject_styles.5607aec6.js","/client/index.eb6e3d9f.js","/client/Infos.73164cfc.js","/client/index.f2cf2075.js","/client/account-transfer-id.c60dcb51.js","/client/Loading.aaa61193.js","/client/contact.67294083.js","/client/admin.4088a79a.js","/client/privacy.b642366b.js","/client/status.48531f21.js","/client/legal.1411a871.js","/client/login.ed72b2b8.js","/client/terms.bba76851.js","/client/[id].281a93f7.js","/client/ios.1a16ac4e.js"].concat(["/service-worker-index.html","/ad-blocker.js","/ads.txt","/app-ads.txt","/assets/app-store.png","/assets/google-play.png","/assets/screens/PLAY.png","/assets/screens/QUESTS.png","/assets/screens/screen1.png","/assets/screens/screen2.png","/assets/screens/screen3.png","/assets/screens/screen4.png","/assets/screens/SHOP.png","/assets/screens/test.png","/favicon.png","/logo_235.png","/manifest.json","/robots.txt","/sitemap.xml"]),n=new Set(t);self.addEventListener("install",(e=>{e.waitUntil(caches.open(s).then((e=>e.addAll(t))).then((()=>{self.skipWaiting()})))})),self.addEventListener("activate",(e=>{e.waitUntil(caches.keys().then((async e=>{for(const t of e)t!==s&&await caches.delete(t);self.clients.claim()})))})),self.addEventListener("fetch",(s=>{if("GET"!==s.request.method||s.request.headers.has("range"))return;const t=new URL(s.request.url),c=t.protocol.startsWith("http"),a=t.hostname===self.location.hostname&&t.port!==self.location.port,i=t.host===self.location.host&&n.has(t.pathname),l="only-if-cached"===s.request.cache&&!i;!c||a||l||s.respondWith((async()=>i&&await caches.match(s.request)||async function(s){const t=await caches.open(`offline${e}`);try{const e=await fetch(s);return t.put(s,e.clone()),e}catch(e){const n=await t.match(s);if(n)return n;throw e}}(s.request))())}))}();
