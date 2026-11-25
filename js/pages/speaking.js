import * as store from "../store.js";
import { icon } from "../icons.js";
import { $, $$, esc, levelChip, listenBtn, speak, toast, levelSort } from "../ui.js";
import { REPEAT, READ, TALKS } from "../data/speaking.js";
import { setHelperContext } from "../helper.js";

const SR = typeof window !== "undefined" ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;
export const canListen = !!SR;
const LV = ["E1", "E2", "E3", "L1", "L2"];
const myLevel = () => (LV.includes(store.get().level) ? store.get().level : "E1");
const name = () => store.get().name || "Sam";
const fill = (t) => t.replace(/Ahmad Ali/g, name());

function head(title, sub, back = "#/learn") {
  return `<header class="page-head"><a class="icon-btn back" href="${back}" aria-label="Back">${icon("back")}</a><div class="grow"><h1>${esc(title)}</h1>${sub ? `<p class="muted small">${esc(sub)}</p>` : ""}</div><span class="t-ic orange">${icon("mic")}</span></header>`;
}
const notice = () => canListen ? "" : `<div class="card sp-note">${icon("alert")}<div><b>Your browser can't hear you yet.</b><p class="muted small">Speaking works in Chrome, Edge and Samsung Internet. You can still listen and type your answers below.</p></div></div>`;
const words = (s) => s.toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9' ]+/g, " ").split(/\s+/).filter(Boolean);

// Word-by-word match (longest common subsequence) → which target words were heard.
export function compare(target, said) {
  const t = words(target), s = words(said);
  const m = t.map(() => Array(s.length + 1).fill(0));
  const L = (i, j) => (i < 0 ? 0 : m[i][j]);
  for (let i = 0; i < t.length; i++) for (let j = 1; j <= s.length; j++) m[i][j] = t[i] === s[j - 1] ? L(i - 1, j - 1) + 1 : Math.max(L(i - 1, j), m[i][j - 1]);
  const hit = Array(t.length).fill(false);
  let i = t.length - 1, j = s.length;
  while (i >= 0 && j > 0) { if (t[i] === s[j - 1]) { hit[i] = true; i--; j--; } else if (L(i - 1, j) >= m[i][j - 1]) i--; else j--; }
  const score = t.length ? Math.round((hit.filter(Boolean).length / t.length) * 100) : 0;
  return { score, hit };
}
function markup(target, hit) {
  let k = 0;
  return target.split(/\s+/).map((tok) => { const has = words(tok).length; const ok = has ? hit[k++] : true; return `<span class="sp-w ${ok ? "ok" : "bad"}">${esc(tok)}</span>`; }).join(" ");
}
function verdict(score) {
  if (score >= 90) return ["ok", "Excellent! Very clear."];
  if (score >= 70) return ["ok", "Good! Practise the red words."];
  if (score >= 40) return ["", "Not bad. Listen again and try once more."];
  return ["bad", "Let's try again. Listen first, then speak slowly."];
}

let active = null;
function stopRec() { if (active) { try { active.abort(); } catch (e) {} active = null; } }
// Start listening; calls done(alternatives[]) or fail(message).
function listen(btn, done, fail) {
  if (!SR) { fail("Speaking works in Chrome, Edge and Samsung Internet."); return; }
  stopRec();
  const r = new SR();
  r.lang = "en-GB"; r.interimResults = false; r.maxAlternatives = 3; r.continuous = false;
  active = r; let got = false;
  btn.classList.add("on"); btn.disabled = true; const old = btn.innerHTML; btn.innerHTML = `${icon("mic")} Listening…`;
  const reset = () => { btn.classList.remove("on"); btn.disabled = false; btn.innerHTML = old; };
  r.onresult = (e) => { got = true; const res = e.results[0]; const alts = []; for (let i = 0; i < res.length; i++) alts.push(res[i].transcript); done(alts); };
  r.onerror = (e) => { got = true; reset(); fail(e.error === "not-allowed" || e.error === "service-not-allowed" ? "Please allow the microphone for this site, then try again." : e.error === "no-speech" ? "I didn't hear anything. Tap the button and speak." : e.error === "network" ? "Speech recognition needs the internet. Please check your connection." : "Sorry, that didn't work. Please try again."); };
  r.onend = () => { reset(); if (!got) fail("I didn't hear anything. Tap the button and speak."); active = null; };
  try { r.start(); } catch (e) { reset(); fail("Please try again in a moment."); }
}
const best = (target, alts) => alts.map((a) => ({ a, ...compare(target, a) })).sort((x, y) => y.score - x.score)[0];

