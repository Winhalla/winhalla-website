!function(){"use strict";const s=1608988367148,a=`cache${s}`,e=["/client/client.89d7ff6d.js","/client/inject_styles.5607aec6.js","/client/index.4cdf4aa9.js","/client/create-account.ce0d2e6d.js","/client/change-email.70833afe.js","/client/contact.acae3712.js","/client/offline.587392c4.js","/client/privacy.cef4c1e2.js","/client/status.439d4c32.js","/client/about.7652a93f.js","/client/terms.31ba5939.js","/client/tests.6595d9ad.js","/client/help.133ce638.js","/client/[id].5ee74706.js","/client/index.6cb5df62.js","/client/RefreshButton.092b931c.js","/client/index.d78bb4bd.js","/client/Loading.76b97308.js","/client/[id].6004ac1e.js","/client/shop.bdc513fa.js","/client/test.6592731b.js"].concat(["/service-worker-index.html","/assets/CharactersBanners/ada.png","/assets/CharactersBanners/artemis.png","/assets/CharactersBanners/asuri.png","/assets/CharactersBanners/azoth.png","/assets/CharactersBanners/barraza.png","/assets/CharactersBanners/bodvar.png","/assets/CharactersBanners/brynn.png","/assets/CharactersBanners/caspian.png","/assets/CharactersBanners/cassidy.png","/assets/CharactersBanners/cross.png","/assets/CharactersBanners/diana.png","/assets/CharactersBanners/dusk.png","/assets/CharactersBanners/ember.png","/assets/CharactersBanners/fait.png","/assets/CharactersBanners/gnash.png","/assets/CharactersBanners/hattori.png","/assets/CharactersBanners/isaiah.png","/assets/CharactersBanners/jaeyun.png","/assets/CharactersBanners/jhala.png","/assets/CharactersBanners/jiro.png","/assets/CharactersBanners/kaya.png","/assets/CharactersBanners/koji.png","/assets/CharactersBanners/kor.png","/assets/CharactersBanners/lin-fei.png","/assets/CharactersBanners/lord-vraxx.png","/assets/CharactersBanners/lucien.png","/assets/CharactersBanners/mako.png","/assets/CharactersBanners/mirage.png","/assets/CharactersBanners/mordex.png","/assets/CharactersBanners/nix.png","/assets/CharactersBanners/onyx.png","/assets/CharactersBanners/orion.png","/assets/CharactersBanners/petra.png","/assets/CharactersBanners/queen-nai.png","/assets/CharactersBanners/ragnir.png","/assets/CharactersBanners/rayman.png","/assets/CharactersBanners/scarlet.png","/assets/CharactersBanners/sentinel.png","/assets/CharactersBanners/sidra.png","/assets/CharactersBanners/sir-roland.png","/assets/CharactersBanners/teros.png","/assets/CharactersBanners/thatch.png","/assets/CharactersBanners/thor.png","/assets/CharactersBanners/ulgrim.png","/assets/CharactersBanners/val.png","/assets/CharactersBanners/vector.png","/assets/CharactersBanners/volkov.png","/assets/CharactersBanners/wu-shang.png","/assets/CharactersBanners/xull.png","/assets/CharactersBanners/yumiko.png","/assets/CharactersBanners/zariel.png","/assets/ModeBanners/2vs2.jpg","/assets/ModeBanners/ffa.jpg","/assets/ShopItems/all-legends-pack.jpg","/assets/ShopItems/autumn-championship-2020-pack.jpg","/assets/ShopItems/battle-pass-season-2.jpg","/assets/ShopItems/collectors-pack.jpg","/assets/ShopItems/summer-championship-2020-pack.jpg","/assets/video/brawlhalla-gameplay.mp4","/favicon.png","/google507cb76f2adf7156.html","/logo-192.png","/logo-512.png","/manifest.json","/robots.txt","/sitemap.xml"]).filter((s=>!(s.includes("CharactersBanners")||s.includes("brawlhalla-gameplay"))));e.push("/offline");const n=new Set(e);self.addEventListener("install",(s=>{s.waitUntil(caches.open(a).then((s=>s.addAll(e))).then((()=>{self.skipWaiting()})))})),self.addEventListener("activate",(s=>{s.waitUntil(caches.keys().then((async s=>{for(const e of s)e!==a&&await caches.delete(e);self.clients.claim()})))})),self.addEventListener("fetch",(a=>{if("GET"!==a.request.method||a.request.headers.has("range"))return;const e=new URL(a.request.url);if(e.protocol.startsWith("http")&&(e.hostname!==self.location.hostname||"10000"!==e.port)){if(e.port===self.location.port&&e.host===self.location.host&&n.has(e.pathname)){const s=caches.match(a.request);if(s)return void a.respondWith(s)}"only-if-cached"!==a.request.cache&&a.respondWith(caches.open(`offline${s}`).then((async s=>{let n,t=!1;if(["assets","sitemap.xml","manifest.json","robots.txt",".css",".js",".png",".jpg","api.winhalla.app/shop","api.winhalla.app/status"].forEach((s=>{e.href.includes(s)&&(t=!0)})),t&&(n=await s.match(a.request)),!n)try{const n=await fetch(a.request);return console.log("network "+a.request.url),"api.winhalla.app"===e.host&&"/getSolo"!==e.pathname&&"/shop"!==e.pathname&&"/account"!==e.pathname&&"/informations"!==e.pathname&&"/status"!==e.pathname?n:(s.put(a.request,n.clone()),n)}catch{if("api.winhalla.app"===e.host&&"/shop"!==e.pathname&&"/account"!==e.pathname&&"/informations"!==e.pathname&&"/status"!==e.pathname)return;if(e.pathname.includes("/play/ffa"))return await caches.match("/offline");const s=await caches.match(a.request);if(!s)return await caches.match("/offline");if(console.log("cache offline "+e.pathname),"https://api.winhalla.app/account"===e.href){const a=await s.clone().blob();let e=JSON.parse(await a.text());return e.offline=!0,new Response(new Blob([JSON.stringify(e)],{type:"application/json"}),{status:s.status,statusText:s.statusText,headers:s.headers})}return s}return console.log("cache assets "+e.pathname),n})))}}))}();
