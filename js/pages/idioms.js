import * as store from "../store.js";
import { icon } from "../icons.js";
import { $, $$, esc, levelChip, runQuiz, listenBtn, shuffle, sample, levelPills, applyLevel, startFilter } from "../ui.js";
import { IDIOMS, PHRASAL } from "../data/idioms.js";

function head(title, sub, back = "#/learn") {
  return `<header class="page-head"><a class="icon-btn back" href="${back}" aria-label="Back">${icon("back")}</a><div class="grow"><h1>${esc(title)}</h1>${sub ? `<p class="muted small">${esc(sub)}</p>` : ""}</div><span class="t-ic pink">${icon("sparkles")}</span></header>`;
}
function tabs(on) {
  const t = [["", "Idioms", "sparkles"], ["phrasal", "Phrasal verbs", "layers"], ["practice", "Practice", "play"]];
  return `<nav class="tabs" aria-label="Idioms sections">${t.map(([k, l, ic]) => `<a class="tab ${on === k ? "on" : ""}" href="#/idioms${k ? "/" + k : ""}" ${on === k ? 'aria-current="page"' : ""}>${icon(ic)} ${l}</a>`).join("")}</nav>`;
}
export function render(view, params) {
  const [a, b] = params;
  if (a === "practice" && b) return quiz(view, b);
  if (a === "practice") return practiceMenu(view);
  listPage(view, a === "phrasal" ? "phrasal" : "");
}
let q = "";
const lvF = {};
function listPage(view, kind) {
  const items = kind === "phrasal" ? PHRASAL : IDIOMS;
  if (!lvF[kind]) lvF[kind] = startFilter(items);
  const lf = lvF[kind];
  view.innerHTML = `${head("Idioms & Phrasal Verbs", "Common expressions in British English")}${tabs(kind)}
  <p class="muted small">${kind === "phrasal" ? "A phrasal verb = verb + small word (up, on, out…). The meaning is often new: give up = stop trying." : "An idiom is a group of words with a special meaning. “It's a piece of cake” = it's very easy."}</p>
  <label class="search"><span class="sr-only">Search</span>${icon("search")}<input id="i-q" class="input" type="search" placeholder="Search" value="${esc(q)}" /></label>
  ${levelPills(items, lf)}
  <ul class="idiom-list" id="i-list"></ul>`;
  $$("[data-f]", view).forEach((b) => b.addEventListener("click", () => { lvF[kind] = b.dataset.f; listPage(view, kind); }));
  const draw = () => {
    const s = q.toLowerCase();
    const list = applyLevel(items.filter((x) => !s || x.p.toLowerCase().includes(s) || x.m.toLowerCase().includes(s)), s ? "all" : lf);
    $("#i-list", view).innerHTML = list.length ? list.map((x) => `<li class="card idiom"><div class="row gap center-y"><b class="idiom-p">${esc(x.p)}</b>${listenBtn(x.p)}<span class="grow"></span>${levelChip(x.level)}</div><p>${esc(x.m)}</p><p class="ex-line small">${listenBtn(x.ex, "Listen to the example")}<span>${esc(x.ex)}</span></p></li>`).join("") : `<li class="card muted">Nothing found.</li>`;
  };
  draw();
  $("#i-q", view).addEventListener("input", (e) => { q = e.target.value; draw(); });
}
function practiceMenu(view) {
  const best = (id) => { const l = store.lesson("idioms", id); return l ? `Best ${l.best}%` : "Not tried yet"; };
  view.innerHTML = `${head("Idioms & Phrasal Verbs", "Practice")}${tabs("practice")}
  <div class="option-cards">
    <a class="card opt-card" href="#/idioms/practice/idioms"><span class="t-ic pink">${icon("sparkles")}</span><span class="grow"><b>Idioms quiz</b><small class="muted">10 questions · ${best("quiz-idioms")}</small></span>${icon("chevron", "chev")}</a>
    <a class="card opt-card" href="#/idioms/practice/phrasal"><span class="t-ic mint">${icon("layers")}</span><span class="grow"><b>Phrasal verbs quiz</b><small class="muted">10 questions · ${best("quiz-phrasal")}</small></span>${icon("chevron", "chev")}</a>
    <a class="card opt-card" href="#/idioms/practice/mix"><span class="t-ic lavender">${icon("shuffle")}</span><span class="grow"><b>Mixed quiz</b><small class="muted">10 questions · ${best("quiz-mix")}</small></span>${icon("chevron", "chev")}</a>
  </div>`;
}
function makeQs(pool) {
  return sample(pool, 10).map((x, k) => {
    const others = shuffle(pool.filter((o) => o.id !== x.id));
    const re = new RegExp(x.p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/someone's/, "\\w+'s"), "i");
    const canBlank = !x.p.includes("/") && re.test(x.ex);
    if (canBlank && k % 2 === 1) {
      const opts = shuffle([x, others[0], others[1]]);
      return { q: `Complete: ${x.ex.replace(re, "___")}`, a: opts.map((o) => o.p), c: opts.indexOf(x), e: `“${x.p}” means: ${x.m}.` };
    }
    const opts = shuffle([x, others[0], others[1]]);
    return { q: `What does “${x.p}” mean?`, a: opts.map((o) => o.m), c: opts.indexOf(x), e: `Example: ${x.ex}` };
  });
}
function quiz(view, kind) {
  const pool = kind === "phrasal" ? PHRASAL : kind === "mix" ? IDIOMS.concat(PHRASAL) : IDIOMS;
  const title = kind === "phrasal" ? "Phrasal verbs quiz" : kind === "mix" ? "Mixed quiz" : "Idioms quiz";
  view.innerHTML = `${head(title, "Idioms & Phrasal Verbs", "#/idioms/practice")}<div id="quiz"></div>`;
  runQuiz($("#quiz", view), { title, questions: makeQs(pool), area: "idioms", id: "quiz-" + kind, skill: "vocabulary", exitLabel: "Back", onExit: () => (location.hash = "#/idioms/practice") });
}
