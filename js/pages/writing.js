import * as store from "../store.js";
import { icon } from "../icons.js";
import { $, $$, esc, levelChip, ring, bar, toast, hashStr, fmtDate, listenBtn, levelPills, applyLevel, startFilter } from "../ui.js";
import { WRITING_TASKS, DAILY_CHALLENGES, UPGRADES } from "../data/writing.js";
import { checkText, analyseWriting } from "../lt.js";

const TYPES = ["All", "Sentences", "Paragraph", "Email", "Essay"];
let typeFilter = "All";
let lvFilter = null;
const CAT = {
  TYPOS: ["Spelling", "This word may be spelled wrong."], GRAMMAR: ["Grammar", "The grammar here is not correct."], PUNCTUATION: ["Punctuation", "Check the full stops, commas and other marks."],
  CASING: ["Capital letters", "Check where you need a capital letter (names, the start of a sentence, I)."], CONFUSED_WORDS: ["Confused words", "These words are easy to mix up."],
  TYPOGRAPHY: ["Typing", "A small typing issue, like spaces."], STYLE: ["Style", "This is correct, but it could sound better."], REDUNDANCY: ["Style", "Some words here are not needed."],
  COLLOCATIONS: ["Word choice", "These words don't usually go together."], SEMANTICS: ["Meaning", "Check the meaning here."], MISC: ["Other", "Check this part."]
};
const catOf = (m) => CAT[(m.rule && m.rule.category && m.rule.category.id) || "MISC"] || CAT.MISC;

export function dailyChallenge(date = store.today()) { return DAILY_CHALLENGES[hashStr("w" + date) % DAILY_CHALLENGES.length]; }
function drafts() { const s = store.get(); return s.drafts || (s.drafts = {}); }
function head(title, sub, back = "#/learn") {
  return `<header class="page-head"><a class="icon-btn back" href="${back}" aria-label="Back">${icon("back")}</a><div class="grow"><h1>${esc(title)}</h1>${sub ? `<p class="muted small">${esc(sub)}</p>` : ""}</div><span class="t-ic yellow">${icon("pen")}</span></header>`;
}

export function render(view, params) {
  const [a, b] = params;
  if (a === "task" && b) { const t = WRITING_TASKS.find((x) => x.id === b); if (t) return editor(view, t); }
  if (a === "daily") return editor(view, { id: "daily-" + store.today(), type: "Daily challenge", level: null, title: "Daily writing challenge", target: 50, prompt: dailyChallenge(), hints: [], daily: true });
  if (a === "free") return editor(view, { id: "free", type: "Free writing", level: null, title: "Check my writing", target: 0, prompt: "Write or paste any English text. We will check spelling, grammar and punctuation, and explain each correction.", hints: [], free: true });
  if (a === "history") return history(view);
  if (a === "words") return betterWords(view);
  list(view);
}

