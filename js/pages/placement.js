import * as store from "../store.js";
import { icon } from "../icons.js";
import { $, $$, esc, bar, ring, levelChip, fmtDate } from "../ui.js";
import { PLACEMENT, PLACEMENT_READING, PLACEMENT_WRITING } from "../data/placement.js";
import { checkText, analyseWriting } from "../lt.js";

const SKILL_LABEL = { grammar: "Grammar", vocabulary: "Words", reading: "Reading", writing: "Writing" };
const SKILL_ICON = { grammar: "book", vocabulary: "cards", reading: "bookopen", writing: "pen" };
let run = null;

export function render(view) {
  run = null;
  intro(view);
  return () => { run = null; };
}

function head(sub = "") {
  return `<header class="page-head"><a class="icon-btn back" href="#/learn" aria-label="Back">${icon("back")}</a><div class="grow"><h1>Level Test</h1>${sub ? `<p class="muted small">${esc(sub)}</p>` : ""}</div><span class="t-ic lavender">${icon("target")}</span></header>`;
}

function intro(view) {
  const p = store.get().placement;
  const counts = PLACEMENT.reduce((a, q) => ((a[q.skill] = (a[q.skill] || 0) + 1), a), {});
  view.innerHTML = `${head("Find your English level")}
  ${p ? `<section class="card pastel lavender result-mini"><div><p class="small strong">Your last result (${esc(fmtDate(p.date))})</p><h2>${esc(store.levelName(p.level))}</h2></div><button class="btn dark sm" type="button" data-show>${icon("eye")} See result</button></section>` : ""}
  <section class="card">
    <h2 class="h3">How it works</h2>
    <ul class="step-list">
      <li><span class="t-ic peach">${icon("book")}</span><span><b>Grammar</b><small class="muted">${counts.grammar} questions</small></span></li>
      <li><span class="t-ic mint">${icon("cards")}</span><span><b>Words</b><small class="muted">${counts.vocabulary} questions</small></span></li>
      <li><span class="t-ic sky">${icon("bookopen")}</span><span><b>Reading</b><small class="muted">${counts.reading} questions about 3 short texts</small></span></li>
      <li><span class="t-ic yellow">${icon("pen")}</span><span><b>Writing</b><small class="muted">Write a few sentences about yourself</small></span></li>
    </ul>
    <p class="small muted">${icon("clock")} About 10 minutes. The questions start easy and get harder. It's OK if you don't know an answer — just choose your best guess.</p>
    <p class="small muted">Your result uses the UK ESOL levels: Pre-Entry, Entry 1, Entry 2, Entry 3, Level 1 and Level 2.</p>
    <button class="btn primary big w100" type="button" data-start>${icon("play")} ${p ? "Take the test again" : "Start the test"}</button>
  </section>`;
  $("[data-start]", view).addEventListener("click", () => { run = { i: 0, answers: [] }; question(view); });
  const sb = $("[data-show]", view); if (sb) sb.addEventListener("click", () => results(view, p));
}

function question(view) {
  const q = PLACEMENT[run.i];
  const total = PLACEMENT.length + 1;
  const passage = q.passage ? PLACEMENT_READING[q.passage] : null;
  view.innerHTML = `${head(`${SKILL_LABEL[q.skill]} · question ${run.i + 1} of ${total}`)}
  ${bar((run.i / total) * 100, "thin")}
  <section class="card quiz">
    <p class="pill soft">${icon(SKILL_ICON[q.skill])} ${SKILL_LABEL[q.skill]}</p>
    ${passage ? `<div class="passage"><b>${esc(passage.title)}</b><p>${esc(passage.text)}</p></div>` : ""}
    <h3 class="q-text">${esc(q.q)}</h3>
    <div class="q-body">${q.a.map((a, k) => `<button class="opt" type="button" data-k="${k}" aria-pressed="false"><b>${"ABC"[k]}</b><span>${esc(a)}</span></button>`).join("")}</div>
    <div class="row between mt"><button class="btn ghost" type="button" data-prev ${run.i === 0 ? "disabled" : ""}>${icon("back")} Back</button><button class="btn primary" type="button" data-next disabled>Next ${icon("next")}</button></div>
  </section>`;
  let pick = run.answers[run.i];
  const mark = () => { $$(".opt", view).forEach((b) => { const on = Number(b.dataset.k) === pick; b.classList.toggle("picked", on); b.setAttribute("aria-pressed", on); }); $("[data-next]", view).disabled = pick === undefined; };
  mark();
  $$(".opt", view).forEach((b) => b.addEventListener("click", () => { pick = Number(b.dataset.k); mark(); }));
  $("[data-next]", view).addEventListener("click", () => { run.answers[run.i] = pick; run.i++; if (run.i < PLACEMENT.length) question(view); else writing(view); });
  $("[data-prev]", view).addEventListener("click", () => { run.answers[run.i] = pick; run.i = Math.max(0, run.i - 1); question(view); });
}

