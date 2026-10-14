const V='cashier-v3';
const ZX='https://cdn.jsdelivr.net/npm/@zxing/library@0.21.3/umd/index.min.js';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil((async()=>{const c=await caches.open(V);await c.addAll(FILES);try{await c.add(ZX)}catch(x){}self.skipWaiting()})())});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==V)await caches.delete(k);await self.clients.claim()})())});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
 const u=new URL(r.url);if(u.origin!==location.origin&&r.url!==ZX)return;
 e.respondWith((async()=>{const c=await caches.open(V);
  if(r.mode==='navigate'){try{const n=await fetch(r);c.put('./index.html',n.clone());return n}catch(x){return (await c.match('./index.html'))||Response.error()}}
  const m=await c.match(r);const f=fetch(r).then(n=>{if(n&&n.ok)c.put(r,n.clone());return n}).catch(()=>m);
  return m||f})())});