function list(view) {
  const s = store.get();
  const dailyId = "daily-" + store.today();
  const dailyDone = (s.writing || []).some((w) => w.taskId === dailyId);
  if (lvFilter === null) lvFilter = startFilter(WRITING_TASKS);
  const tasks = applyLevel(WRITING_TASKS.filter((t) => typeFilter === "All" || t.type === typeFilter), lvFilter);
  view.innerHTML = `${head("Writing", "Write in the app. Get corrections and a score.")}
  <a class="card pastel yellow continue" href="#/writing/daily">
    <div><p class="small strong">${icon("calendar")} Daily writing challenge</p><h3>${esc(dailyChallenge())}</h3><span class="btn dark sm">${icon(dailyDone ? "check" : "pen")} ${dailyDone ? "Done today — write again" : "Write now"}</span></div>
  </a>
  <div class="row gap wrap">
    <a class="btn secondary" href="#/writing/free">${icon("check")} Check any text</a>
    <a class="btn ghost" href="#/writing/words">${icon("sparkles")} Better words</a>
    ${(s.writing || []).length ? `<a class="btn ghost" href="#/writing/history">${icon("list")} My writing (${s.writing.length})</a>` : ""}
  </div>
  ${levelPills(WRITING_TASKS, lvFilter)}
  <div class="pills" role="tablist" aria-label="Type of writing">${TYPES.map((t) => `<button type="button" role="tab" class="pill-btn ${typeFilter === t ? "on" : ""}" aria-selected="${typeFilter === t}" data-t="${t}">${t}</button>`).join("")}</div>
  <ul class="topic-list">${tasks.map((t) => { const l = store.lesson("writing", t.id); return `<li><a class="card topic-row" href="#/writing/task/${t.id}">
    <span class="tr-state ${l ? (l.best >= 80 ? "master" : "done") : ""}">${l ? icon("check") : icon(t.type === "Email" ? "edit" : "pen")}</span>
    <span class="grow"><span class="row gap center-y wrap">${levelChip(t.level)}<span class="small muted">${t.type} · about ${t.target} words</span>${l ? `<span class="small muted">· best ${l.best}</span>` : ""}</span><b>${esc(t.title)}</b><small class="muted">${esc(t.prompt)}</small></span>${icon("chevron", "chev")}</a></li>`; }).join("")}</ul>`;
  $$("[data-t]", view).forEach((b) => b.addEventListener("click", () => { typeFilter = b.dataset.t; list(view); }));
  $$("[data-f]", view).forEach((b) => b.addEventListener("click", () => { lvFilter = b.dataset.f; list(view); }));
  if (!tasks.length) $(".topic-list", view).insertAdjacentHTML("beforeend", `<li class="card note small">No ${typeFilter === "All" ? "" : esc(typeFilter.toLowerCase()) + " "}tasks at this level yet. Try another level or “All levels”.</li>`);
}

