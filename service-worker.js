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
            "test.html",
            "script.js",
            "service-worker.js",
            "css/style.css",
            "image/Cars.jpg",
            "image/wouaf.png",
            "node_modules/",
            "svgs/gauge.png",
            "manifest.webmanifest",
            "package.json",
            "package-lock.json"
            // ... ajouter les autres ressources à mettre en cache
        ])), // à adapter à l'URL du projet
    );
});

// Stratégie "Cache, falling back to network"
// => d'abord vérifier si la ressource n'est pas dans le cache pour la récupérer (offline)
// sinon, récupérer depuis le serveur en ligne (online)

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request)),
    );
});

// d'abord vérifie si la ressource est disponible sur le server en ligne (online)
// sinon, le prend depuis le cache
self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request).catch(function() {
            return caches.match(event.request);
        })
    );
});