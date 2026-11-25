import * as store from "../store.js";
import { icon } from "../icons.js";
import { $, $$, esc, listenBtn, levelChip, runQuiz, shuffle, sample, hashStr, toast, levelPills, applyLevel, startFilter } from "../ui.js";
import { WORDS, AMERICAN_WORDS } from "../data/vocab.js";
import { setHelperContext } from "../helper.js";

export function dailyWord(date = store.today()) {
  const lvl = store.get().level || "E1";
  let pool = WORDS.filter((w) => w.level === lvl);
  if (!pool.length) pool = WORDS.filter((w) => w.level === "E1");
  return pool[hashStr(date + lvl) % pool.length];
}
const STATUS = { new: "New", learning: "Learning", learned: "Learned", difficult: "Difficult" };
const statusPill = (id) => { const s = store.word(id).s; return `<span class="st st-${s}">${STATUS[s]}</span>`; };
function head(title, sub, back = "#/learn") {
  return `<header class="page-head"><a class="icon-btn back" href="${back}" aria-label="Back">${icon("back")}</a><div class="grow"><h1>${esc(title)}</h1>${sub ? `<p class="muted small">${esc(sub)}</p>` : ""}</div><span class="t-ic mint">${icon("cards")}</span></header>`;
}
function levelSelect(cur, id = "lvl-sel") {
  return `<label class="select-wrap"><span class="sr-only">Level</span><select id="${id}" class="input"><option value="all" ${cur === "all" ? "selected" : ""}>All levels</option>${store.LEVELS.map((l) => `<option value="${l.code}" ${cur === l.code ? "selected" : ""}>${l.name}</option>`).join("")}<option value="difficult" ${cur === "difficult" ? "selected" : ""}>My difficult words</option></select></label>`;
}
function pool(level) {
  if (level === "difficult") return WORDS.filter((w) => store.word(w.id).s === "difficult");
  return level && level !== "all" ? WORDS.filter((w) => w.level === level) : WORDS;
}

export function render(view, params) {
  const [a, b] = params;
  if (a === "cards") return flashcards(view, b || store.get().level || "E1");
  if (a === "quiz") return quiz(view, b || store.get().level || "E1");
  if (a === "list") return list(view);
  if (a === "american") return american(view);
  if (a === "word" && b) return wordPage(view, b);
  overview(view);
}

function overview(view) {
  const c = store.wordCounts();
  const dw = dailyWord();
  const lvl = store.get().level || "E1";
  view.innerHTML = `${head("Words", `${WORDS.length} words from Entry 1 to Level 2`, "#/")}
  <section class="card pastel mint wod">
    <div class="row between"><p class="small strong">${icon("sparkles")} Word of the day</p>${levelChip(dw.level)}</div>
    <div class="row gap center-y"><h2 class="wod-word">${esc(dw.w)}</h2>${listenBtn(dw.w)}</div>
    <p class="small"><i>${esc(dw.pos)}</i> · ${esc(dw.def)}</p><p class="wod-ex">“${esc(dw.ex)}”</p>
    <div class="row gap wrap"><a class="btn dark sm" href="#/vocab/word/${dw.id}">${icon("eye")} See more</a>${store.word(dw.id).s === "learned" ? `<span class="pill ok">${icon("check")} Learned</span>` : `<button class="btn ghost-dark sm" type="button" data-learn="${dw.id}">${icon("check")} I know this word</button>`}</div>
  </section>
  <div class="mini-stats">
    <div class="card"><b>${c.learned}</b><small>${icon("check")} Learned</small></div>
    <div class="card"><b>${c.learning}</b><small>${icon("refresh")} Learning</small></div>
    <a class="card" href="#/vocab/cards/difficult"><b>${c.difficult}</b><small>${icon("alert")} Difficult</small></a>
  </div>
  <div class="option-cards">
    <a class="card opt-card" href="#/vocab/cards/${lvl}"><span class="t-ic peach">${icon("layers")}</span><span class="grow"><b>Flashcards</b><small class="muted">See a word, think, then turn the card.</small></span>${icon("chevron", "chev")}</a>
    <a class="card opt-card" href="#/vocab/quiz/${lvl}"><span class="t-ic lavender">${icon("help")}</span><span class="grow"><b>Word quiz</b><small class="muted">10 questions about meaning and use.</small></span>${icon("chevron", "chev")}</a>
    <a class="card opt-card" href="#/vocab/list"><span class="t-ic sky">${icon("list")}</span><span class="grow"><b>All words</b><small class="muted">Search, listen and mark words.</small></span>${icon("chevron", "chev")}</a>
    <a class="card opt-card" href="#/vocab/american"><span class="t-ic yellow">${icon("bookopen")}</span><span class="grow"><b>American words you may hear</b><small class="muted">British word → American word.</small></span>${icon("chevron", "chev")}</a>
  </div>`;
  const lb = $("[data-learn]", view);
  if (lb) lb.addEventListener("click", () => { store.setWordStatus(lb.dataset.learn, "learned"); store.addXP(2); toast(`${icon("check")} Added to your learned words. +2 XP`, "ok"); overview(view); });
}

