!function(){"use strict";const e=1625236243516,s=`cache${e}`,t=["/client/client.f99e5bd5.js","/client/inject_styles.5607aec6.js","/client/index.e8fb4eb2.js","/client/create-account.474f287d.js","/client/referral-link.2c3c2be3.js","/client/Loading.91251aa9.js","/client/admin.b8bf9634.js","/client/RefreshButton.0617000a.js","/client/privacy.0a38ee7f.js","/client/Infos.57f298da.js","/client/status.40daf41e.js","/client/legal.421adcfd.js","/client/login.ed246fdf.js","/client/terms.0ef369b6.js","/client/[id].d30c091c.js","/client/index.311c5ee6.js","/client/AdblockAlert.e111f579.js","/client/index.20d245f8.js","/client/[id].593ef60f.js","/client/shop.24da083d.js"].concat(["/service-worker-index.html","/ad-blocker.js","/ads.txt","/assets/GuidesImages/ffa_buttons.png","/assets/GuidesImages/ffa_player_card.png","/assets/GuidesImages/game_modes_section.png","/assets/GuidesImages/quests_section.png","/assets/ModeBanners/2vs2.jpg","/assets/ModeBanners/ffa.jpg","/assets/ShopItems/all-legends-pack.jpg","/assets/ShopItems/collectors-pack.jpg","/assets/ShopItems/spring-championship-2021-pack.jpg","/assets/ShopItems/winter-championship-2021-pack.jpg","/assets/video/brawlhalla-gameplay.mp4","/favicon.png","/google507cb76f2adf7156.html","/logo_235.png","/mailAssets/3811.png","/mailAssets/3913.png","/mailAssets/3916.png","/mailAssets/4111.png","/mailAssets/4113.png","/mailAssets/414.png","/mailAssets/417.png","/mailAssets/419.png","/manifest.json","/pre-beta-mail.html","/robots.txt","/sitemap.xml"]).filter((e=>!(e.includes("CharactersBanners")||e.includes("admin")||e.includes("brawlhalla-gameplay")))),a=new Set(t);self.addEventListener("install",(e=>{e.waitUntil(caches.open(s).then((e=>e.addAll(t))).then((()=>{self.skipWaiting()})))})),self.addEventListener("activate",(e=>{e.waitUntil(caches.keys().then((async e=>{for(const t of e)t!==s&&await caches.delete(t);self.clients.claim()})))})),self.addEventListener("fetch",(n=>{if("GET"!==n.request.method||n.request.headers.has("range"))return;const i=new URL(n.request.url);if(i.protocol.startsWith("http")&&(i.hostname!==self.location.hostname||"10000"!==i.port))if(i.port===self.location.port&&i.host===self.location.host&&a.has(i.pathname)){const e=caches.match(n.request);e instanceof Response?n.respondWith(e):n.waitUntil(caches.open(s).then((e=>e.addAll(t))).then((()=>{self.skipWaiting()})))}else i.pathname.includes("/play/ffa")||"localhost:4000"===i.host&&"/shop"!==i.pathname&&"/account"!==i.pathname&&"/informations"!==i.pathname&&"/status"!==i.pathname||"only-if-cached"!==n.request.cache&&n.respondWith(caches.open(`offline${e}`).then((async e=>{let s,t=!1;if(["assets","sitemap.xml","manifest.json","robots.txt",".css",".js",".png",".jpg"].forEach((e=>{i.href.includes(e)&&(t=!0)})),t&&(s=await e.match(n.request),"4000"===i.port&&console.log("\n\ncache "+i.href+"\n"+s+"\n\n")),!s)try{const s=await fetch(n.request);return"localhost"===i.host&&("/getSolo"!==i.pathname&&"/shop"!==i.pathname||"/account"!==i.pathname||"/informations"!==i.pathname||"/status"!==i.pathname)||s.status>=200&&s.status<=299&&e.put(n.request,s.clone()),s}catch{const e=await caches.match(n.request);if("https://api.winhalla.app/account"===i.href){const s=await e.clone().blob();let t=JSON.parse(await s.text());return t.offline=!0,new Response(new Blob([JSON.stringify(t)],{type:"application/json"}),{status:e.status,statusText:e.statusText,headers:e.headers})}return e}return s})))}))}();
