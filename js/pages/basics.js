import * as store from "../store.js";
import { icon } from "../icons.js";
import { $, $$, esc, shuffle, sample, speak, hasSpeech, toast } from "../ui.js";
import { ALPHABET, numWord, COLOURS, DAYS, MONTHS, GREETINGS, PERSONAL, CLASSROOM, INSTRUCTIONS, CVC, TOPICS } from "../data/basics.js";
import { setHelperContext } from "../helper.js";

const say = (t, slow) => speak(t, { rate: slow ? 0.6 : 0.85 });
const ord = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth"];
function head(title, sub, back = "#/basics") {
  return `<header class="page-head"><a class="icon-btn back" href="${back}" aria-label="Back">${icon("back")}</a><div class="grow"><span class="lvl lvl-PE">Pre-Entry</span><h1>${esc(title)}</h1>${sub ? `<p class="muted small">${esc(sub)}</p>` : ""}</div></header>`;
}
const noVoice = () => hasSpeech ? "" : `<div class="card sp-note">${icon("alert")}<div><b>No sound in this browser.</b><p class="muted small">Please open this page in Chrome, Edge or Samsung Internet to hear the words.</p></div></div>`;
const tile = (big, small, sayText, extra = "", cls = "") => `<button type="button" class="be-tile ${cls}" data-bs="${esc(sayText)}" aria-label="${esc(sayText)}" ${extra}><span class="be-big">${big}</span>${small ? `<span class="be-small">${small}</span>` : ""}<span class="be-sp">${icon("volume")}</span></button>`;

// Pools used by the games: each item has a key, what to say, and what to show on the button.
const POOLS = {
  letters: { title: "Letters", items: () => ALPHABET.map((a) => ({ k: a.t, say: a.t, show: `${a.t}${a.t.toLowerCase()}`, pic: a.t })) },
  numbers: { title: "Numbers", items: () => Array.from({ length: 100 }, (_, i) => i + 1).map((n) => ({ k: String(n), say: String(n), show: String(n), pic: numWord(n) })) },
  colours: { title: "Colours", items: () => COLOURS.map((c) => ({ k: c.t, say: c.t, show: `<i class="be-sw" style="background:${c.c}"></i>`, pic: c.t, text: c.t })) },
  days: { title: "Days", items: () => DAYS.map((d) => ({ k: d, say: d, show: d, pic: d.slice(0, 3) })) },
  classroom: { title: "Classroom", items: () => CLASSROOM.map((c) => ({ k: c.t, say: c.t, show: c.e, pic: c.t, text: c.t })) },
  words: { title: "Short words", items: () => CVC.flatMap((g) => g.words).map((w) => ({ k: w.t, say: w.t, show: w.e, pic: w.t, text: w.t })) }
};

export function render(view, params) {
  const [a, b] = params;
  if (a === "listen") return listenGame(view, POOLS[b] ? b : "letters");
  if (a === "match") return matchGame(view, POOLS[b] ? b : "classroom");
  if (a === "spell") return spellGame(view);
  const t = TOPICS.find((x) => x.id === a);
  if (t) topic(view, t); else home(view);
  bindSay(view);
}
function bindSay(view) {
  $$("[data-bs]", view).forEach((el) => el.addEventListener("click", () => { say(el.dataset.bs); el.classList.add("pulse"); setTimeout(() => el.classList.remove("pulse"), 600); const sh = el.dataset.show; if (sh) { const o = $("#be-out", view); if (o) o.textContent = sh; } }));
}

