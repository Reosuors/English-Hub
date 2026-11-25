import * as store from "../store.js";
import { icon } from "../icons.js";
import { $, $$, esc, listenBtn, runQuiz, shuffle, sample, levelChip, levelPills, applyLevel, startFilter } from "../ui.js";
import { MISTAKE_GROUPS } from "../data/mistakes.js";
import { setHelperContext } from "../helper.js";

function head(title, sub, back = "#/learn") {
  return `<header class="page-head"><a class="icon-btn back" href="${back}" aria-label="Back">${icon("back")}</a><div class="grow"><h1>${esc(title)}</h1>${sub ? `<p class="muted small">${esc(sub)}</p>` : ""}</div><span class="t-ic peach">${icon("alert")}</span></header>`;
}
const ALL = () => MISTAKE_GROUPS.flatMap((g) => g.items.map((it) => ({ g, it })));
export function makeMistakeQs(items, n = 10) {
  items = items.filter(({ it }) => !it[0].includes("(=") && !/usually say/.test(it[2]));
  return sample(items, Math.min(n, items.length)).map(({ it: [wrong, right, why] }) => {
    const rightClean = right.split(" / ")[0];
    const opts = shuffle([rightClean, wrong]);
    return { q: "Which sentence is correct?", a: opts, c: opts.indexOf(rightClean), e: why };
  });
}
export function render(view, params) {
  const [a, b] = params;
  if (a === "quiz") return quiz(view, b || "all");
  if (a) { const g = MISTAKE_GROUPS.find((x) => x.id === a); if (g) return group(view, g); }
  list(view);
}
let mf = null;
function list(view) {
  if (mf === null) mf = startFilter(MISTAKE_GROUPS);
  const total = ALL().length;
  view.innerHTML = `${head("Common Mistakes", `${total} mistakes learners often make — and how to fix them`)}
  <a class="card pastel peach continue" href="#/mistakes/quiz/all"><div><p class="small strong">${icon("zap")} Quick quiz</p><h3>Spot the correct sentence</h3><p class="small">10 questions from all groups</p><span class="btn dark sm">${icon("play")} Start</span></div></a>
  ${levelPills(MISTAKE_GROUPS, mf)}
  <div class="pair-grid">${applyLevel(MISTAKE_GROUPS, mf).map((g) => { const l = store.lesson("mistakes", g.id); return `<a class="card scen-card" href="#/mistakes/${g.id}"><span class="t-ic ${g.color}">${icon(g.icon)}</span><b>${esc(g.title)}</b><span class="row gap wrap">${levelChip(g.level)}<span class="small muted">${g.items.length} mistakes</span>${l ? `<span class="pill ok">${icon("check")} ${l.best}%</span>` : ""}</span></a>`; }).join("")}</div>`;
  $$("[data-f]", view).forEach((b) => b.addEventListener("click", () => { mf = b.dataset.f; list(view); }));
}
function group(view, g) {
  const l = store.lesson("mistakes", g.id);
  store.setLast({ href: `#/mistakes/${g.id}`, title: g.title, sub: "Common Mistakes", pct: l ? l.best : 0 });
  setHelperContext({ tip: "Read the wrong sentence, then say the right one out loud. Use the Check tab to test your own sentences.", exTitle: "Correct sentences", examples: g.items.map((x) => x[1].split(" / ")[0]) });
  view.innerHTML = `${head(g.title, "Common Mistakes", "#/mistakes")}
  <section class="card lesson-sec"><ul class="mistakes">${g.items.map(([w, r, why]) => `<li><p class="wrong-line">${icon("x")} <s>${esc(w)}</s></p><p class="right-line">${icon("check")} <b>${esc(r)}</b> ${listenBtn(r.split(" / ")[0])}</p><p class="small muted">${esc(why)}</p></li>`).join("")}</ul></section>
  <div class="cta-bar card"><div><b>Test yourself</b><p class="small muted">${Math.min(10, g.items.length)} questions${l ? ` · best ${l.best}%` : ""}</p></div><a class="btn primary big" href="#/mistakes/quiz/${g.id}">${icon("play")} Start</a></div>`;
}
function quiz(view, id) {
  const g = MISTAKE_GROUPS.find((x) => x.id === id);
  const items = g ? g.items.map((it) => ({ g, it })) : ALL();
  const title = g ? g.title : "Common Mistakes quiz";
  view.innerHTML = `${head(title, "Spot the correct sentence", g ? `#/mistakes/${g.id}` : "#/mistakes")}<div id="quiz"></div>`;
  runQuiz($("#quiz", view), { title, questions: makeMistakeQs(items), area: "mistakes", id: g ? g.id : "all", skill: "grammar", exitLabel: "All mistakes", onExit: () => (location.hash = "#/mistakes") });
}
