// English Learning Hub service worker: keeps the app working offline.
const VERSION = "elh-v4-layouts2";
const SHELL = ["./", "./css/styles.css", "./fonts/jakarta-latin.woff2", "./icon.svg", "./icons/apple-touch-icon.png", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/maskable-512.png", "./js/app.js", "./js/groups.js", "./js/layoutpicker.js", "./js/pages/home-layouts.js", "./js/badges.js", "./js/boot.js", "./js/data/basics.js", "./js/data/grammar.js", "./js/data/idioms.js", "./js/data/listening.js", "./js/data/mistakes.js", "./js/data/placement.js", "./js/data/reading.js", "./js/data/reallife.js", "./js/data/speaking.js", "./js/data/spelling.js", "./js/data/vocab.js", "./js/data/writing.js", "./js/helper.js", "./js/icons.js", "./js/lt.js", "./js/pages/basics.js", "./js/pages/grammar.js", "./js/pages/home.js", "./js/pages/idioms.js", "./js/pages/learn.js", "./js/pages/listening.js", "./js/pages/mistakes.js", "./js/pages/placement.js", "./js/pages/profile.js", "./js/pages/progress.js", "./js/pages/reading.js", "./js/pages/settings.js", "./js/pages/reallife.js", "./js/pages/speaking.js", "./js/pages/spelling.js", "./js/pages/vocab.js", "./js/pages/welcome.js", "./js/pages/writing.js", "./js/store.js", "./js/theme.js", "./js/ui.js", "./manifest.json"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith("elh-") && k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // online tools (checker, dictionary) go straight to the network
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then((r) => { const copy = r.clone(); caches.open(VERSION).then((c) => c.put("./", copy)); return r; }).catch(() => caches.match("./")));
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req).then((r) => {
    if (r.ok) { const copy = r.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); }
    return r;
  })));
});