function home(view) {
  setHelperContext({ tip: "Tap a picture to hear the word. Listen, then say it.", exTitle: "Try saying", examples: ["Hello", "My name is…", "Thank you"] });
  const done = (id) => store.lesson("basics", id);
  view.innerHTML = `${head("First steps", "For people who are new to English. Tap to listen.", "#/learn")}${noVoice()}
  <div class="be-topics">${TOPICS.map((t) => `<a class="card pastel ${t.color} be-topic" href="#/basics/${t.id}"><span class="be-emoji" aria-hidden="true">${t.e}</span><b>${esc(t.title)}</b><small>${esc(t.sub)}</small></a>`).join("")}</div>
  <h2 class="h3 be-h">${icon("play")} Games</h2>
  <div class="be-games">
    <div class="card be-game"><span class="be-emoji">👂</span><div class="grow"><b>Listen and choose</b><p class="muted small">Listen. Tap the right answer.</p></div></div>
    <div class="be-chiprow">${Object.entries(POOLS).map(([k, p]) => `<a class="sp-chip ${done("listen-" + k) ? "on" : ""}" href="#/basics/listen/${k}">${esc(p.title)}${done("listen-" + k) ? " ✓" : ""}</a>`).join("")}</div>
    <div class="card be-game"><span class="be-emoji">🧩</span><div class="grow"><b>Matching</b><p class="muted small">Find the pairs.</p></div></div>
    <div class="be-chiprow">${["letters", "numbers", "colours", "classroom", "words"].map((k) => `<a class="sp-chip ${done("match-" + k) ? "on" : ""}" href="#/basics/match/${k}">${esc(POOLS[k].title)}${done("match-" + k) ? " ✓" : ""}</a>`).join("")}</div>
    <a class="card be-game" href="#/basics/spell"><span class="be-emoji">🔠</span><div class="grow"><b>Spell the word</b><p class="muted small">Look, listen and tap the letters.</p></div>${icon("next")}</a>
  </div>`;
}

function topic(view, t) {
  store.setLast({ href: `#/basics/${t.id}`, title: t.title, sub: "Pre-Entry", pct: 0 });
  let body = "";
  if (t.id === "alphabet") {
    body = `<p class="muted">Tap a letter. Listen and say it.</p><div class="be-grid">${ALPHABET.map((a) => tile(`${a.t}<span class="be-lc">${a.t.toLowerCase()}</span>`, `${a.e} ${a.word}`, a.say)).join("")}</div>
    <button type="button" class="btn secondary big be-wide" data-bs="${ALPHABET.map((a) => a.t).join(", ")}">${icon("play")} Listen to A to Z</button>`;
  } else if (t.id === "numbers") {
    body = `<div class="card be-out" aria-live="polite"><span id="be-out">Tap a number</span></div>
    <div class="be-nums">${Array.from({ length: 100 }, (_, i) => i + 1).map((n) => `<button type="button" class="be-num ${n % 10 === 0 ? "ten" : ""}" data-bs="${n}" data-show="${n} · ${numWord(n)}">${n}</button>`).join("")}</div>
    <h2 class="h3 be-h">1 to 20</h2><div class="be-grid">${Array.from({ length: 20 }, (_, i) => i + 1).map((n) => tile(n, numWord(n), String(n))).join("")}</div>`;
  } else if (t.id === "colours") {
    body = `<div class="be-grid">${COLOURS.map((c) => tile(`<i class="be-sw" style="background:${c.c}"></i>`, c.t, c.t)).join("")}</div>`;
  } else if (t.id === "days") {
    body = `<h2 class="h3 be-h">Days of the week</h2><div class="be-list">${DAYS.map((d, i) => `<button type="button" class="be-row" data-bs="${d}"><span class="be-n">${i + 1}</span><b>${d}</b><span class="be-sp">${icon("volume")}</span></button>`).join("")}</div>
    <h2 class="h3 be-h">Months of the year</h2><div class="be-list">${MONTHS.map((m, i) => `<button type="button" class="be-row" data-bs="${m}. The ${ord[i]} month."><span class="be-n">${i + 1}</span><b>${m}</b><span class="be-sp">${icon("volume")}</span></button>`).join("")}</div>
    <p class="muted small be-h">In the UK we write the date like this: 5/11/2026 = the fifth of November 2026 (day / month / year).</p>`;
  } else if (t.id === "greetings") {
    body = `<div class="be-grid wide">${GREETINGS.map((g) => tile(g.e, g.t, g.t)).join("")}</div>`;
  } else if (t.id === "personal") {
    body = `<p class="muted">Tap the question, then tap the answer. Say your own answer.</p><div class="be-list">${PERSONAL.map((p) => `<div class="card be-qa"><span class="be-emoji sm">${p.e}</span><div class="grow"><button type="button" class="be-q" data-bs="${esc(p.q)}">${icon("volume")} ${esc(p.q)}</button><button type="button" class="be-a" data-bs="${esc(p.a)}">${icon("volume")} ${esc(p.a)}</button></div></div>`).join("")}</div>
    <p class="muted small be-h">Your surname is your family name. A UK postcode looks like this: OL1 2AB.</p>`;
  } else if (t.id === "classroom") {
    body = `<h2 class="h3 be-h">Things</h2><div class="be-grid">${CLASSROOM.map((c) => tile(c.e, c.t, c.t)).join("")}</div>
    <h2 class="h3 be-h">The teacher says</h2><div class="be-grid wide">${INSTRUCTIONS.map((c) => tile(c.e, c.t, c.t)).join("")}</div>`;
  } else if (t.id === "phonics") {
    body = `<p class="muted">Three letters make a word. Look at the letters. Listen. Say the word.</p>${CVC.map((g) => `<h2 class="h3 be-h">Words with <span class="be-v">${g.v}</span></h2><div class="be-grid">${g.words.map((w) => tile(w.e, w.t.split("").map((ch) => ch === g.v ? `<span class="be-v">${ch}</span>` : ch).join(" "), `${w.t}. ${w.t.split("").join(", ")}. ${w.t}.`)).join("")}</div>`).join("")}`;
  }
  setHelperContext({ tip: "Tap to listen. Say it after the voice. Tap again as many times as you like." });
  view.innerHTML = `${head(t.title, t.sub)}${noVoice()}${body}`;
}