function flashcards(view, level) {
  let cards = shuffle(pool(level));
  let i = 0;
  view.innerHTML = `${head("Flashcards", "Tap the card to turn it", "#/vocab")}
  <div class="row gap wrap fc-tools">${levelSelect(level)}<button class="btn ghost sm" type="button" data-shuffle>${icon("shuffle")} Shuffle</button></div>
  <div id="fc"></div>`;
  $("#lvl-sel", view).addEventListener("change", (e) => (location.hash = `#/vocab/cards/${e.target.value}`));
  $("[data-shuffle]", view).addEventListener("click", () => { cards = shuffle(cards); i = 0; draw(); });
  store.setLast({ href: `#/vocab/cards/${level}`, title: "Flashcards", sub: `Words · ${level === "difficult" ? "difficult words" : level === "all" ? "all levels" : store.levelName(level)}`, pct: Math.round((pool(level).filter((w) => store.word(w.id).s === "learned").length / Math.max(1, pool(level).length)) * 100) });
  function draw() {
    const box = $("#fc", view);
    if (!cards.length) { box.innerHTML = `<div class="card empty">${icon("check")}<h3>No words here</h3><p class="muted">${level === "difficult" ? "You have no difficult words. Great job!" : "Choose another level."}</p><a class="btn primary" href="#/vocab">${icon("back")} Back to words</a></div>`; return; }
    if (i >= cards.length) { box.innerHTML = `<div class="card empty">${icon("award")}<h3>You finished all ${cards.length} cards!</h3><p class="muted">Practise again or take the word quiz.</p><div class="row gap wrap center"><button class="btn secondary" type="button" data-restart>${icon("refresh")} Start again</button><a class="btn primary" href="#/vocab/quiz/${level === "difficult" ? "difficult" : level}">${icon("help")} Word quiz</a></div></div>`; $("[data-restart]", box).addEventListener("click", () => { i = 0; draw(); }); return; }
    const w = cards[i];
    box.innerHTML = `
    <p class="small muted center-text">Card ${i + 1} of ${cards.length}</p>
    <div class="flip" tabindex="0" role="button" aria-label="Turn the card. Word: ${esc(w.w)}">
      <div class="flip-in">
        <div class="face front card"><div class="row between w100">${levelChip(w.level)}${statusPill(w.id)}</div><h2 class="fc-word">${esc(w.w)}</h2><p class="muted"><i>${esc(w.pos)}</i></p><p class="small muted fc-hint">${icon("refresh")} Tap to see the meaning</p></div>
        <div class="face back card"><h3>${esc(w.w)}</h3><p>${esc(w.def)}</p><p class="ex-line"><span>“${esc(w.ex)}”</span></p>
          ${w.syn.length ? `<p class="small"><b>Similar:</b> ${esc(w.syn.join(", "))}</p>` : ""}${w.ant.length ? `<p class="small"><b>Opposite:</b> ${esc(w.ant.join(", "))}</p>` : ""}</div>
      </div>
    </div>
    <div class="row gap center fc-listen">${listenBtn(w.w, "Listen to the word")}${listenBtn(w.ex, "Listen to the example")}</div>
    <div class="fc-actions">
      <button class="btn bad-soft" type="button" data-rate="difficult">${icon("alert")} Difficult</button>
      <button class="btn ok-soft" type="button" data-rate="learned">${icon("check")} I know it</button>
    </div>
    <div class="row between fc-nav"><button class="btn ghost sm" type="button" data-prev ${i === 0 ? "disabled" : ""}>${icon("back")} Back</button><button class="btn ghost sm" type="button" data-skip>Skip ${icon("next")}</button></div>`;
    const flip = $(".flip", box);
    const turn = () => flip.classList.toggle("turned");
    flip.addEventListener("click", (e) => { if (!e.target.closest("button")) turn(); });
    flip.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); turn(); } });
    $$("[data-rate]", box).forEach((b) => b.addEventListener("click", () => {
      store.setWordStatus(w.id, b.dataset.rate);
      store.addXP(1);
      if (b.dataset.rate === "learned" && level === "difficult") cards.splice(i, 1); else i++;
      draw();
    }));
    $("[data-prev]", box).addEventListener("click", () => { i = Math.max(0, i - 1); draw(); });
    $("[data-skip]", box).addEventListener("click", () => { i++; draw(); });
  }
  draw();
}

