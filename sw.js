

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('restaurant-review-v3').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/restaurant.html',
        '/css/styles.css',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js',
        '/data/restaurants.json'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response){
      if(response) {
        return response;
      }
      if(event.request.url.includes('img') || event.request.url.includes('restaurant.html')) {
        console.log(event.request.url);
        caches.open('restaurant-review-v3').then(function(cache) {
          return cache.addAll([
            event.request.url
          ]);
        })
      }

      return fetch(event.request);
    })
  )
});