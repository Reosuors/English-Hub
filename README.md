# English Hub — مركز تعلّم الإنجليزية

تطبيق ويب تفاعلي لتعلّم اللغة الإنجليزية (البريطانية) خطوة بخطوة للناطقين بالعربية — من مستوى ما قبل التأسيس (Pre-Entry) حتى المستوى الثاني (Level 2)، يعمل بدون الحاجة إلى خطوات بناء (Pure HTML / CSS / ES Modules + PWA).

An interactive British English learning web app designed for Arabic speakers (Pre-Entry to Level 2). Built with vanilla HTML, CSS, and ES Modules with full PWA offline support — no build step required.

🌐 **النسخة المنشورة / Live Site:** https://english-hub.sites.tab.bot/

---

## 📁 هيكل الملفات | File Layout

```
.
├── index.html              # الصفحة الرئيسية ونقطة دخول التطبيق / Main entry point
├── manifest.json           # إعدادات تطبيق الويب (PWA) / Web App Manifest
├── sw.js                   # Service Worker للعمل بدون إنترنت / Offline caching
├── icon.svg                # أيقونة التطبيق المتجهة / Vector app icon
├── css/
│   └── styles.css          # جميع التنسيقات والثيمات / All styles & themes
├── fonts/
│   └── jakarta-latin.woff2 # خط Plus Jakarta Sans المحلي / Bundled webfont
├── icons/                  # أيقونات iOS و Android و PWA / App icons (PNG)
└── js/
    ├── app.js              # الموجّه الرئيسي للتطبيق / Main router & app controller
    ├── boot.js             # تحميل الثيم والتخطيط قبل الرسم / Early theme/layout boot
    ├── store.js            # حفظ التقدّم محلياً (localStorage) / Local progress state
    ├── theme.js            # تبديل الثيمات وحجم الخط / Theme & font-size controls
    ├── ui.js               # مكوّنات الواجهة المساعدة / Shared UI components
    ├── badges.js           # الشارات والإنجازات / Badges & achievements
    ├── groups.js           # تصنيف الأقسام والمجموعات / Section grouping
    ├── helper.js           # المساعد اللغوي / Study helper
    ├── icons.js            # أيقونات SVG المضمّنة / Inline SVG icons
    ├── layoutpicker.js     # اختيار تخطيط الصفحة الرئيسية / Home layout picker
    ├── lt.js               # فحص اللغة / Language checker integration
    ├── pages/              # صفحات التطبيق (home, learn, basics, grammar, vocab, spelling, reading, writing, listening, speaking, idioms, mistakes, reallife, placement, progress, profile, settings, welcome)
    └── data/               # محتوى الدروس والتمارين (basics, grammar, vocab, spelling, reading, writing, listening, speaking, idioms, mistakes, reallife, placement)
```

---

## 🛠️ التعديل والتشغيل محلياً | Local Editing & Preview

لا يحتاج المشروع إلى `npm install` أو أي أداة بناء. لتعديل أي درس أو تصميم:
1. عدّل الملفات مباشرة (مثلاً الدروس داخل `js/data/`، الصفحات داخل `js/pages/`، أو الألوان والتنسيق داخل `css/styles.css`).
2. شغّل خادماً محلياً في مجلد المشروع (مطلوب لأن التطبيق يستخدم ES Modules و Service Worker):

No build tools or dependencies required. Edit any file directly and run a local static server from the repository root:

```bash
# باستخدام Python / Using Python 3
python3 -m http.server 8080

# أو باستخدام Node.js / Or using Node.js
npx serve .
```

ثم افتح `http://localhost:8080` في المتصفح.  
*(ملاحظة: عند تعديل الملفات، يمكنك تحديث اسم الكاش داخل `sw.js` لضمان تحميل التحديثات الجديدة لدى المستخدمين فوراً).*

---

## 🚀 النشر | Deployment

### GitHub Pages
1. افتح **Settings → Pages** في هذا المستودع.
2. تحت **Build and deployment**، اختر **Deploy from a branch**.
3. اختر الفرع **`main`** والمجلد **`/ (root)`** ثم اضغط **Save**.
4. خلال دقيقة سيصبح الموقع متاحاً على `https://reosuors.github.io/English-Hub/`.

### Vercel
1. افتح [vercel.com/new](https://vercel.com/new) واستورد مستودع `Reosuors/English-Hub`.
2. اترك إعدادات البناء فارغة (**Framework Preset: Other**، **Build Command:** فارغ، **Output Directory:** `.`).
3. اضغط **Deploy** — وسيتم نشر أي تعديل جديد على `main` تلقائياً.
