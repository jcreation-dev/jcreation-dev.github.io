self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('icon-store').then((cache) => cache.addAll([
            'https://popper.js.org',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css',
            '/mynotespwa/',
            '/mynotespwa/index.html',
            '/mynotespwa/index.js',
            '/mynotespwa/style.css',
        ])),
    );
});

self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request)),
    );
});