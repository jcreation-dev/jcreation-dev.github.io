"use strict";
const OFFLINE_URL = "offline.html";
console.log(`Updated SW`);

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('icon-store').then((cache) => cache.addAll([
            'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css',
            '/mynotespwa/images/icons/icon-72x72.png',
            '/mynotespwa/images/icons/icon-96x96.png',
            '/mynotespwa/images/icons/icon-128x128.png',
            //'/mynotespwa/images/icons/icon-144x144.png',
            '/mynotespwa/',
            '/mynotespwa/index.html',
            '/mynotespwa/index.js',
            '/mynotespwa/style.css',
            new Request(OFFLINE_URL, { cache: "reload" }),
        ])).then(() => {
            // Force the waiting service worker to become the active service worker.
            self.skipWaiting();
        }),
    );
});


self.addEventListener("activate", (event) => {
    event.waitUntil(
        (async () => {
            // Enable navigation preload if it's supported.
            // See https://developers.google.com/web/updates/2017/02/navigation-preload
            if ("navigationPreload" in self.registration) {
                await self.registration.navigationPreload.enable();
            }
        })()
    );

    // Tell the active service worker to take control of the page immediately.
    self.clients.claim();
});



self.addEventListener('fetch', (e) => {

    // Only call event.respondWith() if this is a navigation request
    // for an HTML page.


    // If our if() condition is false, then this fetch handler won't
    // intercept the request. If there are any other fetch handlers
    // registered, they will get a chance to call event.respondWith().
    // If no fetch handlers call event.respondWith(), the request
    // will be handled by the browser as if there were no service
    // worker involvement.
    console.log(e.request.mode);

    e.respondWith(
        (async () => {
            const offlineCB = new Promise(async (resolve) => {
                console.log("User is offline");

                const matchCached = await caches.match(e.request);
                if (matchCached && matchCached.ok && matchCached.status) resolve(matchCached);
                else {
                    if (e.request.mode === "navigate") {
                        const cachedResponse = await cache.match(OFFLINE_URL);
                        resolve(cachedResponse);
                    }

                    resolve();
                    console.log(`The link ${e.request.url} is not cached`);
                    alert(`The link ${e.request.url} is not cached`);
                }
            });

            if (window.navigator.onLine) {
                const preloadResponse = await e.preloadResponse;
                if (preloadResponse) {
                    return preloadResponse;
                }

                try {
                    // Always try the network first.
                    const networkResponse = await fetch(e.request);
                    console.log("user is online");
                    return networkResponse;
                } catch (er) {
                    return await offlineCB();
                }

            } else {
                return await offlineCB();
            }


            // try {
            //     // First, try to use the navigation preload response if it's
            //     // supported.
            //     const preloadResponse = await e.preloadResponse;
            //     if (preloadResponse) {
            //         return preloadResponse;
            //     }
            //     // Always try the network first.
            //     const networkResponse = await fetch(e.request);
            //     console.log("user is online");
            //     return networkResponse;
            // } catch (error) {
            //     // catch is only triggered if an exception is thrown, which is
            //     // likely due to a network error.
            //     // If fetch() returns a valid HTTP response with a response code in
            //     // the 4xx or 5xx range, the catch() will NOT be called.
            //     console.log("Fetch failed; returning offline page instead.", error);

            //     const matchCached = await caches.match(e.request);
            //     if (matchCached && matchCached.ok && matchCached.status) return matchCached;
            //     else {
            //         if (e.request.mode === "navigate") {
            //             const cachedResponse = await cache.match(OFFLINE_URL);
            //             return cachedResponse;
            //         }
            //         console.log(`The link ${e.request.url} is not cached`);
            //         alert(`The link ${e.request.url} is not cached`);
            //     }

            // }


        })()
    );

});

