!function(){"use strict";const t=1630078181262,e=`cache${t}`;self.addEventListener("activate",(t=>{t.waitUntil(caches.keys().then((async t=>{for(const a of t)a!==e&&await caches.delete(a)})))})),self.addEventListener("fetch",(e=>{if("GET"!==e.request.method||e.request.headers.has("range")||"winhalla.app"!==e.request.host)return;const a=new URL(e.request.url);a.protocol.startsWith("http")&&(a.hostname===self.location.hostname&&"10000"===a.port||a.pathname.includes("/play/ffa")||a.pathname.includes("/getMatch")||"localhost:4000"===a.host&&"/shop"!==a.pathname&&"/account"!==a.pathname&&"/informations"!==a.pathname&&"/status"!==a.pathname||"only-if-cached"!==e.request.cache&&e.respondWith(caches.open(`offline${t}`).then((async t=>{let s,n=!1;if(["assets","sitemap.xml","manifest.json","robots.txt",".css",".js",".png",".jpg"].forEach((t=>{a.href.includes(t)&&(n=!0)})),n&&(s=await t.match(e.request),"4000"===a.port&&console.log("\n\ncache "+a.href+"\n"+s+"\n\n")),!s)try{const s=await fetch(e.request);return"localhost"===a.host&&("/getSolo"!==a.pathname&&"/shop"!==a.pathname||"/account"!==a.pathname||"/informations"!==a.pathname||"/status"!==a.pathname)||s.status>=200&&s.status<=299&&t.put(e.request,s.clone()),s}catch{const t=await caches.match(e.request);if("https://api.winhalla.app/account"===a.href){const e=await t.clone().blob();let a=JSON.parse(await e.text());return a.offline=!0,new Response(new Blob([JSON.stringify(a)],{type:"application/json"}),{status:t.status,statusText:t.statusText,headers:t.headers})}return t}return s}))))}))}();