function countWords(t) { return (t.match(/[A-Za-z']+/g) || []).length; }

function editor(view, task) {
  const d = drafts();
  view.innerHTML = `${head(task.title, task.type + (task.level ? " · " + store.levelName(task.level) : ""), "#/writing")}
  <section class="card">
    <p class="q-text">${esc(task.prompt)}</p>
    ${task.hints.length ? `<p class="small muted">Useful phrases (tap to add):</p><div class="row gap wrap">${task.hints.map((h) => `<button type="button" class="chip-word small" data-hint="${esc(h)}">${esc(h)}</button>`).join("")}</div>` : ""}
  </section>
  <section class="card stack">
    <label class="sr-only" for="w-text">Your writing</label>
    <textarea id="w-text" class="input textarea" rows="10" spellcheck="false" placeholder="Start writing here…">${esc(d[task.id] || "")}</textarea>
    <div class="row between wrap"><span class="small muted" id="w-count"></span><span class="small muted">${icon("check")} Your text is saved on this device</span></div>
    <div class="row gap wrap"><button class="btn primary big" type="button" data-check>${icon("sparkles")} Check my writing</button><button class="btn ghost" type="button" data-clear>${icon("trash")} Clear</button></div>
    <p class="small muted">The check uses LanguageTool (British English). Your text is sent to it only when you press “Check”.</p>
  </section>
  <div id="w-result" aria-live="polite"></div>`;
  const ta = $("#w-text", view);
  const upd = () => { const n = countWords(ta.value); $("#w-count", view).textContent = task.target ? `${n} / ${task.target} words` : `${n} words`; d[task.id] = ta.value; store.set({}); };
  upd(); ta.addEventListener("input", upd);
  $$("[data-hint]", view).forEach((b) => b.addEventListener("click", () => { const h = b.dataset.hint; ta.value = (ta.value && !/\s$/.test(ta.value) ? ta.value + " " : ta.value) + h + " "; upd(); ta.focus(); }));
  $("[data-clear]", view).addEventListener("click", () => { ta.value = ""; upd(); $("#w-result", view).innerHTML = ""; ta.focus(); });
  $("[data-check]", view).addEventListener("click", () => doCheck(view, task, ta));
}

async function doCheck(view, task, ta) {
  const text = ta.value;
  const out = $("#w-result", view);
  if (countWords(text) < 3) { out.innerHTML = `<div class="card note">${icon("alert")}<span>Please write a little more first (at least one full sentence).</span></div>`; ta.focus(); return; }
  const btn = $("[data-check]", view); btn.disabled = true; btn.innerHTML = `<span class="spinner" aria-hidden="true"></span> Checking…`;
  const lt = await checkText(text);
  btn.disabled = false; btn.innerHTML = `${icon("sparkles")} Check again`;
  const res = scoreWriting(text, task, lt);
  // record
  const s = store.get(); s.writing = s.writing || [];
  const firstToday = !s.writing.some((w) => w.taskId === task.id && w.date === store.today());
  s.writing.unshift({ taskId: task.id, title: task.title, text, score: res.score, date: store.today() }); s.writing = s.writing.slice(0, 40);
  const key = `writing/${task.id}`; const l = s.lessons[key] || (s.lessons[key] = { best: 0, attempts: 0, done: false });
  l.best = Math.max(l.best, res.score); l.attempts++; l.done = true; l.title = task.title; l.lastDate = store.today();
  store.recordAnswer("writing", res.score >= 60);
  let xp = 0; if (firstToday) { xp = 10 + (res.score >= 80 ? 5 : 0); store.addXP(xp); } else store.set({});
  document.dispatchEvent(new CustomEvent("elh:progress"));
  showResult(view, task, ta, text, lt, res, xp);
}

function scoreWriting(text, task, lt) {
  const a = analyseWriting(text, lt.ok ? lt.matches : null);
  const wc = a.wc;
  const real = lt.ok ? lt.matches.filter((m) => !["TYPOGRAPHY"].includes(m.rule?.category?.id)) : [];
  const weighted = real.reduce((n, m) => n + (["STYLE", "REDUNDANCY"].includes(m.rule?.category?.id) ? 0.5 : 1), 0);
  const errRate = (weighted / Math.max(1, wc)) * 100;
  const accuracy = lt.ok ? Math.max(0, Math.round(40 - errRate * 3)) : null;
  const length = task.target ? Math.round(20 * Math.min(1, wc / task.target)) : Math.round(20 * Math.min(1, wc / 40));
  const variety = Math.min(20, 6 * Math.min(a.advancedConnectors, 2) + 3 * Math.min(a.connectors - a.advancedConnectors, 2) + (a.tenseCount >= 2 ? 4 : a.tenseCount === 1 ? 2 : 0));
  const lower = text.toLowerCase();
  const ups0 = UPGRADES.filter(([w]) => new RegExp(`\\b${w}\\b`).test(lower));
  const ups = ups0.filter(([w]) => !ups0.some(([o]) => o !== w && o.includes(w) && (lower.match(new RegExp(`\\b${w}\\b`, "g")) || []).length <= (lower.match(new RegExp(`\\b${o}\\b`, "g")) || []).length));
  const vocab = Math.max(6, Math.min(20, Math.round(12 + (a.avgLen - 4) * 6 - ups.length * 2)));
  const parts = [["Accuracy", accuracy, 40], ["Length", length, 20], ["Variety", variety, 20], ["Vocabulary", vocab, 20]];
  const got = parts.filter((p) => p[1] !== null);
  const score = Math.round((got.reduce((n, p) => n + p[1], 0) / got.reduce((n, p) => n + p[2], 0)) * 100);
  // structure tips
  const tips = [];
  const sentences = text.split(/(?<=[.!?])\s+/).filter((x) => x.trim().split(/\s+/).length >= 1);
  const avgS = wc / Math.max(1, sentences.length);
  if (avgS < 7 && sentences.length >= 3) tips.push("Many of your sentences are very short. Join some with and, but, because or so.");
  if (avgS > 28) tips.push("Some sentences are very long. Try splitting them into two.");
  const starts = sentences.map((x) => (x.trim().split(/\s+/)[0] || "").toLowerCase());
  const rep = starts.find((w, i) => w && starts.indexOf(w) !== i && starts.filter((x) => x === w).length >= 3);
  if (rep) tips.push(`Several sentences start with “${rep}”. Try starting some sentences differently (After that, Usually, However…).`);
  if (a.connectors === 0) tips.push("Use linking words to connect your ideas: because, but, so, also, then, however.");
  if (task.type === "Email") {
    if (!/^(dear|hi|hello|good (morning|afternoon))\b/i.test(text)) tips.push("Start your email with a greeting, for example “Dear Mr Smith,” or “Hi Sara,”.");
    if (!/(regards|best wishes|yours sincerely|yours faithfully|thanks|thank you|many thanks)[,!.]?\s*\n?.{0,40}$/i.test(text)) tips.push("End your email with a closing, for example “Kind regards,” or “Best wishes,” and your name.");
  }
  if (task.type === "Essay") {
    if ((text.match(/\n\s*\n/g) || []).length < 2) tips.push("Organise your essay in paragraphs: introduction, main points, conclusion. Leave an empty line between paragraphs.");
    if (!/in conclusion|to conclude|to sum up|overall/i.test(text)) tips.push("Finish with a conclusion, for example “In conclusion, …”.");
  }
  if (task.target && wc < task.target * 0.6) tips.push(`Try to write about ${task.target} words. You wrote ${wc}.`);
  if (a.tenseCount <= 1 && wc > 30) tips.push("Try to use different tenses, for example the past simple and a future form.");
  return { score, parts, ups, tips, wc, errors: real.length, a };
}

function markedText(text, matches) {
  let html = "", pos = 0;
  matches.slice().sort((x, y) => x.offset - y.offset).forEach((m, k) => {
    if (m.offset < pos) return;
    html += esc(text.slice(pos, m.offset));
    html += `<mark class="err" data-mi="${matches.indexOf(m)}">${esc(text.substr(m.offset, m.length))}</mark>`;
    pos = m.offset + m.length;
  });
  return html + esc(text.slice(pos));
}

function showResult(view, task, ta, text, lt, res, xp) {
  const out = $("#w-result", view);
  let matches = lt.ok ? lt.matches.slice() : [];
  let fixed = 0;
  const draw = () => {
    const msg = res.score >= 85 ? "Excellent writing!" : res.score >= 70 ? "Very good! Check the notes below." : res.score >= 50 ? "Good try. Fix the mistakes and check again." : "Keep practising. Read the notes and try again.";
    out.innerHTML = `
    <section class="card result">
      <div class="result-top">${ring(res.score, { size: 110, stroke: 10 })}<div><h3>Score: ${res.score} / 100</h3><p class="muted">${msg}</p>${xp ? `<span class="pill orange">${icon("zap")} +${xp} XP</span>` : ""}</div></div>
      <ul class="score-list mt">${res.parts.map(([n, v, max]) => `<li><span class="grow"><b>${n}</b>${v === null ? `<small class="muted">Not checked (the online checker is not available)</small>` : bar((v / max) * 100)}</span><b>${v === null ? "–" : `${v}/${max}`}</b></li>`).join("")}</ul>
    </section>
    ${!lt.ok ? `<div class="card note">${icon("alert")}<span>${esc(lt.error)} Spelling and grammar were not checked this time. Please try again later.</span></div>` : ""}
    ${lt.ok ? `<section class="card"><div class="row between wrap"><h2 class="h3">${matches.length ? `${matches.length} thing${matches.length === 1 ? "" : "s"} to check` : fixed ? `${icon("check")} All fixed` : `${icon("check")} No mistakes found`}</h2>${matches.some((m) => m.replacements.length) ? `<button class="btn secondary sm" type="button" data-fixall>${icon("check")} Fix all</button>` : ""}</div>
      ${matches.length ? `<div class="marked">${markedText(ta.value, matches)}</div>
      <ul class="fb-list corrections">${matches.map((m, i) => { const [cat, plain] = catOf(m); const bad = ta.value.substr(m.offset, m.length); return `<li id="mi-${i}"><span class="pill soft">${esc(cat)}</span>
        <p class="mt-s"><s>${esc(bad)}</s>${m.replacements.length ? ` → <b>${esc(m.replacements[0].value)}</b>` : ""}</p>
        <p class="small">${esc(m.message)}</p><p class="small muted">${esc(plain)}</p>
        ${m.replacements.length ? `<div class="row gap wrap">${m.replacements.slice(0, 3).map((r, k) => `<button class="btn ghost sm" type="button" data-fix="${i}" data-r="${k}">${icon("check")} Use “${esc(r.value || "(remove)")}”</button>`).join("")}</div>` : ""}</li>`; }).join("")}</ul>` : fixed ? `<p class="muted">You fixed ${fixed} thing${fixed === 1 ? "" : "s"}. Press “Check again” to see your new score.</p>` : `<p class="muted">Great job — the checker found no spelling, grammar or punctuation mistakes.</p>`}</section>` : ""}
    ${res.ups.length ? `<section class="card"><h2 class="h3">${icon("sparkles")} Better words</h2><ul class="fb-list">${res.ups.map(([w, better, ex]) => `<li><p>Instead of <b>“${esc(w)}”</b>, try: <b>${esc(better)}</b></p><p class="small muted">${esc(ex)}</p></li>`).join("")}</ul></section>` : ""}
    ${res.tips.length ? `<section class="card"><h2 class="h3">${icon("bulb")} Tips to improve</h2><ul class="dot-list">${res.tips.map((t) => `<li><span>${esc(t)}</span></li>`).join("")}</ul></section>` : ""}`;
    const apply = (i, k) => {
      const m = matches[i]; const r = m.replacements[k]; const before = ta.value;
      ta.value = before.slice(0, m.offset) + r.value + before.slice(m.offset + m.length);
      const delta = r.value.length - m.length;
      matches = matches.filter((x, j) => j !== i).map((x) => (x.offset > m.offset ? Object.assign({}, x, { offset: x.offset + delta }) : x));
      fixed++; ta.dispatchEvent(new Event("input"));
    };
    $$("[data-fix]", out).forEach((b) => b.addEventListener("click", () => { apply(Number(b.dataset.fix), Number(b.dataset.r)); draw(); toast(`${icon("check")} Fixed`, "ok"); }));
    const fa = $("[data-fixall]", out);
    if (fa) fa.addEventListener("click", () => {
      matches.map((m, i) => ({ m, i })).filter((x) => x.m.replacements.length).sort((x, y) => y.m.offset - x.m.offset).forEach(({ m }) => { const v = ta.value; ta.value = v.slice(0, m.offset) + m.replacements[0].value + v.slice(m.offset + m.length); });
      fixed += matches.filter((m) => m.replacements.length).length; matches = matches.filter((m) => !m.replacements.length);
      ta.dispatchEvent(new Event("input")); draw(); toast(`${icon("check")} All suggestions applied. Press “Check again” to see your new score.`, "ok");
    });
    $$("mark.err", out).forEach((mk) => mk.addEventListener("click", () => { const li = $("#mi-" + mk.dataset.mi, out); if (li) li.scrollIntoView({ behavior: "smooth", block: "center" }); }));
  };
  draw();
  out.scrollIntoView({ behavior: "smooth", block: "start" });
}

function history(view) {
  const s = store.get(); const items = s.writing || [];
  view.innerHTML = `${head("My writing", `${items.length} saved`, "#/writing")}
  ${items.length ? `<ul class="word-list">${items.map((w, i) => `<li class="card"><div class="row between"><b>${esc(w.title)}</b><span class="pill soft">${w.score}/100</span></div><p class="small muted">${esc(fmtDate(w.date))}</p><p class="small clamp">${esc(w.text)}</p><button class="btn ghost sm" type="button" data-open="${i}">${icon("edit")} Open in editor</button></li>`).join("")}</ul>`
    : `<div class="card empty">${icon("pen")}<h3>Nothing yet</h3><p class="muted">Your checked writing will be saved here.</p><a class="btn primary" href="#/writing">${icon("pen")} Start writing</a></div>`}`;
  $$("[data-open]", view).forEach((b) => b.addEventListener("click", () => {
    const w = items[Number(b.dataset.open)];
    const real = WRITING_TASKS.find((t) => t.id === w.taskId);
    const id = real ? real.id : w.taskId.startsWith("daily-") && w.taskId === "daily-" + store.today() ? w.taskId : "free";
    drafts()[id] = w.text; store.set({});
    location.hash = real ? `#/writing/task/${real.id}` : id === "free" ? "#/writing/free" : "#/writing/daily";
  }));
}

function betterWords(view) {
  view.innerHTML = `${head("Better words", "Make your writing more interesting", "#/writing")}
  <section class="card"><ul class="fb-list">${UPGRADES.map(([w, better, ex]) => `<li><p><s class="muted">${esc(w)}</s> → <b>${esc(better)}</b></p><p class="small ex-line">${listenBtn(ex)}<span>${esc(ex)}</span></p></li>`).join("")}</ul></section>
  <section class="card tip">${icon("bulb")}<div><b>Linking words</b><p>Add: and, also, as well as, in addition. Contrast: but, however, although. Reason: because, since. Result: so, therefore, as a result. Order: first, then, after that, finally.</p></div></section>`;
}
