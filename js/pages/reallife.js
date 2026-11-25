import * as store from "../store.js";
import { icon } from "../icons.js";
import { $, $$, esc, levelChip, listenBtn, hasSpeech, speak, ring, shuffle, levelPills, applyLevel, startFilter } from "../ui.js";
import { SCENARIOS } from "../data/reallife.js";
import { setHelperContext } from "../helper.js";

export const fillName = (t) => t.replace(/\{name\}/g, store.get().name || "Sam");
function head(title, sub, back = "#/learn") {
  return `<header class="page-head"><a class="icon-btn back" href="${back}" aria-label="Back">${icon("back")}</a><div class="grow"><h1>${esc(title)}</h1>${sub ? `<p class="muted small">${esc(sub)}</p>` : ""}</div><span class="t-ic mint">${icon("user")}</span></header>`;
}
export function render(view, params) {
  const [id, mode] = params;
  if (id) { const s = SCENARIOS.find((x) => x.id === id); if (s) return mode === "practice" ? practice(view, s) : scenario(view, s); }
  list(view);
}
let filter = null;
function list(view) {
  if (filter === null) filter = startFilter(SCENARIOS);
  view.innerHTML = `${head("Real-Life English", "Everyday situations in the UK")}
  ${levelPills(SCENARIOS, filter)}
  <div class="pair-grid scen-grid">${applyLevel(SCENARIOS, filter).map((s) => { const l = store.lesson("reallife", s.id); return `<a class="card scen-card" href="#/real-life/${s.id}"><span class="t-ic ${s.color}">${icon(s.icon)}</span><b>${esc(s.title)}</b><span class="row gap wrap">${levelChip(s.level)}${l ? `<span class="pill ok">${icon("check")} ${l.best}%</span>` : ""}</span></a>`; }).join("")}</div>`;
  $$("[data-f]", view).forEach((b) => b.addEventListener("click", () => { filter = b.dataset.f; list(view); }));
}
function scenario(view, s) {
  const l = store.lesson("reallife", s.id);
  store.setLast({ href: `#/real-life/${s.id}`, title: s.title, sub: "Real-Life English", pct: l ? l.best : 0 });
  setHelperContext({ tip: s.intro, exTitle: "Useful phrases", examples: s.phrases.map((p) => fillName(p[0])) });
  view.innerHTML = `${head(s.title, store.levelName(s.level), "#/real-life")}
  <p class="lead">${esc(s.intro)}</p>
  <section class="card lesson-sec"><h2>${icon("volume")} Useful phrases</h2>
    <ul class="example-list">${s.phrases.map(([p, n]) => `<li>${listenBtn(fillName(p))}<span><b>${esc(fillName(p))}</b><br><small class="muted">${esc(n)}</small></span></li>`).join("")}</ul></section>
  <section class="card lesson-sec"><h2>${icon("eye")} Example conversation</h2>
    <div class="chat">${s.steps.map((st) => { const good = st.options.find((o) => o.ok); return `<div class="bubble them"><span>${esc(fillName(st.them))}</span>${listenBtn(fillName(st.them))}</div><div class="bubble you"><span>${esc(fillName(good.t))}</span>${listenBtn(fillName(good.t))}</div>`; }).join("")}</div></section>
  <div class="cta-bar card"><div><b>Your turn</b><p class="small muted">Choose the best reply at each step${l ? ` · best ${l.best}%` : ""}</p></div><a class="btn primary big" href="#/real-life/${s.id}/practice">${icon("play")} Practise</a></div>`;
}
function practice(view, s) {
  let i = 0, firstTry = 0, tried = false;
  const log = [];
  view.innerHTML = `${head(s.title, "Practice: choose the best reply", `#/real-life/${s.id}`)}
  <section class="card"><div class="chat" id="chat" aria-live="polite"></div><div id="choices"></div></section>`;
  const chat = $("#chat", view), choices = $("#choices", view);
  const say = (t, g) => { if (hasSpeech) speak(t); };
  const addBubble = (who, text) => { const d = document.createElement("div"); d.className = `bubble ${who} pop`; d.innerHTML = `<span>${esc(text)}</span>${who === "them" ? listenBtn(text) : ""}`; chat.appendChild(d); d.scrollIntoView({ block: "nearest", behavior: "smooth" }); };
  function step() {
    const st = s.steps[i]; tried = false;
    const them = fillName(st.them);
    addBubble("them", them); say(them, s.voice);
    choices.innerHTML = `<p class="small muted">${icon("help")} What do you say?</p><div class="q-body">${shuffle(st.options.map((o, k) => ({ o, k }))).map(({ o, k }) => `<button class="opt" type="button" data-k="${k}"><span>${esc(fillName(o.t))}</span></button>`).join("")}</div><div class="feedback" aria-live="assertive"></div>`;
    $$(".opt", choices).forEach((b) => b.addEventListener("click", () => {
      const o = st.options[Number(b.dataset.k)];
      store.recordAnswer("speaking", o.ok);
      if (o.ok) {
        if (!tried) firstTry++;
        b.classList.add("correct");
        $$(".opt", choices).forEach((x) => (x.disabled = true));
        setTimeout(() => { addBubble("you", fillName(o.t)); i++; if (i < s.steps.length) step(); else done(); }, 450);
      } else {
        tried = true; b.classList.add("wrong"); b.disabled = true;
        const fb = $(".feedback", choices); fb.className = "feedback show bad"; fb.innerHTML = `<div class="fb-head">${icon("x")}<strong>Try again</strong></div><p class="fb-why">${icon("bulb")} ${esc(o.fb || "That's not the best reply.")}</p>`;
      }
    }));
  }
  function done() {
    const total = s.steps.length, pct = Math.round((firstTry / total) * 100);
    const gained = store.recordQuiz({ area: "reallife", id: s.id, title: s.title, score: firstTry, total });
    document.dispatchEvent(new CustomEvent("elh:progress"));
    choices.innerHTML = `<div class="result-top mt">${ring(pct, { size: 96, stroke: 9 })}<div><h3>Conversation complete!</h3><p class="muted">${firstTry} of ${total} replies right first time.</p><span class="pill orange">${icon("zap")} +${gained} XP</span></div></div>
      <div class="row gap wrap mt"><button class="btn primary" type="button" data-again>${icon("refresh")} Practise again</button><a class="btn secondary" href="#/real-life">${icon("back")} All situations</a></div>`;
    $("[data-again]", choices).addEventListener("click", () => practice(view, s));
  }
  step();
  return () => { if (hasSpeech) window.speechSynthesis.cancel(); };
}
