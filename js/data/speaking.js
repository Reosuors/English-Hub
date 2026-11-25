// Speaking practice content. UK ESOL levels. British spelling.
export const REPEAT = {
  E1: ["Hello, my name is Sam.", "I live in Oldham.", "I am from Syria.", "Can you help me, please?", "I would like a cup of tea.", "What time is it?", "Thank you very much.", "I have two children.", "Where is the bus stop?", "See you tomorrow."],
  E2: ["I usually get up at seven o'clock.", "Could I make an appointment, please?", "My son goes to the local primary school.", "I'm looking for a part-time job.", "How much is a return ticket to Manchester?", "I went to the market last Saturday.", "Can you speak more slowly, please?", "I've got a bad headache.", "The weather is cold and rainy today.", "I'd like to pay by card."],
  E3: ["I've been studying English for two years.", "Would you mind repeating that, please?", "I'm calling to ask about the job advert.", "If it rains tomorrow, we'll stay at home.", "I used to work as an electrician in my country.", "Could you tell me where the library is?", "I'm afraid I can't come to class on Friday.", "I think public transport should be cheaper.", "She has lived in the UK since 2019.", "I'd rather walk than take the bus."],
  L1: ["I'd like to apply for the position of customer service assistant.", "Although it was raining, we decided to go for a walk.", "In my opinion, learning a language takes patience and practice.", "I would appreciate it if you could call me back this afternoon.", "The meeting has been moved to next Thursday morning.", "If I had more time, I would volunteer at the community centre.", "Could you explain what the main responsibilities are?", "I was wondering whether there are any evening courses available."],
  L2: ["Having considered all the options, I believe this is the most sensible approach.", "The council has announced plans to improve local bus services.", "Were I to choose again, I would study something more practical.", "Despite the difficulties, the project was completed on schedule.", "It is widely accepted that regular exercise benefits mental health.", "I'd be grateful if you could confirm the arrangements in writing.", "Not only did she pass the exam, but she also won an award."]
};
export const READ = [
  { id: "r-e1", level: "E1", title: "About me", text: "My name is Ali. I am from Iraq. I live in Oldham with my wife and my son. I go to college on Monday and Tuesday. I like football and tea." },
  { id: "r-e2", level: "E2", title: "My weekend", text: "Last weekend I went to the park with my family. The weather was sunny, so we had a picnic. In the evening we watched a film at home. On Sunday I cleaned the house and cooked dinner." },
  { id: "r-e3", level: "E3", title: "Getting to college", text: "I usually catch the bus to college, but sometimes I walk when the weather is nice. The journey takes about twenty minutes. I prefer the bus in winter because it is warm and dry. Next year I'm hoping to learn to drive." },
  { id: "r-l1", level: "L1", title: "Volunteering", text: "Volunteering is a great way to improve your English and meet new people. Many charity shops and community centres welcome volunteers. You can gain useful experience for your CV, and employers often value it highly." },
  { id: "r-l2", level: "L2", title: "Public libraries", text: "Public libraries offer far more than books. They provide free internet access, job clubs and language classes, which makes them essential for many communities. However, funding cuts have forced some councils to reduce opening hours or close branches altogether." }
];
// Each step: what the other person says, a model answer, and keyword groups (any word in a group counts).
export const TALKS = [
  { id: "gp", title: "At the GP surgery", level: "E2", icon: "help", color: "mint", intro: "You phone your GP surgery to book an appointment.", steps: [
    { say: "Good morning, Oldham Medical Centre. How can I help?", model: "Good morning. I'd like to make an appointment, please.", keys: [["appointment", "book", "see"], ["doctor", "gp", "please", "like"]] },
    { say: "Can I have your full name and date of birth, please?", model: "My name is Ahmad Ali and my date of birth is the fifth of May, 1995.", keys: [["name"], ["born", "birth", "date"]] },
    { say: "Thank you. What's the problem?", model: "I've had a bad cough and a sore throat for a week.", keys: [["cough", "pain", "headache", "throat", "fever", "temperature", "hurt", "sick", "ill", "ache"], ["week", "days", "since", "for"]] },
    { say: "We have an appointment tomorrow at 10:30. Is that OK?", model: "Yes, that's fine. Thank you very much.", keys: [["yes", "fine", "ok", "okay", "good", "great", "perfect"], ["thank", "thanks"]] }
  ]},
  { id: "jobcentre", title: "At the Jobcentre", level: "E3", icon: "target", color: "orange", intro: "You meet your work coach at the Jobcentre.", steps: [
    { say: "Hello, please take a seat. What kind of work are you looking for?", model: "I'm looking for work in a warehouse or in retail.", keys: [["looking", "want", "find", "like"], ["work", "job", "warehouse", "shop", "retail", "driver", "cleaner", "kitchen", "factory"]] },
    { say: "Have you got any experience?", model: "Yes, I worked in a shop for three years in my country.", keys: [["yes", "no", "worked", "experience"], ["years", "year", "months", "before", "country"]] },
    { say: "What hours can you work?", model: "I can work full-time, Monday to Friday.", keys: [["can", "work", "available"], ["full", "part", "time", "monday", "friday", "morning", "evening", "weekend", "hours"]] },
    { say: "Have you updated your CV recently?", model: "Not yet. Could you help me with my CV, please?", keys: [["cv", "yes", "not", "no"], ["help", "please", "updated", "update", "last"]] }
  ]},
  { id: "interview", title: "Job interview", level: "L1", icon: "award", color: "orange", intro: "You are in an interview for a customer service job.", steps: [
    { say: "Thanks for coming in. Could you tell me a little about yourself?", model: "Of course. I'm from Syria and I've lived in Oldham for three years. I'm friendly and hard-working.", keys: [["from", "live", "lived", "name", "i'm", "am"], ["work", "working", "friendly", "experience", "years", "studying", "college"]] },
    { say: "Why do you want this job?", model: "I enjoy helping people and I'd like to improve my communication skills.", keys: [["enjoy", "like", "love", "want", "interested"], ["help", "helping", "people", "customers", "team", "skills", "experience"]] },
    { say: "What are your strengths?", model: "I'm reliable, I learn quickly and I work well in a team.", keys: [["reliable", "hard", "quickly", "punctual", "organised", "patient", "friendly", "honest", "strength"], ["team", "work", "people", "learn"]] },
    { say: "Do you have any questions for us?", model: "Yes. What would a typical day look like, and when could I start?", keys: [["what", "when", "how", "could", "would", "is", "yes"], ["day", "start", "training", "hours", "team", "shift", "pay"]] }
  ]},
  { id: "shop", title: "In a shop", level: "E1", icon: "cards", color: "mint", intro: "You want to return a jumper that is too small.", steps: [
    { say: "Hello, can I help you?", model: "Yes, please. I'd like to return this jumper.", keys: [["return", "change", "exchange", "refund", "bring", "back"], ["jumper", "this", "please"]] },
    { say: "What's wrong with it?", model: "It's too small.", keys: [["small", "big", "large", "broken", "wrong", "size", "colour"], ["too", "it's", "it", "is"]] },
    { say: "Have you got the receipt?", model: "Yes, here you are.", keys: [["yes", "no", "here", "receipt"], ["here", "are", "sorry", "it"]] },
    { say: "Would you like a refund or a bigger size?", model: "A bigger size, please.", keys: [["refund", "money", "size", "bigger", "larger", "exchange", "change"], ["please", "thanks", "thank"]] }
  ]},
  { id: "phone", title: "A phone call", level: "E3", icon: "volume", color: "orange", intro: "You phone your child's school because your son is ill.", steps: [
    { say: "Good morning, Greenfield Primary School.", model: "Good morning. My name is Ahmad Ali. I'm calling about my son, Omar.", keys: [["name", "calling", "call", "phoning", "this"], ["son", "daughter", "child", "about"]] },
    { say: "Oh yes, which class is he in?", model: "He's in Year Three, Miss Taylor's class.", keys: [["year", "class"], ["one", "two", "three", "four", "five", "six", "1", "2", "3", "4", "5", "6", "miss", "mr", "mrs"]] },
    { say: "And what's the reason for the absence?", model: "He's got a high temperature, so he can't come to school today.", keys: [["ill", "sick", "temperature", "fever", "cold", "unwell", "doctor", "appointment", "cough"], ["today", "can't", "cannot", "not", "school", "home"]] },
    { say: "Thank you for letting us know. I hope he feels better soon.", model: "Thank you. Goodbye.", keys: [["thank", "thanks"], ["bye", "goodbye", "you", "much"]] }
  ]}
];
