import * as store from "../store.js";
import { icon } from "../icons.js";
import { $, $$, esc, ring, bar, listenBtn, levelChip } from "../ui.js";
import { GRAMMAR } from "../data/grammar.js";
import { PAIRS } from "../data/spelling.js";
import { WORDS } from "../data/vocab.js";
import { dailyWord } from "./vocab.js";
import { READINGS } from "../data/reading.js";
import { LISTENING } from "../data/listening.js";
import { TALKS } from "../data/speaking.js";
import { SCENARIOS } from "../data/reallife.js";
import { WRITING_TASKS } from "../data/writing.js";
import { MISTAKE_GROUPS } from "../data/mistakes.js";
import { LEARNING_GROUPS } from "../groups.js";
import { sectionMeta } from "./learn.js";
import { renderSimple, renderPath, renderFocus } from "./home-layouts.js";
import { maybeOfferLayouts } from "../layoutpicker.js";
import { helperBtn } from "../helper.js";

const PASTELS = ["peach", "mint", "sky", "lavender", "pink", "yellow"];
let tab = "today";

// "Next lesson": the next unfinished lesson at the learner's level, rotating through the sections.
const BASIC_KEYS = [["letters", "Letters"], ["numbers", "Numbers"], ["colours", "Colours"], ["classroom", "Classroom words"], ["words", "First words"]];
function nextAt(lv) {
  const secs = [
    ["Grammar", "grammar", GRAMMAR, (t) => `#/grammar/${t.id}`, "book"],
    ["Reading", "reading", READINGS, (t) => `#/reading/${t.id}`, "bookopen"],
    ["Listening", "listening", LISTENING, (t) => `#/listening/${t.id}`, "volume"],
    ["Speaking", "speaking", TALKS, (t) => `#/speaking/talk/${t.id}`, "mic"],
    ["Real-life English", "reallife", SCENARIOS, (t) => `#/real-life/${t.id}`, "help"],
    ["Writing", "writing", WRITING_TASKS, (t) => `#/writing/task/${t.id}`, "pen"],
    ["Spelling", "spelling", PAIRS, (t) => `#/spelling/pair/${t.id}`, "spell"],
    ["Common mistakes", "mistakes", MISTAKE_GROUPS, (t) => `#/mistakes/${t.id}`, "zap"]
  ];
  let done = 0; const cands = [];
  for (const [name, area, list, href, ic] of secs) {
    const at = list.filter((x) => x.level === lv);
    done += at.filter((x) => store.lesson(area, x.id)).length;
    const t = at.find((x) => !store.lesson(area, x.id));
    if (t) cands.push({ name, title: t.title, href: href(t), level: lv, ic });
  }
  return cands.length ? cands[done % cands.length] : null;
}
export function nextLesson() {
  const lv = store.get().level || "E1";
  if (lv === "PE") {
    for (const [k, label] of BASIC_KEYS) {
      if (!store.lesson("basics", "listen-" + k)) return { name: "Pre-Entry", title: `Listen and choose: ${label}`, href: `#/basics/listen/${k}`, level: "PE", ic: "volume" };
      if (!store.lesson("basics", "match-" + k)) return { name: "Pre-Entry", title: `Matching game: ${label}`, href: `#/basics/match/${k}`, level: "PE", ic: "grid" };
    }
    return nextAt("E1") || { name: "Pre-Entry", title: "Spell the word", href: "#/basics/spell", level: "PE", ic: "spell" };
  }
  const i = store.levelIndex(lv);
  for (const l of store.LEVELS.slice(i)) { const n = nextAt(l.code); if (n) return n; }
  return null;
}
export function nextCard() {
  const n = nextLesson();
  if (!n) return `<a class="card next-card" href="#/progress"><span class="t-ic mint">${icon("award")}</span><div class="grow"><p class="small strong">Next lesson</p><b>You have finished every lesson. Brilliant!</b><p class="small muted">Practise again to beat your best scores.</p></div>${icon("chevron", "chev")}</a>`;
  return `<a class="card next-card" href="${n.href}"><span class="t-ic orange">${icon(n.ic)}</span><div class="grow"><p class="small strong">Next lesson · ${esc(n.name)}</p><b>${esc(n.title)}</b><span class="row gap center-y wrap">${levelChip(n.level)}${n.level !== store.get().level ? `<span class="small muted">You've finished your level here</span>` : ""}</span></div><span class="btn primary sm">${icon("play")} Start</span></a>`;
}

