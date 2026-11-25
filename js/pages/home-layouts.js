// Home screens for the Simple, Path and Focus layout styles.
import * as store from "../store.js";
import { icon } from "../icons.js";
import { $$, esc, ring, bar, levelChip } from "../ui.js";
import { GRAMMAR } from "../data/grammar.js";
import { PAIRS } from "../data/spelling.js";
import { READINGS } from "../data/reading.js";
import { LISTENING } from "../data/listening.js";
import { TALKS } from "../data/speaking.js";
import { SCENARIOS } from "../data/reallife.js";
import { WRITING_TASKS } from "../data/writing.js";
import { MISTAKE_GROUPS } from "../data/mistakes.js";
import { GROUPS, LEARNING_GROUPS } from "../groups.js";
import { sectionMeta } from "./learn.js";
import { nextLesson, greeting, nextCard } from "./home.js";
import { dailyWord } from "./vocab.js";
import { helperBtn } from "../helper.js";

const SHORT = { start: "Letters, numbers, your level", learn: "Words, grammar, reading, listening", practise: "Spell, write, speak", everyday: "Life in the UK, idioms" };

// ---------- Simple ----------
export function renderSimple(view) {
  const s = store.get();
  const n = nextLesson();
  const goal = store.goalXP(), got = store.xpToday(), streak = store.streakNow();
  view.innerHTML = `
  <header class="sm-hero">
    <a class="avatar" href="#/profile" aria-label="My profile">${esc((s.name || "?").charAt(0).toUpperCase())}</a>
    <div class="grow"><h1>Hello, ${esc(s.name || "Learner")}!</h1>
    <p class="sm-stats"><span>${icon("flame")} ${streak} ${streak === 1 ? "day" : "days"}</span><span>${icon("star")} ${got} / ${goal} XP today</span></p></div>
    ${helperBtn("icon-btn big-help")}
  </header>
  <a class="sm-start" href="${n ? n.href : "#/progress"}">
    <span class="sm-play" aria-hidden="true">${icon("play")}</span>
    <span class="grow"><b>${got >= goal ? "Do one more lesson" : "Start today's lesson"}</b><small>${n ? esc(n.title) : "You have finished every lesson. Practise again!"}</small></span>
  </a>
  ${got >= goal ? `<p class="sm-done">${icon("check")} Today's goal is done. Well done!</p>` : ""}
  <h2 class="sm-h2">Or choose</h2>
  <div class="sm-grid">${LEARNING_GROUPS.map((g) => `<a class="sm-tile ${g.color}" href="#/learn/${g.id}"><span class="sm-ic">${icon(g.icon)}</span><b>${esc(g.label)}</b><small>${esc(SHORT[g.id] || "")}</small></a>`).join("")}</div>`;
}

// ---------- Path ----------
const SECS = [
  ["Grammar", "grammar", GRAMMAR, (t) => `#/grammar/${t.id}`, "book", "sky"],
  ["Reading", "reading", READINGS, (t) => `#/reading/${t.id}`, "bookopen", "sky"],
  ["Listening", "listening", LISTENING, (t) => `#/listening/${t.id}`, "volume", "sky"],
  ["Speaking", "speaking", TALKS, (t) => `#/speaking/talk/${t.id}`, "mic", "peach"],
  ["Real-life English", "reallife", SCENARIOS, (t) => `#/real-life/${t.id}`, "user", "mint"],
  ["Writing", "writing", WRITING_TASKS, (t) => `#/writing/task/${t.id}`, "pen", "peach"],
  ["Spelling", "spelling", PAIRS, (t) => `#/spelling/pair/${t.id}`, "spell", "peach"],
  ["Common mistakes", "mistakes", MISTAKE_GROUPS, (t) => `#/mistakes/${t.id}`, "alert", "peach"]
];
const BASICS = [["letters", "Letters"], ["numbers", "Numbers"], ["colours", "Colours"], ["classroom", "Classroom words"], ["words", "First words"]];
export function pathLessons(lv) {
  if (lv === "PE") {
    const out = [];
    for (const [k, label] of BASICS) {
      out.push({ sec: "Listen and choose", title: label, href: `#/basics/listen/${k}`, ic: "volume", color: "pink", done: !!store.lesson("basics", "listen-" + k) });
      out.push({ sec: "Matching game", title: label, href: `#/basics/match/${k}`, ic: "grid", color: "pink", done: !!store.lesson("basics", "match-" + k) });
    }
    return out;
  }
  const lists = SECS.map(([name, area, list, href, ic, color]) => list.filter((x) => x.level === lv).map((t) => ({ sec: name, title: t.title, href: href(t), ic, color, done: !!store.lesson(area, t.id) })));
  const out = [];
  for (let i = 0; lists.some((l) => l[i]); i++) lists.forEach((l) => { if (l[i]) out.push(l[i]); });
  return out;
}
let pathLevel = null;
export function renderPath(view) {
  const s = store.get();
  const lv = pathLevel || s.level || "E1";
  const items = pathLessons(lv);
  const cur = items.findIndex((x) => !x.done);
  const doneN = items.filter((x) => x.done).length;
  const goal = store.goalXP(), got = store.xpToday(), xl = store.xpLevel(), streak = store.streakNow();
  const UNIT = 5;
  let html = "";
  items.forEach((x, i) => {
    if (i % UNIT === 0) {
      const u = items.slice(i, i + UNIT), ud = u.filter((y) => y.done).length;
      html += `<li class="pa-unit"><b>Unit ${i / UNIT + 1}</b><small>${ud} of ${u.length} done</small></li>`;
    }
    const state = x.done ? "done" : i === cur ? "now" : "locked";
    const side = ["mid", "right", "mid", "left"][i % 4];
    const inner = `<span class="pa-dot">${icon(state === "done" ? "check" : state === "locked" ? "lock" : x.ic)}</span><span class="pa-txt"><b>${esc(x.title)}</b><small>${esc(x.sec)}${state === "locked" ? " · locked" : ""}</small></span>`;
    html += `<li class="pa-node ${state} ${side}">${state === "locked"
      ? `<div class="pa-in" aria-label="${esc(x.title)}, locked. Finish the lesson before it to open it.">${inner}</div>`
      : `<a class="pa-in" href="${x.href}" ${state === "now" ? 'aria-current="step"' : ""}>${state === "now" ? `<span class="pa-go">Start</span>` : ""}${inner}</a>`}</li>`;
  });
  html += `<li class="pa-node end ${cur === -1 ? "done" : "locked"} mid"><div class="pa-in"><span class="pa-dot">${icon("award")}</span><span class="pa-txt"><b>${cur === -1 ? "Level finished!" : "Finish line"}</b><small>${esc(store.levelName(lv))}</small></span></div></li>`;
  view.innerHTML = `
  <header class="pa-top" aria-label="Your progress">
    <a class="pa-stat" href="#/progress" aria-label="${streak} day streak">${icon("flame")}<b>${streak}</b></a>
    <a class="pa-stat" href="#/progress" aria-label="Level ${xl.lv}, ${s.xp} XP"><span class="xp-badge sm">${xl.lv}</span><b>${s.xp} XP</b></a>
    <a class="pa-stat" href="#/settings" aria-label="Today ${got} of ${goal} XP">${ring(Math.min(100, (got / goal) * 100), { size: 30, stroke: 4, label: "" })}<b>${got}/${goal}</b></a>
    ${helperBtn("pa-stat")}
  </header>
  <section class="pa-head">
    <h1>Your ${esc(store.levelName(lv))} path</h1>
    <p class="muted small">${items.length ? `${doneN} of ${items.length} lessons done. Finish one lesson to open the next.` : "There are no lessons at this level yet."}</p>
    ${bar(items.length ? (doneN / items.length) * 100 : 0)}
    ${cur >= 0 ? `<a class="btn primary pa-cta" href="${items[cur].href}">${icon("play")} <span class="ell">Next: ${esc(items[cur].title)}</span></a>` : ""}
    <div class="pills" role="group" aria-label="Choose a level path">${[...store.LEVELS].sort((a, b) => (b.code === s.level) - (a.code === s.level)).map((l) => `<button type="button" class="pill-btn ${l.code === lv ? "on" : ""}" aria-pressed="${l.code === lv}" data-plv="${l.code}">${esc(l.name)}${l.code === s.level ? " · yours" : ""}</button>`).join("")}</div>
  </section>
  <ol class="pa-road">${html}</ol>`;
  $$("[data-plv]", view).forEach((b) => b.addEventListener("click", () => { pathLevel = b.dataset.plv; renderPath(view); }));
}

