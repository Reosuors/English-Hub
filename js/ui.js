import { icon } from "./icons.js";
import * as store from "./store.js";

export const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
export function shuffle(arr) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
export const sample = (arr, n) => shuffle(arr).slice(0, n);
export function normalize(s) {
  return String(s || "").toLowerCase().replace(/[\u2018\u2019\u02bc`]/g, "'").replace(/[\u201c\u201d]/g, '"').replace(/[.!?,;:]+$/g, "").replace(/\s+/g, " ").trim();
}
export function hashStr(s) { let h = 2166136261; for (const ch of s) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }

// ---------- Speech (text to speech, British voice) ----------
export const hasSpeech = typeof window !== "undefined" && "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";
let voices = [];
function loadVoices() { try { voices = window.speechSynthesis.getVoices() || []; } catch (e) { voices = []; } }
if (hasSpeech) { loadVoices(); window.speechSynthesis.onvoiceschanged = loadVoices; }
export function britishVoices() { if (!voices.length) loadVoices(); return voices.filter((v) => /en[-_]GB/i.test(v.lang || "")); }
export function pickVoice(lang = "en-GB") {
  if (!voices.length) loadVoices();
  const chosen = store.get().voiceName; if (chosen) { const v = voices.find((x) => x.name === chosen); if (v) return v; }
  const want = lang.toLowerCase();
  const same = voices.filter((v) => (v.lang || "").toLowerCase().replace("_", "-") === want);
  const prefer = ["Google UK English Female", "Google UK English Male", "Microsoft Libby", "Microsoft Sonia", "Microsoft Hazel", "Microsoft Ryan", "Microsoft George", "Daniel", "Kate", "Serena", "Martha", "Arthur"];
  for (const name of prefer) { const v = same.find((x) => x.name.includes(name)); if (v) return v; }
  return same[0] || voices.find((v) => (v.lang || "").toLowerCase().startsWith("en")) || null;
}
export function speak(text, { rate } = {}) {
  if (!hasSpeech) return false;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(String(text).replace(/___/g, "blank"));
    u.lang = "en-GB";
    const v = pickVoice("en-GB"); if (v) u.voice = v;
    u.rate = rate || store.get().voiceRate || 1;
    window.speechSynthesis.speak(u);
    return true;
  } catch (e) { return false; }
}
// A listen button only appears when this browser can speak.
export function listenBtn(text, label = "Listen") {
  if (!hasSpeech) return "";
  return `<button class="icon-btn listen" type="button" data-say="${esc(text)}" aria-label="${esc(label)}: ${esc(text)}" title="${esc(label)}">${icon("volume")}</button>`;
}
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-say]");
  if (b) { e.preventDefault(); speak(b.getAttribute("data-say")); b.classList.add("pulse"); setTimeout(() => b.classList.remove("pulse"), 600); }
});

// ---------- Toast ----------
export function toast(msg, kind = "") {
  let wrap = $("#toasts");
  if (!wrap) { wrap = document.createElement("div"); wrap.id = "toasts"; wrap.setAttribute("aria-live", "polite"); document.body.appendChild(wrap); }
  const t = document.createElement("div");
  t.className = `toast ${kind}`; t.innerHTML = msg;
  wrap.appendChild(t);
  setTimeout(() => t.classList.add("out"), 2600);
  setTimeout(() => t.remove(), 3100);
}

// ---------- Progress ring ----------
export function ring(pct, { size = 72, stroke = 8, label } = {}) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r, off = c * (1 - Math.max(0, Math.min(100, pct)) / 100);
  return `<div class="ring" style="width:${size}px;height:${size}px" role="img" aria-label="${Math.round(pct)}%">
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" stroke-width="${stroke}" class="ring-bg" fill="none"/>
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" stroke-width="${stroke}" class="ring-fg" fill="none" stroke-dasharray="${c}" stroke-dashoffset="${off}" transform="rotate(-90 ${size / 2} ${size / 2})" stroke-linecap="round"/></svg>
    <span>${label ?? Math.round(pct) + "%"}</span></div>`;
}
export const bar = (pct, cls = "") => `<div class="bar ${cls}" role="img" aria-label="${Math.round(pct)}%"><i style="width:${Math.max(0, Math.min(100, pct))}%"></i></div>`;

// ---------- Confirm dialog ----------
export function confirmBox(title, text, okLabel = "Yes", danger = false) {
  return new Promise((resolve) => {
    const d = document.createElement("div");
    d.className = "modal-wrap";
    d.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-labelledby="mdl-t"><h2 id="mdl-t">${esc(title)}</h2><p>${esc(text)}</p>
      <div class="row gap end"><button class="btn ghost" data-r="0" type="button">Cancel</button><button class="btn ${danger ? "danger" : "primary"}" data-r="1" type="button">${esc(okLabel)}</button></div></div>`;
    document.body.appendChild(d);
    const close = (v) => { d.remove(); resolve(v); };
    d.addEventListener("click", (e) => { const b = e.target.closest("[data-r]"); if (b) close(b.dataset.r === "1"); else if (e.target === d) close(false); });
    d.addEventListener("keydown", (e) => { if (e.key === "Escape") close(false); });
    $("[data-r='1']", d).focus();
  });
}

