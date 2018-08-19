var staticCacheName = 'restaurant-review-cache-v1';

self.addEventListener('install', function(event) {
 event.waitUntil(
   caches.open(staticCacheName).then(function(cache) {
     return cache.addAll([
       '/',
       '/css/styles.css',
       '/js/dbhelper.js',
       '/js/main.js',
       '/data/restaurants.json',
       '/img/',
       '/restaurant.html',
     ]);
   })
 );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
      cacheNames.filter(function(cacheName){
        return cacheName.startsWith('restaurant-review-')&&
               cacheName != staticCacheName;
      }).map(function(cacheName) {
        return cache.delete(cacheName);
      })
    );
    })
  )
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response){
        if (response) return response;
        return fetch(event.request);
      })
    )

    });