export function render(view, params) {
  stopRec();
  const [mode, id] = params;
  if (mode === "repeat") repeat(view, LV.includes(id) ? id : myLevel());
  else if (mode === "read") { const r = READ.find((x) => x.id === id); r ? readOne(view, r) : readList(view); }
  else if (mode === "talk") { const t = TALKS.find((x) => x.id === id); t ? talk(view, t) : talkList(view); }
  else home(view);
  return stopRec;
}

function home(view) {
  setHelperContext({ tip: "Speak slowly and clearly. Listen to the example first, then copy it.", exTitle: "Try saying", examples: REPEAT[myLevel()].slice(0, 3) });
  const tDone = TALKS.filter((t) => store.lesson("speaking", t.id)).length;
  view.innerHTML = `${head("Speaking", "Practise with your microphone")}${notice()}
  <div class="sp-grid">
    <a class="card sp-card" href="#/speaking/repeat"><span class="t-ic orange">${icon("refresh")}</span><b>Repeat after me</b><span class="muted small">Listen to a sentence, then say it.</span></a>
    <a class="card sp-card" href="#/speaking/read"><span class="t-ic mint">${icon("bookopen")}</span><b>Read aloud</b><span class="muted small">Read a short text. See which words were clear.</span></a>
    <a class="card sp-card" href="#/speaking/talk"><span class="t-ic orange">${icon("user")}</span><b>Real-life conversations</b><span class="muted small">GP, Jobcentre, job interview, shop, phone call · ${tDone} of ${TALKS.length} done</span></a>
  </div>
  <p class="muted small sp-tip">${icon("bulb")} Green words were heard clearly. Red words need more practice.</p>`;
}

function chips(cur, base) {
  return `<div class="sp-chips" role="group" aria-label="Level">${[myLevel(), ...LV.filter((x) => x !== myLevel())].map((l) => `<a class="sp-chip ${l === cur ? "on" : ""}" href="${base}${l}" ${l === cur ? 'aria-current="true"' : ""}>${esc(store.levelName(l))}${l === store.get().level ? " · yours" : ""}</a>`).join("")}</div>`;
}

function practiseBox(target, onScore) {
  return { html: `<div class="sp-target" data-t>${esc(target)}</div>
    <div class="row gap wrap sp-actions">${listenBtn(target, "Listen")}<button type="button" class="btn ghost" data-slow>${icon("turtle")} Slowly</button><button type="button" class="btn primary big" data-mic>${icon("mic")} Speak</button></div>
    <div class="sp-result" data-res aria-live="polite"></div>
    ${canListen ? "" : `<label class="sp-type"><span class="small muted">Or type it:</span><span class="row gap"><input class="input" data-in autocomplete="off"><button type="button" class="btn secondary" data-chk>Check</button></span></label>`}`,
    mount(el) {
      const res = $("[data-res]", el), tEl = $("[data-t]", el);
      const show = (said, r) => { tEl.innerHTML = markup(target, r.hit); const [cls, msg] = verdict(r.score); res.innerHTML = `<p class="sp-score ${cls}"><b>${r.score}%</b> ${esc(msg)}</p><p class="muted small">I heard: “${esc(said)}”</p>`; onScore && onScore(r.score); };
      $("[data-slow]", el).onclick = () => speak(target, { rate: 0.6 });
      $("[data-mic]", el).onclick = (e) => listen(e.currentTarget, (alts) => { const b = best(target, alts); show(b.a, b); }, (msg) => { res.innerHTML = `<p class="sp-score bad">${esc(msg)}</p>`; });
      const chk = $("[data-chk]", el); if (chk) { const go = () => { const v = $("[data-in]", el).value.trim(); if (v) show(v, compare(target, v)); }; chk.onclick = go; $("[data-in]", el).onkeydown = (e) => { if (e.key === "Enter") go(); }; }
    } };
}

