!function(){"use strict";const e=1624459668478,t=`cache${e}`,s=["/client/client.3a20bf1e.js","/client/inject_styles.5607aec6.js","/client/index.c919ce71.js","/client/referral-link.c81fa436.js","/client/Loading.4bdbc6dc.js","/client/contact.5809ff74.js","/client/admin.788e0887.js","/client/RefreshButton.dfb60e13.js","/client/offline.3e721091.js","/client/privacy.6e283bb9.js","/client/Infos.f06ff4f4.js","/client/status.a5f2303c.js","/client/about.6064a789.js","/client/legal.4afb0c17.js","/client/terms.92f166a3.js","/client/[id].b07dc511.js","/client/help.aff2b7cb.js","/client/[id].eefc7686.js","/client/index.d677d617.js","/client/AdblockAlert.c74e21ab.js","/client/index.6615014e.js","/client/[id].d66659fa.js","/client/shop.bdd19320.js","/client/test.ad177960.js"].concat(["/service-worker-index.html","/ad-blocker.js","/ads.txt","/assets/GuidesImages/ffa_buttons.png","/assets/GuidesImages/ffa_player_card.png","/assets/GuidesImages/game_modes_section.png","/assets/GuidesImages/quests_section.png","/assets/ModeBanners/2vs2.jpg","/assets/ModeBanners/ffa.jpg","/assets/ShopItems/all-legends-pack.jpg","/assets/ShopItems/spring-championship-2021-pack.jpg","/assets/ShopItems/winter-championship-2021-pack.jpg","/assets/video/brawlhalla-gameplay.mp4","/favicon.png","/google507cb76f2adf7156.html","/logo_235.png","/manifest.json","/robots.txt","/sitemap.xml"]).filter((e=>!(e.includes("CharactersBanners")||e.includes("admin")||e.includes("brawlhalla-gameplay")))),a=new Set(s);self.addEventListener("install",(e=>{e.waitUntil(caches.open(t).then((e=>e.addAll(s))).then((()=>{self.skipWaiting()})))})),self.addEventListener("activate",(e=>{e.waitUntil(caches.keys().then((async e=>{for(const s of e)s!==t&&await caches.delete(s);self.clients.claim()})))})),self.addEventListener("fetch",(n=>{if("GET"!==n.request.method||n.request.headers.has("range"))return;const c=new URL(n.request.url);if(c.protocol.startsWith("http")&&(c.hostname!==self.location.hostname||"10000"!==c.port))if(c.port===self.location.port&&c.host===self.location.host&&a.has(c.pathname)){const e=caches.match(n.request);e instanceof Response?n.respondWith(e):n.waitUntil(caches.open(t).then((e=>e.addAll(s))).then((()=>{self.skipWaiting()})))}else c.pathname.includes("/play/ffa")||"api.winhalla.app"===c.host&&"/shop"!==c.pathname&&"/account"!==c.pathname&&"/informations"!==c.pathname&&"/status"!==c.pathname||"only-if-cached"!==n.request.cache&&n.respondWith(caches.open(`offline${e}`).then((async e=>{let t,s=!1;if(["assets","sitemap.xml","manifest.json","robots.txt",".css",".js",".png",".jpg"].forEach((e=>{c.href.includes(e)&&(s=!0)})),s&&(t=await e.match(n.request)),!t)try{const t=await fetch(n.request);return console.log("network "+n.request.url),"api.winhalla.app"===c.host&&"/getSolo"!==c.pathname&&"/shop"!==c.pathname&&"/account"!==c.pathname&&"/informations"!==c.pathname&&"/status"!==c.pathname?t:(t.status>=200&&t.status<=299&&e.put(n.request,t.clone()),t)}catch{const e=await caches.match(n.request);if("https://api.winhalla.app/account"===c.href){const t=await e.clone().blob();let s=JSON.parse(await t.text());return s.offline=!0,new Response(new Blob([JSON.stringify(s)],{type:"application/json"}),{status:e.status,statusText:e.statusText,headers:e.headers})}return e}return t})))}))}();
