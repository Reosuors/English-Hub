import * as store from "../store.js";
import { icon } from "../icons.js";
import { $, $$, esc, levelChip, runQuiz, hasSpeech, levelPills, applyLevel, startFilter } from "../ui.js";
import { LISTENING } from "../data/listening.js";

let filter = null;
const FEMALE = /female|libby|sonia|hazel|kate|serena|martha|susan|stephanie|fiona|moira|amy|emma|maisie|bella/i;
const MALE = /\bmale|ryan|george|daniel|arthur|oliver|thomas|alfie|elliot|noah|rishi/i;
function gbVoices() { try { return window.speechSynthesis.getVoices().filter((v) => /en[-_]GB/i.test(v.lang)); } catch (e) { return []; } }
function voiceFor(g) {
  const vs = gbVoices();
  // The British voice chosen in Settings reads its own speaker's lines (woman or man); the other speaker gets another British voice.
  const chosen = store.get().voiceName ? window.speechSynthesis.getVoices().find((v) => v.name === store.get().voiceName) : null;
  const isMale = (v) => MALE.test(v.name.replace(/female/i, "")) && !FEMALE.test(v.name);
  if (chosen) {
    const role = isMale(chosen) ? "m" : "f";
    if (g === role) return { v: chosen, pitch: 1 };
    const other = vs.find((v) => v !== chosen && (role === "f" ? isMale(v) : !isMale(v))) || vs.find((v) => v !== chosen);
    return { v: other || chosen, pitch: other ? 1 : (g === "m" ? 0.85 : 1.15) };
  }
  const f = vs.find((v) => FEMALE.test(v.name) && !/\bmale/i.test(v.name.replace(/female/i, "")));
  const m = vs.find((v) => MALE.test(v.name.replace(/female/i, "")));
  if (g === "f") return { v: f || vs[0] || null, pitch: f ? 1 : 1.15 };
  return { v: m || (vs.length > 1 ? vs.find((x) => x !== (f || vs[0])) : vs[0]) || null, pitch: m ? 1 : 0.85 };
}
function head(title, sub, back = "#/learn") {
  return `<header class="page-head"><a class="icon-btn back" href="${back}" aria-label="Back">${icon("back")}</a><div class="grow"><h1>${esc(title)}</h1>${sub ? `<p class="muted small">${esc(sub)}</p>` : ""}</div><span class="t-ic peach">${icon("volume")}</span></header>`;
}
export function render(view, params) {
  const [id] = params;
  if (id) { const r = LISTENING.find((x) => x.id === id); if (r) return player(view, r); }
  list(view);
}
function list(view) {
  if (filter === null) filter = startFilter(LISTENING);
  const done = LISTENING.filter((r) => store.lesson("listening", r.id)).length;
  view.innerHTML = `${head("Listening", `${done} of ${LISTENING.length} done · British English`)}
  ${!hasSpeech ? `<div class="card note">${icon("alert")}<span class="small">This browser can't play the audio. You can still read the transcripts and answer the questions. For audio, use Chrome, Edge or Safari.</span></div>` : ""}
  ${levelPills(LISTENING, filter)}
  <ul class="topic-list">${applyLevel(LISTENING, filter).map((r) => { const l = store.lesson("listening", r.id); return `<li><a class="card topic-row" href="#/listening/${r.id}">
    <span class="tr-state ${l ? (l.best >= 80 ? "master" : "done") : ""}">${l ? icon("check") : icon("play")}</span>
    <span class="grow"><span class="row gap center-y wrap">${levelChip(r.level)}<span class="small muted">${esc(r.type)} · ${r.questions.length} questions</span>${l ? `<span class="small muted">· best ${l.best}%</span>` : ""}</span><b>${esc(r.title)}</b></span>${icon("chevron", "chev")}</a></li>`; }).join("")}</ul>`;
  $$("[data-f]", view).forEach((b) => b.addEventListener("click", () => { filter = b.dataset.f; list(view); }));
}
function player(view, r) {
  const l = store.lesson("listening", r.id);
  store.setLast({ href: `#/listening/${r.id}`, title: r.title, sub: `Listening · ${store.levelName(r.level)}`, pct: l ? l.best : 0 });
  let idx = -1, playing = false, slow = false, plays = 0, stopped = false;
  view.innerHTML = `${head(r.title, `${r.type} · ${store.levelName(r.level)}`, "#/listening")}
  <section class="card player">
    ${hasSpeech ? `
    <div class="player-main">
      <button class="play-btn" type="button" data-play aria-label="Play">${icon("play")}</button>
      <div class="grow"><b data-status>Press play to listen</b><div class="bar thin"><i data-prog style="width:0%"></i></div><p class="small muted" data-count>${r.lines.length} part${r.lines.length === 1 ? "" : "s"} · British English</p></div>
    </div>
    <div class="row gap wrap center">
      <button class="btn ghost sm" type="button" data-replay>${icon("refresh")} Start again</button>
      <button class="btn ghost sm" type="button" data-slow aria-pressed="false">${icon("turtle")} Slow</button>
      <button class="btn ghost sm" type="button" data-tr aria-expanded="false">${icon("eye")} Show transcript</button>
    </div>` : `<div class="note">${icon("alert")}<span class="small">Audio is not available in this browser, so the transcript is shown.</span></div>`}
    <ol class="transcript ${hasSpeech ? "hidden" : ""}" data-transcript>${r.lines.map(([g, t], i) => `<li data-li="${i}"><span class="spk ${g}">${r.lines.length > 1 && new Set(r.lines.map((x) => x[0])).size > 1 ? (g === "f" ? "Woman" : "Man") : "Speaker"}</span><span>${esc(t)}</span></li>`).join("")}</ol>
  </section>
  <h2 class="h3">Questions</h2>
  <p class="small muted">Listen first. You can play it again as many times as you like.</p>
  <div id="quiz"></div>`;
  const chunks = r.lines.flatMap(([g, t], li) => (t.match(/[^.!?]+[.!?]+["']?|[^.!?]+$/g) || [t]).map((s) => [g, s.trim(), li])).filter((c) => c[1]);
  if (hasSpeech) {
    const btn = $("[data-play]", view), status = $("[data-status]", view), prog = $("[data-prog]", view);
    const setBtn = () => { btn.innerHTML = icon(playing ? "x" : "play"); btn.setAttribute("aria-label", playing ? "Stop" : "Play"); btn.classList.toggle("on", playing); };
    const mark = () => { const cur = idx >= 0 && chunks[idx] ? chunks[idx][2] : -1; $$("[data-li]", view).forEach((li) => li.classList.toggle("now", Number(li.dataset.li) === cur)); prog.style.width = `${Math.max(0, ((idx + 1) / chunks.length) * 100)}%`; };
    const speakLine = () => {
      if (stopped) return;
      idx++;
      if (idx >= chunks.length) { playing = false; idx = -1; plays++; status.textContent = "Finished. Answer the questions, or listen again."; setBtn(); mark(); return; }
      const [g, t, li] = chunks[idx];
      const u = new SpeechSynthesisUtterance(t); u.lang = "en-GB";
      const vv = voiceFor(g); if (vv.v) u.voice = vv.v; u.pitch = vv.pitch; u.rate = slow ? 0.75 : (store.get().voiceRate || 1) * 0.95;
      u.onend = () => setTimeout(speakLine, chunks[idx + 1] && chunks[idx + 1][2] === li ? 120 : 400); u.onerror = () => { playing = false; setBtn(); status.textContent = "Sorry, the audio stopped. Press play to try again."; };
      status.textContent = `Playing… ${Math.round(((idx + 1) / chunks.length) * 100)}%`; mark();
      window.speechSynthesis.speak(u);
    };
    const start = (from = -1) => { window.speechSynthesis.cancel(); stopped = false; idx = from; playing = true; setBtn(); setTimeout(speakLine, 120); };
    const stop = () => { stopped = true; window.speechSynthesis.cancel(); playing = false; setBtn(); status.textContent = "Stopped."; };
    btn.addEventListener("click", () => (playing ? stop() : start(-1)));
    $("[data-replay]", view).addEventListener("click", () => start(-1));
    $("[data-slow]", view).addEventListener("click", (e) => { slow = !slow; e.currentTarget.setAttribute("aria-pressed", slow); e.currentTarget.classList.toggle("on", slow); });
    $("[data-tr]", view).addEventListener("click", (e) => { const t = $("[data-transcript]", view); const show = t.classList.toggle("hidden") === false; e.currentTarget.setAttribute("aria-expanded", show); e.currentTarget.innerHTML = `${icon("eye")} ${show ? "Hide transcript" : "Show transcript"}`; });
  }
  runQuiz($("#quiz", view), { title: r.title, questions: r.questions, area: "listening", id: r.id, skill: "listening", exitLabel: "All listening", onExit: () => (location.hash = "#/listening") });
  return () => { stopped = true; if (hasSpeech) window.speechSynthesis.cancel(); };
}
