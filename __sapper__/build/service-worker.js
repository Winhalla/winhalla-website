!function(){"use strict";const s=1621182395473,a=`cache${s}`,e=["/client/client.f289fe6f.js","/client/inject_styles.5607aec6.js","/client/index.47d3beb8.js","/client/referral-link.681630f1.js","/client/Loading.c4aa22f3.js","/client/contact.645ee9ca.js","/client/admin.4392112c.js","/client/RefreshButton.1ef17f37.js","/client/offline.3177ee91.js","/client/privacy.b7091a0d.js","/client/Infos.eae42ecb.js","/client/status.7c8356be.js","/client/about.a8ff3de7.js","/client/legal.e6b48495.js","/client/terms.fd886110.js","/client/[id].6b6a08a2.js","/client/help.91db54e0.js","/client/[id].7bb34348.js","/client/index.fbcc277a.js","/client/AdblockAlert.9eef36a3.js","/client/index.1863f03b.js","/client/[id].ee5fa68e.js","/client/shop.1a49939d.js","/client/test.48dc4f8b.js"].concat(["/service-worker-index.html","/ad-blocker.js","/assets/CharactersBanners/ada.png","/assets/CharactersBanners/artemis.png","/assets/CharactersBanners/asuri.png","/assets/CharactersBanners/azoth.png","/assets/CharactersBanners/barraza.png","/assets/CharactersBanners/bodvar.png","/assets/CharactersBanners/brynn.png","/assets/CharactersBanners/caspian.png","/assets/CharactersBanners/cassidy.png","/assets/CharactersBanners/cross.png","/assets/CharactersBanners/diana.png","/assets/CharactersBanners/dusk.png","/assets/CharactersBanners/ember.png","/assets/CharactersBanners/fait.png","/assets/CharactersBanners/gnash.png","/assets/CharactersBanners/hattori.png","/assets/CharactersBanners/isaiah.png","/assets/CharactersBanners/jaeyun.png","/assets/CharactersBanners/jhala.png","/assets/CharactersBanners/jiro.png","/assets/CharactersBanners/kaya.png","/assets/CharactersBanners/koji.png","/assets/CharactersBanners/kor.png","/assets/CharactersBanners/lin-fei.png","/assets/CharactersBanners/lord-vraxx.png","/assets/CharactersBanners/lucien.png","/assets/CharactersBanners/mako.png","/assets/CharactersBanners/mirage.png","/assets/CharactersBanners/mordex.png","/assets/CharactersBanners/nix.png","/assets/CharactersBanners/onyx.png","/assets/CharactersBanners/orion.png","/assets/CharactersBanners/petra.png","/assets/CharactersBanners/queen-nai.png","/assets/CharactersBanners/ragnir.png","/assets/CharactersBanners/rayman.png","/assets/CharactersBanners/scarlet.png","/assets/CharactersBanners/sentinel.png","/assets/CharactersBanners/sidra.png","/assets/CharactersBanners/sir-roland.png","/assets/CharactersBanners/teros.png","/assets/CharactersBanners/thatch.png","/assets/CharactersBanners/thor.png","/assets/CharactersBanners/ulgrim.png","/assets/CharactersBanners/val.png","/assets/CharactersBanners/vector.png","/assets/CharactersBanners/volkov.png","/assets/CharactersBanners/wu-shang.png","/assets/CharactersBanners/xull.png","/assets/CharactersBanners/yumiko.png","/assets/CharactersBanners/zariel.png","/assets/GuidesImages/ffa_buttons.png","/assets/GuidesImages/ffa_player_card.png","/assets/GuidesImages/game_modes_section.png","/assets/GuidesImages/quests_section.png","/assets/ModeBanners/2vs2.jpg","/assets/ModeBanners/ffa.jpg","/assets/ShopItems/all-legends-pack.jpg","/assets/ShopItems/autumn-championship-2020-pack.jpg","/assets/ShopItems/battle-pass-season-2.jpg","/assets/ShopItems/collectors-pack.jpg","/assets/ShopItems/summer-championship-2020-pack.jpg","/assets/video/brawlhalla-gameplay.mp4","/favicon.png","/google507cb76f2adf7156.html","/logo_235.png","/manifest.json","/robots.txt","/sitemap.xml"]).filter((s=>!(s.includes("CharactersBanners")||s.includes("admin")||s.includes("brawlhalla-gameplay")))),n=new Set(e);self.addEventListener("install",(s=>{s.waitUntil(caches.open(a).then((s=>s.addAll(e))).then((()=>{self.skipWaiting()})))})),self.addEventListener("activate",(s=>{s.waitUntil(caches.keys().then((async s=>{for(const e of s)e!==a&&await caches.delete(e);self.clients.claim()})))})),self.addEventListener("fetch",(t=>{if("GET"!==t.request.method||t.request.headers.has("range"))return;const r=new URL(t.request.url);if(r.protocol.startsWith("http")&&(r.hostname!==self.location.hostname||"10000"!==r.port))if(r.port===self.location.port&&r.host===self.location.host&&n.has(r.pathname)){const s=caches.match(t.request);s instanceof Response?t.respondWith(s):t.waitUntil(caches.open(a).then((s=>s.addAll(e))).then((()=>{self.skipWaiting()})))}else r.pathname.includes("/play/ffa")||"api.winhalla.app"===r.host&&"/shop"!==r.pathname&&"/account"!==r.pathname&&"/informations"!==r.pathname&&"/status"!==r.pathname||"only-if-cached"!==t.request.cache&&t.respondWith(caches.open(`offline${s}`).then((async s=>{let a,e=!1;if(["assets","sitemap.xml","manifest.json","robots.txt",".css",".js",".png",".jpg"].forEach((s=>{r.href.includes(s)&&(e=!0)})),e&&(a=await s.match(t.request)),!a)try{const a=await fetch(t.request);return console.log("network "+t.request.url),"api.winhalla.app"===r.host&&"/getSolo"!==r.pathname&&"/shop"!==r.pathname&&"/account"!==r.pathname&&"/informations"!==r.pathname&&"/status"!==r.pathname?a:(a.status>=200&&a.status<=299&&s.put(t.request,a.clone()),a)}catch{const s=await caches.match(t.request);if("https://api.winhalla.app/account"===r.href){const a=await s.clone().blob();let e=JSON.parse(await a.text());return e.offline=!0,new Response(new Blob([JSON.stringify(e)],{type:"application/json"}),{status:s.status,statusText:s.statusText,headers:s.headers})}return s}return a})))}))}();