function blankExample(w) {
  const re = new RegExp(`\\b${w.w.replace(/[-]/g, "\\-")}\\b`, "i");
  return re.test(w.ex) ? w.ex.replace(re, "___") : null;
}
export function makeWordQuestions(words, all = WORDS, n = 10) {
  return sample(words, Math.min(n, words.length)).map((w, k) => {
    const others = shuffle(all.filter((o) => o.id !== w.id && o.pos === w.pos));
    const others2 = others.length >= 2 ? others : shuffle(all.filter((o) => o.id !== w.id));
    const types = ["meaning", "word"]; const blank = blankExample(w); if (blank) types.push("blank"); if (w.syn.length) types.push("syn");
    const type = types[Math.floor(Math.random() * types.length)];
    let q;
    if (type === "meaning") { const opts = shuffle([w, others2[0], others2[1]]); q = { q: `What does “${w.w}” mean?`, a: opts.map((o) => o.def), c: opts.indexOf(w) }; }
    else if (type === "word") { const opts = shuffle([w, others2[0], others2[1]]); q = { q: `Which word means: “${w.def}”?`, a: opts.map((o) => o.w), c: opts.indexOf(w) }; }
    else if (type === "blank") { const opts = shuffle([w, others2[0], others2[1]]); q = { q: `Choose the missing word: ${blank}`, a: opts.map((o) => o.w), c: opts.indexOf(w) }; }
    else { const wrong = others2.filter((o) => !w.syn.includes(o.w) && !o.syn.includes(w.w)).slice(0, 2).map((o) => o.w); const right = w.syn[0]; const opts = shuffle([right, ...wrong]); q = { q: `Which word is similar to “${w.w}”?`, a: opts, c: opts.indexOf(right) }; }
    q.e = `${w.w} (${w.pos}): ${w.def}. Example: “${w.ex}”`;
    q.wordId = w.id;
    return q;
  });
}

