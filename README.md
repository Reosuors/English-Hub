# English Hub — مركز تعلّم الإنجليزية

تطبيق تفاعلي لتعلّم اللغة الإنجليزية (البريطانية) خطوة بخطوة للناطقين بالعربية — من مستوى ما قبل التأسيس (Pre-Entry) حتى المستوى الثاني (Level 2)، متاح على **الويب، أندرويد، آيفون (PWA)، ويندوز، وماك** مع ملفات مصدرية نظيفة سهلة التعديل.

An interactive British English learning app for Arabic speakers (Pre-Entry to Level 2), available on **Web, Android, iPhone (PWA), Windows, and macOS** — built on pure HTML, CSS, and ES Modules with automated multi-platform GitHub Actions builds.

🌐 **تطبيق الويب / Live Web App:** https://english-hub.sites.tab.bot/  
⬇️ **صفحة التحميل / Download Page:** https://english-hub-download.sites.tab.bot/

---

## ⬇️ روابط التحميل الدائمة | Permanent Download Links (Latest Release)

الروابط التالية تشير دائماً إلى آخر إصدار مبني تلقائياً:

| المنصة / Platform | الملف / Asset | الرابط الدائم / Direct Link |
|---|---|---|
| 🤖 **Android (APK)** | `EnglishHub.apk` | https://github.com/Reosuors/English-Hub/releases/latest/download/EnglishHub.apk |
| 🪟 **Windows (x64 Installer)** | `EnglishHub-Setup.exe` | https://github.com/Reosuors/English-Hub/releases/latest/download/EnglishHub-Setup.exe |
| 🍏 **macOS (Universal DMG)** | `EnglishHub.dmg` | https://github.com/Reosuors/English-Hub/releases/latest/download/EnglishHub.dmg |
| 📦 **Web Source (52 files ZIP)** | `EnglishHub-Web.zip` | https://github.com/Reosuors/English-Hub/releases/latest/download/EnglishHub-Web.zip |
| 🍎 **iPhone & iPad (PWA)** | Safari → Add to Home Screen | https://english-hub.sites.tab.bot/ |

---

## 📁 هيكل الملفات | File Layout

جميع ملفات الموقع الـ 52 موجودة مباشرة في الجذر لتسهيل التعديل المباشر بدون أي خطوة بناء معقدة:

```
.
├── index.html                   # الصفحة الرئيسية ونقطة دخول التطبيق / Main app entry
├── download.html                # صفحة التحميل لجميع الأجهزة / Multi-platform download page
├── manifest.json                # إعدادات تطبيق الويب (PWA) / Web App Manifest
├── sw.js                        # Service Worker للعمل بدون إنترنت / Offline cache
├── icon.svg                     # أيقونة التطبيق المتجهة / Vector icon
├── css/styles.css               # جميع التنسيقات والثيمات / Styles & themes
├── fonts/jakarta-latin.woff2    # خط Plus Jakarta Sans المحلي / Bundled webfont
├── icons/                       # أيقونات iOS و Android و Desktop / PNG icons
├── js/                          # منطق التطبيق وصفحاته ودروسه (pages/, data/)
├── package.json                 # سكربت تجهيز ملفات الويب (npm run build)
├── capacitor.config.json        # إعدادات تطبيق أندرويد (Capacitor)
├── electron/                    # إعدادات تطبيق سطح المكتب (Windows & macOS)
│   ├── main.js
│   ├── package.json
│   └── electron-builder.json
├── scripts/
│   ├── stage-web.mjs            # نسخ ملفات الويب الـ 52 فقط إلى www/
│   ├── configure-android.py     # إعداد التوقيع ورقم الإصدار لأندرويد في CI
│   └── publish-release.sh       # نشر الملفات تلقائياً على GitHub Releases
└── .github/workflows/
    ├── build-app.yml            # بناء Android APK + EnglishHub-Web.zip
    └── build-desktop.yml        # بناء Windows .exe + macOS .dmg
```

---

## 🛠️ التعديل والتشغيل محلياً | Local Editing & Preview

لا يحتاج تعديل الموقع لأي تثبيت معقّد:
1. عدّل الملفات مباشرة (`js/data/` للدروس، `js/pages/` للصفحات، `css/styles.css` للتصميم).
2. شغّل خادماً محلياً من مجلد المشروع:

```bash
python3 -m http.server 8080
# أو / or
npx serve .
```

3. عند الدفع إلى الفرع `main`، تقوم **GitHub Actions** تلقائياً ببناء ونشر إصدار جديد (`v1.0.<run_number>`) يشمل أندرويد وويندوز وماك وملف الويب المضغوط.

---

## 🔐 النشر على Google Play (إضافة مفتاح التوقيع لاحقاً) | Release Signing for Google Play

لأسباب أمنية، لا يتم وضع أي مفتاح توقيع خاص (`*.jks` / `*.keystore`) داخل هذا المستودع العام. حالياً يقوم البناء التلقائي بتوقيع ملف `EnglishHub.apk` بمفتاح مؤقت (ephemeral keystore) مناسب للتثبيت المباشر على أندرويد.

إذا رغبت لاحقاً بنشر **English Hub** على **Google Play** أو الحفاظ على توقيع ثابت للتحديثات فوق النسخ السابقة:
1. أنشئ مفتاح توقيع محلياً على جهازك:
   ```bash
   keytool -genkeypair -v -keystore englishhub-release.jks -alias englishhub -keyalg RSA -keysize 2048 -validity 10000
   ```
2. حوّله إلى Base64:
   ```bash
   base64 -w 0 englishhub-release.jks
   ```
3. أضف المتغيرات التالية في **Settings → Secrets and variables → Actions → New repository secret**:
   - `KEYSTORE_BASE64`: محتوى الملف بترميز Base64
   - `KEYSTORE_PASSWORD`: كلمة مرور الـ Keystore
   - `KEY_ALIAS`: اسم المفتاح (مثلاً `englishhub`)
   - `KEY_PASSWORD`: كلمة مرور المفتاح
4. في البناء التالي سيستخدم الـ Workflow مفتاحك الخاص تلقائياً بدون أي تعديل إضافي.