function repeat(view, lvl) {
  const list = REPEAT[lvl]; let i = 0; let done = new Set();
  store.setLast({ href: `#/speaking/repeat/${lvl}`, title: "Repeat after me", sub: "Speaking", pct: 0 });
  const draw = () => {
    const target = fill(list[i]);
    setHelperContext({ tip: "Listen first. Then press Speak and say the whole sentence.", exTitle: "This sentence", examples: [target] });
    const box = practiseBox(target, (s) => { if (s >= 70 && !done.has(i)) { done.add(i); store.addXP(5); } });
    view.innerHTML = `${head("Repeat after me", "Listen, then say the sentence", "#/speaking")}${notice()}${chips(lvl, "#/speaking/repeat/")}
    <div class="card sp-box"><p class="muted small">Sentence ${i + 1} of ${list.length}</p>${box.html}
    <div class="row gap sp-nav"><button type="button" class="btn ghost" data-prev ${i === 0 ? "disabled" : ""}>${icon("back")} Back</button><button type="button" class="btn secondary" data-next>${i === list.length - 1 ? "Start again" : "Next"} ${icon("next")}</button></div></div>`;
    box.mount(view);
    $("[data-prev]", view).onclick = () => { stopRec(); if (i > 0) { i--; draw(); } };
    $("[data-next]", view).onclick = () => { stopRec(); i = (i + 1) % list.length; draw(); };
  };
  draw();
}

function readList(view) {
  const lv = myLevel();
  const items = READ.slice().sort((a, b) => (a.level === lv ? -1 : b.level === lv ? 1 : LV.indexOf(a.level) - LV.indexOf(b.level)));
  view.innerHTML = `${head("Read aloud", "Read a text and see how clear you were", "#/speaking")}${notice()}
  <div class="sp-grid">${items.map((r) => { const l = store.lesson("speaking", r.id); return `<a class="card sp-card" href="#/speaking/read/${r.id}"><b>${esc(r.title)}</b><span class="row gap wrap">${levelChip(r.level)}${l ? `<span class="pill ok">${icon("check")} ${l.best}%</span>` : ""}</span></a>`; }).join("")}</div>`;
}
function readOne(view, r) {
  const text = fill(r.text);
  store.setLast({ href: `#/speaking/read/${r.id}`, title: r.title, sub: "Read aloud", pct: (store.lesson("speaking", r.id) || {}).best || 0 });
  setHelperContext({ tip: "Read slowly. Stop at full stops. Then look at the red words and say them again.", exTitle: "The text", examples: [text] });
  const box = practiseBox(text, (s) => { store.recordQuiz({ area: "speaking", id: r.id, title: r.title, score: Math.round(s / 10), total: 10 }); });
  view.innerHTML = `${head(r.title, store.levelName(r.level), "#/speaking/read")}${notice()}<div class="card sp-box">${box.html}</div>`;
  box.mount(view);
}