function quiz(view, level) {
  const words = pool(level);
  view.innerHTML = `${head("Word quiz", level === "difficult" ? "Your difficult words" : level === "all" ? "All levels" : store.levelName(level), "#/vocab")}
  <div class="row gap wrap fc-tools">${levelSelect(level)}</div><div id="quiz"></div>`;
  $("#lvl-sel", view).addEventListener("change", (e) => (location.hash = `#/vocab/quiz/${e.target.value}`));
  if (words.length < 3) { $("#quiz", view).innerHTML = `<div class="card empty">${icon("check")}<h3>Not enough words here</h3><p class="muted">${level === "difficult" ? "You have fewer than 3 difficult words. Great!" : "Choose another level."}</p><a class="btn primary" href="#/vocab">${icon("back")} Back to words</a></div>`; return; }
  runQuiz($("#quiz", view), {
    title: `Word quiz (${level === "all" ? "all levels" : level === "difficult" ? "difficult words" : store.levelName(level)})`, questions: makeWordQuestions(words, WORDS), area: "vocab", id: "quiz-" + level, skill: "vocabulary",
    onAnswer: (q, ok) => store.wordAnswer(q.wordId, ok), exitLabel: "Back to words", onExit: () => (location.hash = "#/vocab")
  });
}

let listFilter = { q: "", level: null, status: "all" };
function list(view) {
  if (listFilter.level === null) listFilter.level = startFilter(WORDS);
  view.innerHTML = `${head("All words", "Tap a word to see more", "#/vocab")}
  <label class="search"><span class="sr-only">Search words</span>${icon("search")}<input id="v-q" class="input" type="search" placeholder="Search a word" value="${esc(listFilter.q)}" /></label>
  ${levelPills(WORDS, listFilter.level)}
  <div class="row gap wrap fc-tools">
    <label class="select-wrap"><span class="sr-only">Status</span><select id="v-s" class="input">${[["all", "All words"], ["new", "New"], ["learning", "Learning"], ["learned", "Learned"], ["difficult", "Difficult"]].map(([k, l]) => `<option value="${k}" ${listFilter.status === k ? "selected" : ""}>${l}</option>`).join("")}</select></label>
  </div>
  <p class="small muted" id="v-count"></p>
  <ul class="word-list" id="v-list"></ul>`;
  const draw = () => {
    const q = listFilter.q.toLowerCase();
    const items = applyLevel(WORDS.filter((w) => (!q || w.w.toLowerCase().includes(q) || w.def.toLowerCase().includes(q)) && (q || listFilter.level === "all" || w.level === listFilter.level) && (listFilter.status === "all" || store.word(w.id).s === listFilter.status)), "all");
    $("#v-count", view).textContent = `${items.length} word${items.length === 1 ? "" : "s"}`;
    $("#v-list", view).innerHTML = items.length ? items.map((w) => `<li><a class="card word-row" href="#/vocab/word/${w.id}"><span class="grow"><b>${esc(w.w)}</b> <i class="muted small">${esc(w.pos)}</i><small class="muted">${esc(w.def)}</small></span>${statusPill(w.id)}</a></li>`).join("") : `<li class="card muted">No words found.</li>`;
  };
  draw();
  $("#v-q", view).addEventListener("input", (e) => { listFilter.q = e.target.value; draw(); });
  $$("[data-f]", view).forEach((b) => b.addEventListener("click", () => { listFilter.level = b.dataset.f; list(view); }));
  $("#v-s", view).addEventListener("change", (e) => { listFilter.status = e.target.value; draw(); });
}

