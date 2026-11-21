// عامل الخدمة: يخلي التطبيق ينفتح بسرعة وبدون إنترنت، والتحديثات توصل تلقائياً
const CACHE = 'adala-v3';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (/googleapis\.com$|firebaseio\.com$/.test(url.hostname) && !url.hostname.startsWith('fonts.')) return; // بيانات Firebase ما تنخزن
  if (req.mode === 'navigate' || url.origin === location.origin) {
    // الشبكة أولاً حتى توصل التحديثات، والنسخة المخزنة عند انقطاع النت
    e.respondWith(fetch(req).then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put(req, cp)); return r; }).catch(() => caches.match(req).then(r => r || caches.match('./index.html'))));
    return;
  }
  if (/gstatic\.com|cdnjs\.cloudflare\.com|fonts\.googleapis\.com/.test(url.hostname)) {
    e.respondWith(caches.match(req).then(hit => { const net = fetch(req).then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put(req, cp)); return r; }).catch(() => hit); return hit || net; }));
  }
});

// الإشعارات: تطلع حتى لو التطبيق مسدود
self.addEventListener('push', e => {
  let d = {};
  try { const j = e.data ? e.data.json() : {}; d = Object.assign({}, j.notification || {}, j.data || {}); } catch (_) { d = { body: e.data ? e.data.text() : '' }; }
  const title = d.title || 'ثانوية العدالة للبنين';
  e.waitUntil(self.registration.showNotification(title, { body: d.body || '', icon: 'icon-192.png', dir: 'rtl', lang: 'ar', tag: d.tag || undefined, renotify: !!d.tag, data: { url: d.url || './' } }));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = new URL((e.notification.data && e.notification.data.url) || './', self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(ws => {
    for (const w of ws) if (w.url.startsWith(self.registration.scope) && 'focus' in w) { w.navigate(url).catch(() => {}); return w.focus(); }
    return self.clients.openWindow(url);
  }));
});
