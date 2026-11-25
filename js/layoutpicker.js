// Layout style picker: small preview cards. Used in Settings and offered once on Home.
import * as store from "./store.js";
import { icon } from "./icons.js";
import { $, $$, esc, toast } from "./ui.js";
import { LAYOUTS, layoutInfo } from "./groups.js";
import { applyTheme } from "./theme.js";

const PREV = {
  classic: `<i class="pv-bar"></i><i class="pv-line"></i><i class="pv-line s"></i><span class="pv-g4"><i></i><i></i><i></i><i></i></span><i class="pv-tabs"></i>`,
  modern: `<i class="pv-hero"></i><i class="pv-card"></i><i class="pv-card"></i><i class="pv-tabs fat"></i>`,
  simple: `<i class="pv-line s"></i><i class="pv-big"></i><span class="pv-g4 big"><i></i><i></i><i></i><i></i></span>`,
  path: `<i class="pv-bar thin"></i><span class="pv-road"><i></i><i class="r"></i><i></i><i class="l"></i><i></i></span><i class="pv-tabs"></i>`,
  focus: `<i class="pv-line"></i><i class="pv-bar thin"></i><span class="pv-rows"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>`
};
export function suggestedLayout() {
  const lv = store.get().level;
  return lv === "PE" || lv === "E1" ? "simple" : lv === "L1" || lv === "L2" ? "focus" : "path";
}
export function pickerHTML(cur) {
  const sug = suggestedLayout();
  return `<div class="lp-grid" role="radiogroup" aria-label="Layout style">${LAYOUTS.map((l) => `<button type="button" role="radio" aria-checked="${cur === l.id}" class="lp-card ${cur === l.id ? "on" : ""}" data-layout-id="${l.id}">
    <span class="lp-prev pv-${l.id}" aria-hidden="true">${PREV[l.id]}</span>
    <span class="lp-txt"><b>${esc(l.name)}${cur === l.id ? ` <span class="lp-tag">${icon("check")} On</span>` : l.id === sug ? ` <span class="lp-tag sug">Suggested</span>` : ""}</b><small class="lp-who">${esc(l.who)}</small><small class="muted">${esc(l.desc)}</small></span></button>`).join("")}</div>`;
}
export function chooseLayout(id) {
  store.set({ layout: layoutInfo(id).id, layoutPicked: true });
  applyTheme();
  toast(`${icon("check")} ${esc(layoutInfo(id).name)} layout on`, "ok");
}
let offered = false;
export function maybeOfferLayouts() {
  const s = store.get();
  if (offered || s.layoutPicked || !s.name || document.querySelector(".lp-modal")) return;
  offered = true;
  setTimeout(showLayoutPicker, 350);
}
export function showLayoutPicker() {
  const cur = document.documentElement.dataset.layout || "classic";
  const d = document.createElement("div");
  d.className = "modal-wrap lp-modal";
  d.innerHTML = `<div class="modal lp-sheet" role="dialog" aria-modal="true" aria-labelledby="lp-t">
    <h2 id="lp-t">${icon("layout")} Choose your layout</h2>
    <p class="small muted">New! Each layout arranges the app in its own way. Pick the one you like. You can change it any time in Settings.</p>
    ${pickerHTML(cur)}
    <div class="row gap end"><button class="btn ghost" type="button" data-keep>Keep ${esc(layoutInfo(cur).name)}</button></div></div>`;
  document.body.appendChild(d);
  const close = () => { d.remove(); };
  $$("[data-layout-id]", d).forEach((b) => b.addEventListener("click", () => {
    chooseLayout(b.dataset.layoutId); close();
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }));
  $("[data-keep]", d).addEventListener("click", () => { store.set({ layoutPicked: true }); close(); });
  d.addEventListener("keydown", (e) => { if (e.key === "Escape") { store.set({ layoutPicked: true }); close(); } });
  const first = $(".lp-card.on", d) || $(".lp-card", d); if (first) first.focus({ preventScroll: true });
}
