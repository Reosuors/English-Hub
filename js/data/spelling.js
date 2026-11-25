// Common Spelling Mistakes: confusing words and commonly misspelled words (British spelling).
export const PAIRS = [
  { id: "their-there-theyre", title: "their / there / they're", words: [
      { w: "their", m: "belongs to them", ex: "They love their new flat." },
      { w: "there", m: "a place, or 'there is / there are'", ex: "Put it over there. There are two cafés." },
      { w: "they're", m: "short for 'they are'", ex: "They're from Poland." } ],
    tip: "they're = they are. Try saying 'they are' — if it works, use they're. 'There' has 'here' inside it (a place).",
    quiz: [
      { q: "___ going to the cinema tonight.", a: ["Their", "There", "They're"], c: 2, e: "They're = they are: They are going…" },
      { q: "The students left ___ bags in the classroom.", a: ["their", "there", "they're"], c: 0, e: "The bags belong to them → their." },
      { q: "___ is a bus stop near my house.", a: ["Their", "There", "They're"], c: 1, e: "'There is / there are' → there." },
      { q: "I put your keys over ___.", a: ["their", "there", "they're"], c: 1, e: "A place → there." },
      { q: "My neighbours say ___ moving next month.", a: ["their", "there", "they're"], c: 2, e: "they are moving → they're." } ] },
  { id: "your-youre", title: "your / you're", words: [
      { w: "your", m: "belongs to you", ex: "Is this your phone?" },
      { w: "you're", m: "short for 'you are'", ex: "You're very kind." } ],
    tip: "If you can say 'you are', write you're. Otherwise, write your.",
    quiz: [
      { q: "___ English is getting better!", a: ["Your", "You're"], c: 0, e: "The English belongs to you → your." },
      { q: "Thanks, ___ a great friend.", a: ["your", "you're"], c: 1, e: "you are a great friend → you're." },
      { q: "Don't forget ___ coat.", a: ["your", "you're"], c: 0, e: "The coat belongs to you → your." },
      { q: "___ welcome!", a: ["Your", "You're"], c: 1, e: "You are welcome → you're." } ] },
  { id: "its-its", title: "its / it's", words: [
      { w: "its", m: "belongs to it", ex: "The cat is eating its food." },
      { w: "it's", m: "short for 'it is' or 'it has'", ex: "It's cold today. It's been a long day." } ],
    tip: "it's = it is / it has. 'Its' (possession) never has an apostrophe — like his, her, our.",
    quiz: [
      { q: "___ raining again.", a: ["Its", "It's"], c: 1, e: "It is raining → it's." },
      { q: "The tree lost ___ leaves.", a: ["its", "it's"], c: 0, e: "The leaves belong to the tree → its." },
      { q: "___ been a busy week.", a: ["Its", "It's"], c: 1, e: "It has been → it's." },
      { q: "The company has changed ___ name.", a: ["its", "it's"], c: 0, e: "Possession → its." } ] },
  { id: "then-than", title: "then / than", words: [
      { w: "then", m: "next, after that, or at that time", ex: "First we ate, then we went home." },
      { w: "than", m: "used to compare things", ex: "She is taller than me." } ],
    tip: "thAn = compArison. thEn = timE.",
    quiz: [
      { q: "A train is faster ___ a bus.", a: ["then", "than"], c: 1, e: "Comparing → than." },
      { q: "Finish your work and ___ you can go.", a: ["then", "than"], c: 0, e: "After that → then." },
      { q: "I'd rather walk ___ wait for the bus.", a: ["then", "than"], c: 1, e: "Comparing two choices → than." },
      { q: "We lived in Bolton back ___.", a: ["then", "than"], c: 0, e: "At that time → then." } ] },
  { id: "affect-effect", title: "affect / effect", words: [
      { w: "affect", m: "a verb: to change or influence something", ex: "The weather can affect your mood." },
      { w: "effect", m: "a noun: the result of a change", ex: "The medicine had a good effect." } ],
    tip: "Affect = Action (verb). Effect = End result (noun). You can say 'an effect' or 'the effect'.",
    quiz: [
      { q: "Smoking can ___ your health.", a: ["affect", "effect"], c: 0, e: "Verb (action) → affect." },
      { q: "The new rules had a big ___ on students.", a: ["affect", "effect"], c: 1, e: "Noun (result), after 'a big' → effect." },
      { q: "Lack of sleep ___ your concentration.", a: ["affects", "effects"], c: 0, e: "Verb → affects." },
      { q: "What are the side ___ of this medicine?", a: ["affects", "effects"], c: 1, e: "Results (noun) → effects." } ] },
  { id: "lose-loose", title: "lose / loose", words: [
      { w: "lose", m: "a verb: to not be able to find something, or to not win", ex: "Don't lose your ticket. We might lose the match." },
      { w: "loose", m: "an adjective: not tight", ex: "These trousers are too loose." } ],
    tip: "Lose lost an 'o'. Loose has lots of space, like loose clothes (two o's).",
    quiz: [
      { q: "I always ___ my keys!", a: ["lose", "loose"], c: 0, e: "Not able to find → lose." },
      { q: "This shirt is too ___. I need a smaller size.", a: ["lose", "loose"], c: 1, e: "Not tight → loose." },
      { q: "If we don't score, we'll ___ the game.", a: ["lose", "loose"], c: 0, e: "Not win → lose." },
      { q: "One of my teeth is ___.", a: ["lose", "loose"], c: 1, e: "Not fixed / not tight → loose." } ] },
  { id: "to-too-two", title: "to / too / two", words: [
      { w: "to", m: "towards a place, or before a verb", ex: "I go to college. I want to learn." },
      { w: "too", m: "also, or more than you want", ex: "I'm hungry too. It's too hot." },
      { w: "two", m: "the number 2", ex: "I have two sisters." } ],
    tip: "too has too many o's (more than needed). two is the number.",
    quiz: [
      { q: "It's ___ cold to go swimming.", a: ["to", "too", "two"], c: 1, e: "More than you want → too." },
      { q: "I'm going ___ the library.", a: ["to", "too", "two"], c: 0, e: "Towards a place → to." },
      { q: "She has ___ children.", a: ["to", "too", "two"], c: 2, e: "The number 2 → two." },
      { q: "I like football, and my brother does ___.", a: ["to", "too", "two"], c: 1, e: "Also → too." } ] },
  { id: "where-were-wear", title: "where / were / wear", words: [
      { w: "where", m: "asks about a place", ex: "Where do you live?" },
      { w: "were", m: "past of 'are'", ex: "We were at home." },
      { w: "wear", m: "to have clothes on your body", ex: "I wear a uniform at work." } ],
    tip: "wHERE has 'here' in it (a place). wEAR has 'ear' — you wear earrings.",
    quiz: [
      { q: "___ is the nearest bus stop?", a: ["Where", "Were", "Wear"], c: 0, e: "Asking about a place → where." },
      { q: "They ___ very tired yesterday.", a: ["where", "were", "wear"], c: 1, e: "Past of 'are' → were." },
      { q: "What are you going to ___ to the party?", a: ["where", "were", "wear"], c: 2, e: "Clothes → wear." } ] },
  { id: "whose-whos", title: "whose / who's", words: [
      { w: "whose", m: "asks who owns something", ex: "Whose bag is this?" },
      { w: "who's", m: "short for 'who is' or 'who has'", ex: "Who's your teacher?" } ],
    tip: "who's = who is / who has. If you can't say 'who is', write whose.",
    quiz: [
      { q: "___ coming to the party?", a: ["Whose", "Who's"], c: 1, e: "Who is coming → who's." },
      { q: "___ phone is ringing?", a: ["Whose", "Who's"], c: 0, e: "Asking about the owner → whose." },
      { q: "___ seen my glasses?", a: ["Whose", "Who's"], c: 1, e: "Who has seen → who's." } ] },
  { id: "accept-except", title: "accept / except", words: [
      { w: "accept", m: "to agree to take or receive something", ex: "Please accept my apology." },
      { w: "except", m: "not including", ex: "Everyone came except Tom." } ],
    tip: "EXcept = EXclude (leave out).",
    quiz: [
      { q: "I'm happy to ___ the job offer.", a: ["accept", "except"], c: 0, e: "Agree to take → accept." },
      { q: "The shop is open every day ___ Sunday.", a: ["accept", "except"], c: 1, e: "Not including → except." },
      { q: "We don't ___ cash, only cards.", a: ["accept", "except"], c: 0, e: "Agree to receive → accept." } ] },
  { id: "quiet-quite", title: "quiet / quite", words: [
      { w: "quiet", m: "not noisy", ex: "Please be quiet in the library." },
      { w: "quite", m: "fairly, a little, or completely", ex: "The test was quite easy." } ],
    tip: "quiET ends like 'diet' (two syllables: qui-et). quite rhymes with 'white'.",
    quiz: [
      { q: "The streets are very ___ at night.", a: ["quiet", "quite"], c: 0, e: "Not noisy → quiet." },
      { q: "I'm ___ tired today.", a: ["quiet", "quite"], c: 1, e: "Fairly → quite." },
      { q: "Can you be ___, please? The baby is sleeping.", a: ["quiet", "quite"], c: 0, e: "Not noisy → quiet." } ] },
  { id: "advice-advise", title: "advice / advise", words: [
      { w: "advice", m: "a noun: an opinion about what to do", ex: "Can you give me some advice?" },
      { w: "advise", m: "a verb: to tell someone what you think they should do", ex: "I advise you to see a doctor." } ],
    tip: "In British English, nouns often end in -ice and verbs in -ise: advice / advise, practice / practise, licence / license.",
    quiz: [
      { q: "My teacher gave me good ___.", a: ["advice", "advise"], c: 0, e: "Noun → advice." },
      { q: "I ___ you to book early.", a: ["advice", "advise"], c: 1, e: "Verb → advise." },
      { q: "I need to ___ my speaking every day. (UK verb)", a: ["practice", "practise"], c: 1, e: "In British English the verb is 'practise'." },
      { q: "Football ___ is on Tuesday evenings. (UK noun)", a: ["practice", "practise"], c: 0, e: "In British English the noun is 'practice'." } ] },
  { id: "weather-whether", title: "weather / whether", words: [
      { w: "weather", m: "rain, sun, wind, temperature", ex: "The weather is lovely today." },
      { w: "whether", m: "if (when there are choices)", ex: "I don't know whether to stay or go." } ],
    tip: "wEAther — you EAt outside in good weather.",
    quiz: [
      { q: "What's the ___ like in Manchester?", a: ["weather", "whether"], c: 0, e: "Rain, sun, etc. → weather." },
      { q: "I'm not sure ___ he'll come.", a: ["weather", "whether"], c: 1, e: "If → whether." } ] },
  { id: "bought-brought", title: "bought / brought", words: [
      { w: "bought", m: "past of 'buy'", ex: "I bought a new coat." },
      { w: "brought", m: "past of 'bring'", ex: "She brought cake to the party." } ],
    tip: "bRought has the R from bRing.",
    quiz: [
      { q: "I ___ some bread at the shop.", a: ["bought", "brought"], c: 0, e: "Past of buy → bought." },
      { q: "Thank you for the flowers you ___.", a: ["bought", "brought"], c: 1, e: "Past of bring → brought." } ] },
  { id: "desert-dessert", title: "desert / dessert", words: [
      { w: "desert", m: "a large hot, dry area of land", ex: "The Sahara is a desert." },
      { w: "dessert", m: "sweet food after a meal", ex: "We had ice cream for dessert." } ],
    tip: "Dessert has two s's because you always want seconds (or: Strawberry Shortcake).",
    quiz: [
      { q: "What would you like for ___? Cake or fruit?", a: ["desert", "dessert"], c: 1, e: "Sweet food → dessert." },
      { q: "Camels live in the ___.", a: ["desert", "dessert"], c: 0, e: "Hot, dry land → desert." } ] },
  { id: "breath-breathe", title: "breath / breathe", words: [
      { w: "breath", m: "a noun: the air going in and out of you", ex: "Take a deep breath." },
      { w: "breathe", m: "a verb: to take air in and out", ex: "Breathe slowly and relax." } ],
    tip: "The verb has the extra e: breathE = do it.",
    quiz: [
      { q: "Take a deep ___ before you start.", a: ["breath", "breathe"], c: 0, e: "Noun (a breath) → breath." },
      { q: "It's hard to ___ in this smoke.", a: ["breath", "breathe"], c: 1, e: "Verb (after 'to') → breathe." } ] }
];

