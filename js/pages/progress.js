import * as store from "../store.js";
import { icon } from "../icons.js";
import { $, esc, bar, ring, fmtDate } from "../ui.js";
import { BADGES } from "../badges.js";
import { GRAMMAR } from "../data/grammar.js";
import { WORDS } from "../data/vocab.js";

const SK = [
  ["grammar", "Grammar", "book", "peach"], ["vocabulary", "Words", "cards", "mint"], ["spelling", "Spelling", "spell", "sky"], ["reading", "Reading", "bookopen", "lavender"], ["listening", "Listening", "volume", "peach"], ["writing", "Writing", "pen", "yellow"], ["speaking", "Real life", "user", "mint"]
];

export function render(view) {
  const s = store.get();
  const now = new Date();
  const start = new Date(now); start.setDate(now.getDate() - now.getDay());
  const week = Array.from({ length: 7 }, (_, k) => { const d = new Date(start); d.setDate(start.getDate() + k); const key = store.today(d); return { key, label: "SMTWTFS"[k], full: d.toLocaleDateString("en-GB", { weekday: "long" }), xp: s.log[key] || 0, today: key === store.today() }; });
  const max = Math.max(store.goalXP(), ...week.map((d) => d.xp));
  const weekXP = week.reduce((a, d) => a + d.xp, 0);
  const counts = store.wordCounts();
  const skills = SK.map(([k, l, ic, col]) => ({ k, l, ic, col, pct: store.skillPct(k), t: (s.skills[k] || {}).t || 0 }));
  const known = skills.filter((x) => x.pct !== null && x.t >= 5).sort((a, b) => b.pct - a.pct);
  const strong = known.filter((x) => x.pct >= 75), weak = known.filter((x) => x.pct < 60);
  const doneG = GRAMMAR.filter((g) => store.lesson("grammar", g.id));
  view.innerHTML = `
  <header class="page-head"><div class="grow"><h1>Progress</h1><p class="muted small">Keep going, ${esc(s.name)}! Every day counts.</p></div><a class="chip-stat" href="#/" aria-label="${store.streakNow()} day streak">${icon("flame")} ${store.streakNow()}</a></header>
  <section class="card chart-card" aria-labelledby="wk-h">
    <div class="row between"><div><h2 id="wk-h" class="h3">This week</h2><p class="small muted">${weekXP} XP · goal ${store.goalXP()} XP a day</p></div><span class="pill soft">${icon("zap")} ${s.xp} XP total</span></div>
    <div class="week-chart" role="img" aria-label="XP this week: ${week.map((d) => `${d.full} ${d.xp}`).join(", ")}">
      ${week.map((d) => `<div class="wc-col ${d.today ? "today" : ""}"><span class="wc-val">${d.xp || ""}</span><div class="wc-bar"><i style="height:${Math.max(4, (d.xp / max) * 100)}%"></i></div><span class="wc-l">${d.label}</span></div>`).join("")}
    </div>
  </section>
  <div class="score-tiles">
    ${skills.map((x) => `<div class="card s-tile"><span class="t-ic sm ${x.col}">${icon(x.ic)}</span><b>${x.pct === null ? "–" : x.pct + "%"}</b><small class="muted">${x.l}</small></div>`).join("")}
  </div>
  <section class="card"><h2 class="h3">Strengths and weaknesses</h2>
    ${known.length ? `${strong.length ? `<p>${icon("trend")} <b>Strong:</b> ${strong.map((x) => x.l).join(", ")}</p>` : ""}${weak.length ? `<p>${icon("target")} <b>Practise more:</b> ${weak.map((x) => `<a class="link" href="#/${({ vocabulary: "vocab", speaking: "real-life" })[x.k] || x.k}">${x.l}</a>`).join(", ")}</p>` : ""}${!strong.length && !weak.length ? `<p class="muted">You're doing OK in everything. Keep practising!</p>` : ""}`
      : `<p class="muted">Answer some questions first (at least 5 in a skill). Then we can show your strong and weak areas.</p>`}
  </section>
  <section class="card"><h2 class="h3">My words</h2>
    <div class="row gap wrap"><span class="st st-learned">${counts.learned} learned</span><span class="st st-learning">${counts.learning} learning</span><span class="st st-difficult">${counts.difficult} difficult</span></div>
    ${bar((counts.learned / WORDS.length) * 100)}<p class="small muted">${counts.learned} of ${WORDS.length} words learned</p>
  </section>
  <section class="card"><div class="row between"><h2 class="h3">Achievements</h2><span class="small muted">${Object.keys(s.badges).length} of ${BADGES.length}</span></div>
    <ul class="ach-list">${BADGES.map((b) => { const on = !!s.badges[b.id]; return `<li class="${on ? "on" : ""}"><span class="t-ic sm ${on ? "orange" : "grey"}">${icon(on ? b.icon : "lock")}</span><span class="grow"><b>${esc(b.title)}</b><small class="muted">${esc(b.desc)}</small></span>${on ? `<span class="pill orange">Unlocked</span>` : `<span class="pill soft">Locked</span>`}</li>`; }).join("")}</ul>
  </section>
  <section class="card"><h2 class="h3">Finished lessons (${doneG.length})</h2>
    ${doneG.length ? `<ul class="mini-list">${doneG.map((g) => `<li><a href="#/grammar/${g.id}">${icon("check")} ${esc(g.title)}</a><span class="small muted">${store.lesson("grammar", g.id).best}%</span></li>`).join("")}</ul>` : `<p class="muted">No grammar lessons yet. <a class="link" href="#/grammar">Start one</a>.</p>`}
  </section>
  <section class="card"><h2 class="h3">Recent scores</h2>
    ${s.scores.length ? `<ul class="mini-list">${s.scores.slice(0, 12).map((x) => `<li><span>${esc(x.title)}<small class="muted"> · ${esc(fmtDate(x.date))}</small></span><b>${x.score}/${x.total}</b></li>`).join("")}</ul>` : `<p class="muted">Your quiz scores will appear here.</p>`}
  </section>`;
}