function writing(view) {
  const total = PLACEMENT.length + 1;
  view.innerHTML = `${head(`Writing · question ${total} of ${total}`)}
  ${bar(((total - 1) / total) * 100, "thin")}
  <section class="card quiz">
    <p class="pill soft">${icon("pen")} Writing</p>
    <h3 class="q-text">${esc(PLACEMENT_WRITING.prompt)}</h3>
    <label class="sr-only" for="pw-text">Your writing</label>
    <textarea id="pw-text" class="input textarea" rows="8" placeholder="My name is … I live in …">${esc(run.text || "")}</textarea>
    <div class="row between"><span class="small muted" id="pw-count">0 words</span><span class="small muted">At least ${PLACEMENT_WRITING.minWords} words</span></div>
    <p class="form-error" role="alert"></p>
    <div class="row between mt"><button class="btn ghost" type="button" data-prev>${icon("back")} Back</button><button class="btn primary" type="button" data-finish>${icon("check")} Finish the test</button></div>
  </section>`;
  const ta = $("#pw-text", view);
  const count = () => { const n = (ta.value.match(/[A-Za-z']+/g) || []).length; $("#pw-count", view).textContent = `${n} word${n === 1 ? "" : "s"}`; return n; };
  count(); ta.addEventListener("input", () => { run.text = ta.value; count(); });
  $("[data-prev]", view).addEventListener("click", () => { run.i = PLACEMENT.length - 1; question(view); });
  $("[data-finish]", view).addEventListener("click", async () => {
    if (count() < PLACEMENT_WRITING.minWords) { $(".form-error", view).textContent = `Please write at least ${PLACEMENT_WRITING.minWords} words.`; ta.focus(); return; }
    const btn = $("[data-finish]", view); btn.disabled = true; btn.innerHTML = `<span class="spinner" aria-hidden="true"></span> Checking…`;
    const lt = await checkText(ta.value);
    finish(view, ta.value, lt);
  });
}

function finish(view, text, lt) {
  const per = {}; const bySkill = {};
  PLACEMENT.forEach((q, k) => {
    const ok = run.answers[k] === q.c;
    (per[q.level] = per[q.level] || { c: 0, t: 0 }); per[q.level].t++; if (ok) per[q.level].c++;
    (bySkill[q.skill] = bySkill[q.skill] || { c: 0, t: 0 }); bySkill[q.skill].t++; if (ok) bySkill[q.skill].c++;
    store.recordAnswer(q.skill, ok);
  });
  const codes = store.LEVELS.map((l) => l.code);
  // codes[0] is Pre-Entry (no test questions). Pass Entry 1 (60%+) to move up the ladder.
  let base = 1;
  for (let k = 1; k < codes.length; k++) { const p = per[codes[k]]; if (p && p.c / p.t >= 0.6) base = k; else break; }
  const tot = Object.values(per).reduce((a, v) => ({ c: a.c + v.c, t: a.t + v.t }), { c: 0, t: 0 });
  const e1 = per[codes[1]] || { c: 0, t: 1 };
  const veryLow = e1.c / e1.t < 0.4 && tot.c / Math.max(1, tot.t) < 0.25;
  const w = analyseWriting(text, lt.ok ? lt.matches : null);
  const wl = w.level + 1; // analyseWriting: 0 = Entry 1 … 4 = Level 2
  let final = base;
  if (wl >= base + 2) final = base + 1; else if (wl <= base - 2) final = base - 1;
  final = veryLow ? 0 : Math.max(1, Math.min(codes.length - 1, final));
  const result = {
    level: codes[final], date: store.today(),
    scores: Object.fromEntries(Object.entries(bySkill).map(([k, v]) => [k, Math.round((v.c / v.t) * 100)])),
    writingLevel: codes[wl], writing: { wc: w.wc, connectors: w.connectors, tenses: w.tenseCount, checked: lt.ok, errors: lt.ok ? lt.matches.length : null },
    feedback: lt.ok ? lt.matches.slice(0, 8).map((m) => ({ msg: m.message, bad: text.substr(m.offset, m.length), fix: (m.replacements[0] || {}).value || "" })) : []
  };
  store.set({ placement: result, level: result.level });
  store.addXP(50);
  run = null;
  document.dispatchEvent(new CustomEvent("elh:progress"));
  results(view, result, true);
}

function results(view, p, fresh = false) {
  const lvl = store.LEVELS.find((l) => l.code === p.level);
  const idx = store.levelIndex(p.level);
  view.innerHTML = `${head("Your result")}
  <section class="card pastel lavender result-hero">
    <p class="small strong">${fresh ? "Well done! You finished the test." : `Result from ${esc(fmtDate(p.date))}`}</p>
    <h2 class="result-level">${esc(lvl.name)}</h2>
    <div class="ladder" aria-label="Level ${idx + 1} of ${store.LEVELS.length}">${store.LEVELS.map((l, k) => `<span class="${k <= idx ? "on" : ""}" title="${l.name}"></span>`).join("")}</div>
    <p>${esc(lvl.desc)}</p>
    ${fresh ? `<span class="pill orange">${icon("zap")} +50 XP</span>` : ""}
  </section>
  <section class="card">
    <h2 class="h3">Your scores</h2>
    <ul class="score-list">
      ${["grammar", "vocabulary", "reading"].map((k) => `<li><span class="t-ic sm ${k === "grammar" ? "peach" : k === "vocabulary" ? "mint" : "sky"}">${icon(SKILL_ICON[k])}</span><span class="grow"><b>${SKILL_LABEL[k]}</b>${bar(p.scores[k] || 0)}</span><b>${p.scores[k] || 0}%</b></li>`).join("")}
      <li><span class="t-ic sm yellow">${icon("pen")}</span><span class="grow"><b>Writing</b><small class="muted">${p.writing.wc} words · ${p.writing.connectors} linking words · ${p.writing.tenses} tense${p.writing.tenses === 1 ? "" : "s"}${p.writing.checked ? ` · ${p.writing.errors} possible mistake${p.writing.errors === 1 ? "" : "s"} found` : ""}</small></span>${levelChip(p.writingLevel)}</li>
    </ul>
    ${!p.writing.checked ? `<p class="small muted">${icon("alert")} The online grammar checker was not available, so mistakes in your writing were not counted.</p>` : ""}
  </section>
  ${p.feedback && p.feedback.length ? `<section class="card"><h2 class="h3">${icon("pen")} Notes on your writing</h2><ul class="fb-list">${p.feedback.map((f) => `<li><p><s>${esc(f.bad)}</s>${f.fix ? ` → <b>${esc(f.fix)}</b>` : ""}</p><p class="small muted">${esc(f.msg)}</p></li>`).join("")}</ul></section>` : ""}
  <section class="card tip">${icon("bulb")}<div><b>This is an estimate</b><p class="small">The test is short, so the result is a guide, not an official exam result. You can change your level any time on the “Me” page.</p></div></section>
  <div class="row gap wrap"><a class="btn primary big" href="#/">${icon("home")} Start learning</a><a class="btn secondary" href="#/grammar">${icon("book")} Grammar for my level</a><button class="btn ghost" type="button" data-again>${icon("refresh")} Take it again</button></div>`;
  $("[data-again]", view).addEventListener("click", () => { run = { i: 0, answers: [] }; question(view); });
}
