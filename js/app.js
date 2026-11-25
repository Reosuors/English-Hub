import * as store from "./store.js";
import { icon } from "./icons.js";
import { $, $$, toast, esc } from "./ui.js";
import { checkBadges } from "./badges.js";
import { applyTheme, toggleTheme } from "./theme.js";
import * as home from "./pages/home.js";
import * as learn from "./pages/learn.js";
import * as placement from "./pages/placement.js";
import * as grammar from "./pages/grammar.js";
import * as spelling from "./pages/spelling.js";
import * as vocab from "./pages/vocab.js";
import * as progress from "./pages/progress.js";
import * as profile from "./pages/profile.js";
import * as welcome from "./pages/welcome.js";
import * as writing from "./pages/writing.js";
import * as reading from "./pages/reading.js";
import * as listening from "./pages/listening.js";
import * as idioms from "./pages/idioms.js";
import * as reallife from "./pages/reallife.js";
import * as mistakes from "./pages/mistakes.js";
import * as speaking from "./pages/speaking.js";
import * as basics from "./pages/basics.js";
import * as settings from "./pages/settings.js";
import { sfx } from "./ui.js";
import { mountHelper, clearHelperContext } from "./helper.js";
import { LEARNING_GROUPS } from "./groups.js";

const ROUTES = {
  "": { page: home, title: "Home", nav: "home" },
  learn: { page: learn, title: "Learn", nav: "learn" },
  placement: { page: placement, title: "Find your level", nav: "learn" },
  grammar: { page: grammar, title: "Grammar", nav: "learn" },
  spelling: { page: spelling, title: "Spelling", nav: "learn" },
  vocab: { page: vocab, title: "Words", nav: "vocab" },
  writing: { page: writing, title: "Writing", nav: "learn" },
  reading: { page: reading, title: "Reading", nav: "learn" },
  listening: { page: listening, title: "Listening", nav: "learn" },
  idioms: { page: idioms, title: "Idioms", nav: "learn" },
  "real-life": { page: reallife, title: "Real-Life English", nav: "learn" },
  speaking: { page: speaking, title: "Speaking", nav: "learn" },
  basics: { page: basics, title: "First steps", nav: "learn" },
  mistakes: { page: mistakes, title: "Common Mistakes", nav: "learn" },
  progress: { page: progress, title: "Progress", nav: "progress" },
  profile: { page: profile, title: "Me", nav: "profile" },
  settings: { page: settings, title: "Settings", nav: "profile" },
  welcome: { page: welcome, title: "Welcome", nav: "" }
};
const NAV_ITEMS = {
  home: { id: "home", href: "#/", label: "Home", icon: "home" },
  path: { id: "home", href: "#/", label: "My path", icon: "route" },
  learn: { id: "learn", href: "#/learn", label: "Lessons", icon: "grid" },
  vocab: { id: "vocab", href: "#/vocab", label: "Words", icon: "cards" },
  progress: { id: "progress", href: "#/progress", label: "Progress", icon: "chart" },
  profile: { id: "profile", href: "#/profile", label: "Me", icon: "user" }
};
const NAV_BY_LAYOUT = {
  classic: ["home", "learn", "vocab", "progress", "profile"],
  modern: ["home", "learn", "vocab", "progress", "profile"],
  simple: ["home", "learn", "profile"],
  path: ["path", "learn", "progress", "profile"],
  focus: ["home", "learn", "vocab", "progress", "profile"]
};
export const navFor = (layout) => (NAV_BY_LAYOUT[layout] || NAV_BY_LAYOUT.classic).map((k) => NAV_ITEMS[k]);

function shell() {
  const layout = document.documentElement.dataset.layout || "classic";
  const NAV = navFor(layout);
  const side = $("#sidebar");
  side.innerHTML = `
    <a class="brand" href="#/" aria-label="English Learning Hub, home"><span class="logo" aria-hidden="true">Aa</span><span><b>English</b> Learning Hub</span></a>
    <nav aria-label="Main"><ul class="side-nav">${NAV.map((n) => `<li><a href="${n.href}" data-nav="${n.id}">${icon(n.icon)}<span>${n.label}</span></a></li>`).join("")}</ul>
    ${LEARNING_GROUPS.map((g) => `<p class="side-label"><a href="#/learn/${g.id}">${esc(g.label)}</a></p>
    <ul class="side-nav small">${g.items.map((n) => `<li><a href="${n.href}" data-sec="${n.id}"><span class="side-ic ${g.color}">${icon(n.icon)}</span><span>${esc(n.label)}</span></a></li>`).join("")}</ul>`).join("")}</nav>
    <div class="side-foot"><a class="side-set" href="#/settings" data-sec="settings">${icon("settings")}<span>Settings</span></a><button class="theme-toggle" type="button"></button></div>`;
  const bn = $("#bottom-nav");
  bn.dataset.count = NAV.length;
  bn.innerHTML = `<ul>${NAV.map((n) => `<li><a href="${n.href}" data-nav="${n.id}" aria-label="${n.label}"><span class="bn-ic">${icon(n.icon)}</span><span class="bn-l">${n.label}</span></a></li>`).join("")}</ul>`;
}
document.addEventListener("click", (e) => { if (e.target.closest(".theme-toggle")) toggleTheme(); });
document.addEventListener("elh:layout", () => { if ($("#sidebar").innerHTML) { shell(); markNav(); } });

