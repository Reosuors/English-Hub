// Pre-Entry content for learners who are new to English. British spelling.
const L = (s) => s.split("|").map((x) => { const [t, e, say] = x.split("~"); return { t, e: e || "", say: say || t }; });
export const ALPHABET = L("A~🍎~A. A is for apple|B~⚽~B. B is for ball|C~🐱~C. C is for cat|D~🐶~D. D is for dog|E~🥚~E. E is for egg|F~🐟~F. F is for fish|G~🎁~G. G is for gift|H~🏠~H. H is for house|I~🐞~I. I is for insect|J~🧃~J. J is for juice|K~🔑~K. K is for key|L~🍋~L. L is for lemon|M~🌙~M. M is for moon|N~👃~N. N is for nose|O~🍊~O. O is for orange|P~✏️~P. P is for pen|Q~👑~Q. Q is for queen|R~🌈~R. R is for rainbow|S~☀️~S. S is for sun|T~🍅~T. T is for tomato|U~☂️~U. U is for umbrella|V~🚐~V. V is for van|W~⌚~W. W is for watch|X~🦊~X. X is in fox|Y~🪀~Y. Y is for yo-yo|Z~🦓~Z. Z is for zebra").map((x) => ({ ...x, word: x.say.split(" ").pop() }));
const ONES = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
export function numWord(n) { if (n === 100) return "one hundred"; if (n < 20) return ONES[n]; return TENS[Math.floor(n / 10)] + (n % 10 ? "-" + ONES[n % 10] : ""); }
export const COLOURS = [["red", "#e53935"], ["blue", "#1e88e5"], ["green", "#43a047"], ["yellow", "#fdd835"], ["orange", "#fb8c00"], ["purple", "#8e24aa"], ["pink", "#f06292"], ["brown", "#795548"], ["black", "#111111"], ["white", "#ffffff"], ["grey", "#9e9e9e"]].map(([t, c]) => ({ t, c, say: t }));
export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const GREETINGS = L("Hello~👋|Hi~🙂|Good morning~🌅|Good afternoon~🌤️|Good evening~🌆|Goodbye~👋|See you later~🚶|How are you?~❓|I'm fine, thank you.~😊|Nice to meet you.~🤝|Please~🙏|Thank you~💐|Sorry~😔|Excuse me~✋|Yes~✅|No~❌");
export const PERSONAL = [
  { q: "What is your name?", a: "My name is Sara.", w: "name", e: "🪪" },
  { q: "What is your surname?", a: "My surname is Khan.", w: "surname", e: "🪪" },
  { q: "Can you spell that, please?", a: "K - H - A - N.", w: "spell", e: "🔤" },
  { q: "Where are you from?", a: "I am from Syria.", w: "country", e: "🌍" },
  { q: "What is your address?", a: "12 Park Road, Oldham.", w: "address", e: "🏠" },
  { q: "What is your postcode?", a: "O L 1, 2 A B.", w: "postcode", e: "📮" },
  { q: "What is your phone number?", a: "0 7 7 0 0, 9 0 0, 1 2 3.", w: "phone number", e: "📱" },
  { q: "What is your date of birth?", a: "The fifth of May, 1990.", w: "date of birth", e: "🎂" },
  { q: "How old are you?", a: "I am thirty-five.", w: "age", e: "🔢" },
  { q: "Are you married?", a: "Yes, I am married.", w: "married", e: "💍" }
];
export const CLASSROOM = L("pen~🖊️|pencil~✏️|book~📕|bag~🎒|table~🪑|chair~💺|paper~📄|ruler~📏|rubber~🧽|scissors~✂️|computer~💻|teacher~🧑‍🏫|student~🧑‍🎓|door~🚪|window~🪟|clock~🕒");
export const INSTRUCTIONS = L("Listen.~👂|Look.~👀|Read.~📖|Write.~✍️|Sit down, please.~🪑|Stand up, please.~🧍|Open your book.~📖|Close your book.~📕|Work with a partner.~👥|Repeat, please.~🔁");
export const CVC = [
  { v: "a", words: L("cat~🐱|hat~🎩|bag~👜|map~🗺️|van~🚐") },
  { v: "e", words: L("pen~🖊️|bed~🛏️|ten~🔟|red~🟥|leg~🦵") },
  { v: "i", words: L("pig~🐷|six~6️⃣|lip~👄|bin~🗑️|zip~🤐") },
  { v: "o", words: L("dog~🐶|box~📦|pot~🍲|mop~🧹|fox~🦊") },
  { v: "u", words: L("sun~☀️|bus~🚌|cup~☕|hug~🤗|nut~🥜") }
];
export const TOPICS = [
  { id: "alphabet", title: "The alphabet", sub: "A to Z", e: "🔤", color: "peach" },
  { id: "numbers", title: "Numbers", sub: "1 to 100", e: "🔢", color: "mint" },
  { id: "colours", title: "Colours", sub: "red, blue, green…", e: "🎨", color: "pink" },
  { id: "days", title: "Days and months", sub: "Monday, January…", e: "📅", color: "sky" },
  { id: "greetings", title: "Greetings", sub: "Hello, goodbye…", e: "👋", color: "yellow" },
  { id: "personal", title: "About me", sub: "name, address, phone", e: "🪪", color: "lavender" },
  { id: "classroom", title: "In the classroom", sub: "pen, book, sit down", e: "🏫", color: "mint" },
  { id: "phonics", title: "Sounds and words", sub: "cat, pen, pig, dog, sun", e: "🐱", color: "peach" }
];
