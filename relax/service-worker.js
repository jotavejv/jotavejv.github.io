let cacheName = 'v1';
let cacheFiles = [
    './relax/',
    './relax/index.html',
    './relax/css/font-awesome.css',
    './relax/css/style.css',
    './relax/fonts/FontAwesome.otf',
    './relax/fonts/fontawesome-webfont.eot',
    './relax/fonts/fontawesome-webfont.svg',
    './relax/fonts/fontawesome-webfont.ttf',
    './relax/fonts/fontawesome-webfont.woff',
    './relax/fonts/fontawesome-webfont.woff2',
    './relax/fonts/roboto-regular-webfont.woff',
    './relax/fonts/roboto-regular-webfont.woff2',
    './relax/fonts/roboto-thin-webfont.woff',
    './relax/fonts/roboto-thin-webfont.woff2',
    './relax/app.js',
    './relax/images/icon-72x72.png',
    './relax/images/icon-96x96.png',
    './relax/images/icon-128x128.png',
    './relax/images/icon-192x192.png',
    './relax/images/icon-384x384.png',
    './relax/images/icon-512x512.png'
]
self.addEventListener('install', function (event){
    // cache files
    event.waitUntil(
        caches.open(cacheName).then(function (cache){
            return cache.addAll(cacheFiles)
        })
    )
});

self.addEventListener('activate', function (event){
    // clean up old sw versions
});

// self.addEventListener('push', function (event){
//     event.waitUntil(
//         self.registration.showNotification('Hello', options)
//     )
// });