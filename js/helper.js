// "Helper": a small panel on every page. Tools: check a sentence (LanguageTool), look up a word (free dictionary),
// read text aloud (British voice), a tip for this page and more examples. These are not a chatbot.
import * as store from "./store.js";
import { icon } from "./icons.js";
import { $, $$, esc, hasSpeech, speak, listenBtn, shuffle } from "./ui.js";
import { checkText } from "./lt.js";
import { WORDS } from "./data/vocab.js";

// Spelling suggestions for the Word tab: LanguageTool replacements first, then a fuzzy match against the site's own words (works offline).
let siteWords = null;
async function loadSiteWords() {
  if (siteWords) return siteWords;
  // Only texts that are written correctly (quiz options and "wrong" examples are left out).
  const mods = ["vocab", "reading", "listening", "writing", "idioms", "reallife", "speaking", "basics"];
  const set = new Set(); const add = (v) => (JSON.stringify(v).toLowerCase().match(/[a-z]{2,}/g) || []).forEach((w) => set.add(w));
  const res = await Promise.allSettled(mods.map((m) => import(`./data/${m}.js`)));
  for (const r of res) if (r.status === "fulfilled") { try { add(Object.values(r.value)); } catch (e) {} }
  try { const sp = await import("./data/spelling.js"); add(sp.PAIRS.map((p) => p.words)); add(sp.MISSPELLED.map((m) => m[0])); sp.MISSPELLED.forEach((m) => { set.delete(String(m[1]).toLowerCase()); set.delete(String(m[2]).toLowerCase()); }); } catch (e) {}
  WORDS.forEach((x) => set.add(x.w.toLowerCase()));
  return (siteWords = [...set]);
}
function editDist(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) {
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
  }
  return d[a.length][b.length];
}
function soundKey(w) {
  let s = w.toLowerCase().replace(/[^a-z]/g, "");
  s = s.replace(/[sc]?t?(ch|sh|ss|s|t|c)?i[oa]n/g, "X").replace(/ph/g, "f").replace(/gh/g, "").replace(/ck|qu|q|c(?=[aou]|[^eiy]|$)|k/g, "k").replace(/c/g, "s").replace(/z/g, "s").replace(/wh/g, "w");
  const first = s[0] || ""; s = first + s.slice(1).replace(/[aeiouyhw]/g, "");
  return s.replace(/(.)\1+/g, "$1");
}
function fuzzy(word, list, n = 5) {
  const k = soundKey(word); const max = Math.max(2, Math.floor(word.length / 3));
  const scored = [];
  for (const c of list) {
    if (c === word || Math.abs(c.length - word.length) > 4) continue;
    const dist = editDist(word, c); const same = soundKey(c) === k;
    if (dist <= max || (same && dist <= word.length - 1)) scored.push([c, (same ? -2 : 0) + dist + (c[0] === word[0] ? 0 : 1)]);
  }
  return scored.sort((a, b) => a[1] - b[1] || a[0].length - b[0].length).slice(0, n).map((x) => x[0]);
}
async function suggestions(word) {
  const [lt, list] = await Promise.all([checkText(word, { timeout: 5000 }).catch(() => ({ ok: false })), loadSiteWords().catch(() => [])]);
  const out = []; const fz = fuzzy(word, list); const k = soundKey(word);
  fz.filter((f) => soundKey(f) === k).forEach((f) => out.push(f));
  if (lt && lt.ok) for (const m of lt.matches) for (const r of (m.replacements || []).slice(0, 5)) { const v = r.value || ""; if (/^[a-z][a-z' -]*$/.test(v) && v !== word) out.push(v); }
  fz.forEach((f) => out.push(f));
  return [...new Set(out)].slice(0, 5);
}

let ctx = { tip: null, examples: [] };
export function setHelperContext(c) { ctx = Object.assign({ tip: null, examples: [] }, c || {}); }
export function clearHelperContext() { ctx = { tip: null, examples: [] }; }

const TIPS = {
  "": "Do a little every day. Ten minutes a day is better than one hour once a week.",
  learn: "Choose one skill for today. Try a lesson, then a quiz.",
  grammar: "Read the examples out loud. Then do the practice. Read the explanation again after a mistake.",
  spelling: "Say difficult words in parts: Wed-nes-day. Write them three times.",
  vocab: "Learn words in sentences, not alone. Use a new word in a sentence today.",
  writing: "Write first, check later. After the check, read your text again out loud.",
  reading: "Read once for the general idea. Then read again slowly for the details.",
  listening: "Listen once without the transcript. Then listen again with it.",
  idioms: "Don't use too many idioms in formal writing. They are great in conversation.",
  "real-life": "Say the phrases out loud before you need them. Practice makes it easier.",
  mistakes: "Choose 3 mistakes you make often. Look for them every time you write.",
  placement: "Don't worry about the result. It just helps you choose the right lessons.",
  progress: "Look at your weak skill and practise it first tomorrow.",
  profile: "Turn on 'Slow voice' if the audio is too fast."
};

function routeKey() { return (location.hash.replace(/^#\/?/, "").split("/")[0]) || ""; }

document.addEventListener("click", (e) => { if (e.target.closest("[data-helper]")) { e.preventDefault(); openHelper(); } });
export const helperBtn = (cls = "icon-btn") => `<button class="${cls} help-btn" type="button" data-helper aria-label="Open the Helper">${icon("sparkles")}</button>`;
export function mountHelper() {
  if ($("#helper-fab")) return;
  const b = document.createElement("button");
  b.id = "helper-fab"; b.type = "button"; b.className = "helper-fab"; b.setAttribute("aria-label", "Open the Helper");
  b.innerHTML = `${icon("sparkles")}<span>Helper</span>`;
  document.body.appendChild(b);
  b.addEventListener("click", openHelper);
}

export function openHelper() {
  const wrap = document.createElement("div");
  wrap.className = "sheet-wrap";
  const tip = ctx.tip || TIPS[routeKey()] || TIPS[""];
  wrap.innerHTML = `<div class="sheet" role="dialog" aria-modal="true" aria-labelledby="hp-t">
    <div class="sheet-head"><span class="t-ic sm orange">${icon("sparkles")}</span><h2 id="hp-t" class="grow">Helper</h2><button class="icon-btn" type="button" data-close aria-label="Close">${icon("x")}</button></div>
    <div class="tabs" role="tablist">
      <button class="tab on" role="tab" type="button" data-ht="check">${icon("check")} Check</button>
      <button class="tab" role="tab" type="button" data-ht="word">${icon("search")} Word</button>
      ${hasSpeech ? `<button class="tab" role="tab" type="button" data-ht="say">${icon("volume")} Read aloud</button>` : ""}
      <button class="tab" role="tab" type="button" data-ht="tip">${icon("bulb")} Tip</button>
    </div>
    <div class="sheet-body" id="hp-body"></div>
    <p class="small muted sheet-note">The Helper uses LanguageTool for checking and a free online dictionary. It is not a chatbot.</p>
  </div>`;
  document.body.appendChild(wrap);
  const body = $("#hp-body", wrap);
  const close = () => { wrap.remove(); $("#helper-fab")?.focus(); };
  wrap.addEventListener("click", (e) => { if (e.target === wrap || e.target.closest("[data-close]")) close(); });
  wrap.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  const show = (t) => {
    $$("[data-ht]", wrap).forEach((x) => { x.classList.toggle("on", x.dataset.ht === t); x.setAttribute("aria-selected", x.dataset.ht === t); });
    if (t === "check") checkTab(body);
    if (t === "word") wordTab(body);
    if (t === "say") sayTab(body);
    if (t === "tip") tipTab(body, tip);
  };
  $$("[data-ht]", wrap).forEach((x) => x.addEventListener("click", () => show(x.dataset.ht)));
  show("check");
}

function checkTab(body) {
  body.innerHTML = `<label class="field-label" for="hp-in">Write a sentence. I'll check it.</label>
    <textarea id="hp-in" class="input" rows="3" placeholder="For example: She don't like apples."></textarea>
    <button class="btn primary w100" type="button" data-go>${icon("check")} Check</button><div id="hp-out" aria-live="polite"></div>`;
  const inp = $("#hp-in", body); setTimeout(() => inp.focus(), 50);
  $("[data-go]", body).addEventListener("click", async () => {
    const text = inp.value.trim(); const out = $("#hp-out", body);
    if (!text) { inp.focus(); return; }
    out.innerHTML = `<p class="muted small"><span class="spinner"></span> Checking…</p>`;
    const r = await checkText(text);
    if (!r.ok) { out.innerHTML = `<p class="note small">${icon("alert")} ${esc(r.error)} Please try again later.</p>`; return; }
    if (!r.matches.length) { out.innerHTML = `<div class="feedback show ok"><div class="fb-head">${icon("check")}<strong>Looks good!</strong></div><p>I didn't find any mistakes.</p>${listenBtn(text)}</div>`; return; }
    let fixed = text; r.matches.slice().sort((a, b) => b.offset - a.offset).forEach((m) => { if (m.replacements[0]) fixed = fixed.slice(0, m.offset) + m.replacements[0].value + fixed.slice(m.offset + m.length); });
    out.innerHTML = `<div class="feedback show bad"><div class="fb-head">${icon("alert")}<strong>${r.matches.length} thing${r.matches.length === 1 ? "" : "s"} to fix</strong></div>
      <ul class="fb-list">${r.matches.map((m) => `<li><p><s>${esc(text.substr(m.offset, m.length))}</s>${m.replacements[0] ? ` → <b>${esc(m.replacements[0].value)}</b>` : ""}</p><p class="small">${esc(m.message)}</p></li>`).join("")}</ul>
      <p class="small"><b>Suggested:</b> ${esc(fixed)}</p>${listenBtn(fixed, "Listen")}</div>`;
  });
}

function wordTab(body) {
  body.innerHTML = `<form class="row gap" id="hp-wf"><label class="sr-only" for="hp-w">Word</label><input id="hp-w" class="input grow" type="text" placeholder="Type a word" autocapitalize="off" /><button class="btn primary" type="submit">${icon("search")}</button></form><div id="hp-wout" aria-live="polite"></div>`;
  const inp = $("#hp-w", body); setTimeout(() => inp.focus(), 50);
  $("#hp-wf", body).addEventListener("submit", async (e) => {
    e.preventDefault();
    const w = inp.value.trim().toLowerCase(); const out = $("#hp-wout", body);
    if (!w) return;
    const local = WORDS.find((x) => x.w.toLowerCase() === w);
    out.innerHTML = `<p class="muted small"><span class="spinner"></span> Looking up…</p>`;
    let html = "";
    try {
      const ctl = new AbortController(); const tm = setTimeout(() => ctl.abort(), 6000);
      const r = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(w)}`, { signal: ctl.signal });
      clearTimeout(tm);
      if (r.status === 404) throw new Error("notfound");
      if (!r.ok) throw new Error("down");
      const j = await r.json();
      const e0 = j[0]; const phon = e0.phonetic || (e0.phonetics.find((p) => p.text) || {}).text || "";
      const meanings = j.flatMap((e) => e.meanings).slice(0, 3);
      html = `<div class="card flat"><div class="row gap center-y"><h3 class="m0">${esc(e0.word)}</h3>${listenBtn(e0.word)}<span class="muted small">${esc(phon)}</span></div>
        ${meanings.map((m) => `<p class="small"><i>${esc(m.partOfSpeech)}</i></p><ol class="defs">${m.definitions.slice(0, 2).map((d) => `<li>${esc(d.definition)}${d.example ? `<br><span class="muted">“${esc(d.example)}”</span>` : ""}</li>`).join("")}</ol>`).join("")}</div>`;
    } catch (err) {
      if (!local) {
        const sg = await suggestions(w);
        const msg = (err.message === "notfound" || sg.length) ? (sg.length ? "I couldn't find that word." : "I couldn't find that word. Check the spelling.") : "The online dictionary is not available right now.";
        html = `<p class="note small">${icon("alert")} ${msg}</p>${sg.length ? `<p class="small m0"><b>Did you mean:</b></p><div class="hp-sugg">${sg.map((x) => `<button type="button" class="pill-btn" data-sugg="${esc(x)}">${esc(x)}</button>`).join("")}</div>` : ""}`;
      }
    }
    if (local) html = `<div class="card flat pastel mint"><div class="row gap center-y"><h3 class="m0">${esc(local.w)}</h3>${listenBtn(local.w)}</div><p class="small"><i>${esc(local.pos)}</i> · ${esc(local.def)}</p><p class="small">“${esc(local.ex)}”</p><a class="btn dark sm" href="#/vocab/word/${local.id}">${icon("eye")} Open in Words</a></div>` + html;
    out.innerHTML = html;
    $$("[data-sugg]", out).forEach((b) => b.addEventListener("click", () => { inp.value = b.dataset.sugg; $("#hp-wf", body).requestSubmit(); }));
  });
}

function sayTab(body) {
  body.innerHTML = `<label class="field-label" for="hp-s">Type or paste text. I'll read it in a British voice.</label><textarea id="hp-s" class="input" rows="3" placeholder="Hello, how are you?"></textarea>
    <div class="row gap"><button class="btn primary" type="button" data-say-n>${icon("play")} Read</button><button class="btn ghost" type="button" data-say-s>${icon("turtle")} Slowly</button><button class="btn ghost" type="button" data-say-x>${icon("x")} Stop</button></div>`;
  const inp = $("#hp-s", body); setTimeout(() => inp.focus(), 50);
  $("[data-say-n]", body).addEventListener("click", () => inp.value.trim() && speak(inp.value));
  $("[data-say-s]", body).addEventListener("click", () => inp.value.trim() && speak(inp.value, { rate: 0.65 }));
  $("[data-say-x]", body).addEventListener("click", () => window.speechSynthesis.cancel());
}

function tipTab(body, tip) {
  const ex = ctx.examples || [];
  body.innerHTML = `<div class="tip card flat">${icon("bulb")}<div><b>Tip for this page</b><p>${esc(tip)}</p></div></div>
    ${ex.length ? `<div class="mt"><b>${esc(ctx.exTitle || "More examples")}</b><ul class="example-list" id="hp-ex"></ul><button class="btn secondary sm" type="button" data-more>${icon("refresh")} Give me another example</button></div>` : ""}`;
  if (ex.length) {
    let pool = shuffle(ex), k = 0;
    const add = () => { if (k >= pool.length) { pool = shuffle(ex); k = 0; } const e = pool[k++]; const li = document.createElement("li"); li.innerHTML = `${listenBtn(e)}<span>${esc(e)}</span>`; $("#hp-ex", body).prepend(li); };
    add(); $("[data-more]", body).addEventListener("click", add);
  }
}
