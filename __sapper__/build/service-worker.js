!function(){"use strict";const s=1608309507136,a=`cache${s}`,e=["/client/client.d7952734.js","/client/inject_styles.5607aec6.js","/client/index.2ae5dba4.js","/client/create-account.bbf16996.js","/client/change-email.f6db844d.js","/client/contact.c76e4d32.js","/client/privacy.80307b56.js","/client/status.6512151a.js","/client/about.20e7fb69.js","/client/terms.6c6ec00b.js","/client/tests.79231b19.js","/client/help.1a34644a.js","/client/[id].ebea8e73.js","/client/index.976d57c5.js","/client/RefreshButton.ea9978a4.js","/client/index.c8d6b44d.js","/client/Loading.b7dccb74.js","/client/[id].8ce57d3f.js","/client/index.e174eccd.js","/client/shop.4b70223d.js","/client/test.df3e2185.js"].concat(["/service-worker-index.html","/assets/CharactersBanners/ada.png","/assets/CharactersBanners/artemis.png","/assets/CharactersBanners/asuri.png","/assets/CharactersBanners/azoth.png","/assets/CharactersBanners/barraza.png","/assets/CharactersBanners/bodvar.png","/assets/CharactersBanners/brynn.png","/assets/CharactersBanners/caspian.png","/assets/CharactersBanners/cassidy.png","/assets/CharactersBanners/cross.png","/assets/CharactersBanners/diana.png","/assets/CharactersBanners/dusk.png","/assets/CharactersBanners/ember.png","/assets/CharactersBanners/fait.png","/assets/CharactersBanners/gnash.png","/assets/CharactersBanners/hattori.png","/assets/CharactersBanners/isaiah.png","/assets/CharactersBanners/jaeyun.png","/assets/CharactersBanners/jhala.png","/assets/CharactersBanners/jiro.png","/assets/CharactersBanners/kaya.png","/assets/CharactersBanners/koji.png","/assets/CharactersBanners/kor.png","/assets/CharactersBanners/lin-fei.png","/assets/CharactersBanners/lord-vraxx.png","/assets/CharactersBanners/lucien.png","/assets/CharactersBanners/mako.png","/assets/CharactersBanners/mirage.png","/assets/CharactersBanners/mordex.png","/assets/CharactersBanners/nix.png","/assets/CharactersBanners/onyx.png","/assets/CharactersBanners/orion.png","/assets/CharactersBanners/petra.png","/assets/CharactersBanners/queen-nai.png","/assets/CharactersBanners/ragnir.png","/assets/CharactersBanners/rayman.png","/assets/CharactersBanners/scarlet.png","/assets/CharactersBanners/sentinel.png","/assets/CharactersBanners/sidra.png","/assets/CharactersBanners/sir-roland.png","/assets/CharactersBanners/teros.png","/assets/CharactersBanners/thatch.png","/assets/CharactersBanners/thor.png","/assets/CharactersBanners/ulgrim.png","/assets/CharactersBanners/val.png","/assets/CharactersBanners/vector.png","/assets/CharactersBanners/volkov.png","/assets/CharactersBanners/wu-shang.png","/assets/CharactersBanners/xull.png","/assets/CharactersBanners/yumiko.png","/assets/CharactersBanners/zariel.png","/assets/ModeBanners/2vs2.jpg","/assets/ModeBanners/ffa.jpg","/assets/ShopItems/all-legends-pack.jpg","/assets/ShopItems/autumn-championship-2020-pack.jpg","/assets/ShopItems/battle-pass-season-2.jpg","/assets/ShopItems/collectors-pack.jpg","/assets/ShopItems/summer-championship-2020-pack.jpg","/assets/video/brawlhalla-gameplay.mp4","/favicon.png","/google507cb76f2adf7156.html","/logo-192.png","/logo-512.png","/manifest.json","/robots.txt","/sitemap.xml"]).filter((s=>!(s.includes("CharactersBanners")||s.includes("brawlhalla-gameplay"))));self.addEventListener("install",(s=>{s.waitUntil(caches.open(a).then((s=>s.addAll(e))).then((()=>{self.skipWaiting()})))})),self.addEventListener("activate",(s=>{s.waitUntil(caches.keys().then((async s=>{for(const e of s)e!==a&&await caches.delete(e);self.clients.claim()})))})),self.addEventListener("fetch",(a=>{if("GET"!==a.request.method||a.request.headers.has("range"))return;const e=new URL(a.request.url);e.protocol.startsWith("http")&&(e.hostname===self.location.hostname&&e.port!==self.location.port||(e.host!==self.location.host?"only-if-cached"!==a.request.cache&&a.respondWith(caches.open(`offline${s}`).then((async s=>{try{const e=await fetch(a.request);return s.put(a.request,e.clone()),e}catch(e){const n=await s.match(a.request);if(n)return n;throw e}}))):a.respondWith(caches.match(a.request))))}))}();
