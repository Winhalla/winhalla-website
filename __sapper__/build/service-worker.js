!function(){"use strict";const e=1628369886099,t=`cache${e}`,s=["/client/client.4b513ad3.js","/client/inject_styles.5607aec6.js","/client/index.f91214cc.js","/client/create-account.74d13d52.js","/client/referral-link.f0b3ffef.js","/client/Loading.e669ae69.js","/client/leaderboard.492d66f4.js","/client/admin.1b8f6b3b.js","/client/RefreshButton.81fa529a.js","/client/privacy.aa47244b.js","/client/Infos.094789fa.js","/client/status.b93cd449.js","/client/legal.d8d18c96.js","/client/login.5b95414b.js","/client/terms.b0f4be9b.js","/client/[id].e1304bbc.js","/client/index.3ccff5c4.js","/client/AdblockAlert.12ea8e1f.js","/client/index.44340da3.js","/client/[id].948ebe75.js","/client/shop.ff46960c.js"].concat(["/service-worker-index.html","/ads.txt","/assets/GuidesImages/ffa_buttons.png","/assets/GuidesImages/ffa_player_card.png","/assets/GuidesImages/game_modes_section.png","/assets/GuidesImages/quests_section.png","/assets/ModeBanners/2vs2.jpg","/assets/ModeBanners/ffa.jpg","/assets/ShopItems/all-legends-pack.jpg","/assets/ShopItems/collectors-pack.jpg","/assets/ShopItems/spring-championship-2021-pack.jpg","/assets/ShopItems/winter-championship-2021-pack.jpg","/assets/video/brawlhalla-gameplay.mp4","/favicon.png","/google507cb76f2adf7156.html","/logo_235.png","/manifest.json","/pre-beta-mail.html","/robots.txt","/sitemap.xml"]).filter((e=>!(e.includes("CharactersBanners")||e.includes("admin")||e.includes("brawlhalla-gameplay")))),a=new Set(s);self.addEventListener("install",(e=>{e.waitUntil(caches.open(t).then((e=>e.addAll(s))).then((()=>{self.skipWaiting()})))})),self.addEventListener("activate",(e=>{e.waitUntil(caches.keys().then((async e=>{for(const s of e)s!==t&&await caches.delete(s);self.clients.claim()})))})),self.addEventListener("fetch",(n=>{if("GET"!==n.request.method||n.request.headers.has("range"))return;const c=new URL(n.request.url);if(c.protocol.startsWith("http")&&(c.hostname!==self.location.hostname||"10000"!==c.port))if(c.port===self.location.port&&c.host===self.location.host&&a.has(c.pathname)){const e=caches.match(n.request);e instanceof Response?n.respondWith(e):n.waitUntil(caches.open(t).then((e=>e.addAll(s))).then((()=>{self.skipWaiting()})))}else c.pathname.includes("/play/ffa")||"localhost:4000"===c.host&&"/shop"!==c.pathname&&"/account"!==c.pathname&&"/informations"!==c.pathname&&"/status"!==c.pathname||"only-if-cached"!==n.request.cache&&n.respondWith(caches.open(`offline${e}`).then((async e=>{let t,s=!1;if(["assets","sitemap.xml","manifest.json","robots.txt",".css",".js",".png",".jpg"].forEach((e=>{c.href.includes(e)&&(s=!0)})),s&&(t=await e.match(n.request),"4000"===c.port&&console.log("\n\ncache "+c.href+"\n"+t+"\n\n")),!t)try{const t=await fetch(n.request);return"localhost"===c.host&&("/getSolo"!==c.pathname&&"/shop"!==c.pathname||"/account"!==c.pathname||"/informations"!==c.pathname||"/status"!==c.pathname)||t.status>=200&&t.status<=299&&e.put(n.request,t.clone()),t}catch{const e=await caches.match(n.request);if("https://api.winhalla.app/account"===c.href){const t=await e.clone().blob();let s=JSON.parse(await t.text());return s.offline=!0,new Response(new Blob([JSON.stringify(s)],{type:"application/json"}),{status:e.status,statusText:e.statusText,headers:e.headers})}return e}return t})))}))}();
