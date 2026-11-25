// Listening scripts (read aloud with British English voices). Speakers: "f" = woman, "m" = man.
export const LISTENING = [
{ id: "cafe-order", title: "Ordering in a Café", level: "E1", type: "Conversation",
  lines: [["m","Hello. What can I get you?"],["f","Hi. Can I have a cup of tea, please?"],["m","Of course. Milk and sugar?"],["f","Just milk, please. And a cheese sandwich."],["m","Eat in or take away?"],["f","Eat in, please."],["m","That's five pounds twenty, please."],["f","Here you are. Thank you."]],
  questions: [
    { q: "What drink does the woman order?", a: ["Coffee", "Tea", "Water"], c: 1, e: "\"Can I have a cup of tea, please?\"" },
    { q: "Does she want sugar?", a: ["Yes", "No, just milk", "No milk or sugar"], c: 1, e: "\"Just milk, please.\"" },
    { q: "How much does she pay?", a: ["£2.50", "£5.20", "£5.50"], c: 1, e: "\"That's five pounds twenty.\"" }
  ] },
{ id: "introductions", title: "Meeting a Classmate", level: "E1", type: "Conversation",
  lines: [["f","Hi! I'm Hana. Are you new?"],["m","Yes, it's my first day. My name's Omar."],["f","Nice to meet you, Omar. Where are you from?"],["m","I'm from Sudan. And you?"],["f","I'm from Iran. I live in Oldham now. Do you live near here?"],["m","Yes, I live on Union Street, about ten minutes away."],["f","Great. The class starts at half past nine. Let's go in."]],
  questions: [
    { q: "Where is Omar from?", a: ["Iran", "Sudan", "Syria"], c: 1, e: "\"I'm from Sudan.\"" },
    { q: "How far does Omar live from the college?", a: ["Ten minutes", "Half an hour", "Five minutes"], c: 0, e: "\"…about ten minutes away.\"" },
    { q: "What time does the class start?", a: ["9.00", "9.30", "10.30"], c: 1, e: "\"Half past nine\" = 9.30." }
  ] },
{ id: "train-announcement", title: "Train Station Announcement", level: "E2", type: "Announcement",
  lines: [["m","Good morning. Platform four for the ten fifteen Northern service to Leeds, calling at Rochdale, Todmorden and Hebden Bridge. This train has four coaches. Please note: this service is running approximately ten minutes late. We apologise for any inconvenience. Passengers for Manchester Victoria, please go to platform two."]],
  questions: [
    { q: "Where is the train going?", a: ["Manchester", "Leeds", "Liverpool"], c: 1, e: "\"…the ten fifteen Northern service to Leeds.\"" },
    { q: "Which platform is the Leeds train on?", a: ["Two", "Four", "Ten"], c: 1, e: "\"Platform four for the ten fifteen…\"" },
    { q: "What is the problem?", a: ["The train is cancelled.", "The train is about ten minutes late.", "The train is full."], c: 1, e: "\"This service is running approximately ten minutes late.\"" },
    { q: "Where should passengers for Manchester Victoria go?", a: ["Platform two", "Platform four", "The ticket office"], c: 0, e: "\"Passengers for Manchester Victoria, please go to platform two.\"" }
  ] },
{ id: "gp-phone", title: "Calling the GP Surgery", level: "E2", type: "Phone call",
  lines: [["f","Good morning, Greenfield Medical Centre. How can I help?"],["m","Hello. I'd like to make an appointment with a doctor, please."],["f","Can I have your name and date of birth?"],["m","Yes, it's Ali Rahman, the third of May, nineteen ninety."],["f","Thank you. What's the problem?"],["m","I've had a bad cough for two weeks."],["f","OK. The first appointment is on Thursday at eleven forty. Is that all right?"],["m","Thursday is fine. Thank you."],["f","You're welcome. Please arrive five minutes early."]],
  questions: [
    { q: "Why is Ali calling?", a: ["To cancel an appointment", "To make an appointment", "To ask about a prescription"], c: 1, e: "\"I'd like to make an appointment with a doctor.\"" },
    { q: "What is his problem?", a: ["A headache", "A bad cough", "A broken arm"], c: 1, e: "\"I've had a bad cough for two weeks.\"" },
    { q: "When is the appointment?", a: ["Tuesday at 11.40", "Thursday at 11.40", "Thursday at 10.40"], c: 1, e: "\"…on Thursday at eleven forty.\"" }
  ] },
{ id: "weather-forecast", title: "Weather Forecast", level: "E2", type: "Radio",
  lines: [["f","And now the weather for the North West. This morning will start cloudy, with some light rain in Manchester and Oldham. By lunchtime, the rain will clear and we'll see some sunny spells. It will be quite cold, with temperatures of around eight degrees. Tonight, it will get colder, with a chance of frost in the countryside. Tomorrow will be dry and bright, but windy."]],
  questions: [
    { q: "What will the weather be like this morning?", a: ["Sunny and hot", "Cloudy with light rain", "Snowy"], c: 1, e: "\"This morning will start cloudy, with some light rain.\"" },
    { q: "What will the temperature be?", a: ["About 8 degrees", "About 18 degrees", "Below zero"], c: 0, e: "\"…temperatures of around eight degrees.\"" },
    { q: "What will tomorrow be like?", a: ["Wet and warm", "Dry and bright, but windy", "Foggy"], c: 1, e: "\"Tomorrow will be dry and bright, but windy.\"" }
  ] },
{ id: "college-enrolment", title: "Enrolling at College", level: "E3", type: "Conversation",
  lines: [["f","Hello, welcome to enrolment. Which course are you interested in?"],["m","I'd like to join an ESOL class. I did Entry 2 last year at a community centre."],["f","Great. You'll need to do a short assessment first, so we can find the right level for you. It takes about forty-five minutes."],["m","OK. Do I need to bring anything?"],["f","Yes, please bring photo ID and proof of your address, like a recent bill. Classes are free if you're on certain benefits, so bring a letter about that too."],["m","When do classes start?"],["f","The new term starts on the eighth of January. Most classes are in the morning, but we also have evening classes on Tuesdays and Thursdays."],["m","Evenings would be better for me because I work in the mornings."]],
  questions: [
    { q: "What must the man do before joining a class?", a: ["Pay a fee", "Do a short assessment", "Write an essay"], c: 1, e: "\"You'll need to do a short assessment first.\"" },
    { q: "How long does the assessment take?", a: ["15 minutes", "45 minutes", "An hour and a half"], c: 1, e: "\"It takes about forty-five minutes.\"" },
    { q: "Which document is NOT mentioned?", a: ["Photo ID", "Proof of address", "A school certificate"], c: 2, e: "She mentions photo ID, proof of address and a benefits letter." },
    { q: "Why does the man prefer evening classes?", a: ["He works in the mornings.", "He has children.", "He lives far away."], c: 0, e: "\"…because I work in the mornings.\"" }
  ] },
{ id: "flat-viewing", title: "Phoning a Letting Agent", level: "E3", type: "Phone call",
  lines: [["m","Good afternoon, Northway Lettings, Daniel speaking."],["f","Hello. I'm calling about the two-bedroom flat on Werneth Road. Is it still available?"],["m","Yes, it is. The rent is seven hundred and twenty-five pounds a month, and there's a deposit of eight hundred pounds."],["f","Are bills included?"],["m","Water is included, but gas and electricity aren't. The flat is unfurnished, but it has a new kitchen."],["f","Can I come and see it?"],["m","Of course. Would Saturday morning at ten suit you?"],["f","Saturday's difficult. Could I come on Friday after five?"],["m","Yes, Friday at half past five is fine. I'll meet you outside the building."]],
  questions: [
    { q: "How much is the rent?", a: ["£725 a month", "£800 a month", "£720 a week"], c: 0, e: "\"The rent is seven hundred and twenty-five pounds a month.\"" },
    { q: "Which bill is included?", a: ["Gas", "Electricity", "Water"], c: 2, e: "\"Water is included, but gas and electricity aren't.\"" },
    { q: "When will the woman see the flat?", a: ["Saturday at 10", "Friday at 5.30", "Friday at 5"], c: 1, e: "\"Friday at half past five is fine.\"" }
  ] },
{ id: "job-interview", title: "A Job Interview", level: "E3", type: "Conversation",
  lines: [["f","Thanks for coming in today. Can you tell me a little about yourself?"],["m","Of course. I'm from Afghanistan and I've lived in Oldham for three years. Back home, I worked as a shop manager for five years."],["f","That's interesting. Why do you want to work here?"],["m","I enjoy helping customers, and I want to use my experience. I also want to improve my English by talking to people every day."],["f","Our shifts sometimes start at six in the morning. Would that be a problem?"],["m","No, that's fine. I'm an early riser, and the bus starts at five thirty."],["f","Great. Do you have any questions for us?"],["m","Yes. Is there any training for new staff?"],["f","Yes, everyone does a two-week training programme when they start."]],
  questions: [
    { q: "What was the man's job before?", a: ["Teacher", "Shop manager", "Bus driver"], c: 1, e: "\"I worked as a shop manager for five years.\"" },
    { q: "Why does he want the job? (Choose the best answer.)", a: ["He likes helping customers and wants to use his experience.", "The pay is very high.", "It is near his house."], c: 0, e: "\"I enjoy helping customers, and I want to use my experience.\"" },
    { q: "Is starting at 6 am a problem for him?", a: ["Yes, there are no buses.", "No, the bus starts at 5.30.", "He didn't say."], c: 1, e: "\"No, that's fine… the bus starts at five thirty.\"" },
    { q: "How long is the training?", a: ["Two days", "One week", "Two weeks"], c: 2, e: "\"…a two-week training programme.\"" }
  ] },
{ id: "museum-tour", title: "A Museum Guide", level: "L1", type: "Talk",
  lines: [["f","Welcome to the Museum of Science and Industry. Manchester is often described as the world's first industrial city, and this building tells part of that story. In the eighteen thirties, it was the Manchester terminus of the Liverpool and Manchester Railway, the first railway in the world to carry passengers between two cities using only steam trains on a timetable. Today, it's home to machines that changed the way people lived and worked. Before we start, a few practical points. Photography is allowed, but please don't use flash in the textile gallery, as it can damage the fabrics. The tour lasts about an hour, and there's a café on the ground floor if you'd like a break afterwards."]],
  questions: [
    { q: "How is Manchester described?", a: ["The world's first industrial city", "The biggest city in England", "The oldest city in the UK"], c: 0, e: "\"Manchester is often described as the world's first industrial city.\"" },
    { q: "What was the building in the 1830s?", a: ["A factory", "A railway station", "A hospital"], c: 1, e: "It was the Manchester terminus (end station) of the Liverpool and Manchester Railway." },
    { q: "Where can't visitors use flash?", a: ["In the café", "In the textile gallery", "Anywhere in the museum"], c: 1, e: "\"…please don't use flash in the textile gallery.\"" },
    { q: "How long is the tour?", a: ["About 30 minutes", "About an hour", "Two hours"], c: 1, e: "\"The tour lasts about an hour.\"" }
  ] },
{ id: "complaint-call", title: "Making a Complaint", level: "L1", type: "Phone call",
  lines: [["f","Good morning, customer services. My name's Claire. How can I help?"],["m","Hello. I ordered a washing machine three weeks ago and it still hasn't arrived. I was told delivery would take five working days."],["f","I'm sorry to hear that. Could you give me your order number, please?"],["m","Yes, it's W-four-seven-two-nine."],["f","Thank you. I can see there was a problem at our warehouse. I'm afraid the machine was damaged, so we're sending a new one."],["m","Nobody told me that. I've taken two days off work to wait for it."],["f","I completely understand, and I apologise. I can arrange delivery for tomorrow between eight and twelve, and I'll refund your delivery charge."],["m","Tomorrow morning is fine. Thank you for sorting it out."]],
  questions: [
    { q: "What is the man's problem?", a: ["His washing machine is broken.", "His order hasn't arrived.", "He was charged twice."], c: 1, e: "\"…it still hasn't arrived.\"" },
    { q: "Why was there a delay?", a: ["The machine was damaged at the warehouse.", "The address was wrong.", "The driver was ill."], c: 0, e: "\"…the machine was damaged, so we're sending a new one.\"" },
    { q: "Why is the man especially annoyed?", a: ["He paid extra.", "He took two days off work to wait.", "The new machine is more expensive."], c: 1, e: "\"I've taken two days off work to wait for it.\"" },
    { q: "What does Claire offer?", a: ["A discount on a new order", "Delivery tomorrow and a refund of the delivery charge", "A free washing machine"], c: 1, e: "Delivery tomorrow morning and a refund of the delivery charge." }
  ] },
{ id: "podcast-habits", title: "Podcast: Building Good Habits", level: "L2", type: "Podcast",
  lines: [["m","Welcome back to Better Every Day. Today, we're talking about habits. A common mistake people make is relying on motivation alone. Motivation is unreliable; it rises and falls with our mood. What tends to work far better is designing your environment so that good choices become the easy ones. If you want to read more, leave a book on your pillow. If you want to practise English, put the app on your home screen and move the games somewhere harder to reach. Another useful strategy is what researchers call habit stacking: attaching a new habit to one you already have. For example, after I pour my morning coffee, I'll learn five new words. Finally, be patient. Research from University College London found that, on average, it took participants around two months for a new behaviour to become automatic, although the range varied enormously from person to person."]],
  questions: [
    { q: "Why does the speaker say motivation alone is a mistake?", a: ["It's unreliable and changes with mood.", "It's too expensive.", "It only works for children."], c: 0, e: "\"Motivation is unreliable; it rises and falls with our mood.\"" },
    { q: "What does 'designing your environment' mean here?", a: ["Decorating your house", "Making good choices easy and bad ones harder", "Moving to a new city"], c: 1, e: "e.g. leaving a book on your pillow and moving games somewhere harder to reach." },
    { q: "What is 'habit stacking'?", a: ["Doing many habits at once", "Attaching a new habit to an existing one", "Writing habits in a list"], c: 1, e: "\"…attaching a new habit to one you already have.\"" },
    { q: "According to the research mentioned, how long did a habit take to become automatic, on average?", a: ["About two weeks", "About two months", "About a year"], c: 1, e: "\"…on average… around two months\", with big differences between people." }
  ] },
{ id: "news-report", title: "Local News: New Cycle Lanes (Northbridge)", level: "L2", type: "News",
  lines: [["f","Northbridge is to receive funding for forty kilometres of new protected cycle lanes over the next three years, the city council announced yesterday. Officials say the scheme will reduce congestion and improve air quality, while making cycling safer for commuters. However, not everyone is convinced. Some local businesses have raised concerns that removing parking spaces could reduce the number of customers visiting high streets. A spokesperson for the scheme said that a consultation would take place before any work begins, and that evidence from other cities suggests cyclists and pedestrians often spend more in local shops over time than drivers do. Work on the first route, between the university and the city centre, is expected to start next spring."]],
  questions: [
    { q: "What is the news about?", a: ["New train lines", "New protected cycle lanes", "Cheaper bus fares"], c: 1, e: "\"…forty kilometres of new protected cycle lanes.\"" },
    { q: "What are some businesses worried about?", a: ["Losing parking spaces and customers", "Higher taxes", "Noise from building work"], c: 0, e: "\"…removing parking spaces could reduce the number of customers.\"" },
    { q: "What will happen before work begins?", a: ["A vote", "A consultation", "Nothing"], c: 1, e: "\"…a consultation would take place before any work begins.\"" },
    { q: "Where will the first route be?", a: ["Between the university and the city centre", "Around the airport", "Along the river"], c: 0, e: "\"…the first route, between the university and the city centre.\"" }
  ] }
];