function talkList(view) {
  const lv = myLevel();
  view.innerHTML = `${head("Real-life conversations", "Answer like in real life", "#/speaking")}${notice()}
  <div class="sp-grid">${levelSort(TALKS).map((t) => { const l = store.lesson("speaking", t.id); return `<a class="card sp-card" href="#/speaking/talk/${t.id}"><span class="t-ic ${t.color}">${icon(t.icon)}</span><b>${esc(t.title)}</b><span class="row gap wrap">${levelChip(t.level)}${t.level === lv ? `<span class="pill soft">Your level</span>` : ""}${l ? `<span class="pill ok">${icon("check")} ${l.best}%</span>` : ""}</span></a>`; }).join("")}</div>`;
}
function judge(step, said) {
  const w = words(said);
  const hits = step.keys.map((g) => g.some((k) => w.includes(k))).filter(Boolean).length;
  return { hits, total: step.keys.length, good: hits >= Math.ceil(step.keys.length / 2) && w.length >= 1 };
}
function talk(view, t) {
  let i = 0, good = 0;
  store.setLast({ href: `#/speaking/talk/${t.id}`, title: t.title, sub: "Speaking", pct: (store.lesson("speaking", t.id) || {}).best || 0 });
  const log = [];
  const draw = () => {
    if (i >= t.steps.length) return finish();
    const st = t.steps[i], model = fill(st.model);
    setHelperContext({ tip: t.intro, exTitle: "You could say", examples: [model] });
    view.innerHTML = `${head(t.title, t.intro, "#/speaking/talk")}${notice()}
    <div class="card sp-box"><p class="muted small">Step ${i + 1} of ${t.steps.length}</p>
      ${log.map((x) => `<div class="sp-bub them">${esc(x.say)}</div><div class="sp-bub me ${x.good ? "ok" : ""}">${esc(x.said)}</div>`).join("")}
      <div class="sp-bub them"><b>${esc(st.say)}</b></div>
      <div class="row gap wrap sp-actions">${listenBtn(st.say, "Listen")}<button type="button" class="btn primary big" data-mic>${icon("mic")} Answer</button><button type="button" class="btn ghost" data-hint>${icon("bulb")} Help me</button></div>
      <label class="sp-type"><span class="small muted">${canListen ? "Or type your answer:" : "Type your answer:"}</span><span class="row gap"><input class="input" data-in autocomplete="off"><button type="button" class="btn secondary" data-chk>Send</button></span></label>
      <div class="sp-result" data-res aria-live="polite"></div></div>`;
    const res = $("[data-res]", view);
    const answer = (said) => {
      const j = judge(st, said);
      if (j.good) {
        good++; log.push({ say: st.say, said, good: true });
        res.innerHTML = `<p class="sp-score ok"><b>${icon("check")} Good answer!</b></p><p class="muted small">You said: “${esc(said)}”</p><p class="small">Another way: “${esc(model)}”</p><button type="button" class="btn primary" data-go>Continue ${icon("next")}</button>`;
      } else {
        res.innerHTML = `<p class="sp-score bad"><b>Try again.</b> I heard: “${esc(said)}”</p><p class="small">You could say: “${esc(model)}”</p><div class="row gap wrap">${listenBtn(model, "Hear it")}<button type="button" class="btn ghost" data-skip>Skip ${icon("next")}</button></div>`;
      }
      const go = $("[data-go]", res); if (go) go.onclick = () => { i++; draw(); };
      const sk = $("[data-skip]", res); if (sk) sk.onclick = () => { log.push({ say: st.say, said: "(skipped)", good: false }); i++; draw(); };
    };
    $("[data-mic]", view).onclick = (e) => listen(e.currentTarget, (alts) => { const b = alts.map((a) => ({ a, j: judge(st, a) })).sort((x, y) => y.j.hits - x.j.hits)[0]; answer(b.a); }, (msg) => { res.innerHTML = `<p class="sp-score bad">${esc(msg)}</p>`; });
    $("[data-hint]", view).onclick = () => { res.innerHTML = `<p class="small">You could say: “${esc(model)}”</p>${listenBtn(model, "Hear it")}`; };
    const send = () => { const v = $("[data-in]", view).value.trim(); if (v) answer(v); };
    $("[data-chk]", view).onclick = send; $("[data-in]", view).onkeydown = (e) => { if (e.key === "Enter") send(); };
    setTimeout(() => speak(st.say), 250);
  };
  const finish = () => {
    const pct = Math.round((good / t.steps.length) * 100);
    store.recordQuiz({ area: "speaking", id: t.id, title: t.title, score: good, total: t.steps.length });
    view.innerHTML = `${head(t.title, "Finished", "#/speaking/talk")}<div class="card sp-box center"><span class="t-ic big orange">${icon("award")}</span><h2>${pct}%</h2><p>${good} of ${t.steps.length} good answers.</p>
    <div class="row gap wrap" style="justify-content:center"><button type="button" class="btn secondary" data-again>${icon("refresh")} Try again</button><a class="btn primary" href="#/speaking/talk">More conversations</a></div></div>`;
    $("[data-again]", view).onclick = () => { i = 0; good = 0; log.length = 0; draw(); };
  };
  draw();
}
