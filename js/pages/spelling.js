import * as store from "../store.js";
import { icon } from "../icons.js";
import { $, $$, esc, listenBtn, runQuiz, shuffle, sample, hasSpeech, levelChip, levelPills, applyLevel, startFilter } from "../ui.js";
import { PAIRS, MISSPELLED, missLevel } from "../data/spelling.js";
import { setHelperContext } from "../helper.js";

function head(title, sub, back = "#/learn") {
  return `<header class="page-head"><a class="icon-btn back" href="${back}" aria-label="Back">${icon("back")}</a><div class="grow"><h1>${esc(title)}</h1>${sub ? `<p class="muted small">${esc(sub)}</p>` : ""}</div><span class="t-ic sky">${icon("spell")}</span></header>`;
}
function tabs(on) {
  const t = [["", "Confusing words", "layers"], ["test", "Spelling tests", "pen"], ["list", "Word list", "list"]];
  return `<nav class="tabs" aria-label="Spelling sections">${t.map(([k, l, ic]) => `<a class="tab ${on === k ? "on" : ""}" href="#/spelling${k ? "/" + k : ""}" ${on === k ? 'aria-current="page"' : ""}>${icon(ic)} ${l}</a>`).join("")}</nav>`;
}

export function render(view, params) {
  const [a, b, c] = params;
  if (a === "pair" && b) { const p = PAIRS.find((x) => x.id === b); if (p) return c === "quiz" ? pairQuiz(view, p) : pairPage(view, p); }
  if (a === "test" && b) return runTest(view, b);
  if (a === "test") return testMenu(view);
  if (a === "list") return wordList(view);
  pairsList(view);
}

let pf = null, wf = null;
const MW = () => MISSPELLED.map((m) => ({ m, level: missLevel(m[0]) }));
function pairsList(view) {
  if (pf === null) pf = startFilter(PAIRS);
  const done = PAIRS.filter((p) => store.lesson("spelling", p.id)).length;
  view.innerHTML = `${head("Spelling", `${done} of ${PAIRS.length} word groups done`)}${tabs("")}
  <p class="muted">These words sound the same (or almost the same), but the spelling and meaning are different.</p>
  ${levelPills(PAIRS, pf)}
  <div class="pair-grid">${applyLevel(PAIRS, pf).map((p) => { const l = store.lesson("spelling", p.id); return `<a class="card pair-card" href="#/spelling/pair/${p.id}">${levelChip(p.level)}<b>${esc(p.title)}</b><span class="small muted">${p.words.length} words · ${p.quiz.length} questions</span>${l ? `<span class="pill ok">${icon("check")} ${l.best}%</span>` : `<span class="pill soft">New</span>`}</a>`; }).join("")}</div>`;
  $$("[data-f]", view).forEach((b) => b.addEventListener("click", () => { pf = b.dataset.f; pairsList(view); }));
}

function pairPage(view, p) {
  const l = store.lesson("spelling", p.id);
  store.setLast({ href: `#/spelling/pair/${p.id}`, title: p.title, sub: "Spelling · confusing words", pct: l ? l.best : 0 });
  setHelperContext({ tip: p.tip, exTitle: "More examples", examples: p.words.map((w) => w.ex).concat(p.quiz.map((q) => q.q.replace("___", q.a[q.c]))) });
  view.innerHTML = `${head(p.title, "Confusing words", "#/spelling")}
  <div class="word-cards">${p.words.map((w) => `<section class="card wcard"><div class="row gap center-y"><h2 class="big-word">${esc(w.w)}</h2>${listenBtn(w.w)}</div><p><b>Meaning:</b> ${esc(w.m)}</p><p class="ex-line">${listenBtn(w.ex)}<span>${esc(w.ex)}</span></p></section>`).join("")}</div>
  <section class="card tip">${icon("bulb")}<div><b>How to remember</b><p>${esc(p.tip)}</p></div></section>
  <div class="cta-bar card"><div><b>Test yourself</b><p class="small muted">${p.quiz.length} questions${l ? ` · best ${l.best}%` : ""}</p></div><a class="btn primary big" href="#/spelling/pair/${p.id}/quiz">${icon("play")} Start</a></div>`;
}

