/*
* Attention : CacheStorage != LocalStorage
*
* Il faut définir ici au moins un écouteur d'événement sur 'install' et
* un écouteur d'événement sur 'fetch'
*
*/

// Lors de l'installation de la PWA, charger les ressources puis les mettre en cache

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('HotHotHot').then(cache => {
            cache.addAll([
                "index.html",
                "index.js",
                "lib/Observers",
                "lib/Subjects",
                "css/",
                "images/",
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    return event.respondWith(
        caches.open('HotHotHot').then(function (cache) {
            return cache.match(event.request).then(function (response) {
                return response || fetch(event.request).then(function (response) {
                    cache.put(event.request, response.clone()).then(r => {
                        return r;
                    });
                });
            });
        })
    );
});