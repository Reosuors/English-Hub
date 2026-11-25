// Common English mistakes made by learners (many are common for Arabic speakers). [wrong, right, why]
export const MISTAKE_GROUPS = [
{ id: "verbs", title: "Verbs and 'be'", icon: "zap", color: "peach", items: [
  ["I am agree with you.", "I agree with you.", "'Agree' is a verb. Don't use 'am' before it."],
  ["He very tall.", "He is very tall.", "English sentences need a verb. Use am / is / are."],
  ["She is study at college.", "She studies at college.", "Don't put 'is' before a present simple verb. Use 'is studying' or 'studies'."],
  ["He don't like coffee.", "He doesn't like coffee.", "With he / she / it, use 'doesn't'."],
  ["Does he likes football?", "Does he like football?", "After 'does', use the base verb (no -s)."],
  ["I didn't went to work.", "I didn't go to work.", "After 'didn't', use the base verb."],
  ["It's depend on the price.", "It depends on the price.", "'Depend' is the verb, so: it depends."],
  ["I will can help you.", "I will be able to help you.", "You can't put two modal verbs together. Use 'will be able to'."],
  ["I have 30 years.", "I am 30 (years old).", "For age, English uses 'be', not 'have'."],
  ["I'm boring in this class.", "I'm bored in this class.", "-ed = how you feel (bored). -ing = what causes it (The class is boring)."]
] },
{ id: "tenses", title: "Time and tenses", icon: "clock", color: "lavender", items: [
  ["I live here since 3 years.", "I have lived here for 3 years.", "From the past to now → present perfect. Use 'for' with a period of time."],
  ["I am living here since 2020.", "I have lived (I've been living) here since 2020.", "With 'since' + a starting point, use the present perfect."],
  ["I have seen him yesterday.", "I saw him yesterday.", "A finished time (yesterday) needs the past simple."],
  ["When I will arrive, I'll call you.", "When I arrive, I'll call you.", "After 'when' (about the future), use the present simple."],
  ["If I will see her, I'll tell her.", "If I see her, I'll tell her.", "Don't use 'will' after 'if'."],
  ["I look forward to see you.", "I look forward to seeing you.", "'Look forward to' is followed by -ing."]
] },
{ id: "articles", title: "Articles (a, an, the)", icon: "book", color: "mint", items: [
  ["She is teacher.", "She is a teacher.", "Use 'a' or 'an' before a job."],
  ["The life is beautiful.", "Life is beautiful.", "Talking about something in general → no article."],
  ["I went to the home.", "I went home.", "We say 'go home' with no article and no 'to'."],
  ["I have a good news.", "I have some good news.", "'News' is uncountable. Don't use 'a'."],
  ["The most of people agree.", "Most people agree.", "Say 'most people', not 'the most of people'."],
  ["He gave me an advice.", "He gave me some advice. / He gave me a piece of advice.", "'Advice' is uncountable."]
] },
{ id: "prepositions", title: "Prepositions", icon: "target", color: "sky", items: [
  ["I listen music every day.", "I listen to music every day.", "You 'listen to' something."],
  ["We arrived to London at 6.", "We arrived in London at 6.", "Arrive in (a city or country), arrive at (a building or place)."],
  ["It depends of the weather.", "It depends on the weather.", "We say 'depend on'."],
  ["She is good in maths.", "She is good at maths.", "We say 'good at' something."],
  ["I'm interested about history.", "I'm interested in history.", "We say 'interested in'."],
  ["See you on the morning.", "See you in the morning.", "In the morning / afternoon / evening, but at night."],
  ["What are you doing in the weekend?", "What are you doing at the weekend?", "British English: at the weekend."],
  ["He married with her in 2019.", "He married her in 2019. / He got married to her in 2019.", "'Marry' has no preposition. 'Get married to' takes 'to'."],
  ["We discussed about the problem.", "We discussed the problem.", "'Discuss' has no preposition."],
  ["Explain me the answer, please.", "Explain the answer to me, please.", "Explain something TO someone."]
] },
{ id: "word-choice", title: "Word choice", icon: "spell", color: "yellow", items: [
  ["Can I make a photo?", "Can I take a photo?", "In English we 'take' a photo."],
  ["I did a mistake.", "I made a mistake.", "We 'make' a mistake. (We 'do' homework.)"],
  ["I have to make my homework.", "I have to do my homework.", "We 'do' homework, exercise and the shopping."],
  ["Can you borrow me your pen?", "Can you lend me your pen?", "Lend = give for a short time. Borrow = take for a short time."],
  ["He said me the truth.", "He told me the truth.", "'Tell' + person. 'Say' + something: He said the truth was…"],
  ["Please open the light.", "Please turn on the light.", "For lights and machines: turn on / turn off (or switch on / off)."],
  ["Close the TV, please.", "Turn off the TV, please.", "You 'turn off' a TV, not 'close' it."],
  ["I'm going to my house.", "I'm going home.", "Native speakers usually say 'go home'."],
  ["Actually, I live in Oldham. (= at the moment)", "At the moment, I live in Oldham.", "'Actually' means 'in fact', not 'now'. Use 'currently' or 'at the moment'."],
  ["The film was very funny, we had a lot of fun.", "The film was very funny. We had a lot of fun.", "Two full sentences need a full stop (or 'and'), not just a comma."]
] },
{ id: "nouns", title: "Nouns and plurals", icon: "cards", color: "pink", items: [
  ["People is very friendly here.", "People are very friendly here.", "'People' is plural, so use 'are'."],
  ["I need some informations.", "I need some information.", "'Information' is uncountable. No -s."],
  ["The news are good.", "The news is good.", "'News' is uncountable and takes 'is'."],
  ["The police is coming.", "The police are coming.", "'Police' is plural in English."],
  ["He has a 20 years old son.", "He has a 20-year-old son.", "Before a noun: 20-year-old (with hyphens, no -s)."],
  ["I bought two furnitures.", "I bought two pieces of furniture.", "'Furniture' is uncountable."]
] },
{ id: "questions", title: "Questions and word order", icon: "help", color: "peach", items: [
  ["What you want?", "What do you want?", "Questions in the present simple need do / does."],
  ["Where you are going?", "Where are you going?", "In questions, put 'are' before the subject."],
  ["My sister she is a nurse.", "My sister is a nurse.", "Don't repeat the subject with a pronoun."],
  ["Can you tell me where is the station?", "Can you tell me where the station is?", "In indirect questions, use normal word order."],
  ["I like very much football.", "I like football very much.", "'Very much' goes after the object."],
  ["She has a car red.", "She has a red car.", "Adjectives go before the noun."]
] },
{ id: "comparing", title: "Comparing", icon: "trend", color: "lavender", items: [
  ["My flat is more bigger.", "My flat is bigger.", "Don't use 'more' with -er."],
  ["She is taller then me.", "She is taller than me.", "Comparisons use 'than'."],
  ["It's the most good café.", "It's the best café.", "Good → better → best."],
  ["He is more older than me.", "He is older than me.", "Short adjectives: just add -er."]
] }
];

// Suggested UK ESOL level for each group.
const GROUP_LEVEL = { verbs: "E1", nouns: "E1", questions: "E1", articles: "E2", prepositions: "E2", tenses: "E2", comparing: "E3", "word-choice": "L1" };
MISTAKE_GROUPS.forEach((g) => { g.level = g.level || GROUP_LEVEL[g.id] || "E2"; });
