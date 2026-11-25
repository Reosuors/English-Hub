import * as store from "../store.js";
import { icon } from "../icons.js";
import { $, $$, esc, confirmBox, toast, hasSpeech, speak, sfx, britishVoices } from "../ui.js";
import { THEMES, applyTheme, setTheme } from "../theme.js";
import { pickerHTML, chooseLayout } from "../layoutpicker.js";

const SIZES = [["s", "Small"], ["m", "Normal"], ["l", "Large"], ["xl", "Extra large"]];
const RATES = [[0.7, "Slow"], [0.85, "A bit slow"], [1, "Normal"], [1.15, "Fast"]];
const sw = (on, id, data) => `<button class="switch ${on ? "on" : ""}" type="button" role="switch" aria-checked="${on}" aria-labelledby="${id}" ${data}><i></i></button>`;
const seg = (name, list, cur) => `<div class="seg" role="radiogroup" aria-label="${name}">${list.map(([v, l]) => `<button type="button" role="radio" aria-checked="${String(v) === String(cur)}" class="${String(v) === String(cur) ? "on" : ""}" data-${name}="${v}">${l}</button>`).join("")}</div>`;

export function render(view) {
  const s = store.get();
  const gb = hasSpeech ? britishVoices() : [];
  view.innerHTML = `
  <header class="page-head"><a class="icon-btn" href="#/profile" aria-label="Back to Me">${icon("back")}</a><div class="grow"><h1>Settings</h1><p class="muted small">Make the app look and sound the way you like</p></div></header>

  <section class="card set-card" aria-labelledby="st-lay"><h2 class="h3" id="st-lay">${icon("layout")} Layout style</h2>
    <p class="small muted">Each layout has its own Home and menu. Colours stay the same.</p>
    ${pickerHTML(s.layout || "classic")}
  </section>

  <section class="card set-card" aria-labelledby="st-look"><h2 class="h3" id="st-look">${icon("palette")} Colour theme</h2>
    <div class="theme-grid" role="radiogroup" aria-label="Colour theme">${THEMES.map((t) => `<button type="button" role="radio" aria-checked="${s.theme === t.id}" class="theme-sw ${s.theme === t.id ? "on" : ""}" data-theme-id="${t.id}"><span class="sw-dot" style="background:${t.bg}"><i style="background:${t.a}"></i></span><span class="sw-name">${t.name}</span>${s.theme === t.id ? `<span class="sw-tick">${icon("check")}</span>` : ""}</button>`).join("")}</div>
  </section>

  <section class="card set-card" aria-labelledby="st-text"><h2 class="h3" id="st-text">${icon("type")} Text size</h2>
    ${seg("size", SIZES, s.textSize || "m")}
    <p class="small muted size-demo">This is how lessons will look.</p>
    <div class="set-row"><span class="t-ic sm grey">${icon("eye")}</span><span class="grow" id="rm-l">Reduce motion<small class="muted block">Fewer animations</small></span>${sw(!!s.reduceMotion, "rm-l", "data-rmotion")}</div>
  </section>

  <section class="card set-card" aria-labelledby="st-learn"><h2 class="h3" id="st-learn">${icon("target")} Learning</h2>
    <form id="st-name" class="set-row" autocomplete="off"><span class="t-ic sm grey">${icon("user")}</span><label class="sr-only" for="sn">Your name</label><input id="sn" class="input grow" type="text" maxlength="30" value="${esc(s.name)}" placeholder="Your name" /><button class="btn secondary sm" type="submit">Save</button></form>
    <div class="set-row"><span class="t-ic sm grey">${icon("cap")}</span><label class="grow" for="sl">My level</label><select id="sl" class="input auto"><option value="" ${!s.level ? "selected" : ""}>Not set</option>${store.LEVELS.map((l) => `<option value="${l.code}" ${s.level === l.code ? "selected" : ""}>${l.name}</option>`).join("")}</select></div>
    <p class="small strong set-sub">Daily goal</p>
    <div class="goal-row" role="radiogroup" aria-label="Daily goal">${store.GOALS.map((g) => `<button type="button" class="goal-tile ${s.goal === g.id ? "on" : ""}" role="radio" aria-checked="${s.goal === g.id}" data-goal="${g.id}"><span class="gt-ic">${icon(g.icon)}</span><b>${g.label}</b><small>${g.xp} XP · ${g.mins}</small></button>`).join("")}</div>
  </section>

  <section class="card set-card" aria-labelledby="st-sound"><h2 class="h3" id="st-sound">${icon("volume")} Sound and voice</h2>
    <div class="set-row"><span class="t-ic sm grey">${icon("bell")}</span><span class="grow" id="sf-l">Sound effects<small class="muted block">A sound for right and wrong answers</small></span>${sw(s.sound !== false, "sf-l", "data-sound")}</div>
    ${hasSpeech ? `<p class="small strong set-sub">Reading speed</p>${seg("rate", RATES, RATES.reduce((a, r) => Math.abs(r[0] - (s.voiceRate || 1)) < Math.abs(a - (s.voiceRate || 1)) ? r[0] : a, 1))}
    <div class="set-row"><span class="t-ic sm grey">${icon("user")}</span><label class="grow" for="sv">British voice</label><select id="sv" class="input auto"><option value="">Best available</option>${gb.map((v) => `<option value="${esc(v.name)}" ${s.voiceName === v.name ? "selected" : ""}>${esc(v.name.replace(/^(Microsoft|Google)\s*/, "").replace(/\s*-\s*English.*$/, "").replace(/\s*\(.*\)$/, ""))}</option>`).join("")}</select></div>
    ${gb.length ? "" : `<p class="small muted">No British voices were found on this device yet, so the best English voice is used.</p>`}
    <div class="set-row"><span class="t-ic sm grey">${icon("play")}</span><span class="grow">Test the voice</span><button class="btn ghost sm" type="button" data-test>${icon("play")} Play</button></div>`
    : `<p class="small muted">This browser can't read words aloud. Try Chrome, Edge or Safari to hear words.</p>`}
  </section>

  <section class="card set-card" aria-labelledby="st-data"><h2 class="h3" id="st-data">${icon("download")} Your progress</h2>
    <p class="small muted">Your progress is saved in this browser. Save it as a file to keep a copy or move it to another phone or computer.</p>
    <div class="row gap wrap"><button class="btn secondary" type="button" data-export>${icon("download")} Save my progress</button><label class="btn secondary file-btn">${icon("upload")} Load from file<input type="file" accept=".json,application/json" data-import class="sr-only" /></label></div>
    <div class="set-row danger-row"><span class="t-ic sm grey">${icon("trash")}</span><span class="grow">Start again from zero</span><button class="btn danger-ghost sm" type="button" data-reset>Reset</button></div>
  </section>
  <p class="small muted center">English Learning Hub · British English · UK ESOL levels</p>`;

  const re = () => { const y = window.scrollY; render(view); window.scrollTo(0, y); };
  $$("[data-theme-id]", view).forEach((b) => b.addEventListener("click", () => { setTheme(b.dataset.themeId); re(); }));
  $$("[data-layout-id]", view).forEach((b) => b.addEventListener("click", () => { chooseLayout(b.dataset.layoutId); re(); }));
  $$("[data-size]", view).forEach((b) => b.addEventListener("click", () => { store.set({ textSize: b.dataset.size }); applyTheme(); re(); }));
  $("[data-rmotion]", view).addEventListener("click", () => { store.set({ reduceMotion: !store.get().reduceMotion }); applyTheme(); re(); });
  $("[data-sound]", view).addEventListener("click", () => { store.set({ sound: store.get().sound === false }); if (store.get().sound) sfx("ok"); re(); });
  $$("[data-rate]", view).forEach((b) => b.addEventListener("click", () => { store.set({ voiceRate: Number(b.dataset.rate) }); speak("This is the new reading speed."); re(); }));
  const sv = $("#sv", view); if (sv) sv.addEventListener("change", () => { store.set({ voiceName: sv.value }); speak("Hello! This is my voice."); });
  const tb = $("[data-test]", view); if (tb) tb.addEventListener("click", () => speak("Hello! Welcome to English Learning Hub. Let's learn together."));
  if (hasSpeech && !gb.length && window.speechSynthesis) window.speechSynthesis.addEventListener("voiceschanged", () => { if (view.isConnected && $("#sv", view) && britishVoices().length) re(); }, { once: true });
  $("#st-name", view).addEventListener("submit", (e) => { e.preventDefault(); const v = $("#sn", view).value.trim(); if (!v) return; store.set({ name: v }); toast(`${icon("check")} Name saved`, "ok"); });
  $("#sl", view).addEventListener("change", (e) => { store.set({ level: e.target.value || null }); toast(`${icon("check")} Level saved`, "ok"); });
  $$("[data-goal]", view).forEach((b) => b.addEventListener("click", () => { store.set({ goal: b.dataset.goal }); re(); }));
  $("[data-export]", view).addEventListener("click", () => {
    const blob = new Blob([store.exportData()], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `english-hub-progress-${store.today()}.json`;
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    toast(`${icon("check")} Progress file saved`, "ok");
  });
  $("[data-import]", view).addEventListener("change", async (e) => {
    const f = e.target.files && e.target.files[0]; if (!f) return;
    try {
      const text = await f.text();
      if (!(await confirmBox("Load this progress?", "The progress in the file will replace the progress on this device.", "Load"))) return;
      store.importData(text); applyTheme(); toast(`${icon("check")} Progress loaded`, "ok"); re();
    } catch (err) { toast(`${icon("alert")} ${esc(err.message && err.message.startsWith("This file") ? err.message : "Sorry, this file could not be read.")}`, "bad"); }
    e.target.value = "";
  });
  $("[data-reset]", view).addEventListener("click", async () => {
    if (await confirmBox("Delete all progress?", "Your XP, scores, words and level will be deleted. Your settings stay. You can't undo this.", "Delete", true)) { store.reset(); location.hash = "#/welcome"; }
  });
}
