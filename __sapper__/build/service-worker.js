!function(){"use strict";const e=1624737214591,s=`cache${e}`,t=["/client/client.f1f4527a.js","/client/inject_styles.5607aec6.js","/client/index.3300aaa5.js","/client/Infos.1adf6403.js","/client/privacy.0afabacf.js","/client/legal.7715840b.js","/client/terms.2489c204.js","/client/shop.f2a2938a.js"].concat(["/service-worker-index.html","/ad-blocker.js","/ads.txt","/assets/GuidesImages/ffa_buttons.png","/assets/GuidesImages/ffa_player_card.png","/assets/GuidesImages/game_modes_section.png","/assets/GuidesImages/quests_section.png","/assets/ModeBanners/2vs2.jpg","/assets/ModeBanners/ffa.jpg","/assets/ShopItems/all-legends-pack.jpg","/assets/ShopItems/spring-championship-2021-pack.jpg","/assets/ShopItems/winter-championship-2021-pack.jpg","/assets/video/brawlhalla-gameplay.mp4","/favicon.png","/google507cb76f2adf7156.html","/logo_235.png","/manifest.json","/robots.txt","/sitemap.xml"]).filter((e=>!(e.includes("CharactersBanners")||e.includes("admin")||e.includes("brawlhalla-gameplay")))),a=new Set(t);self.addEventListener("install",(e=>{e.waitUntil(caches.open(s).then((e=>e.addAll(t))).then((()=>{self.skipWaiting()})))})),self.addEventListener("activate",(e=>{e.waitUntil(caches.keys().then((async e=>{for(const t of e)t!==s&&await caches.delete(t);self.clients.claim()})))})),self.addEventListener("fetch",(n=>{if("GET"!==n.request.method||n.request.headers.has("range"))return;const i=new URL(n.request.url);if(i.protocol.startsWith("http")&&(i.hostname!==self.location.hostname||"10000"!==i.port))if(i.port===self.location.port&&i.host===self.location.host&&a.has(i.pathname)){const e=caches.match(n.request);e instanceof Response?n.respondWith(e):n.waitUntil(caches.open(s).then((e=>e.addAll(t))).then((()=>{self.skipWaiting()})))}else i.pathname.includes("/play/ffa")||"api.winhalla.app"===i.host&&"/shop"!==i.pathname&&"/account"!==i.pathname&&"/informations"!==i.pathname&&"/status"!==i.pathname||"only-if-cached"!==n.request.cache&&n.respondWith(caches.open(`offline${e}`).then((async e=>{let s,t=!1;if(["assets","sitemap.xml","manifest.json","robots.txt",".css",".js",".png",".jpg"].forEach((e=>{i.href.includes(e)&&(t=!0)})),t&&(s=await e.match(n.request)),!s)try{const s=await fetch(n.request);return console.log("network "+n.request.url),"api.winhalla.app"===i.host&&"/getSolo"!==i.pathname&&"/shop"!==i.pathname&&"/account"!==i.pathname&&"/informations"!==i.pathname&&"/status"!==i.pathname?s:(s.status>=200&&s.status<=299&&e.put(n.request,s.clone()),s)}catch{const e=await caches.match(n.request);if("https://api.winhalla.app/account"===i.href){const s=await e.clone().blob();let t=JSON.parse(await s.text());return t.offline=!0,new Response(new Blob([JSON.stringify(t)],{type:"application/json"}),{status:e.status,statusText:e.statusText,headers:e.headers})}return e}return s})))}))}();
