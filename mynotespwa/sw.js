self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('icon-store').then((cache) => cache.addAll([
            'images/icons/icon-72x72.png',
            'images/icons/icon-96x96.png',
            'images/icons/icon-128x128.png',
            'images/icons/icon-144x144.png',
        ])),
    );
});

self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request)),
    );
});