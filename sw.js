const staticCache = 's-version-1';
const dynamicCache = 'd-version-1';
const urlsToCache = ['index.html', 'offline.html'];

self.addEventListener('install', async (event) => {
  const cache = await caches.open(staticCache);
  await cache.addAll(urlsToCache);
});

self.addEventListener('activate', async (event) => {
  const cacheNames = await caches.keys()
  await Promise.all(
    cacheNames
      .filter(name => name !== staticCache)
      .filter(name => name !== dynamicCache)
      .map(name => caches.delete(name))
  )
});

self.addEventListener('fetch', async (event) => {
  const {request} = event

  const url = new URL(request.url)
  if(url.origin === location.origin) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(networkFirst(request))
  }

  
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  return cached ?? await fetch(request)
}

async function networkFirst(request) {
  const cache = await caches.open(dynamicCache)
  try {
    const response = await fetch(request)
    await cache.put(request, response.clone())
    return response
  } catch (e) {
    const cached = await cache.match(request)
    return cached ?? await caches.match('/offline.html')
  }
  

}
