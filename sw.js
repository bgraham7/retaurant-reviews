

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('restaurant-review-v2').then(function(cache) {
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
      console.log("a");
      if(response) {
        return response;
      }
      console.log("b");
      if(event.request.url.includes('img') || event.request.url.includes('restaurant.html')) {
        console.log(event.request.url);
        caches.open('restaurant-review-v2').then(function(cache) {
          return cache.addAll([
            event.request.url
          ]);
        })
      }

      return fetch(event.request);
    })
  )
});