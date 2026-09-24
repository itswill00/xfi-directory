// XFI offline shell — cache-first for shell, stale-while-revalidate for images, no design change
const CACHE = 'xfi-v7';
const SHELL = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/script.js',
  '/manifest.json',
  '/assets/images/xfi-group.jpg',
  '/assets/images/xfi-group.webp'
];
async function trimImages(cache, max=60){
  try{
    const keys=await cache.keys();
    const imgs=keys.filter(k=>new URL(k.url).pathname.startsWith('/assets/images/'));
    if(imgs.length>max){
      const extra=imgs.length-max;
      await Promise.all(imgs.slice(0,extra).map(k=>cache.delete(k)));
    }
  }catch(e){}
}
self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', e=>{
  const url=new URL(e.request.url);
  // only handle same-origin
  if(url.origin!==location.origin) return;
  // images: stale-while-revalidate, LRU max 60
  if(url.pathname.startsWith('/assets/images/')){
    e.respondWith(caches.open(CACHE).then(async c=>{
      const cached=await c.match(e.request);
      const fetchP=fetch(e.request).then(r=>{
        if(r.ok){ c.put(e.request, r.clone()); trimImages(c,60); }
        return r;
      }).catch(()=>cached);
      return cached || fetchP;
    }));
    return;
  }
  // shell: network-first for html (fresh langToggle), cache fallback to index for navigations with query
  e.respondWith(fetch(e.request).then(r=>{
    if(r.ok){
      const clone=r.clone();
      caches.open(CACHE).then(c=>c.put(e.request, clone));
    }
    return r;
  }).catch(async ()=>{
    const c=await caches.open(CACHE);
    const hit=await c.match(e.request);
    if(hit) return hit;
    if(e.request.mode==='navigate') return c.match('/index.html');
    return Response.error();
  }));
});
