
const cacheName = btoa(self.location.toString())

self.addEventListener('fetch', event => {
    const {request: {url}} = event
    event.respondWith(
        caches.open(cacheName)
            .then(cache => cache.match(url, {ignoreSearch: true}))
            .then(response => response || fetch(event.request))
    )
})
self.addEventListener('install', event =>
    event.waitUntil(
        caches.open(cacheName).then(cache =>
            self.fetch('asset-manifest.json')
                .then(http => http.json())
                .then(response => cache.addAll(Object.values(response)))
		.then(() => cache.add('service-worker.js'))
                .then(() => cache.add('index.html'))
	    	.then(() => cache.add('/infogare/')))
            .then(() => self.skipWaiting())))

self.addEventListener('activate', event => event.waitUntil(self.clients.claim()))
