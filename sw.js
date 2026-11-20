const C='bt-v2';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html'])).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);
 if(r.method!=='GET'||u.hostname.includes('generativelanguage'))return;
 e.respondWith(caches.match(r).then(h=>{const n=fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque'))caches.open(C).then(c=>c.put(r,res.clone()));return res}).catch(()=>h||(r.mode==='navigate'?caches.match('index.html'):undefined));return h||n}))});
