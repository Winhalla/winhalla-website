import { timestamp, files, shell, routes } from "@sapper/service-worker";

const ASSETS = `cache${timestamp}`;

// `shell` is an array of all the files generated by the bundler,
// `files` is an array of everything in the `static` directory

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(async keys => {
            // delete old caches
            for (const key of keys) {
                if (key !== ASSETS) await caches.delete(key);
            }
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


    // This specify to ignore lobby pages (because they are too much dynamical)
    if (url.pathname.includes("/play/ffa")) return

    // This specify to ignore API responses that are dynamic
    if (url.host === "localhost:4000" && (url.pathname !== "/shop" && url.pathname !== "/account" && url.pathname !== "/informations" && url.pathname !== "/status")) return;
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
                    if (url.href.includes(e)) asset = true;
                });
                // If request is an asset then search for it in cache
                if (asset) {
                    response = await cache.match(event.request);
                    if(url.port === "4000") {
                        console.log("\n\ncache " + url.href + "\n" + response +"\n\n")
                    }
                }
                // If request isn't an asset or is not found in cache then try fetching it to the server
                if (!response) {
                    try {
                        const response = await fetch(event.request);
                        //console.log("network " + event.request.url);
                        if (url.host === "localhost" && (url.pathname !== "/getSolo" && url.pathname !== "/shop" || url.pathname !== "/account" || url.pathname !== "/informations" || url.pathname !== "/status")) return response;
                        if(response.status >= 200 && response.status <= 299) cache.put(event.request, response.clone());
                        return response;
                    } catch {
                        // If remote doesn't respond then try cache for every somewhat static request

                        // Serve the request from cache 
                        const cacheTest = await caches.match(event.request);
                        // If the request isn't in the cache then display an simple html page that warns the user it is offline

                        //console.log("cache offline " + url.pathname);
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
                //console.log("cache assets " + url.pathname);
                return response;
            })
    )
        ;
})
    ;
