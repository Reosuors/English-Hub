// Placement test. Levels: E1 (Entry 1), E2 (Entry 2), E3 (Entry 3), L1 (Level 1), L2 (Level 2).
export const PLACEMENT_READING = {
  r1: { title: "A message from Sam", level: "E1", text: "Hi Mia, I'm at the shop now. They don't have any brown bread, so I'm buying white bread. I'll be home at six. Can you start cooking the rice? Thanks, Sam" },
  r2: { title: "The new library", level: "E3", text: "The town's new library opened last month. As well as books, it has a café, free Wi-Fi and a room where people can study quietly. On Saturday mornings, volunteers run free English conversation classes. The library is open every day except Sunday, and you need a library card, which is free, to borrow books." },
  r3: { title: "Working from home", level: "L2", text: "Since 2020, working from home has become far more common in the UK. Supporters argue that it saves commuting time and gives employees greater control over their day. Critics, however, point out that it can blur the line between work and personal life, and that younger staff may miss out on the informal learning that happens in an office. Many employers have therefore settled on a hybrid model, although the ideal balance remains a matter of debate." }
};
export const PLACEMENT = [
  // Grammar
  { skill: "grammar", level: "E1", q: "My name ___ Sara.", a: ["am", "is", "are"], c: 1 },
  { skill: "grammar", level: "E1", q: "She ___ in a hospital.", a: ["work", "works", "working"], c: 1 },
  { skill: "grammar", level: "E2", q: "Yesterday we ___ to the park.", a: ["go", "went", "gone"], c: 1 },
  { skill: "grammar", level: "E2", q: "Look! The children ___ in the garden.", a: ["play", "are playing", "plays"], c: 1 },
  { skill: "grammar", level: "E3", q: "I ___ in Oldham since 2021.", a: ["live", "lived", "have lived"], c: 2 },
  { skill: "grammar", level: "E3", q: "If it rains tomorrow, we ___ at home.", a: ["stay", "will stay", "would stay"], c: 1 },
  { skill: "grammar", level: "E3", q: "This bridge ___ in 1890.", a: ["built", "was built", "has built"], c: 1 },
  { skill: "grammar", level: "L1", q: "When I got to the station, the train ___.", a: ["already left", "had already left", "has already left"], c: 1 },
  { skill: "grammar", level: "L1", q: "She told me she ___ call me the next day.", a: ["will", "would", "can"], c: 1 },
  { skill: "grammar", level: "L1", q: "If I ___ harder, I would have passed.", a: ["studied", "had studied", "would study"], c: 1 },
  { skill: "grammar", level: "L2", q: "Not only ___ the exam, but she also got the top mark.", a: ["she passed", "did she pass", "she did pass"], c: 1 },
  { skill: "grammar", level: "L2", q: "He can't ___ the email — he hasn't been online all day.", a: ["see", "have seen", "had seen"], c: 1 },
  // Vocabulary
  { skill: "vocabulary", level: "E1", q: "You sleep in a ___.", a: ["kitchen", "bed", "bus"], c: 1 },
  { skill: "vocabulary", level: "E1", q: "The opposite of 'cheap' is ___.", a: ["expensive", "small", "fast"], c: 0 },
  { skill: "vocabulary", level: "E2", q: "Can I ___ your pen? I'll give it back.", a: ["lend", "borrow", "keep"], c: 1 },
  { skill: "vocabulary", level: "E2", q: "Keep your ___ in case you want a refund.", a: ["receipt", "recipe", "prescription"], c: 0 },
  { skill: "vocabulary", level: "E3", q: "This job is a great ___ to learn new skills.", a: ["opportunity", "argument", "deadline"], c: 0 },
  { skill: "vocabulary", level: "L1", q: "He was ___ to ask for help because he felt shy.", a: ["eager", "reluctant", "thorough"], c: 1 },
  { skill: "vocabulary", level: "L1", q: "Mistakes are ___ when you learn something new; you can't avoid them.", a: ["inevitable", "genuine", "adequate"], c: 0 },
  { skill: "vocabulary", level: "L2", q: "The instructions were ___, so everyone understood them differently.", a: ["coherent", "ambiguous", "meticulous"], c: 1 },
  // Reading
  { skill: "reading", level: "E1", passage: "r1", q: "Where is Sam?", a: ["At home", "At the shop", "At work"], c: 1 },
  { skill: "reading", level: "E1", passage: "r1", q: "What does Sam want Mia to do?", a: ["Buy bread", "Cook the rice", "Come to the shop"], c: 1 },
  { skill: "reading", level: "E3", passage: "r2", q: "When is the library closed?", a: ["On Saturdays", "On Sundays", "Every evening"], c: 1 },
  { skill: "reading", level: "E3", passage: "r2", q: "What do you need to borrow books?", a: ["Money", "A free library card", "A volunteer"], c: 1 },
  { skill: "reading", level: "L2", passage: "r3", q: "According to critics, what may younger staff lose?", a: ["Commuting time", "Informal learning in the office", "Control over their day"], c: 1 },
  { skill: "reading", level: "L2", passage: "r3", q: "What does 'a matter of debate' mean in the last sentence?", a: ["People still disagree about it", "Everyone agrees about it", "It is against the law"], c: 0 }
];
export const PLACEMENT_WRITING = {
  prompt: "Write about yourself in 3 to 8 sentences. Where do you live? What do you do? What did you do last weekend? What are your plans for the future?",
  minWords: 20
};