export function recommendedLessons(n = 6) {
  const s = store.get();
  const li = s.level ? store.levelIndex(s.level) : 0;
  const order = store.LEVELS.map((l, i) => ({ code: l.code, d: i < li ? 10 + (li - i) : i - li }));
  order.sort((a, b) => a.d - b.d);
  const out = [];
  for (const o of order) for (const t of GRAMMAR.filter((g) => g.level === o.code)) { if (!store.lesson("grammar", t.id)) out.push(t); }
  for (const t of GRAMMAR) if (out.length < n && !out.includes(t) && (store.lesson("grammar", t.id) || {}).best < 80) out.push(t);
  return out.slice(0, n);
}
export function weakestSkill() {
  const s = store.get();
  const names = { grammar: ["Grammar", "#/grammar"], vocabulary: ["Words", "#/vocab"], spelling: ["Spelling", "#/spelling"] };
  let worst = null;
  for (const k of Object.keys(names)) { const v = s.skills[k]; if (v && v.t >= 5) { const p = v.c / v.t; if (!worst || p < worst.p) worst = { k, p, label: names[k][0], href: names[k][1] }; } }
  return worst && worst.p < 0.75 ? worst : null;
}
export function greeting() { const h = new Date().getHours(); return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening"; }

export function render(view) {
  const lay = document.documentElement.dataset.layout;
  const alt = { simple: renderSimple, path: renderPath, focus: renderFocus }[lay];
  const out = alt ? alt(view) : renderStandard(view);
  maybeOfferLayouts();
  return out;
}
function renderStandard(view) {
  const s = store.get();
  const streak = store.streakNow();
  const counts = store.wordCounts();
  const goal = store.goalXP(), got = store.xpToday();
  const xl = store.xpLevel();
  view.innerHTML = `
  <header class="hero" aria-label="Your progress">
    <div class="hero-top">
      <a class="avatar" href="#/profile" aria-label="My profile">${esc((s.name || "?").charAt(0).toUpperCase())}</a>
      <div class="grow"><p class="hero-hi">${greeting()},</p><h1 class="h-name">${esc(s.name || "Learner")}</h1></div>
      <a class="chip-stat" href="#/progress" aria-label="${streak} day streak">${icon("flame")} ${streak}</a>
      ${helperBtn("icon-btn hero-set")}
      <a class="icon-btn hero-set" href="#/settings" aria-label="Settings">${icon("settings")}</a>
    </div>
    <div class="xp-box">
      <div class="xp-head"><span class="xp-badge" aria-hidden="true">${xl.lv}</span><div class="grow"><b>Level ${xl.lv} · ${esc(xl.name)}</b><small>${s.xp} XP in total${s.level ? ` · ${esc(store.levelName(s.level))}` : ""}</small></div></div>
      <div class="xp-bar" role="progressbar" aria-label="XP to next level" aria-valuemin="0" aria-valuemax="${xl.need}" aria-valuenow="${xl.into}"><i style="width:${xl.pct}%"></i></div>
      <div class="xp-foot small"><span>${xl.into} / ${xl.need} XP</span><span>${xl.need - xl.into} XP to Level ${xl.lv + 1} · ${esc(xl.next)}</span></div>
    </div>
  </header>
  <div class="tabs" role="tablist" aria-label="Home views">
    <button role="tab" type="button" class="tab ${tab === "today" ? "on" : ""}" aria-selected="${tab === "today"}" data-tab="today">${icon("sun")} Today</button>
    <button role="tab" type="button" class="tab ${tab === "plan" ? "on" : ""}" aria-selected="${tab === "plan"}" data-tab="plan">${icon("list")} Learning plan</button>
  </div>
  <div id="home-body" class="flow"></div>`;
  $$(".tab", view).forEach((b) => b.addEventListener("click", () => { tab = b.dataset.tab; render(view); }));
  const body = $("#home-body", view);
  if (tab === "plan") return renderPlan(body);

  const rec = recommendedLessons();
  const last = s.last;
  const dw = dailyWord();
  const weak = weakestSkill();
  const acc = store.accuracy();
  const meta = sectionMeta();
  body.innerHTML = `
  <section class="card today-card" aria-labelledby="today-h">
    <div class="today-ring">${ring(Math.min(100, (got / goal) * 100), { size: 92, stroke: 10, label: `${got}<small>/${goal} XP</small>` })}</div>
    <div class="grow">
      <h2 id="today-h" class="h3">${got >= goal ? `${icon("check")} Daily goal done!` : "Today's goal"}</h2>
      <p class="small muted">${got >= goal ? "Great work. Every extra lesson still adds XP." : `${goal - got} XP to go · about ${(store.GOALS.find((g) => g.id === s.goal) || store.GOALS[1]).mins} a day`}</p>
      <div class="week" aria-label="This week">${store.weekDays().map((d) => `<span class="wd ${d.xp ? "on" : ""} ${d.today ? "now" : ""}" title="${d.key}: ${d.xp} XP"><i>${d.xp ? icon("check") : ""}</i><small>${d.label}</small></span>`).join("")}</div>
    </div>
  </section>

  <section class="stat-tiles" aria-label="Your stats">
    <a class="stat-tile" href="#/progress"><span class="t-ic peach">${icon("book")}</span><b>${store.lessonsDone()}</b><small>Lessons done</small></a>
    <a class="stat-tile" href="#/vocab"><span class="t-ic mint">${icon("cards")}</span><b>${store.wordsLearned()}</b><small>Words learned</small></a>
    <a class="stat-tile" href="#/progress"><span class="t-ic sky">${icon("clock")}</span><b>${store.minutesTotal()}</b><small>${store.minutesToday() && store.minutesToday() !== store.minutesTotal() ? `Minutes · ${store.minutesToday()} today` : "Minutes studied"}</small></a>
    <a class="stat-tile" href="#/progress"><span class="t-ic lavender">${icon("target")}</span><b>${acc === null ? "–" : acc + "%"}</b><small>Accuracy</small></a>
  </section>
  ${s.level ? "" : `<a class="card tip-card" href="#/placement">${icon("target")}<div><b>Find your level</b><p class="small muted">Take the level test so lessons match you.</p></div></a>`}

  ${nextCard()}

  ${weak ? `<a class="card tip-card" href="${weak.href}">${icon("trend")}<div><b>Practise ${esc(weak.label)}</b><p class="small muted">Your ${esc(weak.label.toLowerCase())} score is ${Math.round(weak.p * 100)}%. A little practice will help.</p></div>${icon("chevron")}</a>` : ""}
  <div class="duo">
  ${last ? `<a class="card pastel yellow continue" href="${esc(last.href)}">
      <div><p class="small strong">Continue where you left off</p><h3>${esc(last.title)}</h3><p class="small">${esc(last.sub || "")}</p><span class="btn dark sm">${icon("play")} Continue</span></div>
      ${ring(last.pct || 0, { size: 84, stroke: 9 })}</a>`
    : `<a class="card pastel yellow continue" href="${s.placement ? "#/grammar" : "#/placement"}">
      <div><p class="small strong">Start here</p><h3>${s.placement ? "Your first grammar lesson" : "Find your English level"}</h3><p class="small">${s.placement ? "Short lessons with easy examples." : "A short test: grammar, words, reading and writing."}</p><span class="btn dark sm">${icon("play")} Start</span></div>
      ${ring(0, { size: 84, stroke: 9 })}</a>`}


  <section class="card pastel mint wod" aria-labelledby="wod-h">
    <div class="row between"><p class="small strong" id="wod-h">${icon("sparkles")} Word of the day</p>${levelChip(dw.level)}</div>
    <div class="row gap center-y"><h3 class="wod-word">${esc(dw.w)}</h3>${listenBtn(dw.w)}</div>
    <p class="small"><i>${esc(dw.pos)}</i> · ${esc(dw.def)}</p>
    <p class="wod-ex">“${esc(dw.ex)}”</p>
    <div class="row gap"><a class="btn dark sm" href="#/vocab/word/${dw.id}">${icon("eye")} See more</a></div>
  </section>
  </div>

  <section aria-labelledby="exp-h">
    <div class="sec-head"><h2 id="exp-h">Explore lessons</h2><a class="link" href="#/grammar">See all</a></div>
    <div class="h-scroll">
      ${rec.map((t, k) => { const l = store.lesson("grammar", t.id); return `<a class="lesson-card pastel ${PASTELS[k % PASTELS.length]}" href="#/grammar/${t.id}">
        ${levelChip(t.level)}<h3>${esc(t.title)}</h3><p class="small">${esc(t.summary)}</p>
        <div class="lc-foot"><span class="small">${l ? `Best: ${l.best}%` : "New"}</span>${bar(l ? l.best : 0, "dark")}</div></a>`; }).join("")}
    </div>
  </section>

  <section aria-labelledby="pr-h" class="home-groups">
    <div class="sec-head"><h2 id="pr-h">Everything in the app</h2><a class="link" href="#/learn">All sections</a></div>
    ${LEARNING_GROUPS.map((g) => `<div class="hg">
      <a class="hg-head" href="#/learn/${g.id}"><span class="t-ic sm ${g.color}">${icon(g.icon)}</span><span class="grow"><b>${esc(g.label)}</b><small class="muted block">${esc(g.desc)}</small></span>${icon("chevron", "chev")}</a>
      <div class="tile-grid">${g.items.map((x) => `<a class="tile" href="${x.href}"><span class="t-ic ${g.color}">${icon(x.icon)}</span><b>${esc(x.label)}</b><small>${esc((meta[x.href] || {}).meta || x.desc)}</small></a>`).join("")}</div>
    </div>`).join("")}
  </section>`;

  $$(".goal-tile", body).forEach((b) => b.addEventListener("click", () => { store.set({ goal: b.dataset.goal }); render(view); }));
}

function renderPlan(body) {
  const s = store.get();
  if (!s.level) {
    body.innerHTML = `<div class="card empty">${icon("target")}<h3>First, find your level</h3><p class="muted">Your plan uses your level. Take the test or choose a level.</p><div class="row gap wrap center"><a class="btn primary" href="#/placement">${icon("target")} Take the test</a><a class="btn secondary" href="#/profile">${icon("user")} Choose a level</a></div></div>`;
    return;
  }
  const topics = GRAMMAR.filter((g) => g.level === s.level);
  const words = WORDS.filter((w) => w.level === s.level);
  const learned = words.filter((w) => store.word(w.id).s === "learned").length;
  const pairsDone = PAIRS.filter((p) => store.lesson("spelling", p.id)).length;
  const steps = [
    ...topics.map((t) => { const l = store.lesson("grammar", t.id); return { done: !!l, ic: "book", title: t.title, sub: l ? `Done · best ${l.best}%` : "Grammar lesson + 8 questions", href: `#/grammar/${t.id}` }; }),
    { done: learned >= Math.min(20, words.length), ic: "cards", title: `Learn ${Math.min(20, words.length)} ${store.levelName(s.level)} words`, sub: `${learned} of ${words.length} learned`, href: `#/vocab/cards/${s.level}` },
    { done: pairsDone >= 6, ic: "spell", title: "Master 6 confusing word groups", sub: `${pairsDone} of ${PAIRS.length} done`, href: "#/spelling" },
    { done: !!s.placement, ic: "target", title: "Take the level test", sub: s.placement ? `Result: ${store.levelName(s.placement.level)}` : "Check your level", href: "#/placement" }
  ];
  const done = steps.filter((x) => x.done).length;
  body.innerHTML = `
  <section class="card plan-head">
    <div>${levelChip(s.level)}<h2>Your ${esc(store.levelName(s.level))} plan</h2><p class="muted small">Follow the steps from top to bottom. ${done} of ${steps.length} done.</p></div>
    ${ring((done / steps.length) * 100, { size: 72, stroke: 8 })}
  </section>
  <ol class="plan-list">${steps.map((x, i) => `<li><a class="plan-step ${x.done ? "done" : ""}" href="${x.href}"><span class="ps-num">${x.done ? icon("check") : i + 1}</span><span class="grow"><b>${esc(x.title)}</b><small>${esc(x.sub)}</small></span>${icon("chevron")}</a></li>`).join("")}</ol>`;
}
