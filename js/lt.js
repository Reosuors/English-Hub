// Grammar and spelling check with the free public LanguageTool service (British English).
// Your text is sent to languagetool.org for checking. If the service can't be reached, we say so.
export async function checkText(text, { timeout = 9000 } = {}) {
  const ctl = new AbortController();
  const tm = setTimeout(() => ctl.abort(), timeout);
  try {
    const body = new URLSearchParams({ text, language: "en-GB", level: "default" });
    const r = await fetch("https://api.languagetool.org/v2/check", { method: "POST", body, signal: ctl.signal, headers: { Accept: "application/json" } });
    if (!r.ok) throw new Error("status " + r.status);
    const j = await r.json();
    return { ok: true, matches: j.matches || [] };
  } catch (e) {
    return { ok: false, error: e.name === "AbortError" ? "The checker took too long to answer." : "The online checker is not available right now." };
  } finally { clearTimeout(tm); }
}

const CONNECT_BASIC = ["and", "but", "because", "so", "then", "or"];
const CONNECT_MORE = ["although", "however", "while", "whereas", "therefore", "despite", "unless", "moreover", "furthermore", "since", "which", "who", "whose", "when", "if", "before", "after", "until", "as well as", "in addition", "on the other hand", "even though", "in order to"];
const IRREG_PAST = ["was", "were", "went", "had", "did", "saw", "made", "came", "took", "got", "ate", "bought", "met", "wrote", "spoke", "left", "felt", "found", "gave", "knew", "said", "thought", "told", "became", "began", "brought", "caught", "drove", "flew", "grew", "kept", "lost", "paid", "ran", "sat", "slept", "spent", "stood", "taught", "understood", "won"];

// A rule-based estimate of writing level (0 = Entry 1 … 4 = Level 2). Not a teacher's mark.
export function analyseWriting(text, ltMatches = null) {
  const clean = text.trim();
  const words = clean.match(/[A-Za-z']+/g) || [];
  const wc = words.length;
  const sentences = clean.split(/[.!?]+/).map((s) => s.trim()).filter((s) => s.split(/\s+/).length >= 2);
  const sc = Math.max(1, sentences.length);
  const lower = " " + clean.toLowerCase().replace(/[^a-z' ]+/g, " ") + " ";
  const basic = CONNECT_BASIC.filter((c) => lower.includes(` ${c} `)).length;
  const more = CONNECT_MORE.filter((c) => lower.includes(` ${c} `)).length;
  const tenses = {
    present: /\b(i|you|we|they|he|she|it)\s+(am|is|are|\w+s|like|live|work|study|go|have)\b/.test(lower),
    past: words.some((w) => IRREG_PAST.includes(w.toLowerCase()) || (/ed$/i.test(w) && w.length > 4)),
    future: /\b(will|won't|going to|'ll)\b/.test(lower) || /\b(i|we|you|they|he|she)'ll\b/.test(clean.toLowerCase()),
    perfect: /\b(have|has|had|'ve)\s+(\w+ed|been|done|seen|gone|made|known|lived|worked|studied|taken|got|had|written|met)\b/.test(lower)
  };
  const tenseCount = Object.values(tenses).filter(Boolean).length;
  const avgLen = words.reduce((a, w) => a + w.length, 0) / Math.max(1, wc);
  const longWords = words.filter((w) => w.length >= 8).length;
  let pts = 0;
  pts += wc >= 90 ? 3 : wc >= 50 ? 2 : wc >= 20 ? 1 : 0;
  pts += more >= 3 ? 2 : more >= 1 ? 1 : 0;
  pts += basic >= 1 ? 0.5 : 0;
  pts += tenseCount >= 3 ? 2 : tenseCount === 2 ? 1 : 0;
  pts += avgLen >= 5 ? 1.5 : avgLen >= 4.4 ? 0.75 : 0;
  pts += longWords >= 5 ? 1 : 0;
  pts += wc / sc >= 12 ? 0.5 : 0;
  let errRate = null;
  if (ltMatches) {
    const errs = ltMatches.filter((m) => !["TYPOGRAPHY", "STYLE"].includes((m.rule && m.rule.category && m.rule.category.id) || "")).length;
    errRate = (errs / Math.max(1, wc)) * 100;
    pts += errRate < 2 ? 2 : errRate < 5 ? 1 : errRate < 10 ? 0 : -1;
  } else pts += 1;
  const level = pts <= 2.5 ? 0 : pts <= 4.5 ? 1 : pts <= 6.5 ? 2 : pts <= 8.5 ? 3 : 4;
  return { level, pts, wc, sentences: sentences.length, connectors: basic + more, advancedConnectors: more, tenses, tenseCount, avgLen, errRate };
}