const dictCache = {};
function wordPage(view, id) {
  const w = WORDS.find((x) => x.id === id);
  if (!w) { view.innerHTML = `<div class="card empty">${icon("alert")}<h1>Word not found</h1><a class="btn primary" href="#/vocab/list">${icon("back")} All words</a></div>`; return; }
  setHelperContext({ tip: `Make your own sentence with “${w.w}”. Then check it in the Check tab.`, exTitle: "Examples with similar words", examples: [w.ex].concat(WORDS.filter((o) => o.topic === w.topic && o.id !== w.id).slice(0, 8).map((o) => o.ex)) });
  const draw = () => {
    const st = store.word(w.id).s;
    view.innerHTML = `${head(w.w, `${w.pos} · ${store.levelName(w.level)} · ${w.topic}`, "#/vocab/list")}
    <section class="card word-hero"><div class="row gap center-y"><h2 class="fc-word">${esc(w.w)}</h2>${listenBtn(w.w)}</div><p class="muted" id="phon"><i>${esc(w.pos)}</i></p><div id="dict-audio"></div></section>
    <section class="card lesson-sec"><h2>Meaning</h2><p>${esc(w.def)}</p><h2>Example</h2><p class="ex-line">${listenBtn(w.ex)}<span>“${esc(w.ex)}”</span></p>
      ${w.syn.length ? `<h2>Similar words</h2><div class="row gap wrap">${w.syn.map((x) => `<span class="pill soft">${esc(x)}</span>`).join("")}</div>` : ""}
      ${w.ant.length ? `<h2>Opposite words</h2><div class="row gap wrap">${w.ant.map((x) => `<span class="pill soft">${esc(x)}</span>`).join("")}</div>` : ""}
    </section>
    <section class="card"><h2 class="h3">My status: ${STATUS[st]}</h2><div class="row gap wrap">
      <button class="btn ${st === "learned" ? "primary" : "secondary"}" type="button" data-st="learned">${icon("check")} I know it</button>
      <button class="btn ${st === "difficult" ? "primary" : "secondary"}" type="button" data-st="difficult">${icon("alert")} Difficult</button>
      ${st !== "new" ? `<button class="btn ghost" type="button" data-st="new">${icon("refresh")} Reset</button>` : ""}</div></section>`;
    $$("[data-st]", view).forEach((b) => b.addEventListener("click", () => { store.setWordStatus(w.id, b.dataset.st); draw(); }));
    dictionary();
  };
  const dictionary = async () => {
    const show = (d) => {
      const ph = $("#phon", view); if (!ph || !d) return;
      if (d.phon) ph.innerHTML = `<i>${esc(w.pos)}</i> · <span class="phon">${esc(d.phon)}</span>`;
      if (d.audio) { $("#dict-audio", view).innerHTML = `<button class="btn ghost sm" type="button" id="dict-play">${icon("volume")} Real British voice</button>`; $("#dict-play", view).addEventListener("click", () => { const a = new Audio(d.audio); a.play().catch(() => toast("Sorry, the audio could not play.", "bad")); }); }
    };
    if (dictCache[w.id] !== undefined) return show(dictCache[w.id]);
    if (w.w.includes(" ")) return;
    try {
      const ctl = new AbortController(); const tm = setTimeout(() => ctl.abort(), 6000);
      const r = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(w.w.toLowerCase())}`, { signal: ctl.signal });
      clearTimeout(tm);
      if (!r.ok) throw new Error(r.status);
      const j = await r.json();
      const phs = j.flatMap((e) => e.phonetics || []);
      const uk = phs.find((p) => /-uk\.mp3$/.test(p.audio || ""));
            const phon = (uk && uk.text) || (phs.find((p) => p.text) || {}).text || j[0].phonetic || "";
      dictCache[w.id] = { phon, audio: uk ? uk.audio : "", uk: !!uk };
    } catch (e) { dictCache[w.id] = null; }
    show(dictCache[w.id]);
  };
  draw();
}

function american(view) {
  view.innerHTML = `${head("American words you may hear", "We use British English. Films and the internet often use American words.", "#/vocab")}
  <div class="card"><div class="g-table two" role="table"><div class="g-tr g-th" role="row"><span role="columnheader">British (use this)</span><span role="columnheader">American</span></div>
  ${AMERICAN_WORDS.map(([uk, us]) => `<div class="g-tr" role="row"><span role="cell"><b>${esc(uk)}</b> ${listenBtn(uk)}</span><span role="cell" class="muted">${esc(us)}</span></div>`).join("")}</div></div>
  <section class="card tip">${icon("bulb")}<div><b>Spelling tip</b><p>British English: colour, favourite, centre, organise, travelling. American English: color, favorite, center, organize, traveling.</p></div></section>`;
}