// ---------- Games ----------
function finish(view, area, id, title, score, total, again) {
  const xp = store.recordQuiz({ area, id, title, score, total });
  document.dispatchEvent(new CustomEvent("elh:progress"));
  const stars = score === total ? "⭐⭐⭐" : score >= total * 0.6 ? "⭐⭐" : "⭐";
  view.innerHTML = `${head(title)}<section class="card pastel mint be-done"><span class="be-emoji">${stars}</span><h2>${score} / ${total}</h2><p>${score === total ? "Perfect! Well done!" : score >= total * 0.6 ? "Good job!" : "Keep practising!"}</p><span class="pill orange">${icon("zap")} +${xp} XP</span></section>
  <div class="row gap wrap be-h"><a class="btn primary big" href="${again}">${icon("refresh")} Play again</a><a class="btn secondary big" href="#/basics">${icon("grid")} First steps</a></div>`;
  if (location.hash === again) { $(`a[href="${again}"]`, view).addEventListener("click", (e) => { e.preventDefault(); render(view, again.split("/").slice(2)); }); }
}

function listenGame(view, key) {
  const pool = POOLS[key].items();
  const qs = sample(pool, 10);
  let i = 0, score = 0;
  const title = `Listen and choose: ${POOLS[key].title}`;
  setHelperContext({ tip: "Tap the big speaker to hear the word again." });
  const step = () => {
    if (i >= qs.length) return finish(view, "basics", "listen-" + key, title, score, qs.length, `#/basics/listen/${key}`);
    const q = qs[i];
    const opts = shuffle([q, ...sample(pool.filter((x) => x.k !== q.k), 3)]);
    view.innerHTML = `${head(title, `Question ${i + 1} of ${qs.length}`)}${noVoice()}
    <div class="be-play"><button type="button" class="be-speaker" aria-label="Listen again">${icon("volume")}</button><p class="muted">Listen. Tap the answer.</p></div>
    <div class="be-opts">${opts.map((o) => `<button type="button" class="be-opt" data-k="${esc(o.k)}" aria-label="${esc(o.text || o.k)}">${o.show}${o.text ? `<small>${esc(o.text)}</small>` : ""}</button>`).join("")}</div>`;
    const play = () => say(q.say);
    $(".be-speaker", view).onclick = play; setTimeout(play, 300);
    let answered = false;
    $$(".be-opt", view).forEach((b) => b.onclick = () => {
      if (answered) return; answered = true;
      const ok = b.dataset.k === q.k; if (ok) score++;
      store.recordAnswer("basics", ok);
      b.classList.add(ok ? "ok" : "bad");
      if (!ok) $$(".be-opt", view).find((x) => x.dataset.k === q.k).classList.add("ok");
      say(ok ? "Yes! " + q.say : q.say);
      setTimeout(() => { i++; step(); }, ok ? 1100 : 1900);
    });
  };
  step();
}

