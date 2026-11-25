// Progress store: everything is saved in this browser (localStorage).
const KEY = "elh.v1";
const listeners = new Set();

export const LEVELS = [
  { code: "PE", name: "Pre-Entry", desc: "You are new to English. Start with letters, numbers and first words." },
  { code: "E1", name: "Entry 1", desc: "You can understand and use very simple, everyday words and phrases." },
  { code: "E2", name: "Entry 2", desc: "You can talk about yourself, your family, shopping and work in simple sentences." },
  { code: "E3", name: "Entry 3", desc: "You can deal with most everyday situations and describe experiences, plans and opinions." },
  { code: "L1", name: "Level 1", desc: "You can understand longer texts and speak and write clearly about many topics." },
  { code: "L2", name: "Level 2", desc: "You can use English fluently and accurately for study, work and complex topics." }
];
export const levelName = (code) => (LEVELS.find((l) => l.code === code) || {}).name || "Not set";
export const levelIndex = (code) => Math.max(0, LEVELS.findIndex((l) => l.code === code));

export const GOALS = [
  { id: "casual", label: "Casual", xp: 30, mins: "5 min", icon: "clock" },
  { id: "regular", label: "Regular", xp: 60, mins: "10 min", icon: "target" },
  { id: "serious", label: "Serious", xp: 100, mins: "15 min", icon: "flame" },
  { id: "intense", label: "Intense", xp: 150, mins: "20 min", icon: "zap" }
];

function fresh() {
  return {
    v: 1, created: today(), name: "", level: null, theme: "dark", goal: "regular", voiceRate: 1,
    layout: "classic", layoutPicked: false, textSize: "m", sound: true, reduceMotion: false, voiceName: "", time: {},
    xp: 0, log: {}, streak: { count: 0, last: null, best: 0 },
    skills: {}, lessons: {}, scores: [], words: {}, placement: null, badges: {}, last: null
  };
}

export function today(d = new Date()) {
  const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, "0"), dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}
function dayDiff(a, b) { return Math.round((new Date(b + "T12:00:00") - new Date(a + "T12:00:00")) / 86400000); }

let state = load();
function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return fresh();
    return Object.assign(fresh(), JSON.parse(raw));
  } catch (e) { return fresh(); }
}
let storageOk = true;
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); storageOk = true; }
  catch (e) { storageOk = false; }
  listeners.forEach((fn) => { try { fn(state); } catch (e) {} });
}
export const canSave = () => storageOk;
export const get = () => state;
export function set(patch) { Object.assign(state, patch); save(); }
export function onChange(fn) { listeners.add(fn); return () => listeners.delete(fn); }
export function reset() { const keep = { theme: state.theme, layout: state.layout, layoutPicked: state.layoutPicked, textSize: state.textSize, sound: state.sound, reduceMotion: state.reduceMotion, voiceName: state.voiceName, voiceRate: state.voiceRate }; state = Object.assign(fresh(), keep); save(); }
// Export / import progress as a file.
export function exportData() { return JSON.stringify(Object.assign({ app: "english-learning-hub", exported: new Date().toISOString() }, state), null, 1); }
export function importData(text) {
  const o = JSON.parse(text);
  if (!o || typeof o !== "object" || o.v !== 1 || typeof o.xp !== "number" || typeof o.lessons !== "object") throw new Error("This file is not an English Learning Hub progress file.");
  delete o.app; delete o.exported;
  state = Object.assign(fresh(), o); save();
}

