!function(){"use strict";const e=1625519564673,t=`cache${e}`,s=["/client/client.7b99d77f.js","/client/inject_styles.5607aec6.js","/client/index.377ef166.js","/client/create-account.158dba67.js","/client/referral-link.a3f2bd9c.js","/client/Loading.a8d37750.js","/client/admin.7fdcc051.js","/client/RefreshButton.5196e7c6.js","/client/privacy.bf088abc.js","/client/Infos.d6e82c5f.js","/client/status.0b357d9a.js","/client/legal.05ec2696.js","/client/login.6c8f930b.js","/client/terms.592bca71.js","/client/[id].71518e2d.js","/client/index.ce8176e4.js","/client/AdblockAlert.9df8ac84.js","/client/index.dfef009a.js","/client/[id].5171e7e3.js","/client/shop.f9c10b87.js"].concat(["/service-worker-index.html","/ad-blocker.js","/ads.txt","/assets/GuidesImages/ffa_buttons.png","/assets/GuidesImages/ffa_player_card.png","/assets/GuidesImages/game_modes_section.png","/assets/GuidesImages/quests_section.png","/assets/ModeBanners/2vs2.jpg","/assets/ModeBanners/ffa.jpg","/assets/ShopItems/all-legends-pack.jpg","/assets/ShopItems/collectors-pack.jpg","/assets/ShopItems/spring-championship-2021-pack.jpg","/assets/ShopItems/winter-championship-2021-pack.jpg","/assets/video/brawlhalla-gameplay.mp4","/favicon.png","/google507cb76f2adf7156.html","/logo_235.png","/manifest.json","/pre-beta-mail.html","/robots.txt","/sitemap.xml"]).filter((e=>!(e.includes("CharactersBanners")||e.includes("admin")||e.includes("brawlhalla-gameplay")))),a=new Set(s);self.addEventListener("install",(e=>{e.waitUntil(caches.open(t).then((e=>e.addAll(s))).then((()=>{self.skipWaiting()})))})),self.addEventListener("activate",(e=>{e.waitUntil(caches.keys().then((async e=>{for(const s of e)s!==t&&await caches.delete(s);self.clients.claim()})))})),self.addEventListener("fetch",(n=>{if("GET"!==n.request.method||n.request.headers.has("range"))return;const c=new URL(n.request.url);if(c.protocol.startsWith("http")&&(c.hostname!==self.location.hostname||"10000"!==c.port))if(c.port===self.location.port&&c.host===self.location.host&&a.has(c.pathname)){const e=caches.match(n.request);e instanceof Response?n.respondWith(e):n.waitUntil(caches.open(t).then((e=>e.addAll(s))).then((()=>{self.skipWaiting()})))}else c.pathname.includes("/play/ffa")||"localhost:4000"===c.host&&"/shop"!==c.pathname&&"/account"!==c.pathname&&"/informations"!==c.pathname&&"/status"!==c.pathname||"only-if-cached"!==n.request.cache&&n.respondWith(caches.open(`offline${e}`).then((async e=>{let t,s=!1;if(["assets","sitemap.xml","manifest.json","robots.txt",".css",".js",".png",".jpg"].forEach((e=>{c.href.includes(e)&&(s=!0)})),s&&(t=await e.match(n.request),"4000"===c.port&&console.log("\n\ncache "+c.href+"\n"+t+"\n\n")),!t)try{const t=await fetch(n.request);return"localhost"===c.host&&("/getSolo"!==c.pathname&&"/shop"!==c.pathname||"/account"!==c.pathname||"/informations"!==c.pathname||"/status"!==c.pathname)||t.status>=200&&t.status<=299&&e.put(n.request,t.clone()),t}catch{const e=await caches.match(n.request);if("https://api.winhalla.app/account"===c.href){const t=await e.clone().blob();let s=JSON.parse(await t.text());return s.offline=!0,new Response(new Blob([JSON.stringify(s)],{type:"application/json"}),{status:e.status,statusText:e.statusText,headers:e.headers})}return e}return t})))}))}();
