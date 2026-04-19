const CACHE_NAME = 'soc-messenger-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/image/logo.png',
  '/image/ava1.png',
  '/image/plus.png',
  '/image/mic.png',
  '/image/send.png',
  '/image/back.png',
  '/image/close.png',
  '/image/down.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});