let cleanup = null;
let curNav = "home", curKey = "";
function markNav() {
  $$("[data-nav]").forEach((a) => { const on = a.dataset.nav === curNav; a.classList.toggle("active", on); if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
  $$("[data-sec]").forEach((a) => a.classList.toggle("active", a.dataset.sec === curKey));
}
function route() {
  const hash = location.hash.replace(/^#\/?/, "");
  const parts = hash.split("/").filter(Boolean).map(decodeURIComponent);
  let key = parts[0] || "";
  if (!store.get().name && key !== "welcome" && key !== "placement") { location.replace("#/welcome"); return; }
  const r = ROUTES[key] || ROUTES[""];
  if (!ROUTES[key]) key = "";
  if (typeof cleanup === "function") { try { cleanup(); } catch (e) {} }
  cleanup = null;
  const view = $("#view");
  view.classList.remove("enter"); void view.offsetWidth; view.classList.add("enter");
  clearHelperContext();
  try { cleanup = r.page.render(view, parts.slice(1)); }
  catch (err) { console.error(err); view.innerHTML = `<div class="card empty">${icon("alert")}<h2>Sorry, something went wrong.</h2><p class="muted">Please go back and try again.</p><a class="btn primary" href="#/">${icon("home")} Go home</a></div>`; }
  document.title = key === "" ? "English Learning Hub" : `${(view.querySelector("h1") || {}).textContent || r.title} · English Learning Hub`;
  curNav = r.nav; curKey = key; markNav();
  document.body.classList.toggle("no-nav", key === "welcome");
  document.body.classList.toggle("is-home", key === "");
  if (key !== "welcome") mountHelper();
  window.scrollTo(0, 0);
  const h1 = view.querySelector("h1"); if (h1 && document.activeElement !== document.body) { h1.setAttribute("tabindex", "-1"); h1.focus({ preventScroll: true }); }
  applyTheme();
  checkBadges();
}

applyTheme();
shell();
window.addEventListener("hashchange", route);
document.addEventListener("elh:progress", () => checkBadges());
// Sounds for right / wrong answers (one sound even if two parts record the same answer).
let lastAns = 0;
document.addEventListener("elh:answer", (e) => { const n = Date.now(); if (n - lastAns < 120) return; lastAns = n; sfx(e.detail && e.detail.ok ? "ok" : "bad"); });
document.addEventListener("elh:xp", (e) => {
  const up = e.detail && e.detail.levelUp; if (!up) return;
  setTimeout(() => { sfx("level"); levelUpBanner(up); }, 400);
});
function levelUpBanner(up) {
  const b = document.createElement("div");
  b.className = "levelup"; b.setAttribute("role", "status");
  b.innerHTML = `<div class="lu-card"><span class="lu-badge">${up.lv}</span><div><b>Level up!</b><p>You are now Level ${up.lv} · ${esc(up.name)}</p></div></div>`;
  document.body.appendChild(b);
  b.addEventListener("click", () => b.remove());
  setTimeout(() => b.classList.add("out"), 3200); setTimeout(() => b.remove(), 3700);
}
// Study time: counts while the page is open and you have used it in the last minute.
let lastUse = Date.now();
["pointerdown", "keydown", "scroll", "touchstart"].forEach((ev) => window.addEventListener(ev, () => { lastUse = Date.now(); }, { passive: true }));
setInterval(() => { if (document.visibilityState === "visible" && Date.now() - lastUse < 60000 && store.get().name && !location.hash.startsWith("#/welcome")) store.addTime(15); }, 15000);
route();
if (!store.canSave()) toast(`${icon("alert")} Your browser is not saving progress (private mode?).`, "bad");
