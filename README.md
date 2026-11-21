# تطبيق ثانوية العدالة للبنين

تطوير وبرمجة: الأستاذ لؤي حميد الياسري

## الملفات

- `index.html`: التطبيق كاملاً.
- `manifest.webmanifest` و `sw.js` والأيقونات: حتى ينثبّت كتطبيق على الموبايل ويتحول إلى APK.
- `firestore.rules`: قواعد حماية قاعدة البيانات، تنلصق في Firebase.

## 1. الرفع على GitHub Pages

1. سوّ مستودع جديد على GitHub، مثلاً باسم `adala-school`.
2. ارفع كل الملفات، بدون هذا الملف إذا تحب.
3. من Settings ثم Pages اختر الفرع `main` واحفظ.
4. الرابط يصير: `https://اسم-حسابك.github.io/adala-school/`

التطبيق يشتغل هسه **بالوضع التجريبي**: البيانات تنحفظ بنفس الموبايل فقط، حتى تجرّب كل شي قبل الربط.

## 2. تجهيز Firebase (مجاني)

1. ادخل على console.firebase.google.com بحساب Google، واضغط Create project. سمّه `adala-school`، وتكدر تطفي Google Analytics.
2. **Authentication**: اضغط Get started، ثم Sign-in method، وفعّل **Email/Password**.
3. **Firestore Database**: اضغط Create database، واختر موقع قريب مثل `eur3 (europe-west)`، وابدأ بـ Production mode.
4. من تبويب **Rules** بـ Firestore: امسح الموجود، والصق محتوى ملف `firestore.rules`، واضغط Publish.
5. من إعدادات المشروع (رمز الترس)، ثم Your apps، اضغط رمز الويب `</>`، وسجّل تطبيق باسم `adala`.
6. يطلعلك كود بيه `const firebaseConfig = { ... }`. انسخ ما بين القوسين وانطيه للمطور، حتى يحطه في `index.html` مكان `FIREBASE_CONFIG = null`.
7. من Authentication ثم Settings ثم Authorized domains، أضف `اسم-حسابك.github.io`.

بعد الربط، أول من يفتح بوابة الإدارة يسوي حساب الإدارة، وبعدها ما يكدر أحد يسويه مرة ثانية.

## 3. تحويله إلى APK

1. ادخل على pwabuilder.com، والصق رابط GitHub Pages.
2. اختر Android، ثم Generate Package.
3. اسم الحزمة مثلاً: `com.louay.adalaschool`.
4. ينزل ملف مضغوط بيه الـ APK، وملف `assetlinks.json`. هذا الملف يخلي شريط الرابط يختفي.
