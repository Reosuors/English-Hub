// The app's sections, arranged in a few plain groups. Used by every layout style.
export const GROUPS = [
  { id: "start", label: "Start here", short: "Start", icon: "flag", color: "pink", desc: "New to English? Begin with the basics or find your level.",
    items: [
      { id: "basics", href: "#/basics", label: "First steps", icon: "play", desc: "Letters, numbers, colours and first words, with sound." },
      { id: "placement", href: "#/placement", label: "Find your level", icon: "target", desc: "A short test: Pre-Entry to Level 2." }
    ] },
  { id: "learn", label: "Learn", short: "Learn", icon: "book", color: "sky", desc: "New words, grammar rules, reading and listening.",
    items: [
      { id: "vocab", href: "#/vocab", label: "Words", icon: "cards", desc: "Flashcards, quizzes and a word of the day." },
      { id: "grammar", href: "#/grammar", label: "Grammar", icon: "book", desc: "Easy rules with examples and practice." },
      { id: "reading", href: "#/reading", label: "Reading", icon: "bookopen", desc: "Stories, emails and articles with questions." },
      { id: "listening", href: "#/listening", label: "Listening", icon: "volume", desc: "Conversations in British English." }
    ] },
  { id: "practise", label: "Practise", short: "Practise", icon: "pen", color: "peach", desc: "Use your English: spell, write, speak and fix mistakes.",
    items: [
      { id: "spelling", href: "#/spelling", label: "Spelling", icon: "spell", desc: "Confusing words and spelling tests." },
      { id: "writing", href: "#/writing", label: "Writing", icon: "pen", desc: "Write in the app and get corrections and a score." },
      { id: "speaking", href: "#/speaking", label: "Speaking", icon: "mic", desc: "Repeat, read aloud and talk with your microphone." },
      { id: "mistakes", href: "#/mistakes", label: "Common mistakes", icon: "alert", desc: "Mistakes learners often make, and how to fix them." }
    ] },
  { id: "everyday", label: "Everyday English", short: "Everyday", icon: "chat", color: "mint", desc: "English for real life in the UK.",
    items: [
      { id: "real-life", href: "#/real-life", label: "Real-life English", icon: "user", desc: "GP, Jobcentre, train, shop, college, renting and more." },
      { id: "idioms", href: "#/idioms", label: "Idioms & phrasal verbs", icon: "sparkles", desc: "Common expressions with meanings and examples." }
    ] },
  { id: "me", label: "Me", short: "Me", icon: "user", color: "lavender", desc: "Your progress, badges and settings.",
    items: [
      { id: "progress", href: "#/progress", label: "Progress", icon: "chart", desc: "Your XP, scores, skills and badges." },
      { id: "settings", href: "#/settings", label: "Settings", icon: "settings", desc: "Layout, colours, text size and voice." }
    ] }
];
export const groupOf = (secId) => GROUPS.find((g) => g.items.some((i) => i.id === secId)) || null;
export const groupById = (id) => GROUPS.find((g) => g.id === id) || null;
export const LEARNING_GROUPS = GROUPS.filter((g) => g.id !== "me");

// Layout styles. Each one has its own Home and its own navigation.
export const LAYOUTS = [
  { id: "classic", name: "Classic", who: "The original look", desc: "Clear lines and compact cards. Home has your stats, next lesson and every group." },
  { id: "modern", name: "Modern", who: "Colourful and roomy", desc: "Softer cards, more space, a colourful header and a big tab bar." },
  { id: "simple", name: "Simple", who: "Best for beginners", desc: "Very big buttons, large text and one button to start today's lesson." },
  { id: "path", name: "Path", who: "Step by step", desc: "A learning road for your level. Finish one lesson to open the next." },
  { id: "focus", name: "Focus", who: "For busy or advanced learners", desc: "Everything on one screen in a tidy list. Stats in one line." }
];
export const layoutInfo = (id) => LAYOUTS.find((l) => l.id === id) || LAYOUTS[0];
