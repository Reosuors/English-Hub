import * as store from "../store.js";
import { icon } from "../icons.js";
import { $, $$, esc, levelChip, runQuiz, listenBtn, hasSpeech, speak, openModal, levelPills, applyLevel, startFilter } from "../ui.js";
import { READINGS } from "../data/reading.js";
import { setHelperContext } from "../helper.js";

let filter = null;
function head(title, sub, back = "#/learn") {
  return `<header class="page-head"><a class="icon-btn back" href="${back}" aria-label="Back">${icon("back")}</a><div class="grow"><h1>${esc(title)}</h1>${sub ? `<p class="muted small">${esc(sub)}</p>` : ""}</div><span class="t-ic sky">${icon("bookopen")}</span></header>`;
}
export function render(view, params) {
  const [id] = params;
  if (id) { const r = READINGS.find((x) => x.id === id); if (r) return reader(view, r); }
  list(view);
}
function list(view) {
  if (filter === null) filter = startFilter(READINGS);
  const done = READINGS.filter((r) => store.lesson("reading", r.id)).length;
  view.innerHTML = `${head("Reading", `${done} of ${READINGS.length} texts done`)}
  ${levelPills(READINGS, filter)}
  <ul class="topic-list">${applyLevel(READINGS, filter).map((r) => { const l = store.lesson("reading", r.id); return `<li><a class="card topic-row" href="#/reading/${r.id}">
    <span class="tr-state ${l ? (l.best >= 80 ? "master" : "done") : ""}">${l ? icon("check") : icon("bookopen")}</span>
    <span class="grow"><span class="row gap center-y wrap">${levelChip(r.level)}<span class="small muted">${esc(r.type)} · ${r.minutes} min</span>${l ? `<span class="small muted">· best ${l.best}%</span>` : ""}</span><b>${esc(r.title)}</b></span>${icon("chevron", "chev")}</a></li>`; }).join("") || `<li class="card muted">No texts at this level yet.</li>`}</ul>`;
  $$("[data-f]", view).forEach((b) => b.addEventListener("click", () => { filter = b.dataset.f; list(view); }));
}
function highlight(r) {
  let html = esc(r.text.replace(/\[\[|\]\]/g, ""));
  const keys = Object.keys(r.words).sort((a, b) => b.length - a.length);
  const done = new Set();
  for (const k of keys) {
    const re = new RegExp(`\\b(${k.replace(/[-]/g, "\\-")})\\b`, "i");
    html = html.replace(re, (m) => { if (done.has(k)) return m; done.add(k); return `<button type="button" class="hl" data-w="${esc(k)}">${m}</button>`; });
  }
  return html;
}
function reader(view, r) {
  const l = store.lesson("reading", r.id);
  store.setLast({ href: `#/reading/${r.id}`, title: r.title, sub: `Reading · ${store.levelName(r.level)}`, pct: l ? l.best : 0 });
  const plain = r.text.replace(/\[\[|\]\]/g, "");
  setHelperContext({ tip: "Read once for the main idea. Then read the questions, and find the answers in the text. Use the Word tab for any word you don't know.", exTitle: "Sentences from the text", examples: (plain.match(/[^.!?]+[.!?]/g) || []).map((x) => x.trim()).filter((x) => x.split(" ").length > 4) });
  view.innerHTML = `${head(r.title, `${r.type} · ${store.levelName(r.level)} · ${r.minutes} min`, "#/reading")}
  <section class="card reading-card">
    <div class="row between wrap">${levelChip(r.level)}${hasSpeech ? `<div class="row gap"><button class="btn ghost sm" type="button" data-read>${icon("volume")} Listen</button><button class="btn ghost sm" type="button" data-stop>${icon("x")} Stop</button></div>` : ""}</div>
    <p class="reading-text">${highlight(r)}</p>
    <p class="small muted">${icon("bulb")} Tap the <span class="hl static">highlighted words</span> to see what they mean.</p>
  </section>
  <section class="card"><h2 class="h3">${icon("bookopen")} Difficult words</h2><ul class="gloss">${Object.entries(r.words).map(([w, m]) => `<li>${listenBtn(w)}<span><b>${esc(w)}</b> — ${esc(m)}</span></li>`).join("")}</ul></section>
  <h2 class="h3">Questions</h2>
  <div id="quiz"></div>`;
  $$(".hl[data-w]", view).forEach((b) => b.addEventListener("click", () => openModal(`<h2>${esc(b.dataset.w)}</h2><p>${esc(r.words[b.dataset.w])}</p>${listenBtn(b.dataset.w)}`)));
  const rd = $("[data-read]", view); if (rd) rd.addEventListener("click", () => speak(plain));
  const st = $("[data-stop]", view); if (st) st.addEventListener("click", () => window.speechSynthesis.cancel());
  runQuiz($("#quiz", view), { title: r.title, questions: r.questions, area: "reading", id: r.id, skill: "reading", exitLabel: "All texts", onExit: () => (location.hash = "#/reading") });
  return () => { if (hasSpeech) window.speechSynthesis.cancel(); };
}
