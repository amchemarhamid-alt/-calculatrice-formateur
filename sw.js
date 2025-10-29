// Service Worker pour mode hors ligne
const CACHE_NAME = "calculatrice-formateur-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
];

// Installation du Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache ouvert");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activation et nettoyage des anciens caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Suppression ancien cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interception des requêtes
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - retourner la réponse du cache
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