// ---------- Modal (generic content) ----------
export function openModal(html, onMount) {
  const d = document.createElement("div");
  d.className = "modal-wrap";
  d.innerHTML = `<div class="modal" role="dialog" aria-modal="true"><button class="icon-btn modal-x" type="button" aria-label="Close">${icon("x")}</button>${html}</div>`;
  document.body.appendChild(d);
  const prev = document.activeElement;
  const close = () => { d.remove(); if (prev && prev.focus) prev.focus(); };
  d.addEventListener("click", (e) => { if (e.target === d || e.target.closest(".modal-x")) close(); });
  d.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  $(".modal-x", d).focus();
  if (onMount) onMount($(".modal", d), close);
  return close;
}

// ---------- Quiz engine ----------
// questions: mcq {q, a:[...], c, e, passage?} | fill {t:"fill", q, ans:[...], e} | order {t:"order", words:[...], ans, e}
export function runQuiz(el, { title, questions, area, id, skill, onExit, exitLabel = "Back", onAnswer, onFinish, xp = true }) {
  let i = 0, score = 0;
  const mistakes = [];
  const qs = questions;
  function fullSentence(q, answer) { return q.q && q.q.includes("___") ? q.q.replace(/\s*\(.*?\)\s*$/, "").replace("___", answer) : ""; }

  function render() {
    const q = qs[i];
    const type = q.t || "mcq";
    el.innerHTML = `
      <div class="quiz card">
        <div class="quiz-top"><span class="muted small">Question ${i + 1} of ${qs.length}</span><span class="pill soft">${icon("star")} ${score}</span></div>
        ${bar(((i) / qs.length) * 100, "thin")}
        ${q.passage ? `<div class="passage">${q.passage}</div>` : ""}
        ${q.prompt ? `<p class="muted small q-prompt">${esc(q.prompt)}</p>` : ""}
        <h3 class="q-text">${esc(q.q || "Put the words in the right order.")}</h3>
        ${q.say ? `<div class="row gap center say-row"><button class="btn secondary" type="button" data-say="${esc(q.say)}">${icon("volume")} Play the word</button><button class="btn ghost" type="button" data-slow="${esc(q.say)}">${icon("turtle")} Slowly</button></div>` : ""}
        <div class="q-body">${type === "mcq" ? q.a.map((a, k) => `<button class="opt" type="button" data-k="${k}"><b>${"ABCD"[k]}</b><span>${esc(a)}</span></button>`).join("")
          : type === "fill" ? `<form class="fill-form" autocomplete="off"><label class="sr-only" for="fill-in">Your answer</label><input id="fill-in" class="input big" type="text" autocapitalize="off" spellcheck="false" placeholder="Type your answer" /><button class="btn primary" type="submit">${icon("check")} Check</button></form>`
          : `<div class="order-built" aria-label="Your sentence" aria-live="polite"></div><div class="order-bank">${shuffle(q.words.map((w, k) => ({ w, k }))).map((o) => `<button type="button" class="chip-word" data-k="${o.k}">${esc(o.w)}</button>`).join("")}</div>
             <div class="row gap"><button class="btn ghost" type="button" data-clear>${icon("refresh")} Clear</button><button class="btn primary" type="button" data-check disabled>${icon("check")} Check</button></div>`}</div>
        <div class="feedback" aria-live="assertive"></div>
      </div>`;
    if (type === "mcq") $$(".opt", el).forEach((b) => b.addEventListener("click", () => answer(Number(b.dataset.k) === q.c, b)));
    if (type === "fill") { const f = $(".fill-form", el), inp = $("#fill-in", el); f.addEventListener("submit", (e) => { e.preventDefault(); if (!inp.value.trim()) { inp.focus(); return; } answer(q.ans.some((a) => normalize(a) === normalize(inp.value))); }); setTimeout(() => inp.focus({ preventScroll: true }), 50); }
    if (type === "order") {
      const built = $(".order-built", el), bank = $(".order-bank", el), check = $("[data-check]", el);
      const sync = () => { check.disabled = built.children.length === 0; };
      bank.addEventListener("click", (e) => { const b = e.target.closest(".chip-word"); if (b) { built.appendChild(b); sync(); } });
      built.addEventListener("click", (e) => { const b = e.target.closest(".chip-word"); if (b) { bank.appendChild(b); sync(); } });
      $("[data-clear]", el).addEventListener("click", () => { $$(".chip-word", built).forEach((b) => bank.appendChild(b)); sync(); });
      check.addEventListener("click", () => { const s = $$(".chip-word", built).map((b) => b.textContent).join(" "); answer(normalize(s) === normalize(q.ans)); });
    }
    const slow = $("[data-slow]", el); if (slow) slow.addEventListener("click", () => speak(slow.dataset.slow, { rate: 0.6 }));
    if (q.say) setTimeout(() => speak(q.say), 300);
  }

  function answer(ok, btn) {
    const q = qs[i]; const type = q.t || "mcq";
    $$(".opt, .chip-word, .fill-form input, .fill-form button, [data-check], [data-clear]", el).forEach((b) => (b.disabled = true));
    let right = type === "mcq" ? q.a[q.c] : type === "fill" ? q.ans[0] : q.ans;
    if (type === "mcq") { $$(".opt", el)[q.c].classList.add("correct"); if (!ok && btn) btn.classList.add("wrong"); }
    if (ok) score++; else mistakes.push({ q, right });
    if (skill) store.recordAnswer(skill, ok);
    if (onAnswer) onAnswer(q, ok);
    const sentence = type === "order" ? q.ans + "." : fullSentence(q, right);
    const fb = $(".feedback", el);
    fb.className = `feedback show ${ok ? "ok" : "bad"}`;
    fb.innerHTML = `<div class="fb-head">${icon(ok ? "check" : "x")}<strong>${ok ? sample(["Correct!", "Well done!", "Great!", "That's right!"], 1)[0] : "Not quite"}</strong></div>
      ${!ok ? `<p>The right answer is: <b>${esc(right)}</b></p>` : ""}
      ${q.e ? `<p class="fb-why">${icon("bulb")} ${esc(q.e)}</p>` : ""}
      ${sentence && hasSpeech ? `<p class="row gap fb-say">${listenBtn(sentence, "Listen to the sentence")}<span class="muted small">${esc(sentence)}</span></p>` : ""}
      <button class="btn primary next-btn" type="button">${i + 1 < qs.length ? `Next ${icon("next")}` : `See my score ${icon("next")}`}</button>`;
    const nb = $(".next-btn", fb);
    nb.addEventListener("click", () => { i++; if (i < qs.length) { render(); el.scrollIntoView({ block: "start", behavior: "smooth" }); } else finish(); });
    nb.focus({ preventScroll: true });
    fb.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  function finish() {
    const total = qs.length;
    const pct = Math.round((score / total) * 100);
    let gained = 0;
    if (xp && area) gained = store.recordQuiz({ area, id, title, score, total });
    if (onFinish) onFinish({ score, total, pct, mistakes });
    const msg = pct === 100 ? "Perfect score! Amazing work." : pct >= 80 ? "Excellent! You really know this." : pct >= 60 ? "Good job! A little more practice and you've got it." : "Keep going! Read the lesson again and try once more.";
    el.innerHTML = `<div class="card result">
      <div class="result-top">${ring(pct, { size: 110, stroke: 10 })}<div><h3>${score} out of ${total}</h3><p class="muted">${msg}</p>${gained ? `<span class="pill orange">${icon("zap")} +${gained} XP</span>` : ""}</div></div>
      ${mistakes.length ? `<h4 class="mt">Check your mistakes</h4><ul class="mistake-list">${mistakes.map((m) => `<li><p class="small muted">${esc(m.q.q || "Word order")}</p><p>${icon("check", "ok-ic")} <b>${esc(m.right)}</b></p>${m.q.e ? `<p class="small">${esc(m.q.e)}</p>` : ""}</li>`).join("")}</ul>` : ""}
      <div class="row gap wrap mt"><button class="btn primary" type="button" data-again>${icon("refresh")} Try again</button>${onExit ? `<button class="btn secondary" type="button" data-exit>${icon("back")} ${esc(exitLabel)}</button>` : ""}</div></div>`;
    $("[data-again]", el).addEventListener("click", () => { i = 0; score = 0; mistakes.length = 0; render(); });
    const ex = $("[data-exit]", el); if (ex) ex.addEventListener("click", onExit);
    el.scrollIntoView({ block: "start", behavior: "smooth" });
    document.dispatchEvent(new CustomEvent("elh:progress"));
  }
  render();
}

export function levelChip(code) { return `<span class="lvl lvl-${esc(code)}">${esc(store.levelName(code))}</span>`; }
export function emptyState(ic, title, text, btnHtml = "") { return `<div class="empty card">${icon(ic)}<h3>${esc(title)}</h3><p class="muted">${esc(text)}</p>${btnHtml}</div>`; }

export function fmtDate(iso) { try { return new Date(iso + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }); } catch (e) { return iso; } }