// ---------- Focus ----------
export function renderFocus(view) {
  const s = store.get();
  const meta = sectionMeta();
  const goal = store.goalXP(), got = store.xpToday(), xl = store.xpLevel(), streak = store.streakNow();
  const acc = store.accuracy();
  const n = nextLesson();
  const last = s.last;
  const dw = dailyWord();
  const st = (ic, v, l) => `<span class="fc-st">${icon(ic)}<b>${v}</b><small>${l}</small></span>`;
  view.innerHTML = `
  <header class="fc-head"><div class="grow"><h1>${greeting()}, ${esc(s.name || "Learner")}</h1></div>${s.level ? levelChip(s.level) : `<a class="lvl" href="#/placement">Find your level</a>`}${helperBtn()}<a class="icon-btn" href="#/settings" aria-label="Settings">${icon("settings")}</a></header>
  <a class="fc-stats" href="#/progress" aria-label="Your stats">${st("star", `Lv ${xl.lv}`, `${s.xp} XP`)}${st("flame", streak, "streak")}${st("target", `${got}/${goal}`, "today")}${st("cards", store.wordsLearned(), "words")}${st("book", store.lessonsDone(), "lessons")}${st("check", acc === null ? "–" : acc + "%", "right")}</a>
  <div class="fc-quick">
    <a class="fc-row strong-row" href="${n ? n.href : "#/progress"}"><span class="fc-k">Next</span><span class="grow ell">${n ? `${esc(n.title)} <small class="muted">· ${esc(n.name)}</small>` : "Every lesson finished. Practise again."}</span>${icon("next")}</a>
    ${last ? `<a class="fc-row" href="${esc(last.href)}"><span class="fc-k">Continue</span><span class="grow ell">${esc(last.title)}</span>${icon("chevron", "chev")}</a>` : ""}
    <a class="fc-row" href="#/vocab/word/${dw.id}"><span class="fc-k">Word</span><span class="grow ell"><b>${esc(dw.w)}</b> <small class="muted">· ${esc(dw.def)}</small></span>${icon("chevron", "chev")}</a>
  </div>
  <div class="fc-groups">${GROUPS.map((g) => `<section class="fc-g" aria-labelledby="fg-${g.id}">
    <h2 id="fg-${g.id}"><span class="dot ${g.color}"></span>${esc(g.label)}</h2>
    <ul>${g.items.map((x) => { const m = meta[x.href] || {}; return `<li><a href="${x.href}"><span class="fc-ic ${g.color}">${icon(x.icon)}</span><span class="grow ell">${esc(x.label)}</span><small class="muted ell fc-m">${esc(m.meta || "")}</small>${m.pct != null ? `<span class="fc-pct">${Math.round(m.pct)}%</span>` : ""}</a></li>`; }).join("")}</ul>
  </section>`).join("")}</div>`;
}
