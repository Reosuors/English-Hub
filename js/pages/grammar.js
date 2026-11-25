import * as store from "../store.js";
import { icon } from "../icons.js";
import { $, $$, esc, listenBtn, levelChip, runQuiz, bar, shuffle, levelPills, applyLevel, startFilter } from "../ui.js";
import { GRAMMAR } from "../data/grammar.js";
import { setHelperContext } from "../helper.js";

let filter = null;

export function render(view, params) {
  const [id, mode] = params;
  if (id) {
    const t = GRAMMAR.find((g) => g.id === id);
    if (!t) { view.innerHTML = `<div class="card empty">${icon("alert")}<h1>Lesson not found</h1><a class="btn primary" href="#/grammar">${icon("back")} All lessons</a></div>`; return; }
    return mode === "quiz" ? renderQuiz(view, t) : renderLesson(view, t);
  }
  renderList(view);
}

function renderList(view) {
  const s = store.get();
  if (filter === null) filter = startFilter(GRAMMAR);
  const levels = store.LEVELS.filter((l) => GRAMMAR.some((g) => g.level === l.code));
  const list = applyLevel(GRAMMAR, filter);
  const done = GRAMMAR.filter((g) => store.lesson("grammar", g.id)).length;
  view.innerHTML = `
  <header class="page-head"><a class="icon-btn back" href="#/learn" aria-label="Back to Learn">${icon("back")}</a><div class="grow"><h1>Grammar</h1><p class="muted small">${done} of ${GRAMMAR.length} lessons done</p></div><span class="t-ic peach">${icon("book")}</span></header>
  ${levelPills(GRAMMAR, filter)}
  <ul class="topic-list">
    ${list.map((t) => { const l = store.lesson("grammar", t.id); return `<li><a class="card topic-row" href="#/grammar/${t.id}">
      <span class="tr-state ${l ? (l.best >= 80 ? "master" : "done") : ""}">${l ? icon("check") : icon("book")}</span>
      <span class="grow"><span class="row gap center-y wrap">${levelChip(t.level)}${l ? `<span class="small muted">Best ${l.best}%</span>` : ""}</span><b>${esc(t.title)}</b><small class="muted">${esc(t.summary)}</small></span>
      ${icon("chevron", "chev")}</a></li>`; }).join("")}
  </ul>`;
  $$(".pill-btn", view).forEach((b) => b.addEventListener("click", () => { filter = b.dataset.f; renderList(view); }));
}

function renderBlock(sec) {
  return `<section class="card lesson-sec"><h2>${esc(sec.h)}</h2>
    ${sec.p ? `<p>${esc(sec.p)}</p>` : ""}
    ${sec.list ? `<ul class="dot-list">${sec.list.map((x) => `<li><span>${esc(x)}</span></li>`).join("")}</ul>` : ""}
    ${sec.table ? `<div class="g-table" role="table">${sec.table.map((r) => `<div class="g-tr" role="row">${r.map((c) => `<span role="cell">${esc(c)}</span>`).join("")}</div>`).join("")}</div>` : ""}
  </section>`;
}

function renderLesson(view, t) {
  const idx = GRAMMAR.indexOf(t);
  const prev = GRAMMAR[idx - 1], next = GRAMMAR[idx + 1];
  const l = store.lesson("grammar", t.id);
  store.setLast({ href: `#/grammar/${t.id}`, title: t.title, sub: `Grammar · ${store.levelName(t.level)}`, pct: l ? l.best : 0 });
  setHelperContext({ tip: t.summary + " " + (t.mistakes[0] ? "Watch out: " + t.mistakes[0].why : ""), exTitle: "More examples: " + t.title, examples: t.examples.concat(t.mistakes.map((m) => m.right)).concat(t.sections.flatMap((s) => (s.list || []).filter((x) => /[.!?]$/.test(x) && x.split(" ").length > 3 && !/[→=:()]/.test(x)))) });
  view.innerHTML = `
  <header class="page-head"><a class="icon-btn back" href="#/grammar" aria-label="Back to all grammar lessons">${icon("back")}</a><div class="grow">${levelChip(t.level)}<h1>${esc(t.title)}</h1></div></header>
  <p class="lead">${esc(t.summary)}</p>
  ${l ? `<div class="card done-banner">${icon("check")}<span>You finished this lesson. Best score: <b>${l.best}%</b></span></div>` : ""}
  ${t.sections.map(renderBlock).join("")}
  <section class="card lesson-sec"><h2>${icon("volume")} Examples</h2>
    <ul class="example-list">${t.examples.map((e) => `<li>${listenBtn(e)}<span>${esc(e)}</span></li>`).join("")}</ul>
  </section>
  <section class="card lesson-sec"><h2>${icon("alert")} Common mistakes</h2>
    <ul class="mistakes">${t.mistakes.map((m) => `<li><p class="wrong-line">${icon("x")} <s>${esc(m.wrong)}</s></p><p class="right-line">${icon("check")} <b>${esc(m.right)}</b> ${listenBtn(m.right)}</p><p class="small muted">${esc(m.why)}</p></li>`).join("")}</ul>
  </section>
  <div class="cta-bar card"><div><b>Ready to practise?</b><p class="small muted">${t.quiz.length} questions · earn XP</p></div><a class="btn primary big" href="#/grammar/${t.id}/quiz">${icon("play")} Start practice</a></div>
  <nav class="prev-next" aria-label="More lessons">
    ${prev ? `<a class="card pn" href="#/grammar/${prev.id}">${icon("back")}<span><small class="muted">Previous</small><b>${esc(prev.title)}</b></span></a>` : "<span></span>"}
    ${next ? `<a class="card pn right" href="#/grammar/${next.id}"><span><small class="muted">Next</small><b>${esc(next.title)}</b></span>${icon("next")}</a>` : "<span></span>"}
  </nav>`;
}

function renderQuiz(view, t) {
  view.innerHTML = `
  <header class="page-head"><a class="icon-btn back" href="#/grammar/${t.id}" aria-label="Back to the lesson">${icon("back")}</a><div class="grow"><p class="small muted">Practice</p><h1>${esc(t.title)}</h1></div></header>
  <div id="quiz"></div>`;
  runQuiz($("#quiz", view), {
    title: t.title, questions: shuffle(t.quiz), area: "grammar", id: t.id, skill: "grammar",
    exitLabel: "Back to lesson", onExit: () => (location.hash = `#/grammar/${t.id}`),
    onFinish: ({ pct }) => store.setLast({ href: `#/grammar/${t.id}`, title: t.title, sub: `Grammar · ${store.levelName(t.level)}`, pct: Math.max(pct, (store.lesson("grammar", t.id) || {}).best || 0) })
  });
}