// Level-first lists: the learner's level comes first, with filter chips for the other levels.
export const myLevel = () => store.get().level || null;
const lvRank = (c) => { const me = myLevel(); return c === me ? -1 : store.LEVELS.findIndex((l) => l.code === c); };
export function levelSort(list, get = (x) => x.level) { return list.map((x, i) => [x, i]).sort((a, b) => (lvRank(get(a[0])) - lvRank(get(b[0]))) || (a[1] - b[1])).map((p) => p[0]); }
export function levelsIn(list, get = (x) => x.level) { const have = new Set(list.map(get)); return store.LEVELS.filter((l) => have.has(l.code)).map((l) => l.code); }
export function startFilter(list, get = (x) => x.level) { const me = myLevel(); return levelsIn(list, get).includes(me) ? me : "all"; }
export function applyLevel(list, f, get = (x) => x.level) { return levelSort(f === "all" ? list : list.filter((x) => get(x) === f), get); }
export function levelPills(list, cur, get = (x) => x.level) {
  const me = myLevel(); const codes = levelsIn(list, get);
  const order = codes.includes(me) ? [me, ...codes.filter((c) => c !== me)] : codes;
  const b = (f, label) => `<button type="button" role="tab" class="pill-btn ${cur === f ? "on" : ""}" aria-selected="${cur === f}" data-f="${f}">${label}</button>`;
  const note = me === "PE" ? `<a class="card note lvl-note" href="#/basics">${icon("star")}<span class="small"><b>Pre-Entry?</b> Start with letters, numbers and first words in Basics.</span>${icon("chevron", "chev")}</a>` : "";
  return `${note}<div class="pills" role="tablist" aria-label="Filter by level">${order.map((c) => b(c, esc(store.levelName(c)) + (c === me ? " · yours" : ""))).join("")}${b("all", "All levels")}</div>`;
}

// Short sound effects (no files needed). Respect the "Sound effects" setting.
let actx = null;
export function sfx(kind) {
  if (!store.get().sound) return;
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    if (actx.state === "suspended") actx.resume();
    const notes = { ok: [[660, 0], [880, .09]], bad: [[220, 0], [180, .12]], level: [[523, 0], [659, .1], [784, .2], [1047, .3]], tap: [[520, 0]] }[kind] || [[600, 0]];
    const t0 = actx.currentTime;
    notes.forEach(([f, at]) => {
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = kind === "bad" ? "triangle" : "sine"; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t0 + at); g.gain.exponentialRampToValueAtTime(0.18, t0 + at + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t0 + at + 0.18);
      o.connect(g).connect(actx.destination); o.start(t0 + at); o.stop(t0 + at + 0.2);
    });
  } catch (e) {}
}
