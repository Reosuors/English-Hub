import * as store from "../store.js";
import { icon } from "../icons.js";
import { esc, bar } from "../ui.js";
import { GROUPS, LEARNING_GROUPS, groupById } from "../groups.js";
import { GRAMMAR } from "../data/grammar.js";
import { PAIRS } from "../data/spelling.js";
import { WORDS } from "../data/vocab.js";
import { READINGS } from "../data/reading.js";
import { LISTENING } from "../data/listening.js";
import { WRITING_TASKS } from "../data/writing.js";
import { SCENARIOS } from "../data/reallife.js";
import { IDIOMS, PHRASAL } from "../data/idioms.js";
import { MISTAKE_GROUPS } from "../data/mistakes.js";

export function sectionsProgress() {
  const s = store.get();
  const g = GRAMMAR.filter((t) => store.lesson("grammar", t.id)).length;
  const p = PAIRS.filter((t) => store.lesson("spelling", t.id)).length;
  const w = store.wordCounts().learned;
  const cnt = (area, list) => list.filter((t) => store.lesson(area, t.id)).length;
  const spk = Object.keys(store.get().lessons || {}).filter((k) => k.startsWith("speaking/")).length;
  const rd = cnt("reading", READINGS), ls = cnt("listening", LISTENING), wr = cnt("writing", WRITING_TASKS), rl = cnt("reallife", SCENARIOS);
  const mk = cnt("mistakes", MISTAKE_GROUPS);
  const bs = Object.keys(s.lessons || {}).filter((k) => k.startsWith("basics/")).length;
  const idq = ["quiz-idioms", "quiz-phrasal", "quiz-mix"].filter((k) => store.lesson("idioms", k)).length;
  return [
    { href: "#/placement", ic: "target", color: "lavender", title: "Level Test", text: "Find your English level: Pre-Entry to Level 2.", meta: s.placement ? `Your result: ${store.levelName(s.placement.level)}` : "About 10 minutes", pct: s.placement ? 100 : 0 },
    { href: "#/basics", ic: "play", color: "pink", title: "First steps (Pre-Entry)", text: "New to English? Letters, numbers, colours and first words with sound.", meta: `${bs} of 8 topics and games done`, pct: Math.min(100, (bs / 8) * 100) },
    { href: "#/grammar", ic: "book", color: "peach", title: "Grammar", text: "Easy rules with examples and practice.", meta: `${g} of ${GRAMMAR.length} lessons done`, pct: (g / GRAMMAR.length) * 100 },
    { href: "#/vocab", ic: "cards", color: "mint", title: "Words", text: "Flashcards, quizzes and a word of the day.", meta: `${w} of ${WORDS.length} words learned`, pct: (w / WORDS.length) * 100 },
    { href: "#/spelling", ic: "spell", color: "sky", title: "Spelling", text: "Confusing words and spelling tests.", meta: `${p} of ${PAIRS.length} word groups done`, pct: (p / PAIRS.length) * 100 },
    { href: "#/mistakes", ic: "alert", color: "peach", title: "Common Mistakes", text: "Mistakes learners often make, and how to fix them.", meta: `${mk} of ${MISTAKE_GROUPS.length} groups done · ${MISTAKE_GROUPS.reduce((n, g) => n + g.items.length, 0)} mistakes`, pct: (mk / MISTAKE_GROUPS.length) * 100 },
    { href: "#/writing", ic: "pen", color: "yellow", title: "Writing", text: "Write in the app. Get corrections, tips and a score.", meta: `${wr} of ${WRITING_TASKS.length} tasks done · daily challenge`, pct: (wr / WRITING_TASKS.length) * 100 },
    { href: "#/reading", ic: "bookopen", color: "sky", title: "Reading", text: "Stories, emails and articles with questions.", meta: `${rd} of ${READINGS.length} texts done`, pct: (rd / READINGS.length) * 100 },
    { href: "#/listening", ic: "volume", color: "peach", title: "Listening", text: "Conversations and announcements in British English.", meta: `${ls} of ${LISTENING.length} done`, pct: (ls / LISTENING.length) * 100 },
    { href: "#/idioms", ic: "sparkles", color: "pink", title: "Idioms & Phrasal Verbs", text: "Common expressions with meanings and examples.", meta: `${IDIOMS.length} idioms · ${PHRASAL.length} phrasal verbs`, pct: (idq / 3) * 100 },
    { href: "#/speaking", ic: "mic", color: "orange", title: "Speaking", text: "Repeat after me, read aloud and real-life conversations with your microphone.", meta: `${spk} of 10 speaking lessons done`, pct: (spk / 10) * 100 },
    { href: "#/real-life", ic: "user", color: "mint", title: "Real-Life English", text: "GP, Jobcentre, train, shop, college, renting and more.", meta: `${rl} of ${SCENARIOS.length} situations done`, pct: (rl / SCENARIOS.length) * 100 }
  ];
}

export function sectionMeta() {
  const m = {}; sectionsProgress().forEach((x) => { m[x.href] = x; });
  m["#/progress"] = { meta: `${store.get().xp || 0} XP · ${store.lessonsDone()} lessons done`, pct: null };
  m["#/settings"] = { meta: "Layout, colours, text size and voice", pct: null };
  return m;
}
export function groupBlock(g, meta, { big = false, head = true } = {}) {
  return `<section class="grp grp-${g.id}" aria-labelledby="grp-${g.id}">
    ${head ? `<div class="grp-head"><span class="t-ic ${g.color}">${icon(g.icon)}</span><div class="grow"><h2 id="grp-${g.id}">${esc(g.label)}</h2><p class="muted small">${esc(g.desc)}</p></div></div>` : `<h2 class="sr-only" id="grp-${g.id}">${esc(g.label)}</h2>`}
    <div class="grp-list ${big ? "big" : ""}">${g.items.map((x) => { const mm = meta[x.href] || {}; return `<a class="card sec-row" href="${x.href}">
      <span class="t-ic ${g.color}">${icon(x.icon)}</span>
      <span class="grow"><b>${esc(x.label)}</b><small class="muted block">${esc(x.desc)}</small>${mm.meta ? `<small class="strong block">${esc(mm.meta)}</small>` : ""}${mm.pct != null ? bar(mm.pct) : ""}</span>
      ${icon("chevron", "chev")}</a>`; }).join("")}</div>
  </section>`;
}

export function render(view, params = []) {
  const meta = sectionMeta();
  const one = params[0] && groupById(params[0]);
  if (one) {
    view.innerHTML = `
    <header class="page-head"><a class="icon-btn back" href="#/learn" aria-label="Back to all sections">${icon("back")}</a><div class="grow"><h1>${esc(one.label)}</h1><p class="muted small">${esc(one.desc)}</p></div><span class="t-ic ${one.color}">${icon(one.icon)}</span></header>
    ${groupBlock(one, meta, { big: true, head: false })}`;
    return;
  }
  view.innerHTML = `
  <header class="page-head"><div><h1>All sections</h1><p class="muted">Everything in the app, in ${LEARNING_GROUPS.length} groups. Tap a group name to open it.</p></div></header>
  <nav class="grp-jump" aria-label="Groups">${LEARNING_GROUPS.map((g) => `<a class="pill-link ${g.color}" href="#/learn/${g.id}">${icon(g.icon)} ${esc(g.label)}</a>`).join("")}</nav>
  <div class="flow grp-all">${GROUPS.map((g) => groupBlock(g, meta)).join("")}</div>`;
}
