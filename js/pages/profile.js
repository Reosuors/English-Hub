import * as store from "../store.js";
import { icon } from "../icons.js";
import { $, $$, esc, confirmBox, toast, hasSpeech, speak, fmtDate } from "../ui.js";

const isStandalone = () => (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone === true;
const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
function installCard() {
  let body;
  if (isStandalone()) body = `<p class="small muted">${icon("check")} The app is installed on this device. Lessons you have opened work without the internet.</p>`;
  else if (window.__installPrompt) body = `<p class="small muted">Put English Learning Hub on your home screen. It opens like an app and works without the internet.</p><button class="btn primary" type="button" data-install>${icon("home")} Install the app</button>`;
  else if (isIOS()) body = `<p class="small muted">Put English Learning Hub on your home screen: in Safari, tap the <b>Share</b> button, then <b>Add to Home Screen</b>. It works without the internet.</p>`;
  else body = `<p class="small muted">Put English Learning Hub on your home screen: open your browser menu (⋮) and tap <b>Install app</b> or <b>Add to Home screen</b>. It works without the internet.</p>`;
  return `<section class="card" id="install-card"><h2 class="h3">Install the app</h2>${body}</section>`;
}

export function render(view) {
  const s = store.get();
  const counts = store.wordCounts();
  view.innerHTML = `
  <header class="page-head"><div class="grow"><h1>Me</h1><p class="muted small">Your profile and settings</p></div></header>
  <section class="card profile-card">
    <span class="avatar big" aria-hidden="true">${esc((s.name || "?").charAt(0).toUpperCase())}</span>
    <div><h2>${esc(s.name)}</h2><p class="muted small">Learning since ${esc(fmtDate(s.created))}</p></div>
  </section>
  <div class="mini-stats">
    <div class="card"><b>${s.xp}</b><small>${icon("zap")} XP</small></div>
    <div class="card"><b>${store.streakNow()}</b><small>${icon("flame")} Streak</small></div>
    <div class="card"><b>${counts.learned}</b><small>${icon("cards")} Words</small></div>
  </div>
  <section class="card"><h2 class="h3">My details</h2>
    <form id="p-name" class="row gap" autocomplete="off"><label class="sr-only" for="pn">Name</label><span class="t-ic sm grey">${icon("user")}</span><input id="pn" class="input grow" type="text" maxlength="30" value="${esc(s.name)}" /><button class="btn secondary sm" type="submit">${icon("check")} Save</button></form>
    <div class="set-row"><span class="t-ic sm grey">${icon("target")}</span><label class="grow" for="pl">My level</label><select id="pl" class="input auto"><option value="" ${!s.level ? "selected" : ""}>Not set</option>${store.LEVELS.map((l) => `<option value="${l.code}" ${s.level === l.code ? "selected" : ""}>${l.name}</option>`).join("")}</select></div>
    <a class="set-row link-row" href="#/placement"><span class="t-ic sm grey">${icon("help")}</span><span class="grow">Not sure? Take the level test</span>${icon("chevron")}</a>
  </section>
  <a class="card set-link" href="#/settings"><span class="t-ic orange">${icon("settings")}</span><div class="grow"><b>Settings</b><p class="small muted">Colour theme, layout, text size, daily goal, voice and sounds</p></div>${icon("chevron")}</a>
  ${installCard()}
  <section class="card"><h2 class="h3">About this app</h2>
    <p class="small muted">Your progress is saved on this device, in this browser. Nothing is sent to us. When the app checks your writing, the text is sent to the free LanguageTool service to find mistakes. Word sounds come from your browser's British English voice.</p>
    <p class="small muted">Levels follow the UK ESOL system: Pre-Entry, Entry 1, Entry 2, Entry 3, Level 1, Level 2.</p>
    <button class="btn danger-ghost" type="button" data-reset>${icon("trash")} Delete all my progress</button>
  </section>`;
  $("#p-name", view).addEventListener("submit", (e) => { e.preventDefault(); const v = $("#pn", view).value.trim(); if (!v) return; store.set({ name: v }); toast(`${icon("check")} Name saved`, "ok"); render(view); });
  $("#pl", view).addEventListener("change", (e) => { store.set({ level: e.target.value || null }); toast(`${icon("check")} Level saved`, "ok"); });
  const ib = $("[data-install]", view);
  if (ib) ib.addEventListener("click", async () => { const p = window.__installPrompt; if (!p) return; p.prompt(); try { const c = await p.userChoice; if (c && c.outcome === "accepted") { window.__installPrompt = null; toast(`${icon("check")} Installed`, "ok"); } } catch (e) {} render(view); });
  if (!window.__installPrompt && !isStandalone()) document.addEventListener("elh-installable", () => { if (view.isConnected && $("#install-card", view)) render(view); }, { once: true });
  $("[data-reset]", view).addEventListener("click", async () => {
    if (await confirmBox("Delete all progress?", "Your XP, scores, words and level will be deleted. You can't undo this.", "Delete", true)) { store.reset(); location.hash = "#/welcome"; }
  });
}
