var staticCacheName = 'restaurant-review-cache-v1';

self.addEventListener('install', function(event) {
 event.waitUntil(
   caches.open(staticCacheName).then(function(cache) {
     return cache.addAll([
       '/index.html',
       '/css/styles.css',
       '/js/dbhelper.js',
       '/js/main.js',
       '/data/restaurants.json',
       '/img/1.jpg',
       '/img/2.jpg',
       '/img/3.jpg',
       '/img/4.jpg',
       '/img/5.jpg',
       '/img/6.jpg',
       '/img/7.jpg',
       '/img/8.jpg',
       '/img/9.jpg',
       '/img/10.jpg',
       '/restaurant.html',
       '/js/restaurant_info.js'
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
  event.respondWith(caches.match(event.request).then(function(response) {
 
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        let responseClone = response.clone();
        
        caches.open('restaurant-review-cache-v1').then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return caches.match('/index.html');
      });
    }
  }));
});


   
