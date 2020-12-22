import { timestamp, files, shell, routes } from "@sapper/service-worker";

const ASSETS = `cache${timestamp}`;

// `shell` is an array of all the files generated by the bundler,
// `files` is an array of everything in the `static` directory
const to_cache_all = shell.concat(files);
const to_cache = to_cache_all.filter(url => !(url.includes("CharactersBanners") || url.includes("brawlhalla-gameplay")));
to_cache.push("/offline");
const cached = new Set(to_cache);
self.addEventListener("install", event => {
    event.waitUntil(
        caches
            .open(ASSETS)
            .then(cache => cache.addAll(to_cache))
            .then(() => {
                self.skipWaiting();
            })
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(async keys => {
            // delete old caches
            for (const key of keys) {
                if (key !== ASSETS) await caches.delete(key);
            }

            self.clients.claim();
        })
    );
});

self.addEventListener("fetch", event => {
    if (event.request.method !== "GET" || event.request.headers.has("range")) return;

    const url = new URL(event.request.url);

    // don't try to handle e.g. data: URIs
    if (!url.protocol.startsWith("http")) return;

    // ignore dev server requests
    if (url.hostname === self.location.hostname && url.port === "10000") return;

    // always serve static files and bundler-generated assets from cache

    if (url.port === self.location.port && url.host === self.location.host && cached.has(url.pathname)) {
        const asset = caches.match(event.request);
        if (asset) {
            event.respondWith(asset);
            //console.log("cache classic " + url.pathname);
            return;
        }
    }

    // for pages, you might want to serve a shell `service-worker-index.html` file,
    // which Sapper has generated for you. It's not right for every
    // app, but if it's right for yours then uncomment this section
    /*
    if (url.origin === self.origin && routes.find(route => route.pattern.test(url.pathname))) {
        event.respondWith(caches.match('/service-worker-index.html'));
        return;
    }
    */

    if (event.request.cache === "only-if-cached") return;
    // for everything else, try the network first, falling back to
    // cache if the user is offline. (If the pages never change, you
    // might prefer a cache-first approach to a network-first one.)
    //* Applied change to test cache first for assets
    event.respondWith(
        caches
            .open(`offline${timestamp}`)
            .then(async cache => {
                let response;
                let asset = false;
                // Test if this is an asset
                ["assets", "sitemap.xml", "manifest.json", "robots.txt", ".css", ".js", ".png", ".jpg"].forEach(e => {
                    if (url.pathname.includes(e)) asset = true;
                });
                // If request is an asset then search for it in cache
                if (asset) {
                    response = await cache.match(event.request);
                }
                // If request isn't an asset or is not found in cache then try fetching it to the server
                if (!response) {
                    try {
                        const response = await fetch(event.request);
                        console.log("network " + event.request.url);
                        if (url.host === "api.winhalla.app" && (url.pathname !== "/shop" || url.pathname !== "/informations" || url.pathname !== "/status")) return response;
                        cache.put(event.request, response.clone());
                        return response;
                    } catch {
                        // If remote doesn't respond then try cache for every somewhat static request
                        // This specify to not search in cache for API responses that are dynamic
                        if (url.host === "api.winhalla.app" && (url.pathname !== "/shop" || url.pathname !== "/informations" || url.pathname !== "/status")) return;

                        // This specify to not search in cache for lobby pages (because they are too much dynamical)
                        if (url.pathname.includes("/play/ffa")) return await caches.match("/offline");

                        // Serve the request from cache 
                        const cacheTest = await caches.match(event.request);
                        // If the request isn't in the cache then display an simple html page that warns the user it is offline

                        if (!cacheTest) return await caches.match("/offline");
                        console.log("cache offline " + url.pathname);
                        //This permits the nav component to display an offline warning by catching and editing response data from cache
                        if (url.href === "http://localhost:4000/account") {
                            const responseBlob = await cacheTest.clone().blob()
                            let payload = JSON.parse(await responseBlob.text())
                            payload.offline = true
                            return new Response(new Blob([JSON.stringify(payload)], { type: 'application/json' }), { status: cacheTest.status, statusText: cacheTest.statusText, headers: cacheTest.headers })
                        }
                        return cacheTest;
                    }
                }
                console.log("cache assets " + url.pathname);
                return response;
            })
    )
        ;
})
    ;
