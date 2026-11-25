// Grammar Academy content. Each topic: explanation sections, examples, common mistakes, quiz.
// Question types: mcq {q,a:[choices],c:index,e}, fill {t:"fill",q,ans:[accepted],e}, order {t:"order",words:[...],ans:"sentence",e}
export const GRAMMAR = [
{
  id: "word-order", title: "Word Order in Sentences", level: "E1",
  summary: "Put English words in the right order: Subject + Verb + Object.",
  sections: [
    { h: "The basic pattern", p: "Most English sentences follow this order: Subject (who) + Verb (action) + Object (what). The subject comes first in a normal sentence.",
      list: ["I (subject) + like (verb) + football (object).", "My sister + speaks + three languages.", "We + watched + a film."] },
    { h: "Adjectives go before nouns", p: "In English, the describing word comes before the thing.", list: ["a red car (not: a car red)", "a big house", "an interesting book"] },
    { h: "Place and time go at the end", p: "Normal order: Subject + Verb + Object + Place + Time.", list: ["I study English at college every Monday.", "She met her friends in the park yesterday."] },
    { h: "Frequency words (always, usually, often, never)", p: "They go before the main verb, but after the verb 'be'.", list: ["I always drink tea in the morning.", "She is never late."] }
  ],
  examples: ["I like English.", "She has a small dog.", "We play football in the park on Sundays.", "He is always happy."],
  mistakes: [
    { wrong: "I football like.", right: "I like football.", why: "The verb (like) comes before the object (football)." },
    { wrong: "She has a dog small.", right: "She has a small dog.", why: "Adjectives come before the noun." },
    { wrong: "I go always to the gym.", right: "I always go to the gym.", why: "'Always' goes before the main verb." }
  ],
  quiz: [
    { t: "order", words: ["I", "like", "music", "pop"], ans: "I like pop music", e: "Subject (I) + verb (like) + adjective + noun (pop music)." },
    { q: "Which sentence is correct?", a: ["She a red dress wears.", "She wears a red dress.", "She wears a dress red."], c: 1, e: "Subject + verb + object, and the adjective (red) goes before the noun (dress)." },
    { t: "order", words: ["We", "English", "study", "every day"], ans: "We study English every day", e: "Time words like 'every day' usually go at the end." },
    { q: "Which sentence is correct?", a: ["I am never late.", "I never am late.", "Never I am late."], c: 0, e: "Frequency words go after the verb 'be': I am never late." },
    { q: "Where does 'usually' go? 'He ___ gets up ___ at 7.'", a: ["He usually gets up at 7.", "He gets usually up at 7.", "Usually he gets up usually at 7."], c: 0, e: "'Usually' goes before the main verb 'gets'." },
    { t: "order", words: ["She", "a", "car", "new", "bought"], ans: "She bought a new car", e: "Subject + verb + object; 'new' comes before 'car'." },
    { q: "Choose the best order:", a: ["I met yesterday my friend at the station.", "I met my friend at the station yesterday.", "Yesterday at the station my friend I met."], c: 1, e: "Subject + verb + object + place + time." },
    { t: "order", words: ["They", "often", "visit", "grandparents", "their"], ans: "They often visit their grandparents", e: "'Often' goes before the main verb, and 'their' goes before the noun." }
  ]
},
{
  id: "to-be", title: "The Verb 'To Be' (am, is, are)", level: "E1",
  summary: "Use am, is and are to talk about names, age, jobs, places and feelings.",
  sections: [
    { h: "Positive", table: [["I", "am", "I'm"], ["you / we / they", "are", "you're, we're, they're"], ["he / she / it", "is", "he's, she's, it's"]] },
    { h: "Negative", p: "Add 'not': I am not (I'm not), he is not (he isn't), they are not (they aren't)." },
    { h: "Questions", p: "Put the verb first: Are you ready? Is she your teacher? Am I late?" },
    { h: "When do we use it?", list: ["Name: I am Ahmad.", "Age: She is 20 years old.", "Job: He is a driver.", "Place: We are at college.", "Feelings: They are happy."] }
  ],
  examples: ["I am a student.", "She is 25 years old.", "We aren't tired.", "Are you from London?", "It is cold today."],
  mistakes: [
    { wrong: "I have 20 years.", right: "I am 20 (years old).", why: "In English we use 'be' for age, not 'have'." },
    { wrong: "She is teacher.", right: "She is a teacher.", why: "Use 'a' or 'an' before a job." },
    { wrong: "They is happy.", right: "They are happy.", why: "Use 'are' with they, we and you." }
  ],
  quiz: [
    { q: "I ___ a student at college.", a: ["am", "is", "are"], c: 0, e: "With 'I' we always use 'am'." },
    { q: "My sister ___ 19 years old.", a: ["am", "is", "are"], c: 1, e: "'My sister' = she, so we use 'is'." },
    { q: "We ___ in the classroom.", a: ["am", "is", "are"], c: 2, e: "With 'we' we use 'are'." },
    { q: "___ you tired?", a: ["Am", "Is", "Are"], c: 2, e: "Questions with 'you' start with 'Are'." },
    { t: "fill", q: "He ___ at home today. (be, negative)", ans: ["isn't", "is not"], e: "Negative of 'he is' = 'he isn't' or 'he is not'." },
    { q: "Which sentence is correct?", a: ["I have 30 years.", "I am 30 years old.", "I is 30 years old."], c: 1, e: "Age uses 'be': I am 30 years old." },
    { q: "The books ___ on the table.", a: ["is", "are", "am"], c: 1, e: "'The books' is plural (they), so we use 'are'." },
    { t: "order", words: ["My", "teacher", "is", "very", "kind"], ans: "My teacher is very kind", e: "Subject (my teacher) + is + very + adjective." }
  ]
},
{
  id: "present-simple", title: "Present Simple", level: "E1",
  summary: "Talk about habits, routines and facts: I work, she works.",
  sections: [
    { h: "When do we use it?", list: ["Habits and routines: I get up at 7 every day.", "Facts: Water boils at 100°C.", "Things that are true for a long time: She lives in Oldham."] },
    { h: "Form", table: [["I / you / we / they", "work", "I work in a shop."], ["he / she / it", "works", "She works in a shop."]] },
    { h: "Spelling for he / she / it", list: ["Most verbs: + s (play → plays)", "-ch, -sh, -s, -x, -o: + es (watch → watches, go → goes)", "consonant + y: y → ies (study → studies)", "have → has"] },
    { h: "Negatives and questions", p: "Use don't / doesn't and do / does + the base verb (no -s).", list: ["I don't like coffee. He doesn't like coffee.", "Do you work here? Does she work here?"] },
    { h: "Useful time words", p: "every day, every week, usually, often, sometimes, never, on Mondays" }
  ],
  examples: ["I drink tea every morning.", "He goes to the gym on Mondays.", "She doesn't eat meat.", "Do you speak Arabic?", "The shop opens at 9 o'clock."],
  mistakes: [
    { wrong: "She work in a shop.", right: "She works in a shop.", why: "With he / she / it, add -s to the verb." },
    { wrong: "He doesn't works.", right: "He doesn't work.", why: "After doesn't, use the base verb without -s." },
    { wrong: "Do she like tea?", right: "Does she like tea?", why: "Use 'does' with he / she / it." }
  ],
  quiz: [
    { q: "My brother ___ football every Saturday.", a: ["play", "plays", "playing"], c: 1, e: "'My brother' = he, so add -s: plays." },
    { q: "They ___ in Manchester.", a: ["live", "lives", "living"], c: 0, e: "With 'they', no -s: they live." },
    { q: "She ___ like coffee.", a: ["don't", "doesn't", "isn't"], c: 1, e: "Use 'doesn't' with he / she / it." },
    { q: "___ your teacher speak French?", a: ["Do", "Does", "Is"], c: 1, e: "'Your teacher' = he/she, so use 'Does'." },
    { t: "fill", q: "He ___ TV in the evening. (watch)", ans: ["watches"], e: "Verbs ending in -ch add -es: watches." },
    { t: "fill", q: "My friend ___ at Oldham College. (study)", ans: ["studies"], e: "Consonant + y: change y to -ies: studies." },
    { q: "Water ___ at 100 degrees Celsius.", a: ["boil", "boils", "is boil"], c: 1, e: "Facts use the present simple; 'water' = it, so 'boils'." },
    { t: "order", words: ["I", "usually", "take", "the bus", "to college"], ans: "I usually take the bus to college", e: "'Usually' goes before the main verb." }
  ]
},
{
  id: "articles", title: "Articles: a, an, the", level: "E1",
  summary: "Learn when to use a, an, the, or no article at all.",
  sections: [
    { h: "a / an = one, not a specific one", p: "Use 'a' before a consonant SOUND and 'an' before a vowel SOUND.", list: ["a book, a car, a university (sounds like 'you')", "an apple, an egg, an hour (the 'h' is silent)"] },
    { h: "the = a specific thing", list: ["We already know which one: I saw a dog. The dog was big.", "There is only one: the sun, the moon, the internet", "Some country names: the UK, the USA, the Netherlands"] },
    { h: "No article", list: ["Things in general (plural or uncountable): I like music. Dogs are friendly.", "Most countries and cities: I live in Oldham. She is from Spain.", "Meals and some places: have breakfast, go to work, at home"] },
    { h: "Jobs", p: "Always use a / an with a job: She is a nurse. He is an engineer." }
  ],
  examples: ["I have a brother and an older sister.", "The weather in the UK changes a lot.", "She wants to be an artist.", "Life is beautiful."],
  mistakes: [
    { wrong: "She is doctor.", right: "She is a doctor.", why: "Use a / an before jobs." },
    { wrong: "a umbrella", right: "an umbrella", why: "'Umbrella' starts with a vowel sound, so use 'an'." },
    { wrong: "The life is hard.", right: "Life is hard.", why: "Talking about something in general: no article." },
    { wrong: "I live in UK.", right: "I live in the UK.", why: "The UK, the USA and the Netherlands take 'the'." }
  ],
  quiz: [
    { q: "I eat ___ apple every day.", a: ["a", "an", "the"], c: 1, e: "'Apple' starts with a vowel sound: an apple." },
    { q: "She is ___ university student.", a: ["a", "an", "the"], c: 0, e: "'University' starts with a 'you' sound (a consonant sound): a university." },
    { q: "We waited for ___ hour.", a: ["a", "an", "the"], c: 1, e: "The 'h' in 'hour' is silent, so it starts with a vowel sound: an hour." },
    { q: "___ sun is very hot today.", a: ["A", "The", "(no article)"], c: 1, e: "There is only one sun: the sun." },
    { q: "I love ___ music.", a: ["the", "a", "(no article)"], c: 2, e: "Music in general takes no article." },
    { q: "I saw a dog. ___ dog was very big.", a: ["A", "The", "An"], c: 1, e: "Now we know which dog, so we use 'the'." },
    { q: "He lives in ___ United Kingdom.", a: ["the", "a", "(no article)"], c: 0, e: "We say 'the United Kingdom' / 'the UK'." },
    { t: "fill", q: "My mum is ___ nurse.", ans: ["a"], e: "Use 'a' before a job that starts with a consonant sound." }
  ]
},
{
  id: "plurals-demonstratives", title: "Plurals and This / That / These / Those", level: "E1",
  summary: "Make nouns plural and point to things near and far.",
  sections: [
    { h: "Regular plurals", list: ["Most nouns: + s (book → books)", "-s, -ss, -sh, -ch, -x: + es (bus → buses, box → boxes)", "consonant + y: y → ies (city → cities)", "Some -f / -fe: → ves (knife → knives, wife → wives)"] },
    { h: "Irregular plurals", table: [["man", "men"], ["woman", "women"], ["child", "children"], ["person", "people"], ["foot", "feet"], ["tooth", "teeth"], ["mouse", "mice"]] },
    { h: "Uncountable nouns", p: "Some nouns have no plural: information, advice, furniture, money, water, bread, homework, news." },
    { h: "This, that, these, those", table: [["near", "this (one thing)", "these (more than one)"], ["far", "that (one thing)", "those (more than one)"]] }
  ],
  examples: ["These shoes are new.", "Is that your bus over there?", "Three children are playing.", "Can you give me some advice?"],
  mistakes: [
    { wrong: "two childs", right: "two children", why: "'Child' has an irregular plural." },
    { wrong: "some informations", right: "some information", why: "'Information' is uncountable, so no -s." },
    { wrong: "This shoes are nice.", right: "These shoes are nice.", why: "Use 'these' with plural nouns." }
  ],
  quiz: [
    { q: "What is the plural of 'child'?", a: ["childs", "children", "childrens"], c: 1, e: "Child → children (irregular)." },
    { q: "What is the plural of 'city'?", a: ["citys", "cityes", "cities"], c: 2, e: "Consonant + y → -ies: cities." },
    { q: "Look at ___ birds in the sky over there.", a: ["this", "these", "those"], c: 2, e: "Plural and far away: those." },
    { q: "(in my hand) ___ is my phone.", a: ["This", "These", "Those"], c: 0, e: "One thing and near: this." },
    { q: "Two ___ are waiting outside.", a: ["person", "people", "peoples"], c: 1, e: "The normal plural of 'person' is 'people'." },
    { t: "fill", q: "Plural of 'box':", ans: ["boxes"], e: "Nouns ending in -x add -es: boxes." },
    { q: "I need some ___ about my CV.", a: ["advice", "advices", "an advice"], c: 0, e: "'Advice' is uncountable: some advice." },
    { q: "What is the plural of 'knife'?", a: ["knifes", "knives", "knife"], c: 1, e: "Knife → knives (-fe changes to -ves)." }
  ]
},
{
  id: "prepositions-place", title: "Prepositions of Place (in, on, at…)", level: "E1",
  summary: "Say where things and people are: in, on, at, under, next to, between.",
  sections: [
    { h: "in, on, at", list: ["in = inside something: in the box, in my bag, in London", "on = on a surface: on the table, on the wall, on the floor", "at = a point or place: at the bus stop, at home, at work, at college"] },
    { h: "Other useful words", list: ["under: The cat is under the table.", "next to: The bank is next to the café.", "between: The shop is between the bank and the school.", "behind: The car park is behind the building.", "in front of: Wait in front of the station.", "opposite: The pharmacy is opposite the library."] }
  ],
  examples: ["My keys are in my pocket.", "There is a clock on the wall.", "I'm at the bus stop.", "The park is opposite my house."],
  mistakes: [
    { wrong: "I am in home.", right: "I am at home.", why: "We say 'at home', 'at work', 'at college'." },
    { wrong: "The picture is in the wall.", right: "The picture is on the wall.", why: "Use 'on' for a surface." }
  ],
  quiz: [
    { q: "The keys are ___ the table.", a: ["in", "on", "at"], c: 1, e: "The table is a surface: on the table." },
    { q: "My phone is ___ my bag.", a: ["in", "on", "at"], c: 0, e: "Inside something: in my bag." },
    { q: "I'll meet you ___ the bus stop.", a: ["in", "on", "at"], c: 2, e: "A point or meeting place: at the bus stop." },
    { q: "The cat is ___ the bed. (It is below the bed.)", a: ["on", "under", "between"], c: 1, e: "Below something: under." },
    { q: "The bank is ___ the café and the post office.", a: ["between", "next", "opposite to"], c: 0, e: "In the middle of two things: between." },
    { q: "She lives ___ Oldham.", a: ["in", "on", "at"], c: 0, e: "Use 'in' with towns, cities and countries." },
    { q: "There's a picture ___ the wall.", a: ["in", "on", "at"], c: 1, e: "A wall is a surface: on the wall." },
    { t: "fill", q: "I am ___ home now.", ans: ["at"], e: "We say 'at home'." }
  ]
},
{
  id: "possessives", title: "Possessives (my, his, 's, mine)", level: "E1",
  summary: "Show who something belongs to: my book, Sara's car, it's mine.",
  sections: [
    { h: "Possessive adjectives (before a noun)", table: [["I → my", "you → your", "he → his"], ["she → her", "it → its", "we → our"], ["they → their", "", ""]] },
    { h: "Possessive pronouns (no noun after)", p: "mine, yours, his, hers, ours, theirs — This book is mine. Is that bag yours?" },
    { h: "'s and s'", list: ["One person: my brother's car (one brother)", "Plural ending in s: my parents' house (two parents)", "Irregular plural: the children's toys"] },
    { h: "Whose?", p: "Ask about the owner: Whose coat is this? (Don't confuse with who's = who is.)" }
  ],
  examples: ["This is my friend. His name is Ali.", "Is this your pen? Yes, it's mine.", "My sister's flat is very small.", "The dog is eating its food."],
  mistakes: [
    { wrong: "The dog wants it's food.", right: "The dog wants its food.", why: "'Its' (no apostrophe) shows possession. 'It's' means 'it is'." },
    { wrong: "This is the car of my brother.", right: "This is my brother's car.", why: "For people, English usually uses 's." },
    { wrong: "Who's bag is this?", right: "Whose bag is this?", why: "'Whose' asks about the owner." }
  ],
  quiz: [
    { q: "This is Sara. ___ car is red.", a: ["His", "Her", "Its"], c: 1, e: "Sara is a woman: her car." },
    { q: "Tom and Jack love ___ dog.", a: ["their", "there", "his"], c: 0, e: "Two people (they) → their." },
    { q: "That is my ___ bag. (I have one brother.)", a: ["brothers", "brother's", "brothers'"], c: 1, e: "One brother: brother's." },
    { q: "The ___ toilets are upstairs. (many students)", a: ["student's", "students'", "students"], c: 1, e: "Plural ending in -s: add an apostrophe after the s." },
    { q: "The company changed ___ logo.", a: ["its", "it's", "their's"], c: 0, e: "Possession: its (no apostrophe)." },
    { q: "Is this pen yours? Yes, it's ___.", a: ["my", "mine", "me"], c: 1, e: "No noun after it, so use the pronoun 'mine'." },
    { q: "___ coat is this?", a: ["Whose", "Who's", "Who"], c: 0, e: "Asking about the owner: whose." },
    { t: "fill", q: "We love ___ new flat.", ans: ["our"], e: "We → our." }
  ]
},
{
  id: "present-continuous", title: "Present Continuous", level: "E2",
  summary: "Talk about actions happening now: I am working, she is reading.",
  sections: [
    { h: "Form", p: "am / is / are + verb-ing", table: [["I", "am working", "I'm working."], ["you / we / they", "are working", "They're working."], ["he / she / it", "is working", "She's working."]] },
    { h: "When do we use it?", list: ["Actions happening now: I'm reading a message.", "Temporary situations: I'm staying with my cousin this month.", "Future plans (arrangements): We're meeting at 6 tomorrow."] },
    { h: "Spelling of -ing", list: ["make → making (drop the e)", "run → running, sit → sitting (double the last letter)", "lie → lying, die → dying"] },
    { h: "Present simple or continuous?", p: "Simple = always, usually, every day. Continuous = now, at the moment, today, this week.", list: ["I usually walk to college, but today I'm taking the bus."] },
    { h: "State verbs", p: "Some verbs are not usually used in the continuous: know, like, love, hate, want, need, understand, believe, remember, own. Say 'I know', not 'I am knowing'." }
  ],
  examples: ["She is talking on the phone.", "What are you doing?", "It isn't raining now.", "I'm learning English at the moment."],
  mistakes: [
    { wrong: "I am knowing the answer.", right: "I know the answer.", why: "'Know' is a state verb; don't use -ing." },
    { wrong: "She working now.", right: "She is working now.", why: "You need am / is / are before the -ing verb." },
    { wrong: "Look! It rains.", right: "Look! It's raining.", why: "Happening now → present continuous." }
  ],
  quiz: [
    { q: "Be quiet! The baby ___.", a: ["sleeps", "is sleeping", "sleep"], c: 1, e: "It is happening now, so use the present continuous." },
    { q: "I ___ to work every day.", a: ["walk", "am walking", "walking"], c: 0, e: "'Every day' is a routine → present simple." },
    { q: "Look! It ___.", a: ["rains", "is raining", "rain"], c: 1, e: "'Look!' shows it is happening now." },
    { q: "I ___ the answer.", a: ["know", "am knowing", "knowing"], c: 0, e: "'Know' is a state verb, so no -ing." },
    { t: "fill", q: "They ___ dinner at the moment. (have)", ans: ["are having", "'re having"], e: "At the moment → are + having." },
    { q: "What ___ you doing this weekend?", a: ["are", "do", "is"], c: 0, e: "Future plans use the present continuous: What are you doing…?" },
    { t: "fill", q: "She ___ in the sea right now. (swim)", ans: ["is swimming", "'s swimming"], e: "Swim → swimming (double the m)." },
    { q: "She usually ___ tea, but today she ___ coffee.", a: ["drinks / is drinking", "is drinking / drinks", "drinks / drinks"], c: 0, e: "'Usually' → simple; 'today' (temporary) → continuous." }
  ]
},
{
  id: "past-simple", title: "Past Simple", level: "E2",
  summary: "Talk about finished actions in the past: I worked, I went.",
  sections: [
    { h: "Regular verbs: + ed", list: ["work → worked, play → played", "live → lived (just add d)", "study → studied (y → ied)", "stop → stopped (double the last letter)"] },
    { h: "Common irregular verbs", table: [["go → went", "have → had", "see → saw"], ["buy → bought", "make → made", "come → came"], ["take → took", "get → got", "eat → ate"], ["write → wrote", "give → gave", "find → found"]] },
    { h: "Negatives and questions", p: "Use didn't / did + the base verb.", list: ["I didn't go. (not: didn't went)", "Did you see it? Yes, I did."] },
    { h: "was / were", p: "I / he / she / it was. You / we / they were." },
    { h: "Time words", p: "yesterday, last night, last week, two days ago, in 2020" }
  ],
  examples: ["I visited my family last summer.", "She bought a new phone yesterday.", "We didn't watch the match.", "Did you go to college on Monday?", "It was very cold last night."],
  mistakes: [
    { wrong: "I didn't went to work.", right: "I didn't go to work.", why: "After 'didn't', use the base verb." },
    { wrong: "Yesterday I go to the shop.", right: "Yesterday I went to the shop.", why: "'Yesterday' means the past, so use the past simple." },
    { wrong: "They was late.", right: "They were late.", why: "Use 'were' with you / we / they." }
  ],
  quiz: [
    { q: "Yesterday I ___ to the cinema.", a: ["go", "went", "gone"], c: 1, e: "Go → went (irregular past simple)." },
    { q: "She ___ her homework last night.", a: ["finish", "finished", "finishes"], c: 1, e: "Regular verb: finish → finished." },
    { q: "We didn't ___ the film.", a: ["like", "liked", "likes"], c: 0, e: "After 'didn't', use the base verb." },
    { q: "___ you see the match on Saturday?", a: ["Did", "Do", "Were"], c: 0, e: "Past simple questions start with 'Did'." },
    { t: "fill", q: "He ___ a new phone last week. (buy)", ans: ["bought"], e: "Buy → bought (irregular)." },
    { q: "They ___ at the party last night.", a: ["was", "were", "are"], c: 1, e: "They → were." },
    { t: "fill", q: "I ___ the car at the traffic lights. (stop)", ans: ["stopped"], e: "Stop → stopped (double the p)." },
    { q: "I came to the UK three years ___.", a: ["ago", "before", "last"], c: 0, e: "Use 'ago' after a time period: three years ago." }
  ]
},
{
  id: "prepositions-time", title: "Prepositions of Time (at, on, in)", level: "E2",
  summary: "at 7 o'clock, on Monday, in July — learn which one to use.",
  sections: [
    { h: "at = exact times", list: ["at 7 o'clock, at 3.30", "at night, at lunchtime", "at the weekend (UK English)"] },
    { h: "on = days and dates", list: ["on Monday, on Fridays", "on 5 May, on my birthday", "on Christmas Day"] },
    { h: "in = longer periods", list: ["in July, in 2019, in the summer", "in the morning, in the afternoon, in the evening", "in the 1990s"] },
    { h: "No preposition", p: "Don't use at / on / in before: last, next, this, every, today, tomorrow, yesterday.", list: ["I'll see you next week. (not: in next week)"] }
  ],
  examples: ["The class starts at 9.30.", "My birthday is on 12 March.", "We moved here in 2021.", "I study in the evening.", "See you tomorrow!"],
  mistakes: [
    { wrong: "in Monday", right: "on Monday", why: "Use 'on' with days." },
    { wrong: "at the morning", right: "in the morning", why: "We say in the morning / afternoon / evening, but at night." },
    { wrong: "I'll call you on next Friday.", right: "I'll call you next Friday.", why: "No preposition before 'next'." }
  ],
  quiz: [
    { q: "The film starts ___ 8 o'clock.", a: ["at", "on", "in"], c: 0, e: "Exact time → at." },
    { q: "I have English ___ Monday.", a: ["at", "on", "in"], c: 1, e: "Days → on." },
    { q: "My holiday is ___ July.", a: ["at", "on", "in"], c: 2, e: "Months → in." },
    { q: "She was born ___ 2004.", a: ["at", "on", "in"], c: 2, e: "Years → in." },
    { q: "The exam is ___ 5 May.", a: ["at", "on", "in"], c: 1, e: "Dates → on." },
    { q: "I go running ___ the morning.", a: ["at", "on", "in"], c: 2, e: "Parts of the day → in the morning." },
    { q: "I can't sleep ___ night.", a: ["at", "on", "in"], c: 0, e: "We say 'at night'." },
    { q: "I'll see you ___ next week.", a: ["in", "on", "(no preposition)"], c: 2, e: "No preposition before 'next'." }
  ]
},
{
  id: "comparatives", title: "Comparatives and Superlatives", level: "E2",
  summary: "Compare things: bigger, more expensive, the best.",
  sections: [
    { h: "Short adjectives (one syllable)", list: ["cheap → cheaper → the cheapest", "big → bigger → the biggest (double the last letter)", "nice → nicer → the nicest"] },
    { h: "Adjectives ending in -y", list: ["easy → easier → the easiest", "happy → happier → the happiest"] },
    { h: "Long adjectives (two or more syllables)", list: ["expensive → more expensive → the most expensive", "interesting → more interesting → the most interesting"] },
    { h: "Irregular", table: [["good", "better", "the best"], ["bad", "worse", "the worst"], ["far", "further / farther", "the furthest / farthest"]] },
    { h: "Useful patterns", list: ["than: London is bigger than Oldham.", "the + superlative: It's the best café in town.", "as … as: My phone is as good as yours."] }
  ],
  examples: ["The train is faster than the bus.", "This is the most beautiful park in the city.", "Today is hotter than yesterday.", "English is not as difficult as you think."],
  mistakes: [
    { wrong: "more bigger", right: "bigger", why: "Don't use 'more' with -er." },
    { wrong: "She is taller then me.", right: "She is taller than me.", why: "Comparisons use 'than' (not 'then')." },
    { wrong: "the most good", right: "the best", why: "'Good' is irregular: good, better, best." }
  ],
  quiz: [
    { q: "A car is ___ than a bike.", a: ["fast", "faster", "fastest"], c: 1, e: "Comparing two things → faster than." },
    { q: "This is ___ day of my life!", a: ["the happiest", "the happyest", "the most happy"], c: 0, e: "Happy → the happiest (y → iest)." },
    { q: "Gold is ___ than silver.", a: ["expensiver", "more expensive", "most expensive"], c: 1, e: "Long adjective → more expensive." },
    { q: "My English is ___ than last year.", a: ["gooder", "better", "best"], c: 1, e: "Good → better (irregular)." },
    { t: "fill", q: "Russia is ___ country in the world. (big)", ans: ["the biggest"], e: "Superlative of big → the biggest (double g)." },
    { q: "Today's weather is ___ than yesterday's.", a: ["worse", "badder", "more bad"], c: 0, e: "Bad → worse (irregular)." },
    { q: "My bag is as heavy ___ yours.", a: ["than", "as", "like"], c: 1, e: "The pattern is as … as." },
    { q: "This exercise is ___ than the last one.", a: ["easyer", "easier", "more easy"], c: 1, e: "Easy → easier." }
  ]
},
{
  id: "countable-quantifiers", title: "Some, Any, Much, Many", level: "E2",
  summary: "Talk about quantities with countable and uncountable nouns.",
  sections: [
    { h: "Countable and uncountable", list: ["Countable (you can count them): an apple, two apples, a chair, three chairs", "Uncountable (no plural): water, money, rice, information, time"] },
    { h: "some / any", list: ["some = positive sentences: I have some friends here.", "any = negatives and questions: I don't have any money. Do you have any questions?", "Offers and requests use some: Would you like some tea?"] },
    { h: "much / many / a lot of", list: ["many + countable: How many brothers do you have?", "much + uncountable: How much time do we have?", "a lot of + both: a lot of people, a lot of water"] },
    { h: "a few / a little", list: ["a few + countable: a few minutes", "a little + uncountable: a little sugar"] }
  ],
  examples: ["There are some eggs in the fridge.", "Is there any milk?", "How much does it cost?", "I have a few friends in Oldham.", "We don't have much time."],
  mistakes: [
    { wrong: "How many money do you have?", right: "How much money do you have?", why: "'Money' is uncountable → much." },
    { wrong: "I don't have some time.", right: "I don't have any time.", why: "Use 'any' in negative sentences." },
    { wrong: "a little books", right: "a few books", why: "'Books' is countable → a few." }
  ],
  quiz: [
    { q: "How ___ students are in your class?", a: ["much", "many", "any"], c: 1, e: "'Students' is countable → many." },
    { q: "How ___ water do you drink every day?", a: ["much", "many", "few"], c: 0, e: "'Water' is uncountable → much." },
    { q: "I don't have ___ brothers.", a: ["some", "any", "much"], c: 1, e: "Negative sentence → any." },
    { q: "Would you like ___ coffee?", a: ["some", "any", "many"], c: 0, e: "Offers use 'some'." },
    { q: "There are ___ apples on the table.", a: ["a little", "a few", "much"], c: 1, e: "'Apples' is countable → a few." },
    { q: "Can I have ___ sugar in my tea, please?", a: ["a few", "a little", "many"], c: 1, e: "'Sugar' is uncountable → a little." },
    { q: "Which word is uncountable?", a: ["chair", "information", "student"], c: 1, e: "'Information' has no plural form." },
    { t: "fill", q: "Are there ___ questions? (some / any)", ans: ["any"], e: "In questions we usually use 'any'." }
  ]
},
{
  id: "future-forms", title: "Future: will and going to", level: "E2",
  summary: "Talk about the future with will, going to and the present continuous.",
  sections: [
    { h: "going to = plans and evidence", list: ["A plan: I'm going to study nursing next year.", "We can see it will happen: Look at those clouds! It's going to rain."] },
    { h: "will = decisions now, promises, predictions", list: ["Decision at the moment of speaking: The phone's ringing — I'll answer it.", "Promises and offers: I'll help you with your homework.", "Predictions / opinions: I think you'll pass the exam."] },
    { h: "Present continuous = fixed arrangements", p: "Plans with a time and place: I'm seeing the doctor at 10 tomorrow." },
    { h: "Form", list: ["will + base verb: I will (I'll) call you. I won't be late.", "am / is / are + going to + base verb: She's going to move house."] }
  ],
  examples: ["I'm going to visit my cousins this summer.", "Don't worry, I'll carry that bag for you.", "I think it will be sunny tomorrow.", "We're having a party on Saturday."],
  mistakes: [
    { wrong: "I will to call you.", right: "I will call you.", why: "After 'will', use the base verb (no 'to')." },
    { wrong: "She going to travel.", right: "She is going to travel.", why: "You need am / is / are before 'going to'." }
  ],
  quiz: [
    { q: "A: We have no milk. B: I ___ buy some now.", a: ["will", "am going to", "'ll to"], c: 0, e: "A decision made at the moment of speaking → will." },
    { q: "Look at the sky! It ___ rain.", a: ["will", "is going to", "goes to"], c: 1, e: "We can see evidence → going to." },
    { q: "I've decided. I ___ learn to drive next year.", a: ["will", "am going to", "go"], c: 1, e: "A plan made before → going to." },
    { q: "I promise I ___ be late again.", a: ["won't", "am not going", "don't"], c: 0, e: "Promises use will / won't." },
    { t: "fill", q: "She ___ going to start a new job in May. (be)", ans: ["is", "'s"], e: "She + is + going to." },
    { q: "I ___ my dentist at 4 pm tomorrow. (fixed appointment)", a: ["am seeing", "see", "will to see"], c: 0, e: "Fixed arrangements → present continuous." },
    { q: "I think Manchester United ___ win the match.", a: ["will", "are going", "winning"], c: 0, e: "An opinion about the future → will." },
    { q: "Which sentence is correct?", a: ["I will to help you.", "I will help you.", "I will helping you."], c: 1, e: "will + base verb: I will help you." }
  ]
},
{
  id: "present-perfect", title: "Present Perfect", level: "E3",
  summary: "Connect the past to now: I have lived here for two years.",
  sections: [
    { h: "Form", p: "have / has + past participle", list: ["I have (I've) finished. She has (she's) finished.", "Negative: I haven't seen it. He hasn't called.", "Question: Have you ever been to London?"] },
    { h: "When do we use it?", list: ["Life experience (no time given): I've been to Scotland. Have you ever eaten sushi?", "Recent news / results now: I've lost my keys! (I can't find them now.)", "Unfinished time with for / since: I've lived in Oldham for three years / since 2022."] },
    { h: "Useful words", list: ["ever / never: Have you ever…? I've never…", "just: I've just arrived. (a very short time ago)", "already: She's already eaten.", "yet (negatives / questions, at the end): Have you finished yet? I haven't finished yet."] },
    { h: "Present perfect or past simple?", p: "Past simple = a finished time (yesterday, last week, in 2019). Present perfect = no finished time, or connected to now.", list: ["I've been to Paris. (experience, no time)", "I went to Paris last year. (finished time)"] },
    { h: "for or since?", list: ["for + a period: for two hours, for ten years", "since + a starting point: since Monday, since 2020, since I was a child"] }
  ],
  examples: ["I've worked here since January.", "Have you ever been to Wales?", "She hasn't finished her essay yet.", "We've just had lunch.", "I've known him for five years."],
  mistakes: [
    { wrong: "I have seen him yesterday.", right: "I saw him yesterday.", why: "'Yesterday' is a finished time → past simple." },
    { wrong: "I live here since 2020.", right: "I've lived here since 2020.", why: "From the past until now with 'since' → present perfect." },
    { wrong: "I've lived here since three years.", right: "I've lived here for three years.", why: "Use 'for' with a period of time." }
  ],
  quiz: [
    { q: "I ___ in Manchester since 2021.", a: ["live", "have lived", "lived"], c: 1, e: "From 2021 until now → present perfect." },
    { q: "She ___ to Spain last summer.", a: ["has gone", "went", "has been"], c: 1, e: "'Last summer' is a finished time → past simple." },
    { q: "Have you ___ been to Scotland?", a: ["ever", "yet", "since"], c: 0, e: "Life experience questions: Have you ever…?" },
    { q: "I've known my best friend ___ ten years.", a: ["since", "for", "from"], c: 1, e: "A period of time → for." },
    { q: "We've been here ___ 9 o'clock.", a: ["for", "since", "ago"], c: 1, e: "A starting point → since." },
    { t: "fill", q: "I can't find my phone. I ___ it! (lose)", ans: ["have lost", "'ve lost"], e: "A past action with a result now → have lost." },
    { q: "Has he finished his homework ___?", a: ["already", "yet", "just"], c: 1, e: "'Yet' goes at the end of questions and negatives." },
    { q: "Which sentence is correct?", a: ["I have seen that film last week.", "I saw that film last week.", "I have see that film."], c: 1, e: "'Last week' → past simple: I saw." }
  ]
},
{
  id: "modals", title: "Modal Verbs (can, must, should…)", level: "E3",
  summary: "Talk about ability, rules, advice and possibility.",
  sections: [
    { h: "How modals work", p: "Modal + base verb. No -s, no 'to'.", list: ["She can swim. (not: she cans swim / she can to swim)"] },
    { h: "Ability and permission", list: ["can / can't: I can speak three languages.", "could = past ability: I could read when I was four.", "Can / Could I…? = asking permission (could is more polite): Could I open the window?"] },
    { h: "Rules and obligation", list: ["must = strong rule or personal feeling: I must call my mum.", "have to = a rule from outside: I have to wear a uniform at work.", "mustn't = it is not allowed: You mustn't smoke here.", "don't have to = it is not necessary: You don't have to come. (You can choose.)"] },
    { h: "Advice", p: "should / shouldn't: You should see a doctor. You shouldn't stay up late." },
    { h: "Possibility", p: "might / may / could: It might rain later. She may be at home." }
  ],
  examples: ["Can you help me, please?", "You must wear a seatbelt.", "I have to work on Saturday.", "You should drink more water.", "We might go to the beach tomorrow."],
  mistakes: [
    { wrong: "He cans drive.", right: "He can drive.", why: "Modals never take -s." },
    { wrong: "You should to rest.", right: "You should rest.", why: "No 'to' after should, can, must, might." },
    { wrong: "You mustn't pay; it's free.", right: "You don't have to pay; it's free.", why: "'Don't have to' = not necessary. 'Mustn't' = not allowed." }
  ],
  quiz: [
    { q: "I ___ swim when I was five.", a: ["can", "could", "must"], c: 1, e: "Past ability → could." },
    { q: "You look ill. You ___ see a doctor.", a: ["should", "mustn't", "can't"], c: 0, e: "Giving advice → should." },
    { q: "You ___ use your phone during the exam. It's not allowed.", a: ["don't have to", "mustn't", "shouldn't to"], c: 1, e: "Not allowed → mustn't." },
    { q: "It's Sunday tomorrow. I ___ get up early.", a: ["mustn't", "don't have to", "can't to"], c: 1, e: "Not necessary → don't have to." },
    { q: "Take an umbrella. It ___ rain later.", a: ["might", "must", "should to"], c: 0, e: "Possibility → might." },
    { q: "___ I borrow your pen, please?", a: ["Could", "Must", "Should"], c: 0, e: "Polite request for permission → Could I…?" },
    { t: "fill", q: "My sister ___ speak four languages. (ability, present)", ans: ["can"], e: "Present ability → can." },
    { q: "Which sentence is correct?", a: ["She musts work today.", "She must works today.", "She must work today."], c: 2, e: "Modal + base verb: must work." }
  ]
},
{
  id: "conditionals-0-1", title: "Zero and First Conditionals", level: "E3",
  summary: "Talk about facts and real possibilities with 'if'.",
  sections: [
    { h: "Zero conditional = always true", p: "If + present simple, present simple.", list: ["If you heat ice, it melts.", "If I drink coffee at night, I can't sleep."] },
    { h: "First conditional = a real possibility in the future", p: "If + present simple, will + base verb.", list: ["If it rains, I'll stay at home.", "If you study, you will pass."] },
    { h: "Important", list: ["Don't use 'will' after 'if': If it rains (not: if it will rain).", "You can change the order: I'll stay at home if it rains. (No comma when 'if' is in the middle.)", "unless = if not: I won't go unless you come. (= if you don't come)"] }
  ],
  examples: ["If you press this button, the machine starts.", "If I finish early, I'll call you.", "We'll miss the bus if we don't hurry.", "You won't pass unless you practise."],
  mistakes: [
    { wrong: "If it will rain, I'll stay home.", right: "If it rains, I'll stay home.", why: "Use the present simple after 'if', not 'will'." },
    { wrong: "If you will heat water, it boils.", right: "If you heat water, it boils.", why: "Zero conditional: present + present." }
  ],
  quiz: [
    { q: "If you heat water to 100°C, it ___.", a: ["boils", "will boiled", "boiled"], c: 0, e: "A scientific fact → zero conditional (present + present)." },
    { q: "If it ___ tomorrow, we'll go to the park.", a: ["will be sunny", "is sunny", "was sunny"], c: 1, e: "After 'if' use the present simple." },
    { q: "If you study hard, you ___ the exam.", a: ["pass", "will pass", "passed"], c: 1, e: "First conditional result → will + base verb." },
    { q: "I won't go ___ you come with me.", a: ["if", "unless", "when"], c: 1, e: "'Unless' = if not." },
    { t: "fill", q: "If I ___ the bus, I'll be late. (miss)", ans: ["miss"], e: "If + present simple: if I miss." },
    { q: "If you mix red and white, you ___ pink.", a: ["get", "will got", "got"], c: 0, e: "Always true → zero conditional: you get pink." },
    { q: "She'll be angry if you ___.", a: ["will forget", "forget", "forgot"], c: 1, e: "The 'if' part uses the present simple." },
    { t: "order", words: ["If", "I", "have time,", "I'll", "call you"], ans: "If I have time, I'll call you", e: "If + present, will + verb." }
  ]
},
{
  id: "conditional-2", title: "Second Conditional", level: "E3",
  summary: "Imagine unreal or unlikely situations: If I won the lottery…",
  sections: [
    { h: "Form", p: "If + past simple, would + base verb.", list: ["If I had more money, I would buy a car.", "If she lived near here, she'd walk to work."] },
    { h: "When do we use it?", list: ["Unreal now: If I knew the answer, I'd tell you. (I don't know it.)", "Unlikely future: If I won the lottery, I'd travel the world.", "Advice: If I were you, I'd apply for that job."] },
    { h: "were for all people", p: "In careful English, use 'were' with I / he / she / it: If I were rich… If he were here… ('was' is common in speaking.)" },
    { h: "First or second?", list: ["If I see Ali, I'll tell him. (It's possible.)", "If I saw a ghost, I'd scream. (Very unlikely.)"] }
  ],
  examples: ["If I were you, I would talk to your manager.", "What would you do if you lost your job?", "If we had a garden, we'd get a dog.", "I wouldn't do that if I were you."],
  mistakes: [
    { wrong: "If I would have money, I would buy it.", right: "If I had money, I would buy it.", why: "Use the past simple after 'if', not 'would'." },
    { wrong: "If I won the lottery, I will buy a house.", right: "If I won the lottery, I would buy a house.", why: "Second conditional → would, not will." }
  ],
  quiz: [
    { q: "If I ___ more time, I would learn the guitar.", a: ["have", "had", "would have"], c: 1, e: "If + past simple." },
    { q: "If she won the lottery, she ___ a big house.", a: ["will buy", "would buy", "buys"], c: 1, e: "Second conditional result → would + verb." },
    { q: "If I ___ you, I'd study every day.", a: ["am", "were", "will be"], c: 1, e: "Giving advice: If I were you…" },
    { q: "What ___ you do if you saw a lion?", a: ["will", "would", "did"], c: 1, e: "An imaginary situation → would." },
    { t: "fill", q: "If I ___ his number, I would call him. (know)", ans: ["knew"], e: "Past simple of know → knew." },
    { q: "Which is a second conditional?", a: ["If it rains, I'll stay in.", "If it rained, I'd stay in.", "If it rains, I stay in."], c: 1, e: "If + past, would + verb." },
    { q: "If we lived by the sea, we ___ swim every day.", a: ["would", "will", "are"], c: 0, e: "Unreal present → would." },
    { t: "order", words: ["If", "I", "were", "rich,", "I'd", "travel"], ans: "If I were rich, I'd travel", e: "If + were, I'd (I would) + verb." }
  ]
},
{
  id: "passive", title: "The Passive Voice", level: "E3",
  summary: "Focus on the action, not the person: The car was made in Japan.",
  sections: [
    { h: "Form", p: "be + past participle", table: [["Present", "is / are made", "Cars are made here."], ["Past", "was / were made", "It was built in 1900."], ["Present perfect", "has / have been made", "The work has been done."], ["Future", "will be made", "It will be finished soon."]] },
    { h: "When do we use it?", list: ["We don't know who did it: My bike was stolen.", "It isn't important who did it: English is spoken in many countries.", "Formal writing and news: The road will be closed on Sunday."] },
    { h: "by + the person", p: "Use 'by' to say who did it, only if it is important: 'Romeo and Juliet' was written by Shakespeare." }
  ],
  examples: ["The letters are delivered every morning.", "My phone was stolen yesterday.", "This bridge was built in 1890.", "Your order will be sent tomorrow.", "The room has been cleaned."],
  mistakes: [
    { wrong: "The house built in 1990.", right: "The house was built in 1990.", why: "The passive needs 'be' + past participle." },
    { wrong: "English is speak here.", right: "English is spoken here.", why: "Use the past participle (spoken), not the base verb." }
  ],
  quiz: [
    { q: "Football ___ all over the world.", a: ["plays", "is played", "is playing"], c: 1, e: "Present passive: is + past participle." },
    { q: "My wallet ___ on the bus yesterday.", a: ["was stolen", "is stolen", "stole"], c: 0, e: "Past passive: was + past participle." },
    { q: "The Mona Lisa was painted ___ Leonardo da Vinci.", a: ["from", "by", "with"], c: 1, e: "Use 'by' for the person who did the action." },
    { q: "The results ___ next week.", a: ["will announce", "will be announced", "are announce"], c: 1, e: "Future passive: will be + past participle." },
    { t: "fill", q: "The windows ___ cleaned every month. (be, present)", ans: ["are"], e: "Plural subject → are cleaned." },
    { q: "Which sentence is passive?", a: ["They built the school in 2010.", "The school was built in 2010.", "The school builds in 2010."], c: 1, e: "was + built (past participle) = passive." },
    { t: "fill", q: "This cake ___ made by my grandmother. (be, past)", ans: ["was"], e: "Past passive, singular → was made." },
    { q: "The parcel ___ already been delivered.", a: ["has", "have", "was"], c: 0, e: "Present perfect passive, singular: has been delivered." }
  ]
},
{
  id: "relative-clauses", title: "Relative Clauses (who, which, where…)", level: "E3",
  summary: "Join ideas and give more information: the man who lives next door.",
  sections: [
    { h: "Relative pronouns", table: [["who", "people", "the woman who works here"], ["which", "things / animals", "the bus which goes to town"], ["that", "people or things (informal)", "the book that I bought"], ["where", "places", "the café where we met"], ["whose", "possession", "the man whose car was stolen"]] },
    { h: "Defining clauses (no commas)", p: "They tell us which person or thing. You need them for the meaning.", list: ["The student who sits next to me is from Poland."] },
    { h: "Non-defining clauses (with commas)", p: "They add extra information. Don't use 'that' here.", list: ["My brother, who lives in Leeds, is a nurse."] },
    { h: "Leaving out the pronoun", p: "In defining clauses you can leave out who / which / that when it is the object: The film (that) we watched was great." }
  ],
  examples: ["The teacher who helped me is very patient.", "This is the house where I grew up.", "I've lost the keys that you gave me.", "Oldham, which is near Manchester, has a big college.", "She's the girl whose dad is a chef."],
  mistakes: [
    { wrong: "The man which lives next door.", right: "The man who lives next door.", why: "Use 'who' for people." },
    { wrong: "My mum, that is a nurse, works nights.", right: "My mum, who is a nurse, works nights.", why: "Don't use 'that' in clauses with commas." }
  ],
  quiz: [
    { q: "The woman ___ lives next door is a doctor.", a: ["who", "which", "where"], c: 0, e: "People → who." },
    { q: "This is the phone ___ I bought yesterday.", a: ["who", "which", "where"], c: 1, e: "Things → which (or that)." },
    { q: "That's the restaurant ___ we had our first date.", a: ["which", "where", "whose"], c: 1, e: "Places → where." },
    { q: "He's the student ___ laptop was stolen.", a: ["who", "whose", "which"], c: 1, e: "Possession → whose." },
    { q: "London, ___ is the capital of the UK, is very expensive.", a: ["that", "which", "where"], c: 1, e: "Extra information with commas → which (not that)." },
    { t: "fill", q: "I have a friend ___ speaks five languages.", ans: ["who", "that"], e: "People → who (or that)." },
    { q: "In which sentence can you leave out the pronoun?", a: ["The man who called you is here.", "The cake that I made was delicious.", "My aunt, who lives in Bolton, is visiting."], c: 1, e: "'That' is the object of 'made', so you can say 'The cake I made…'." },
    { q: "Choose the correct sentence:", a: ["The bus which goes to Oldham is late.", "The bus who goes to Oldham is late.", "The bus where goes to Oldham is late."], c: 0, e: "Things → which." }
  ]
},
{
  id: "narrative-tenses", title: "Past Perfect and Narrative Tenses", level: "L1",
  summary: "Tell stories clearly with the past simple, past continuous and past perfect.",
  sections: [
    { h: "Past continuous = background action", p: "was / were + -ing", list: ["I was walking home when it started to rain.", "While she was cooking, the phone rang."] },
    { h: "Past simple = main events", p: "The events in order: I opened the door, turned on the light and saw the mess." },
    { h: "Past perfect = earlier past", p: "had + past participle. An action that happened BEFORE another past action.", list: ["When I arrived, the train had left. (The train left first.)", "She was tired because she had worked all night."] },
    { h: "Time words", list: ["when / while / as", "by the time: By the time we got there, the film had started.", "before / after / already"] }
  ],
  examples: ["I was sleeping when you called.", "When we got to the cinema, the film had already started.", "He had never flown before that trip.", "While they were waiting, it began to snow."],
  mistakes: [
    { wrong: "When I arrived, the train left.", right: "When I arrived, the train had left.", why: "If the train left first, use the past perfect." },
    { wrong: "I was knowing her for years.", right: "I had known her for years.", why: "'Know' is a state verb; use the past perfect for time before a past moment." }
  ],
  quiz: [
    { q: "I ___ TV when the lights went out.", a: ["watched", "was watching", "had watched"], c: 1, e: "Background action interrupted → past continuous." },
    { q: "By the time I arrived, everyone ___.", a: ["left", "had left", "was leaving"], c: 1, e: "They left before I arrived → past perfect." },
    { q: "She was hungry because she ___ breakfast.", a: ["didn't have", "hadn't had", "wasn't having"], c: 1, e: "The missed breakfast happened earlier → past perfect." },
    { q: "While I was cooking, my phone ___.", a: ["rang", "was ringing", "had rung"], c: 0, e: "A short action that interrupts → past simple." },
    { t: "fill", q: "I ___ never seen snow before I came to the UK. (have)", ans: ["had"], e: "Before a past moment → had + seen." },
    { q: "They ___ for an hour when the bus finally came.", a: ["waited", "had been waiting", "were wait"], c: 1, e: "A long action up to a past moment → past perfect continuous." },
    { q: "When we got home, we realised someone ___ into the house.", a: ["broke", "had broken", "was breaking"], c: 1, e: "The break-in happened earlier → past perfect." },
    { q: "Which sentence shows two actions happening at the same time?", a: ["While I was studying, my brother was playing games.", "I studied, then I played games.", "I had studied before I played games."], c: 0, e: "Two past continuous actions with 'while' = at the same time." }
  ]
},
{
  id: "conditional-3", title: "Third and Mixed Conditionals", level: "L1",
  summary: "Talk about past situations that did not happen: If I had known…",
  sections: [
    { h: "Third conditional", p: "If + past perfect, would have + past participle. For imagined past situations and regrets.", list: ["If I had studied, I would have passed. (But I didn't study, and I didn't pass.)", "If we had left earlier, we wouldn't have missed the train."] },
    { h: "could have / might have", p: "Use them for possibility: If you had asked me, I could have helped." },
    { h: "Mixed conditionals", list: ["Past condition → present result: If I had taken that job, I would be rich now.", "Present condition → past result: If I were braver, I would have said something."] }
  ],
  examples: ["If I had seen you, I would have said hello.", "She wouldn't have been late if she had caught the bus.", "If you had told me, I could have helped.", "If I had learnt English earlier, my life would be easier now."],
  mistakes: [
    { wrong: "If I would have known, I would have come.", right: "If I had known, I would have come.", why: "Use the past perfect after 'if'." },
    { wrong: "If I had studied, I would pass.", right: "If I had studied, I would have passed.", why: "A past result needs 'would have' + past participle." }
  ],
  quiz: [
    { q: "If I ___ the alarm, I wouldn't have been late.", a: ["heard", "had heard", "would hear"], c: 1, e: "If + past perfect." },
    { q: "If she had asked me, I ___ her.", a: ["would help", "would have helped", "will help"], c: 1, e: "Past result → would have + past participle." },
    { q: "If we hadn't missed the bus, we ___ on time.", a: ["would have arrived", "would arrive", "arrived"], c: 0, e: "Third conditional: would have arrived." },
    { t: "fill", q: "If I had known, I would ___ come. (have)", ans: ["have"], e: "would have + past participle." },
    { q: "If I had saved money last year, I ___ a car now.", a: ["would have", "would have had", "had"], c: 0, e: "Past condition → present result (mixed): would have (now)." },
    { q: "Which sentence talks about the past?", a: ["If I had time, I would help.", "If I had had time, I would have helped.", "If I have time, I will help."], c: 1, e: "had had … would have helped = third conditional (past)." },
    { q: "If he ___ so tired, he wouldn't have crashed the car.", a: ["wasn't", "hadn't been", "isn't"], c: 1, e: "If + past perfect: hadn't been." },
    { q: "You ___ have won if you had tried harder.", a: ["could", "can", "will"], c: 0, e: "Possibility in the past: could have won." }
  ]
},
{
  id: "reported-speech", title: "Reported Speech", level: "L1",
  summary: "Say what other people said: She said (that) she was tired.",
  sections: [
    { h: "Tenses move back", table: [["\"I am tired.\"", "→", "She said she was tired."], ["\"I'm working.\"", "→", "He said he was working."], ["\"I went home.\"", "→", "She said she had gone home."], ["\"I will call.\"", "→", "He said he would call."], ["\"I can swim.\"", "→", "She said she could swim."]] },
    { h: "say or tell?", list: ["say (something): She said (that) she was busy.", "tell + person: She told me (that) she was busy."] },
    { h: "Other words change too", list: ["today → that day, tomorrow → the next day, yesterday → the day before", "here → there, this → that", "I / my → he / she / his / her"] },
    { h: "Reported questions", p: "Use normal word order (no question form). Use 'if' for yes/no questions.", list: ["\"Where do you live?\" → He asked me where I lived.", "\"Are you OK?\" → She asked if I was OK."] },
    { h: "Requests and orders", p: "ask / tell + person + (not) to + verb: She told me to sit down. He asked me not to be late." }
  ],
  examples: ["He said he was hungry.", "She told me she had finished the report.", "They said they would come the next day.", "My teacher asked me where I was from.", "The doctor told me to rest."],
  mistakes: [
    { wrong: "She said me she was tired.", right: "She told me she was tired. / She said she was tired.", why: "'Tell' needs a person; 'say' doesn't." },
    { wrong: "He asked me where did I live.", right: "He asked me where I lived.", why: "Reported questions use normal word order." }
  ],
  quiz: [
    { q: "\"I am hungry.\" → He said he ___ hungry.", a: ["is", "was", "has been"], c: 1, e: "Present → past: am → was." },
    { q: "\"I will help you.\" → She said she ___ help me.", a: ["will", "would", "can"], c: 1, e: "will → would." },
    { q: "She ___ me that she was leaving.", a: ["said", "told", "asked"], c: 1, e: "'Tell' + person." },
    { q: "\"Where do you work?\" → He asked me where ___.", a: ["do I work", "I worked", "did I work"], c: 1, e: "Normal word order and the tense moves back." },
    { q: "\"Are you ready?\" → She asked ___ I was ready.", a: ["that", "if", "what"], c: 1, e: "Yes/no questions → if (or whether)." },
    { q: "\"Don't be late.\" → My boss told me ___ late.", a: ["not be", "not to be", "don't be"], c: 1, e: "tell + person + not to + verb." },
    { t: "fill", q: "\"I can drive.\" → He said he ___ drive.", ans: ["could"], e: "can → could." },
    { q: "\"I saw it yesterday.\" → She said she had seen it ___.", a: ["yesterday", "the day before", "tomorrow"], c: 1, e: "yesterday → the day before." }
  ]
},
{
  id: "gerunds-infinitives", title: "Gerunds and Infinitives", level: "L1",
  summary: "Choose between -ing and to + verb: I enjoy swimming, I want to swim.",
  sections: [
    { h: "Verbs + -ing (gerund)", p: "enjoy, finish, mind, avoid, suggest, keep, practise, consider, miss", list: ["I enjoy cooking.", "Would you mind closing the window?"] },
    { h: "Verbs + to + verb (infinitive)", p: "want, need, decide, hope, plan, promise, agree, learn, would like, offer, refuse", list: ["I want to learn English.", "She decided to move to Leeds."] },
    { h: "After prepositions → -ing", p: "interested in, good at, before, after, without, instead of, look forward to", list: ["I'm good at drawing.", "I'm looking forward to seeing you."] },
    { h: "Change of meaning", list: ["stop + -ing = finish doing: I stopped smoking.", "stop + to = stop in order to do something: I stopped to buy a coffee.", "remember + -ing = a memory: I remember meeting him.", "remember + to = don't forget: Remember to lock the door."] }
  ],
  examples: ["I've finished writing my essay.", "We hope to see you soon.", "She's interested in learning Spanish.", "He avoided answering the question.", "I'm looking forward to meeting you."],
  mistakes: [
    { wrong: "I enjoy to dance.", right: "I enjoy dancing.", why: "'Enjoy' is followed by -ing." },
    { wrong: "I'm looking forward to meet you.", right: "I'm looking forward to meeting you.", why: "Here 'to' is a preposition, so use -ing." },
    { wrong: "I want going home.", right: "I want to go home.", why: "'Want' is followed by to + verb." }
  ],
  quiz: [
    { q: "I enjoy ___ to music.", a: ["listen", "to listen", "listening"], c: 2, e: "enjoy + -ing." },
    { q: "She decided ___ a new job.", a: ["finding", "to find", "find"], c: 1, e: "decide + to + verb." },
    { q: "I'm good at ___.", a: ["cook", "to cook", "cooking"], c: 2, e: "After a preposition (at) → -ing." },
    { q: "Would you mind ___ the door?", a: ["to open", "opening", "open"], c: 1, e: "mind + -ing." },
    { q: "I'm looking forward to ___ you.", a: ["see", "seeing", "saw"], c: 1, e: "look forward to + -ing." },
    { q: "I stopped ___ a sandwich because I was hungry.", a: ["to buy", "buying", "buy"], c: 0, e: "Stop + to = stop in order to do something." },
    { t: "fill", q: "Please remember ___ the lights off. (turn)", ans: ["to turn"], e: "remember + to = don't forget to do it." },
    { q: "He promised ___ late again.", a: ["not being", "not to be", "to not being"], c: 1, e: "promise + (not) to + verb." }
  ]
},
{
  id: "modals-deduction", title: "Modals of Deduction (must, might, can't)", level: "L2",
  summary: "Say how sure you are: She must be tired. He can't have seen it.",
  sections: [
    { h: "Present deduction", table: [["must", "I'm sure it's true", "She's worked all day. She must be tired."], ["might / may / could", "it's possible", "He might be in the library."], ["can't", "I'm sure it's not true", "That can't be Tom — he's in Spain."]] },
    { h: "Past deduction", p: "modal + have + past participle", list: ["must have: The road is wet. It must have rained.", "might / may / could have: She might have missed the bus.", "can't / couldn't have: He can't have finished already — he only started ten minutes ago."] },
    { h: "Be careful", p: "The opposite of 'must' (sure it's true) is 'can't' (sure it's not true), not 'mustn't'." }
  ],
  examples: ["You must be Ahmad — nice to meet you!", "The lights are off. They might be asleep.", "She can't have forgotten; I reminded her this morning.", "He must have left his keys at work."],
  mistakes: [
    { wrong: "He mustn't be at home; his car isn't there.", right: "He can't be at home; his car isn't there.", why: "For deduction, the negative of 'must' is 'can't'." },
    { wrong: "She must have forget.", right: "She must have forgotten.", why: "Use the past participle after 'have'." }
  ],
  quiz: [
    { q: "He's been running for an hour. He ___ be exhausted.", a: ["must", "can't", "mustn't"], c: 0, e: "You're sure it's true → must." },
    { q: "That ___ be your sister — she's much older than you!", a: ["must", "can't", "might"], c: 1, e: "You're sure it's not true → can't." },
    { q: "I'm not sure where Ali is. He ___ be at the gym.", a: ["must", "might", "can't"], c: 1, e: "It's possible → might." },
    { q: "The ground is wet. It ___ rained last night.", a: ["must have", "can't have", "must"], c: 0, e: "Sure about the past → must have + past participle." },
    { q: "She ___ have seen me — she wasn't looking.", a: ["must", "can't", "should"], c: 1, e: "Sure it didn't happen → can't have." },
    { t: "fill", q: "I can't find my wallet. I might have ___ it on the bus. (leave)", ans: ["left"], e: "might have + past participle (left)." },
    { q: "They aren't answering the phone. They ___ gone out.", a: ["may have", "mustn't have", "can"], c: 0, e: "A possible explanation in the past → may have." },
    { q: "Which sentence means 'I'm sure he didn't do it'?", a: ["He must have done it.", "He can't have done it.", "He might have done it."], c: 1, e: "can't have + past participle = sure it didn't happen." }
  ]
},
{
  id: "inversion-emphasis", title: "Inversion and Emphasis", level: "L2",
  summary: "Make formal writing stronger: Never have I seen… What I need is…",
  sections: [
    { h: "Negative adverbials + inversion", p: "In formal English, some negative words at the start change the word order (like a question).", list: ["Never have I seen such a beautiful view.", "Rarely do we get snow in April.", "Not only is she clever, but she is also kind.", "Hardly had I sat down when the phone rang.", "No sooner had we arrived than it started to rain.", "Under no circumstances should you open this door."] },
    { h: "Cleft sentences", list: ["What I need is a holiday. (= I need a holiday.)", "It was Sara who called you. (= Sara called you, not someone else.)", "The thing I like most about Oldham is the people."] },
    { h: "When to use it", p: "Use inversion in formal writing and speeches. In everyday conversation, normal word order is more natural." }
  ],
  examples: ["Not only did he pass, but he also got the highest mark.", "Seldom have I met such a helpful person.", "What surprised me was how friendly everyone was.", "It was in 2021 that I moved to the UK."],
  mistakes: [
    { wrong: "Never I have seen this.", right: "Never have I seen this.", why: "After 'never' at the start, put the auxiliary before the subject." },
    { wrong: "Not only she speaks French, but also German.", right: "Not only does she speak French, but she also speaks German.", why: "'Not only' at the start needs inversion (does she speak)." }
  ],
  quiz: [
    { q: "Never ___ such a delicious meal.", a: ["I have eaten", "have I eaten", "I ate"], c: 1, e: "Never + auxiliary + subject: have I eaten." },
    { q: "Not only ___ late, but he also forgot his books.", a: ["he was", "was he", "he is"], c: 1, e: "Not only + inversion: was he." },
    { q: "No sooner had we sat down ___ the film started.", a: ["when", "than", "then"], c: 1, e: "The pattern is 'No sooner … than'." },
    { q: "Hardly had I closed my eyes ___ the alarm went off.", a: ["when", "than", "that"], c: 0, e: "The pattern is 'Hardly … when'." },
    { q: "___ I need right now is a cup of tea.", a: ["That", "What", "Which"], c: 1, e: "Cleft sentence: What I need is…" },
    { q: "Rarely ___ such kindness from strangers.", a: ["we see", "do we see", "we do see"], c: 1, e: "Rarely + do + subject + verb." },
    { q: "Under no circumstances ___ leave the building.", a: ["you should", "should you", "you shall"], c: 1, e: "Under no circumstances + inversion: should you." },
    { q: "Which sentence emphasises WHO called?", a: ["Sara called you.", "It was Sara who called you.", "Sara has called you."], c: 1, e: "'It was … who …' puts the focus on Sara." }
  ]
}
];
