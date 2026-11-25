import * as store from "./store.js";
import { icon } from "./icons.js";
// Colour themes. "tone" tells the CSS whether the theme is dark or light.
export const THEMES = [
  { id: "dark", name: "Orange Night", tone: "dark", bg: "#111113", a: "#ff7a1a" },
  { id: "light", name: "Light", tone: "light", bg: "#f6f5f2", a: "#ff7a1a" },
  { id: "ocean", name: "Ocean", tone: "dark", bg: "#0b1a2a", a: "#3fb6ff" },
  { id: "forest", name: "Forest", tone: "dark", bg: "#0f1a14", a: "#4cd38a" },
  { id: "purple", name: "Purple", tone: "dark", bg: "#16112a", a: "#a98bff" },
  { id: "midnight", name: "Midnight", tone: "dark", bg: "#000000", a: "#6c8cff" },
  { id: "rose", name: "Rose", tone: "light", bg: "#fff4f6", a: "#e84d7a" },
  { id: "sky", name: "Sky", tone: "light", bg: "#eef6ff", a: "#2f7cf6" },
  { id: "mint", name: "Mint", tone: "light", bg: "#eefaf3", a: "#16a36a" },
  { id: "sand", name: "Sand", tone: "light", bg: "#f7f1e6", a: "#c7782a" },
  { id: "contrast", name: "High contrast", tone: "dark", bg: "#000000", a: "#ffd400" }
];
export const themeInfo = (id) => THEMES.find((t) => t.id === id) || THEMES[0];
let lastLayout = null;
export function applyTheme() {
  const s = store.get();
  const t = themeInfo(s.theme);
  const d = document.documentElement.dataset;
  d.theme = t.id; d.tone = t.tone; d.layout = ["modern", "simple", "path", "focus"].includes(s.layout) ? s.layout : "classic";
  if (d.layout !== lastLayout) { lastLayout = d.layout; document.dispatchEvent(new CustomEvent("elh:layout")); }
  d.size = s.textSize || "m"; d.motion = s.reduceMotion ? "reduce" : "full";
  const meta = document.querySelector('meta[name="theme-color"]'); if (meta) meta.content = t.bg;
  const light = t.tone === "light";
  document.querySelectorAll(".theme-toggle").forEach((b) => { b.innerHTML = `${icon(light ? "moon" : "sun")}<span>${light ? "Dark mode" : "Light mode"}</span>`; b.setAttribute("aria-label", light ? "Switch to dark mode" : "Switch to light mode"); });
}
export function toggleTheme() { store.set({ theme: themeInfo(store.get().theme).tone === "light" ? "dark" : "light" }); applyTheme(); }
export function setTheme(id) { store.set({ theme: themeInfo(id).id }); applyTheme(); }
