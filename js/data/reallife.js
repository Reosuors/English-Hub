// Real-Life English: UK situations. Practice = branching dialogue; choose (or say) the best reply.
// In each step, "them" speaks; the options are replies; ok = good reply; kw = key words for speaking practice.
export const SCENARIOS = [
{ id: "gp", title: "Booking a GP Appointment", icon: "help", color: "mint", level: "E2", voice: "f",
  intro: "Call your doctor's surgery (GP) to book an appointment. Be ready to give your name, date of birth and the problem.",
  phrases: [["I'd like to make an appointment, please.", "polite way to ask"], ["My date of birth is the 3rd of May 1990.", "say the day, month, then year"], ["I've had a sore throat for three days.", "describe your problem: I've had… for…"], ["Do you have anything earlier?", "ask for a sooner time"], ["Could I have an interpreter, please?", "if you need help with language"], ["Is that a phone appointment or face to face?", "ask what type"]],
  steps: [
    { them: "Good morning, Greenfield Medical Centre. How can I help?", options: [
      { t: "Hello, I'd like to make an appointment, please.", ok: true, kw: ["appointment"] },
      { t: "Give me a doctor now.", ok: false, fb: "This sounds rude. Use 'I'd like…' or 'Could I…, please?'" },
      { t: "Goodbye.", ok: false, fb: "You need to say why you are calling." } ] },
    { them: "Of course. Can I take your name and date of birth, please?", options: [
      { t: "Yes, it's Sara Ahmed, the twelfth of June, 1988.", ok: true, kw: ["june", "name", "it's", "my"] },
      { t: "Why do you want that?", ok: false, fb: "The receptionist needs your details to find your record. Just give them." },
      { t: "I am fine, thank you.", ok: false, fb: "That answers 'How are you?', not this question." } ] },
    { them: "Thank you. And what's the problem?", options: [
      { t: "I've had a bad back for a week, and it's getting worse.", ok: true, kw: ["had", "week", "pain", "back", "days"] },
      { t: "I am have pain since one week.", ok: false, fb: "Grammar: say 'I've had pain for a week.'" },
      { t: "It's private.", ok: false, fb: "You can give a short reason. It helps them choose the right appointment." } ] },
    { them: "The first appointment with a doctor is next Wednesday at 3.15. Is that OK?", options: [
      { t: "Do you have anything earlier? It's quite painful.", ok: true, kw: ["earlier", "sooner"] },
      { t: "Wednesday at 3.15 is fine, thank you.", ok: true, kw: ["fine", "ok", "okay", "great", "thank"] },
      { t: "No.", ok: false, fb: "Too short. Explain or ask for another time: 'Do you have anything earlier?'" } ] },
    { them: "We've had a cancellation for tomorrow at 9.40. Would you like that?", options: [
      { t: "Yes, please. That's perfect. Thank you very much.", ok: true, kw: ["yes", "please", "perfect", "thank"] },
      { t: "Maybe. I will see.", ok: false, fb: "The receptionist needs a clear answer now: yes or no." },
      { t: "Why tomorrow?", ok: false, fb: "This sounds strange. Someone cancelled, so the time is free — accept it if you can." } ] }
  ] },
{ id: "interview", title: "A Job Interview", icon: "award", color: "peach", level: "E3", voice: "m",
  intro: "Answer common interview questions. Be positive, give examples and ask a question at the end.",
  phrases: [["I'm a hard-working and reliable person.", "describe yourself"], ["In my last job, I was responsible for…", "talk about experience"], ["I'm good at working in a team.", "a key skill"], ["I'd like to develop my skills in…", "talk about goals"], ["Could you tell me more about the training?", "ask a question at the end"], ["Thank you for your time.", "finish politely"]],
  steps: [
    { them: "Hello, thanks for coming. Please take a seat. How are you today?", options: [
      { t: "I'm very well, thank you. Thanks for inviting me.", ok: true, kw: ["well", "thank", "good", "fine"] },
      { t: "Tired. The bus was terrible.", ok: false, fb: "Start positively. Interviewers remember first impressions." },
      { t: "Where is the toilet?", ok: false, fb: "Not now — answer the question first." } ] },
    { them: "So, tell me a little about yourself.", options: [
      { t: "I've lived in Oldham for three years. I worked as a cashier for two years, and I'm studying English at college.", ok: true, kw: ["worked", "years", "studying", "college", "experience", "lived"] },
      { t: "I was born in a hospital.", ok: false, fb: "Talk about your work, skills and studies, not every detail of your life." },
      { t: "It's on my CV.", ok: false, fb: "This sounds unfriendly. Give a short summary of your experience." } ] },
    { them: "Why do you want this job?", options: [
      { t: "I enjoy helping customers, and I'd like to use my experience in a busy shop.", ok: true, kw: ["enjoy", "help", "customers", "experience", "like"] },
      { t: "I need money.", ok: false, fb: "It's true for everyone! Talk about what you enjoy and what you can offer." },
      { t: "My friend told me to.", ok: false, fb: "Show your own interest in the job." } ] },
    { them: "Can you tell me about a time you solved a problem at work?", options: [
      { t: "Once, a customer was angry about a wrong price. I listened, checked it with my manager and gave her a refund. She left happy.", ok: true, kw: ["customer", "listened", "checked", "solved", "manager"] },
      { t: "I never have problems.", ok: false, fb: "Everyone has problems. Give a short, real example: the situation, what you did, the result." },
      { t: "I don't remember.", ok: false, fb: "Prepare one example before the interview." } ] },
    { them: "Do you have any questions for us?", options: [
      { t: "Yes. Could you tell me more about the training for new staff?", ok: true, kw: ["training", "question", "could", "tell"] },
      { t: "No.", ok: false, fb: "Ask one question. It shows you are interested." },
      { t: "How many holidays can I take in my first week?", ok: false, fb: "Asking about holidays first can give a bad impression." } ] }
  ] },
{ id: "jobcentre", title: "At the Jobcentre", icon: "user", color: "sky", level: "E3", voice: "f",
  intro: "Talk to your work coach about looking for work. Explain what you have done and what help you need.",
  phrases: [["I've applied for five jobs this week.", "report your job search"], ["I'm looking for part-time work in retail.", "say what you want"], ["Could you help me with my CV?", "ask for help"], ["I have an interview on Friday.", "share news"], ["I'm afraid I can't make that time. Could we change it?", "change an appointment"]],
  steps: [
    { them: "Hello, come in. What have you done to look for work since we last met?", options: [
      { t: "I've applied for four jobs online, and I went to a recruitment fair.", ok: true, kw: ["applied", "jobs", "went"] },
      { t: "Nothing. It's hard.", ok: false, fb: "Your work coach needs to see your job search. Say what you tried." },
      { t: "I apply job yesterday.", ok: false, fb: "Grammar: 'I applied for a job yesterday.'" } ] },
    { them: "Good. What kind of work are you looking for?", options: [
      { t: "I'm looking for part-time work in a warehouse or a supermarket.", ok: true, kw: ["looking", "work", "part-time", "full-time"] },
      { t: "Any job, I don't care.", ok: false, fb: "Be clear. It helps your coach find the right jobs for you." },
      { t: "A job with no work.", ok: false, fb: "Ha! Try a real answer." } ] },
    { them: "Is there anything you need help with?", options: [
      { t: "Yes, could you help me improve my CV? I'm not sure it's good enough.", ok: true, kw: ["help", "cv", "could"] },
      { t: "No.", ok: false, fb: "This is a good chance to ask for support, for example with your CV or interviews." },
      { t: "Give me a job.", ok: false, fb: "Too direct. Ask politely for specific help." } ] },
    { them: "Of course. Can you come back next Tuesday at 10?", options: [
      { t: "I'm afraid I have college then. Could we make it Wednesday?", ok: true, kw: ["afraid", "could", "wednesday", "college"] },
      { t: "Yes, Tuesday at 10 is fine.", ok: true, kw: ["yes", "fine", "ok", "okay"] },
      { t: "Maybe I come, maybe not.", ok: false, fb: "Appointments are important. Give a clear answer or ask to change it." } ] }
  ] },
{ id: "train", title: "Buying a Train Ticket", icon: "next", color: "lavender", level: "E1", voice: "m",
  intro: "Buy a ticket at the station. Say where you are going and what type of ticket you need.",
  phrases: [["A return to Leeds, please.", "return = there and back"], ["A single to Manchester Piccadilly, please.", "single = one way"], ["What time is the next train?", "ask the time"], ["Which platform does it leave from?", "ask the platform"], ["Can I use my railcard?", "railcards give discounts"]],
  steps: [
    { them: "Hello, where are you travelling to?", options: [
      { t: "A return to Leeds, please.", ok: true, kw: ["return", "single", "to", "please"] },
      { t: "Train.", ok: false, fb: "Say where you are going and the ticket type." },
      { t: "I am travel Leeds.", ok: false, fb: "Better: 'A return to Leeds, please.'" } ] },
    { them: "Coming back today?", options: [
      { t: "Yes, I'm coming back this evening.", ok: true, kw: ["yes", "today", "evening", "coming"] },
      { t: "Yes, in the past.", ok: false, fb: "Use the present continuous for plans: 'I'm coming back this evening.'" },
      { t: "Why?", ok: false, fb: "Day returns are cheaper, so they ask. Just answer." } ] },
    { them: "That's £21.40. Do you have a railcard?", options: [
      { t: "No, I don't. Can I pay by card?", ok: true, kw: ["no", "card", "pay"] },
      { t: "What is railcard?", ok: false, fb: "Better: 'What's a railcard?' (with 'a'). It's a card that gives discounts." },
      { t: "Too expensive. Give me cheaper.", ok: false, fb: "Ask politely: 'Is there a cheaper ticket?'" } ] },
    { them: "Yes, of course. Just tap here.", options: [
      { t: "Thanks. Which platform does the next train leave from?", ok: true, kw: ["platform", "which", "thanks"] },
      { t: "Bye.", ok: false, fb: "OK, but it's good to say thank you and ask about the platform." },
      { t: "Where tap?", ok: false, fb: "Better: 'Where do I tap?'" } ] }
  ] },
{ id: "supermarket", title: "At the Supermarket", icon: "cards", color: "yellow", level: "E1", voice: "f",
  intro: "Ask where things are, pay at the till and ask for help.",
  phrases: [["Excuse me, where can I find the rice?", "ask for an item"], ["Do you have any bags?", "bags cost money in the UK"], ["Can I pay by card?", "payment"], ["Could I have a receipt, please?", "for returns"], ["The self-checkout isn't working.", "ask for help"]],
  steps: [
    { them: "Hi there, can I help you?", options: [
      { t: "Yes, please. Where can I find the rice?", ok: true, kw: ["where", "find", "please"] },
      { t: "Rice!", ok: false, fb: "Add some polite words: 'Excuse me, where can I find the rice?'" },
      { t: "No, I help you.", ok: false, fb: "That doesn't make sense here." } ] },
    { them: "It's in aisle six, next to the pasta.", options: [
      { t: "Great, thank you very much.", ok: true, kw: ["thank", "thanks", "great"] },
      { t: "What is aisle?", ok: false, fb: "Better: 'What's an aisle?' An aisle is a passage between shelves." },
      { t: "OK.", ok: false, fb: "Fine, but 'thank you' is more polite." } ] },
    { them: "(At the till) Would you like a bag?", options: [
      { t: "Yes, please. Just one.", ok: true, kw: ["yes", "please", "one", "no", "thanks"] },
      { t: "No, thanks. I've got my own.", ok: true, kw: ["no", "thanks", "own"] },
      { t: "Bag free?", ok: false, fb: "Better: 'Are the bags free?' (In most UK shops they cost a little.)" } ] },
    { them: "That's £14.75. Cash or card?", options: [
      { t: "Card, please. Could I have a receipt?", ok: true, kw: ["card", "cash", "receipt"] },
      { t: "Money.", ok: false, fb: "Say 'Cash, please' or 'Card, please'." },
      { t: "You pay.", ok: false, fb: "That's not right — the customer pays!" } ] }
  ] },
{ id: "cafe", title: "Ordering at a Café or Restaurant", icon: "star", color: "peach", level: "E1", voice: "m",
  intro: "Order food and drink politely, ask questions and pay the bill.",
  phrases: [["Could I have a latte, please?", "order politely"], ["Is this vegetarian?", "ask about food"], ["Does it contain nuts? I'm allergic.", "allergies"], ["Can we have the bill, please?", "pay at the end"], ["Eat in or take away?", "you may hear this"]],
  steps: [
    { them: "Hi! Are you ready to order?", options: [
      { t: "Yes, could I have the chicken salad, please?", ok: true, kw: ["could", "have", "please", "like"] },
      { t: "I want chicken.", ok: false, fb: "A bit direct. 'Could I have…, please?' or 'I'd like…' is more polite." },
      { t: "Ready.", ok: false, fb: "Tell them what you'd like." } ] },
    { them: "Anything to drink?", options: [
      { t: "Just a glass of tap water, please.", ok: true, kw: ["water", "please", "tea", "coffee", "juice"] },
      { t: "Drink.", ok: false, fb: "Say what drink you want." },
      { t: "Yes.", ok: false, fb: "Say which drink: 'A cup of tea, please.'" } ] },
    { them: "Is everything OK with your meal?", options: [
      { t: "It's lovely, thanks.", ok: true, kw: ["lovely", "great", "good", "delicious", "thanks"] },
      { t: "Actually, my soup is a bit cold. Could you warm it up, please?", ok: true, kw: ["actually", "cold", "could", "please"] },
      { t: "Bad.", ok: false, fb: "If there's a problem, explain politely: 'Actually, my soup is a bit cold.'" } ] },
    { them: "Can I get you anything else?", options: [
      { t: "No, thank you. Can we have the bill, please?", ok: true, kw: ["bill", "thank", "no"] },
      { t: "Give me the money paper.", ok: false, fb: "The word is 'bill': 'Can we have the bill, please?'" },
      { t: "Finish.", ok: false, fb: "Say 'No, thank you' and ask for the bill." } ] }
  ] },
{ id: "enrolment", title: "College Enrolment", icon: "cap", color: "mint", level: "E2", voice: "f",
  intro: "Enrol on a course. Explain what you want to study and ask about times, costs and documents.",
  phrases: [["I'd like to enrol on an ESOL course.", "enrol on a course"], ["What documents do I need to bring?", "documents"], ["Are the classes free?", "costs"], ["Do you have evening classes?", "times"], ["When does the term start?", "dates"]],
  steps: [
    { them: "Hello! Which course would you like to enrol on?", options: [
      { t: "I'd like to enrol on an ESOL course, please.", ok: true, kw: ["enrol", "course", "esol", "english"] },
      { t: "I enrol English.", ok: false, fb: "Better: 'I'd like to enrol on an English course.'" },
      { t: "Any.", ok: false, fb: "Say which course you want." } ] },
    { them: "Great. Have you studied English before?", options: [
      { t: "Yes, I studied Entry 2 at a community centre last year.", ok: true, kw: ["studied", "yes", "year", "entry"] },
      { t: "Yes, I study before.", ok: false, fb: "Past simple: 'Yes, I studied English before.'" },
      { t: "Maybe.", ok: false, fb: "Give a clear answer and some details." } ] },
    { them: "You'll need to do a short assessment. Can you come on Monday at 2?", options: [
      { t: "Yes, that's fine. What do I need to bring?", ok: true, kw: ["fine", "bring", "yes", "need"] },
      { t: "No assessment. I know my level.", ok: false, fb: "Everyone does the assessment. It finds the right class for you." },
      { t: "Monday is bad.", ok: false, fb: "Explain politely and suggest another time: 'I'm afraid I work on Mondays. Could I come on Tuesday?'" } ] },
    { them: "Please bring photo ID and proof of your address.", options: [
      { t: "OK. Is a bank statement OK for proof of address?", ok: true, kw: ["bank", "bill", "ok", "statement", "address"] },
      { t: "What is ID?", ok: false, fb: "Better: 'What kind of ID?' ID = identification, for example a passport." },
      { t: "I don't have nothing.", ok: false, fb: "Grammar: 'I don't have anything.' Then ask what else you can bring." } ] }
  ] },
{ id: "renting", title: "Renting a Flat", icon: "home", color: "sky", level: "E3", voice: "m",
  intro: "Phone a letting agent about a flat. Ask about rent, bills and a viewing.",
  phrases: [["I'm calling about the flat on Park Road.", "start the call"], ["How much is the rent?", "monthly cost"], ["Are bills included?", "gas, electricity, water"], ["How much is the deposit?", "money you pay first"], ["Could I arrange a viewing?", "visit the flat"]],
  steps: [
    { them: "Good afternoon, Northway Lettings.", options: [
      { t: "Hello, I'm calling about the two-bedroom flat on Park Road. Is it still available?", ok: true, kw: ["calling", "flat", "available"] },
      { t: "Flat?", ok: false, fb: "Say which flat you are calling about." },
      { t: "I want house now.", ok: false, fb: "Be polite and clear about which property." } ] },
    { them: "Yes, it is. It's £750 a month.", options: [
      { t: "Are bills included, or do I pay them separately?", ok: true, kw: ["bills", "included"] },
      { t: "Too much!", ok: false, fb: "You can ask politely: 'Is the price negotiable?'" },
      { t: "OK bye.", ok: false, fb: "Ask more questions before you decide." } ] },
    { them: "Bills aren't included. There's also a deposit of five weeks' rent.", options: [
      { t: "I see. Could I arrange a viewing this week?", ok: true, kw: ["viewing", "arrange", "see", "could"] },
      { t: "What is deposit?", ok: false, fb: "Better: 'What's the deposit for?' (It protects the landlord, and you get it back if there's no damage.)" },
      { t: "I come now.", ok: false, fb: "Ask for a viewing time: 'Could I arrange a viewing?'" } ] },
    { them: "How about Thursday at 6 pm?", options: [
      { t: "Thursday at 6 is perfect. Could you send me the address by text?", ok: true, kw: ["perfect", "fine", "thursday", "address"] },
      { t: "Yes yes yes.", ok: false, fb: "One 'yes' is enough! Confirm the time and ask for the address." },
      { t: "I'm busy always.", ok: false, fb: "Suggest a time that works for you." } ] }
  ] },
{ id: "airport", title: "At the Airport", icon: "zap", color: "lavender", level: "E2", voice: "f",
  intro: "Check in for a flight and go through security.",
  phrases: [["I'd like to check in for the flight to Istanbul.", "check in"], ["Can I take this as hand luggage?", "small bag in the plane"], ["Could I have a window seat, please?", "choose a seat"], ["Which gate is it?", "gate = where you board"], ["Do I need to take my laptop out?", "security"]],
  steps: [
    { them: "Good morning. Can I see your passport, please?", options: [
      { t: "Yes, here you are.", ok: true, kw: ["here", "yes"] },
      { t: "Why?", ok: false, fb: "They always check your passport. Just say 'Here you are.'" },
      { t: "No passport.", ok: false, fb: "You need your passport to fly abroad." } ] },
    { them: "Thank you. Are you checking in any bags?", options: [
      { t: "Yes, just this suitcase. This small bag is hand luggage.", ok: true, kw: ["suitcase", "bag", "yes", "hand luggage", "just"] },
      { t: "Bags yes many.", ok: false, fb: "Say how many: 'Yes, one suitcase.'" },
      { t: "What?", ok: false, fb: "Ask politely: 'Sorry, could you repeat that?'" } ] },
    { them: "Would you like a window or an aisle seat?", options: [
      { t: "A window seat, please.", ok: true, kw: ["window", "aisle", "please"] },
      { t: "Comfortable one.", ok: false, fb: "Choose: 'A window seat, please' or 'An aisle seat, please.'" },
      { t: "The pilot's seat.", ok: false, fb: "Nice joke! But choose window or aisle." } ] },
    { them: "Here's your boarding pass. Boarding starts at 10.15 from gate 22.", options: [
      { t: "Thank you. Sorry, did you say gate 22?", ok: true, kw: ["thank", "gate", "sorry"] },
      { t: "Gate is far?", ok: false, fb: "Better: 'Is the gate far from here?'" },
      { t: "OK.", ok: false, fb: "Fine, but checking the gate number is a good idea." } ] }
  ] },
{ id: "meeting", title: "Meeting New People", icon: "sparkles", color: "yellow", level: "E1", voice: "m",
  intro: "Make small talk with a new neighbour or classmate. Ask questions and be friendly.",
  phrases: [["Nice to meet you.", "first meeting"], ["Where are you from?", "a common question"], ["How long have you lived here?", "present perfect question"], ["What do you do?", "= What's your job?"], ["Lovely weather today, isn't it?", "British small talk"]],
  steps: [
    { them: "Hi! I'm Tom. I've just moved in next door.", options: [
      { t: "Hi Tom, nice to meet you! I'm {name}.", ok: true, kw: ["nice", "meet", "i'm", "name"] },
      { t: "OK.", ok: false, fb: "Be friendly: 'Nice to meet you! I'm…'" },
      { t: "What do you want?", ok: false, fb: "This sounds unfriendly." } ] },
    { them: "Have you lived here long?", options: [
      { t: "About two years. It's a nice area.", ok: true, kw: ["years", "about", "nice"] },
      { t: "I live here since two years.", ok: false, fb: "Grammar: 'I've lived here for two years.'" },
      { t: "Long.", ok: false, fb: "Say how long and add something friendly." } ] },
    { them: "So, what do you do?", options: [
      { t: "I'm studying English at college, and I work part-time in a shop.", ok: true, kw: ["studying", "work", "i'm"] },
      { t: "I do many things.", ok: false, fb: "'What do you do?' means 'What's your job?' Tell him about your work or studies." },
      { t: "Today I eat breakfast.", ok: false, fb: "'What do you do?' asks about your job, not today." } ] },
    { them: "Lovely weather today, isn't it?", options: [
      { t: "Yes, it's lovely! Much better than yesterday.", ok: true, kw: ["yes", "lovely", "better"] },
      { t: "No, it is not true.", ok: false, fb: "Weather talk is small talk. Agree in a friendly way." },
      { t: "Weather is weather.", ok: false, fb: "Try to keep the conversation friendly and light." } ] }
  ] },
{ id: "phone", title: "A Phone Call: Reporting a Problem", icon: "volume", color: "pink", level: "E3", voice: "f",
  intro: "Call your landlord or council to report a repair. Explain the problem clearly and agree a time.",
  phrases: [["I'm calling to report a problem with my boiler.", "start the call"], ["There's no hot water.", "describe the problem"], ["It started on Monday.", "when it started"], ["Could someone come and look at it?", "ask for a repair"], ["Sorry, could you say that again?", "if you didn't understand"]],
  steps: [
    { them: "Hello, Oakfield Housing repairs line. How can I help?", options: [
      { t: "Hello, I'm calling to report a problem with my boiler.", ok: true, kw: ["calling", "report", "problem"] },
      { t: "Broken.", ok: false, fb: "Explain what is broken: 'I'm calling to report a problem with my boiler.'" },
      { t: "You fix now!", ok: false, fb: "Being polite usually gets better help." } ] },
    { them: "I'm sorry to hear that. What's happening exactly?", options: [
      { t: "There's no hot water, and the heating isn't working. It started yesterday.", ok: true, kw: ["no hot water", "heating", "started", "working"] },
      { t: "Boiler bad very.", ok: false, fb: "Describe the problem: 'There's no hot water.'" },
      { t: "I don't know.", ok: false, fb: "Try to describe what you can see or feel." } ] },
    { them: "Can I take your address and a contact number?", options: [
      { t: "Yes, it's Flat 3, 22 Mill Street, and my mobile number is 07700 900 123.", ok: true, kw: ["flat", "street", "number", "mobile"] },
      { t: "You know my address.", ok: false, fb: "They need to check. Give your address clearly." },
      { t: "No.", ok: false, fb: "They need your address to send an engineer." } ] },
    { them: "An engineer can come on Friday between 8 and 1.", options: [
      { t: "Sorry, could you say that again, please?", ok: true, kw: ["sorry", "again", "repeat"] },
      { t: "Friday between 8 and 1 is fine. Thank you for your help.", ok: true, kw: ["friday", "fine", "thank"] },
      { t: "Friday too late, I die!", ok: false, fb: "Explain calmly: 'Is there anything sooner? I have young children.'" } ] }
  ] }
];
