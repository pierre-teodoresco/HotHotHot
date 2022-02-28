/*
* Attention : CacheStorage != LocalStorage
*
* Il faut définir ici au moins un écouteur d'événement sur 'install' et
* un écouteur d'événement sur 'fetch'
*
*/

// Lors de l'installation de la PWA, charger les ressources puis les mettre en cache

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('HotHotHot').then((cache) => cache.addAll([
            "index.html",
            "scripts/",
            "service-worker.js",
            "css/",
            "images/",
            "node_modules/",
            "manifest.webmanifest",
            "package.json",
            "package-lock.json"
        ])) // à adapter à l'URL du projet
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.open('HotHotHot').then(function(cache) {
            return cache.match(event.request).then(function (response) {
                return response || fetch(event.request).then(function(response) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});