function pairQuiz(view, p) {
  view.innerHTML = `${head(p.title, "Practice", `#/spelling/pair/${p.id}`)}<div id="quiz"></div>`;
  runQuiz($("#quiz", view), { title: p.title, questions: shuffle(p.quiz), area: "spelling", id: p.id, skill: "spelling", exitLabel: "All word groups", onExit: () => (location.hash = "#/spelling") });
}

function testMenu(view) {
  const best = (id) => { const l = store.lesson("spelling", id); return l ? `Best ${l.best}%` : "Not tried yet"; };
  view.innerHTML = `${head("Spelling", "Spelling tests")}${tabs("test")}
  <div class="option-cards">
    <a class="card opt-card" href="#/spelling/test/choose"><span class="t-ic peach">${icon("check")}</span><span class="grow"><b>Choose the right spelling</b><small class="muted">10 words. Pick the correct one. · ${best("test-choose")}</small></span>${icon("chevron", "chev")}</a>
    ${hasSpeech ? `<a class="card opt-card" href="#/spelling/test/listen"><span class="t-ic mint">${icon("volume")}</span><span class="grow"><b>Listen and write</b><small class="muted">Hear a word, then type it. · ${best("test-listen")}</small></span>${icon("chevron", "chev")}</a>`
      : `<div class="card note">${icon("alert")}<span class="small">“Listen and write” needs a browser that can speak (for example Chrome, Edge or Safari).</span></div>`}
    <a class="card opt-card" href="#/spelling/test/mixed"><span class="t-ic lavender">${icon("shuffle")}</span><span class="grow"><b>Confusing words mix</b><small class="muted">10 questions from all word groups. · ${best("test-mixed")}</small></span>${icon("chevron", "chev")}</a>
  </div>`;
}

function runTest(view, kind) {
  let qs, title, id = "test-" + kind;
  if (kind === "choose") {
    title = "Choose the right spelling";
    qs = sample(MISSPELLED, 10).map(([w, x1, x2, tip]) => { const opts = shuffle([w, x1, x2]); return { q: "Which spelling is correct (British English)?", a: opts, c: opts.indexOf(w), e: tip }; });
  } else if (kind === "listen" && hasSpeech) {
    title = "Listen and write";
    qs = sample(MISSPELLED, 10).map(([w, , , tip]) => ({ t: "fill", q: "Listen and type the word.", say: w, ans: [w], e: tip }));
  } else if (kind === "mixed") {
    title = "Confusing words mix";
    qs = sample(PAIRS.flatMap((p) => p.quiz), 10);
  } else { location.replace("#/spelling/test"); return; }
  view.innerHTML = `${head(title, "Spelling test", "#/spelling/test")}<div id="quiz"></div>`;
  runQuiz($("#quiz", view), { title, questions: qs, area: "spelling", id, skill: "spelling", exitLabel: "All tests", onExit: () => (location.hash = "#/spelling/test") });
}

function wordList(view) {
  if (wf === null) wf = startFilter(MW());
  view.innerHTML = `${head("Spelling", "Commonly misspelled words")}${tabs("list")}
  <label class="search"><span class="sr-only">Search words</span>${icon("search")}<input id="sp-q" class="input" type="search" placeholder="Search a word" /></label>
  ${levelPills(MW(), wf)}
  <ul class="spell-list" id="sp-list"></ul>`;
  $$("[data-f]", view).forEach((b) => b.addEventListener("click", () => { wf = b.dataset.f; wordList(view); }));
  const draw = (q = "") => {
    const items = applyLevel(MW().filter((x) => x.m[0].toLowerCase().includes(q.toLowerCase())), q ? "all" : wf).map((x) => x.m);
    $("#sp-list", view).innerHTML = items.length ? items.map(([w, x1, , tip]) => `<li class="card"><div class="row gap center-y"><b class="sp-word">${esc(w)}</b>${listenBtn(w)}<span class="grow"></span><span class="small muted">not <s>${esc(x1)}</s></span></div><p class="small">${icon("bulb")} ${esc(tip)}</p></li>`).join("") : `<li class="card muted">No words found.</li>`;
  };
  draw();
  $("#sp-q", view).addEventListener("input", (e) => draw(e.target.value));
}