// ---- XP, streaks, daily goal ----
export function goalXP() { return (GOALS.find((g) => g.id === state.goal) || GOALS[1]).xp; }
export function xpToday() { return state.log[today()] || 0; }
export function streakNow() {
  const s = state.streak;
  if (!s.last) return 0;
  return dayDiff(s.last, today()) <= 1 ? s.count : 0;
}
// XP levels with names. Each level needs a little more XP than the last.
export const XP_NAMES = ["Starter", "Explorer", "Learner", "Builder", "Speaker", "Reader", "Writer", "Achiever", "Star", "Pro", "Expert", "Master", "Champion", "Legend"];
export function xpLevel(xp = state.xp) {
  let lv = 1, need = 100, base = 0;
  while (xp >= base + need) { base += need; lv += 1; need = 100 + (lv - 1) * 50; }
  return { lv, name: XP_NAMES[Math.min(lv - 1, XP_NAMES.length - 1)], into: xp - base, need, pct: Math.round(((xp - base) / need) * 100), next: XP_NAMES[Math.min(lv, XP_NAMES.length - 1)] };
}
export function lessonsDone() { return Object.values(state.lessons).filter((l) => l && l.done).length; }
export function wordsLearned() { return Object.values(state.words).filter((w) => w && (w.s === "learned" || w.right > 0)).length; }
export function accuracy() {
  let c = 0, t = 0; Object.values(state.skills).forEach((k) => { c += k.c || 0; t += k.t || 0; });
  return t ? Math.round((c / t) * 100) : null;
}
export function addTime(sec) { const t = today(); state.time = state.time || {}; state.time[t] = (state.time[t] || 0) + sec; save(); }
export function minutesToday() { return Math.floor(((state.time || {})[today()] || 0) / 60); }
export function minutesTotal() { return Math.floor(Object.values(state.time || {}).reduce((a, b) => a + b, 0) / 60); }
export function weekDays() {
  const out = []; const d = new Date();
  for (let i = 6; i >= 0; i--) { const x = new Date(d); x.setDate(d.getDate() - i); const k = today(x); out.push({ key: k, label: x.toLocaleDateString("en-GB", { weekday: "narrow" }), xp: state.log[k] || 0, today: i === 0 }); }
  return out;
}
export function addXP(n) {
  if (!n) return;
  const t = today();
  const before = xpLevel().lv;
  state.xp += n;
  state.log[t] = (state.log[t] || 0) + n;
  const s = state.streak;
  if (s.last !== t) {
    s.count = s.last && dayDiff(s.last, t) === 1 ? s.count + 1 : 1;
    s.last = t;
    s.best = Math.max(s.best || 0, s.count);
  }
  save();
  const after = xpLevel();
  try { document.dispatchEvent(new CustomEvent("elh:xp", { detail: { n, levelUp: after.lv > before ? after : null } })); } catch (e) {}
}
function answered(ok) { try { document.dispatchEvent(new CustomEvent("elh:answer", { detail: { ok } })); } catch (e) {} }

// ---- skills, lessons, scores ----
export function recordAnswer(skill, correct) {
  const k = state.skills[skill] || (state.skills[skill] = { c: 0, t: 0 });
  k.t += 1; if (correct) k.c += 1;
  save(); answered(correct);
}
export function skillPct(skill) { const k = state.skills[skill]; return k && k.t ? Math.round((k.c / k.t) * 100) : null; }

// Records a finished quiz; returns XP earned.
export function recordQuiz({ area, id, title, score, total }) {
  const pct = total ? Math.round((score / total) * 100) : 0;
  const key = `${area}/${id}`;
  const l = state.lessons[key] || (state.lessons[key] = { best: 0, attempts: 0, done: false });
  l.attempts += 1; l.best = Math.max(l.best, pct); l.done = true; l.lastDate = today(); l.title = title;
  state.scores.unshift({ area, id, title, score, total, pct, date: today() });
  state.scores = state.scores.slice(0, 60);
  const xp = score * 2 + 10 + (score === total && total > 0 ? 10 : 0);
  addXP(xp);
  return xp;
}
export function lesson(area, id) { return state.lessons[`${area}/${id}`] || null; }
export function setLast(last) { state.last = Object.assign({ at: Date.now() }, last); save(); }

// ---- vocabulary ----
export function word(id) { return state.words[id] || { s: "new", right: 0, wrong: 0 }; }
export function setWordStatus(id, s) {
  const w = state.words[id] || (state.words[id] = { s: "new", right: 0, wrong: 0 });
  w.s = s; w.last = today(); save();
}
export function wordAnswer(id, correct) {
  const w = state.words[id] || (state.words[id] = { s: "new", right: 0, wrong: 0 });
  if (correct) { w.right += 1; if (w.s !== "difficult" && w.right >= 2) w.s = "learned"; else if (w.s === "new") w.s = "learning"; }
  else { w.wrong += 1; w.s = "difficult"; }
  w.last = today(); save(); answered(correct);
}
export function wordCounts() {
  const c = { learned: 0, difficult: 0, learning: 0 };
  Object.values(state.words).forEach((w) => { if (c[w.s] !== undefined) c[w.s] += 1; });
  return c;
}

// ---- badges (unlock dates are saved the first time a badge is earned) ----
export function unlockBadge(id) { if (!state.badges[id]) { state.badges[id] = today(); save(); return true; } return false; }