// Commonly misspelled words: [correct, wrong1, wrong2, tip]
export const MISSPELLED = [
  ["accommodation","accomodation","acommodation","Double c and double m: acCoMModation."],
  ["definitely","definately","definitly","It contains the word 'finite': de-FINITE-ly."],
  ["separate","seperate","separete","There is 'a rat' in sep-A-RAT-e."],
  ["necessary","neccessary","necesary","One collar (c), two sleeves (ss): ne-C-e-SS-ary."],
  ["receive","recieve","receeve","'i before e, except after c': rec-EI-ve."],
  ["believe","beleive","belive","Don't believe a LIE: be-LIE-ve."],
  ["beginning","begining","beginnig","Double n before -ing: begiNNing."],
  ["business","buisness","bussiness","Think 'busy-ness': b-U-S-I-ness."],
  ["calendar","calender","calandar","It ends in -ar: calendAR."],
  ["embarrass","embarass","embarras","Double r and double s: emba-RR-a-SS."],
  ["environment","enviroment","envirnment","There's an 'n' before 'ment': enviroN-ment."],
  ["February","Febuary","Febrary","Say the first r: Feb-RU-ary."],
  ["government","goverment","govenment","It comes from 'govern' + ment."],
  ["immediately","immediatly","imediately","immediate + ly (keep the e)."],
  ["library","libary","librery","Say both r's: li-BRA-ry."],
  ["recommend","reccomend","recomend","One c, two m's: re-C-o-MM-end."],
  ["restaurant","restaraunt","resturant","rest + au + rant: rest-AU-rant."],
  ["until","untill","untl","Only one l at the end: until."],
  ["Wednesday","Wensday","Wednsday","Say it in parts: Wed-nes-day."],
  ["tomorrow","tommorow","tomorow","One m, two r's: toMoRRow."],
  ["address","adress","addres","Double d, double s: aDDreSS."],
  ["achieve","acheive","achive","'i before e': achIEve."],
  ["across","accross","acros","One c: a-cross."],
  ["argument","arguement","argumant","Drop the e of 'argue': argUment."],
  ["beautiful","beatiful","beautifull","b-E-A-U: Big Elephants Are Useful."],
  ["colleague","collegue","colleage","coll + eague (like 'league')."],
  ["committee","commitee","comittee","Double m, double t, double e."],
  ["disappear","dissapear","disappeer","dis + appear (one s, two p's)."],
  ["foreign","foriegn","forein","It's an exception: for-EIGN."],
  ["friend","freind","frend","You are my fri-END to the END."],
  ["grateful","greatful","gratefull","It's not 'great': GRATE-ful."],
  ["guarantee","garantee","guarentee","g-U-arantee: there's a silent u."],
  ["independent","independant","indepedent","It ends in -ent: independENT."],
  ["knowledge","knowlege","knoledge","know + ledge."],
  ["neighbour","neighbor","nieghbour","British spelling: neigh-BOUR (with u)."],
  ["occasion","ocassion","occassion","Two c's, one s: oCCaSion."],
  ["opportunity","oppurtunity","oportunity","opp + or + tunity."],
  ["people","poeple","peaple","p-E-O-ple."],
  ["really","realy","reelly","real + ly = really."],
  ["rhythm","rythm","rhythem","Rhythm Helps Your Two Hips Move."],
  ["schedule","schedual","shedule","sched + ule."],
  ["sincerely","sincerly","sincerelly","sincere + ly (keep the e)."],
  ["successful","succesful","successfull","Double c, double s, one l: suCCeSSful."],
  ["surprise","suprise","surprize","Don't forget the first r: suR-prise."],
  ["truly","truely","truley","No e: true → truly."],
  ["weird","wierd","weerd","An exception to 'i before e': w-EI-rd."],
  ["writing","writting","wrighting","One t: write → writing."],
  ["different","diffrent","diferent","Say all three parts: dif-fer-ent."],
  ["because","becuase","becouse","Big Elephants Can Always Understand Small Elephants."],
  ["colour","color","collour","British spelling: col-OUR."],
  ["favourite","favorite","favourate","British spelling: fav-OUR-ite."],
  ["centre","center","centr","British spelling ends in -re: centRE."],
  ["organise","orgenise","orgnise","British English usually uses -ise: organISE."],
  ["programme","programm","progamme","British English: a TV programme (but a computer program)."],
  ["travelling","traveling","travaling","British English doubles the l: traveLLing."]
];

// Suggested UK ESOL level for each group of words.
const PAIR_LEVEL = { "their-there-theyre": "E1", "your-youre": "E1", "to-too-two": "E1", "where-were-wear": "E2", "its-its": "E2", "then-than": "E2", "quiet-quite": "E2", "bought-brought": "E2", "whose-whos": "E3", "weather-whether": "E3", "lose-loose": "E3", "breath-breathe": "E3", "accept-except": "L1", "advice-advise": "L1", "desert-dessert": "L1", "affect-effect": "L2" };
PAIRS.forEach((p) => { p.level = p.level || PAIR_LEVEL[p.id] || "E3"; });
// Commonly misspelled words: longer words are usually met at higher levels.
export const missLevel = (w) => (w.length <= 6 ? "E2" : w.length <= 8 ? "E3" : w.length <= 10 ? "L1" : "L2");
