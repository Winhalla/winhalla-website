!function(){"use strict";const s=1625156878760,e=`cache${s}`,t=["/client/client.63fa3d88.js","/client/inject_styles.5607aec6.js","/client/index.35f6ec88.js","/client/Infos.35bbc8f5.js","/client/privacy.d4a78ca0.js","/client/legal.b793019f.js","/client/terms.7e2b61c4.js","/client/shop.2d2e59a1.js"].concat(["/service-worker-index.html","/ad-blocker.js","/ads.txt","/assets/GuidesImages/ffa_buttons.png","/assets/GuidesImages/ffa_player_card.png","/assets/GuidesImages/game_modes_section.png","/assets/GuidesImages/quests_section.png","/assets/ModeBanners/2vs2.jpg","/assets/ModeBanners/ffa.jpg","/assets/ShopItems/all-legends-pack.jpg","/assets/ShopItems/collectors-pack.jpg","/assets/ShopItems/spring-championship-2021-pack.jpg","/assets/ShopItems/winter-championship-2021-pack.jpg","/assets/video/brawlhalla-gameplay.mp4","/favicon.png","/google507cb76f2adf7156.html","/logo_235.png","/mailAssets/3811.png","/mailAssets/3913.png","/mailAssets/3916.png","/mailAssets/4111.png","/mailAssets/4113.png","/mailAssets/414.png","/mailAssets/417.png","/mailAssets/419.png","/manifest.json","/pre-beta-mail.html","/robots.txt","/sitemap.xml"]).filter((s=>!(s.includes("CharactersBanners")||s.includes("admin")||s.includes("brawlhalla-gameplay")))),a=new Set(t);self.addEventListener("install",(s=>{s.waitUntil(caches.open(e).then((s=>s.addAll(t))).then((()=>{self.skipWaiting()})))})),self.addEventListener("activate",(s=>{s.waitUntil(caches.keys().then((async s=>{for(const t of s)t!==e&&await caches.delete(t);self.clients.claim()})))})),self.addEventListener("fetch",(n=>{if("GET"!==n.request.method||n.request.headers.has("range"))return;const i=new URL(n.request.url);if(i.protocol.startsWith("http")&&(i.hostname!==self.location.hostname||"10000"!==i.port))if(i.port===self.location.port&&i.host===self.location.host&&a.has(i.pathname)){const s=caches.match(n.request);s instanceof Response?n.respondWith(s):n.waitUntil(caches.open(e).then((s=>s.addAll(t))).then((()=>{self.skipWaiting()})))}else i.pathname.includes("/play/ffa")||"api.winhalla.app"===i.host&&"/shop"!==i.pathname&&"/account"!==i.pathname&&"/informations"!==i.pathname&&"/status"!==i.pathname||"only-if-cached"!==n.request.cache&&n.respondWith(caches.open(`offline${s}`).then((async s=>{let e,t=!1;if(["assets","sitemap.xml","manifest.json","robots.txt",".css",".js",".png",".jpg"].forEach((s=>{i.href.includes(s)&&(t=!0)})),t&&(e=await s.match(n.request)),!e)try{const e=await fetch(n.request);return console.log("network "+n.request.url),"api.winhalla.app"===i.host&&"/getSolo"!==i.pathname&&"/shop"!==i.pathname&&"/account"!==i.pathname&&"/informations"!==i.pathname&&"/status"!==i.pathname?e:(e.status>=200&&e.status<=299&&s.put(n.request,e.clone()),e)}catch{const s=await caches.match(n.request);if("https://api.winhalla.app/account"===i.href){const e=await s.clone().blob();let t=JSON.parse(await e.text());return t.offline=!0,new Response(new Blob([JSON.stringify(t)],{type:"application/json"}),{status:s.status,statusText:s.statusText,headers:s.headers})}return s}return e})))}))}();
