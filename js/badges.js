import * as store from "./store.js";
import { icon } from "./icons.js";
import { toast } from "./ui.js";

const doneCount = (s, area) => Object.keys(s.lessons).filter((k) => k.startsWith(area + "/") && s.lessons[k].done).length;
export const BADGES = [
  { id: "first-step", title: "First Step", desc: "Finish your first quiz.", icon: "star", test: (s) => s.scores.length >= 1 },
  { id: "level-found", title: "Level Found", desc: "Complete the level test.", icon: "target", test: (s) => !!s.placement },
  { id: "streak-3", title: "On Fire", desc: "Learn 3 days in a row.", icon: "flame", test: (s) => (s.streak.best || 0) >= 3 },
  { id: "streak-7", title: "One Week", desc: "Learn 7 days in a row.", icon: "calendar", test: (s) => (s.streak.best || 0) >= 7 },
  { id: "xp-100", title: "100 XP", desc: "Earn 100 XP.", icon: "zap", test: (s) => s.xp >= 100 },
  { id: "xp-1000", title: "1,000 XP", desc: "Earn 1,000 XP.", icon: "zap", test: (s) => s.xp >= 1000 },
  { id: "perfect", title: "Perfect!", desc: "Get 100% in a quiz.", icon: "award", test: (s) => s.scores.some((x) => x.pct === 100) },
  { id: "grammar-5", title: "Grammar Fan", desc: "Finish 5 grammar lessons.", icon: "book", test: (s) => doneCount(s, "grammar") >= 5 },
  { id: "words-25", title: "Word Collector", desc: "Learn 25 words.", icon: "cards", test: (s) => Object.values(s.words).filter((w) => w.s === "learned").length >= 25 },
  { id: "speller", title: "Super Speller", desc: "Finish 5 spelling quizzes.", icon: "spell", test: (s) => doneCount(s, "spelling") >= 5 },
  { id: "writer", title: "Writer", desc: "Check 5 pieces of writing.", icon: "pen", test: (s) => (s.writing || []).length >= 5 },
  { id: "reader", title: "Bookworm", desc: "Finish 5 reading texts.", icon: "bookopen", test: (s) => doneCount(s, "reading") >= 5 },
  { id: "listener", title: "Good Listener", desc: "Finish 5 listening tasks.", icon: "volume", test: (s) => doneCount(s, "listening") >= 5 },
  { id: "real-life", title: "Ready for Real Life", desc: "Complete 5 real-life conversations.", icon: "user", test: (s) => doneCount(s, "reallife") >= 5 }
];
export function checkBadges() {
  const s = store.get();
  BADGES.forEach((b) => { if (b.test(s) && store.unlockBadge(b.id)) toast(`${icon(b.icon)} Badge unlocked: <b>${b.title}</b>`, "ok"); });
}