function matchGame(view, key) {
  const items = sample(POOLS[key].items(), 5);
  const title = `Matching: ${POOLS[key].title}`;
  let pick = null, found = 0, tries = 0;
  const left = shuffle(items), right = shuffle(items);
  view.innerHTML = `${head(title, "Tap one on the left, then its partner on the right.")}${noVoice()}
  <div class="be-match"><div class="be-col">${left.map((o) => `<button type="button" class="be-m" data-side="l" data-k="${esc(o.k)}" aria-label="${esc(o.text || o.k)}">${o.show}</button>`).join("")}</div>
  <div class="be-col">${right.map((o) => `<button type="button" class="be-m word" data-side="r" data-k="${esc(o.k)}">${esc(o.pic)}</button>`).join("")}</div></div>`;
  $$(".be-m", view).forEach((b) => b.onclick = () => {
    if (b.classList.contains("ok")) return;
    const it = items.find((x) => x.k === b.dataset.k); say(it.say);
    if (!pick || pick.dataset.side === b.dataset.side) { if (pick) pick.classList.remove("sel"); pick = b; b.classList.add("sel"); return; }
    tries++;
    if (pick.dataset.k === b.dataset.k) { pick.classList.remove("sel"); pick.classList.add("ok"); b.classList.add("ok"); found++; pick = null;
      if (found === items.length) setTimeout(() => finish(view, "basics", "match-" + key, title, Math.max(0, items.length * 2 - tries), items.length, `#/basics/match/${key}`), 900);
    } else { const p = pick; p.classList.remove("sel"); p.classList.add("bad"); b.classList.add("bad"); setTimeout(() => { p.classList.remove("bad"); b.classList.remove("bad"); }, 700); pick = null; }
  });
}

function spellGame(view) {
  const words = sample(CVC.flatMap((g) => g.words), 6);
  let i = 0, score = 0;
  const title = "Spell the word";
  const step = () => {
    if (i >= words.length) return finish(view, "basics", "spell", title, score, words.length, "#/basics/spell");
    const w = words[i]; const letters = w.t.split("");
    const extra = sample("abcdefghijklmnoprstuvwxyz".split("").filter((c) => !letters.includes(c)), 3);
    let built = []; let wrong = false;
    view.innerHTML = `${head(title, `Word ${i + 1} of ${words.length}`)}${noVoice()}
    <div class="be-play"><span class="be-emoji xl">${w.e}</span><button type="button" class="be-speaker sm" aria-label="Listen">${icon("volume")}</button></div>
    <div class="be-slots">${letters.map(() => `<span class="be-slot"></span>`).join("")}</div>
    <div class="be-letters">${shuffle([...letters, ...extra]).map((c, k) => `<button type="button" class="be-l" data-c="${c}" data-i="${k}">${c}</button>`).join("")}</div>
    <div class="row gap be-h"><button type="button" class="btn ghost" data-undo>${icon("back")} Undo</button></div>`;
    const play = () => say(`${w.t}. ${letters.join(", ")}.`, true);
    $(".be-speaker", view).onclick = play; setTimeout(() => say(w.t), 300);
    const slots = $$(".be-slot", view);
    const draw = () => slots.forEach((s, k) => { s.textContent = built[k] ? built[k].dataset.c : ""; });
    $("[data-undo]", view).onclick = () => { const b = built.pop(); if (b) b.disabled = false; draw(); };
    $$(".be-l", view).forEach((b) => b.onclick = () => {
      if (built.length >= letters.length) return;
      built.push(b); b.disabled = true; say(b.dataset.c); draw();
      if (built.length === letters.length) {
        const ok = built.map((x) => x.dataset.c).join("") === w.t;
        $(".be-slots", view).classList.add(ok ? "ok" : "bad");
        if (ok) { if (!wrong) score++; store.recordAnswer("basics", !wrong); setTimeout(() => { say(w.t); }, 300); setTimeout(() => { i++; step(); }, 1500); }
        else { wrong = true; setTimeout(() => { $(".be-slots", view).classList.remove("bad"); built.forEach((x) => x.disabled = false); built = []; draw(); play(); }, 1000); }
      }
    });
  };
  step();
}
