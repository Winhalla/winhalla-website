!function(){"use strict";const e=1624380710919,t=`cache${e}`,s=["/client/client.1480e113.js","/client/inject_styles.5607aec6.js","/client/index.f47eba6a.js","/client/referral-link.a73e113e.js","/client/Loading.a0c4ef39.js","/client/contact.32bbd6f1.js","/client/admin.43a89286.js","/client/RefreshButton.9bd28629.js","/client/offline.b66bc4f9.js","/client/privacy.77e13922.js","/client/Infos.e13d9f90.js","/client/status.03d3040c.js","/client/about.8981644d.js","/client/legal.99a9183f.js","/client/terms.ff3377ea.js","/client/[id].971d8794.js","/client/help.86a3a2c9.js","/client/[id].23af8c37.js","/client/index.ca32ea7d.js","/client/AdblockAlert.f87c0cab.js","/client/index.c0a372a2.js","/client/[id].299c8e06.js","/client/shop.4e3e9d38.js","/client/test.6607e751.js"].concat(["/service-worker-index.html","/ad-blocker.js","/assets/GuidesImages/ffa_buttons.png","/assets/GuidesImages/ffa_player_card.png","/assets/GuidesImages/game_modes_section.png","/assets/GuidesImages/quests_section.png","/assets/ModeBanners/2vs2.jpg","/assets/ModeBanners/ffa.jpg","/assets/ShopItems/battle-pass-season-2.jpg","/assets/ShopItems/spring-championship-2021-pack.jpg","/assets/ShopItems/winter-championship-2021-pack.jpg","/assets/video/brawlhalla-gameplay.mp4","/favicon.png","/google507cb76f2adf7156.html","/logo_235.png","/manifest.json","/robots.txt","/sitemap.xml"]).filter((e=>!(e.includes("CharactersBanners")||e.includes("admin")||e.includes("brawlhalla-gameplay")))),a=new Set(s);self.addEventListener("install",(e=>{e.waitUntil(caches.open(t).then((e=>e.addAll(s))).then((()=>{self.skipWaiting()})))})),self.addEventListener("activate",(e=>{e.waitUntil(caches.keys().then((async e=>{for(const s of e)s!==t&&await caches.delete(s);self.clients.claim()})))})),self.addEventListener("fetch",(n=>{if("GET"!==n.request.method||n.request.headers.has("range"))return;const i=new URL(n.request.url);if(i.protocol.startsWith("http")&&(i.hostname!==self.location.hostname||"10000"!==i.port))if(i.port===self.location.port&&i.host===self.location.host&&a.has(i.pathname)){const e=caches.match(n.request);e instanceof Response?n.respondWith(e):n.waitUntil(caches.open(t).then((e=>e.addAll(s))).then((()=>{self.skipWaiting()})))}else i.pathname.includes("/play/ffa")||"api.winhalla.app"===i.host&&"/shop"!==i.pathname&&"/account"!==i.pathname&&"/informations"!==i.pathname&&"/status"!==i.pathname||"only-if-cached"!==n.request.cache&&n.respondWith(caches.open(`offline${e}`).then((async e=>{let t,s=!1;if(["assets","sitemap.xml","manifest.json","robots.txt",".css",".js",".png",".jpg"].forEach((e=>{i.href.includes(e)&&(s=!0)})),s&&(t=await e.match(n.request)),!t)try{const t=await fetch(n.request);return console.log("network "+n.request.url),"api.winhalla.app"===i.host&&"/getSolo"!==i.pathname&&"/shop"!==i.pathname&&"/account"!==i.pathname&&"/informations"!==i.pathname&&"/status"!==i.pathname?t:(t.status>=200&&t.status<=299&&e.put(n.request,t.clone()),t)}catch{const e=await caches.match(n.request);if("https://api.winhalla.app/account"===i.href){const t=await e.clone().blob();let s=JSON.parse(await t.text());return s.offline=!0,new Response(new Blob([JSON.stringify(s)],{type:"application/json"}),{status:e.status,statusText:e.statusText,headers:e.headers})}return e}return t})))}))}();