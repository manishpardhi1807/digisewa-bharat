export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  direction: 'ltr' | 'rtl';
  fontFamily: string;
}

export const languages: Language[] = [
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    direction: 'ltr',
    fontFamily: '"Noto Sans Devanagari", "Arial Unicode MS", sans-serif'
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    direction: 'ltr',
    fontFamily: '"Inter", "Segoe UI", sans-serif'
  },
  {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    flag: '🇮🇳',
    direction: 'ltr',
    fontFamily: '"Noto Sans Tamil", "Arial Unicode MS", sans-serif'
  },
  {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    flag: '🇮🇳',
    direction: 'ltr',
    fontFamily: '"Noto Sans Telugu", "Arial Unicode MS", sans-serif'
  },
  {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    flag: '🇮🇳',
    direction: 'ltr',
    fontFamily: '"Noto Sans Bengali", "Arial Unicode MS", sans-serif'
  },
  {
    code: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    flag: '🇮🇳',
    direction: 'ltr',
    fontFamily: '"Noto Sans Gujarati", "Arial Unicode MS", sans-serif'
  },
  {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    flag: '🇮🇳',
    direction: 'ltr',
    fontFamily: '"Noto Sans Kannada", "Arial Unicode MS", sans-serif'
  },
  {
    code: 'ml',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    flag: '🇮🇳',
    direction: 'ltr',
    fontFamily: '"Noto Sans Malayalam", "Arial Unicode MS", sans-serif'
  },
  {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    flag: '🇮🇳',
    direction: 'ltr',
    fontFamily: '"Noto Sans Devanagari", "Arial Unicode MS", sans-serif'
  },
  {
    code: 'pa',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    flag: '🇮🇳',
    direction: 'ltr',
    fontFamily: '"Noto Sans Gurmukhi", "Arial Unicode MS", sans-serif'
  },
  {
    code: 'or',
    name: 'Odia',
    nativeName: 'ଓଡ଼ିଆ',
    flag: '🇮🇳',
    direction: 'ltr',
    fontFamily: '"Noto Sans Oriya", "Arial Unicode MS", sans-serif'
  },
  {
    code: 'ur',
    name: 'Urdu',
    nativeName: 'اردو',
    flag: '🇵🇰',
    direction: 'rtl',
    fontFamily: '"Noto Nastaliq Urdu", "Arial Unicode MS", sans-serif'
  }
];

const translations: Record<string, Record<string, string>> = {
  'app.title': {
    en: 'Digital Government', hi: 'डिजिटल सरकार', ta: 'டிஜிட்டல் அரசு', te: 'డిజిటల్ ప్రభుత్వం',
    bn: 'ডিজিটাল সরকার', gu: 'ડિજિટલ સરકાર', kn: 'ಡಿಜಿಟಲ್ ಸರ್ಕಾರ', ml: 'ഡിജിറ്റൽ ഗവൺമെന്റ്',
    mr: 'डिजिटल सरकार', pa: 'ਡਿਜੀਟਲ ਸਰਕਾਰ', or: 'ଡିଜିଟାଲ ସରକାର', ur: 'ڈیجیٹل حکومت'
  },
  'greeting.morning': {
    en: 'Good Morning', hi: 'सुप्रभात', ta: 'காலை வணக்கம்', te: 'శుభోదయం',
    bn: 'সুপ্রভাত', gu: 'સુપ્રભાત', kn: 'ಶುಭೋದಯ', ml: 'സുപ്രഭാതം',
    mr: 'सुप्रभात', pa: 'ਸ਼ੁਭ ਸਵੇਰ', or: 'ସୁପ୍ରଭାତ', ur: 'صبح بخیر'
  },
  'greeting.afternoon': {
    en: 'Good Afternoon', hi: 'नमस्कार', ta: 'மதிய வணக்கம்', te: 'శుభ మధ్యాహ్నం',
    bn: 'নমস্কার', gu: 'નમસ્કાર', kn: 'ಶುಭ ಮಧ್ಯಾಹ್ನ', ml: 'നമസ്കാരം',
    mr: 'नमस्कार', pa: 'ਸ਼ੁਭ ਦੁਪਹਿਰ', or: 'ନମସ୍କାର', ur: 'سلام علیکم'
  },
  'greeting.evening': {
    en: 'Good Evening', hi: 'शुभ संध्या', ta: 'மாலை வணக்கம்', te: 'శుభ సాయంత్రం',
    bn: 'শুভ সন্ধ্যা', gu: 'શુભ સાંજ', kn: 'ಶುಭ ಸಂಜೆ', ml: 'ശുഭ സന്ധ്യ',
    mr: 'शुभ संध्या', pa: 'ਸ਼ੁਭ ਸ਼ਾਮ', or: 'ଶୁଭ ସନ୍ଧ୍ୟା', ur: 'شام بخیر'
  },
  'user.name': {
    en: 'Rahul', hi: 'राहुल', ta: 'ராகுல்', te: 'రాహుల్', bn: 'রাহুল', gu: 'રાહુલ',
    kn: 'ರಾಹುಲ್', ml: 'രാഹുൽ', mr: 'राहुल', pa: 'ਰਾਹੁਲ', or: 'ରାହୁଲ', ur: 'راہول'
  },
  'dashboard.subtitle': {
    en: 'Welcome to Digital India', hi: 'डिजिटल भारत में आपका स्वागत है',
    ta: 'டிஜிட்டல் இந்தியாவிற்கு வரவேற்கிறோம்', te: 'డిజిటల్ ఇండియాకు స్వాగతం',
    bn: 'ডিজিটাল ইন্ডিয়ায় স্বাগতম', gu: 'ડિજિટલ ઇન્ડિયામાં આપનું સ્વાગત છે',
    kn: 'ಡಿಜಿಟಲ್ ಇಂಡಿಯಾಗೆ ಸ್ವಾಗತ', ml: 'ഡിജിറ്റൽ ഇന്ത്യയിലേക്ക് സ്വാഗതം',
    mr: 'डिजिटल इंडियामध्ये आपले स्वागत', pa: 'ਡਿਜੀਟਲ ਇੰਡੀਆ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ',
    or: 'ଡିଜିଟାଲ ଇଣ୍ଡିଆରେ ଆପଣଙ୍କୁ ସ୍ୱାଗତ', ur: 'ڈیجیٹل انڈیا میں خوش آمدید'
  },
  'dashboard.pendingApplications': {
    en: 'You have 2 pending applications', hi: 'आपके पास 2 लंबित आवेदन हैं',
    ta: 'உங்களிடம் 2 நிலுவையில் உள்ள விண்ணப்பங்கள் உள்ளன', te: 'మీకు 2 పెండింగ్ అప్లికేషన్లు ఉన్నాయి',
    bn: 'আপনার 2টি অমীমাংসিত আবেদন রয়েছে', gu: 'તમારી પાસે 2 પેન્ડિંગ અરજીઓ છે',
    kn: 'ನಿಮಗೆ 2 ಬಾಕಿ ಅರ್ಜಿಗಳಿವೆ', ml: 'നിങ്ങൾക്ക് 2 തീർപ്പാക്കാത്ത അപേക്ഷകളുണ്ട്',
    mr: 'तुमच्याकडे 2 प्रलंबित अर्ज आहेत', pa: 'ਤੁਹਾਡੇ ਕੋਲ 2 ਬਕਾਇਆ ਅਰਜ਼ੀਆਂ ਹਨ',
    or: 'ଆପଣଙ୍କର 2ଟି ବିଚାରାଧୀନ ଆବେଦନ ଅଛି', ur: 'آپ کے پاس 2 زیر التواء درخواستیں ہیں'
  },
  'dashboard.quickActions': {
    en: 'Quick Actions', hi: 'त्वरित कार्य', ta: 'விரைவு செயல்கள்', te: 'త్వరిత చర్యలు',
    bn: 'দ্রুত কর্ম', gu: 'ઝડપી ક્રિયાઓ', kn: 'ತ್ವರಿತ ಕ್ರಿಯೆಗಳು', ml: 'പെട്ടെന്നുള്ള പ്രവർത്തനങ്ങൾ',
    mr: 'द्रुत कृती', pa: 'ਤੇਜ਼ ਕਾਰਵਾਈਆਂ', or: 'ଦ୍ରୁତ କାର୍ଯ୍ୟ', ur: 'فوری اقدامات'
  },
  'quickAction.applyLicense.title': { en: 'Apply License', hi: 'लाइसेंस आवेदन', ta: 'உரிமம் பெறுக', te: 'లైసెన్స్ దరఖాస్తు', bn: 'লাইসেন্স আবেদন', gu: 'લાયસન્સ અરજી', kn: 'ಪರವಾನಗಿ ಅರ್ಜಿ', ml: 'ലൈസൻസ് അപേക്ഷ', mr: 'परवाना अर्ज', pa: 'ਲਾਇਸੈਂਸ ਅਰਜ਼ੀ', or: 'ଲାଇସେନ୍ସ ଆବେଦନ', ur: 'لائسنس درخواست' },
  'quickAction.applyLicense.description': { en: 'Start new application', hi: 'नया आवेदन शुरू करें', ta: 'புதிய விண்ணப்பம்', te: 'కొత్త అప్లికేషన్', bn: 'নতুন আবেদন', gu: 'નવી અરજી', kn: 'ಹೊಸ ಅರ್ಜಿ', ml: 'പുതിയ അപേക്ഷ', mr: 'नवीन अर्ज', pa: 'ਨਵੀਂ ਅਰਜ਼ੀ', or: 'ନୂତନ ଆବେଦନ', ur: 'نئی درخواست' },
  'nav.home': { en: 'Home', hi: 'होम', ta: 'முகப்பு', te: 'హోమ్', bn: 'হোম', gu: 'હોમ', kn: 'ಮುಖ್ಯ', ml: 'ഹോം', mr: 'होम', pa: 'ਘਰ', or: 'ଘର', ur: 'ہوم' },
  'nav.services': { en: 'Services', hi: 'सेवाएं', ta: 'சேவைகள்', te: 'సేవలు', bn: 'সেবা', gu: 'સેવાઓ', kn: 'ಸೇವೆಗಳು', ml: 'സേവനങ്ങൾ', mr: 'सेवा', pa: 'ਸੇਵਾਵਾਂ', or: 'ସେବା', ur: 'خدمات' },
  'nav.documents': { en: 'Documents', hi: 'दस्तावेज़', ta: 'ஆவணங்கள்', te: 'దస్తావేజులు', bn: 'নথি', gu: 'દસ્તાવેજો', kn: 'ದಾಖಲೆಗಳು', ml: 'രേഖകൾ', mr: 'कागदपत्रे', pa: 'ਦਸਤਾਵੇਜ਼', or: 'ଦଲିଲ', ur: 'دستاویزات' },
  'nav.applications': { en: 'Applications', hi: 'आवेदन', ta: 'விண்ணப்பங்கள்', te: 'అప్లికేషన్లు', bn: 'আবেদন', gu: 'અરજીઓ', kn: 'ಅರ್ಜಿಗಳು', ml: 'അപേക്ഷകൾ', mr: 'अर्ज', pa: 'ਅਰਜ਼ੀਆਂ', or: 'ଆବେଦନ', ur: 'درخواستیں' },
  'nav.profile': { en: 'Profile', hi: 'प्रोफ़ाइल', ta: 'சுயவிவரம்', te: 'ప్రొఫైల్', bn: 'প্রোফাইল', gu: 'પ્રોફાઇલ', kn: 'ಪ್ರೊಫೈಲ್', ml: 'പ്രൊഫൈൽ', mr: 'प्रोफाइल', pa: 'ਪ੍ਰੋਫਾਈਲ', or: 'ପ୍ରୋଫାଇଲ', ur: 'پروفائل' },
  'action.signOut': { en: 'Sign Out', hi: 'साइन आउट', ta: 'வெளியேறு', te: 'సైన్ అవుట్', bn: 'সাইন আউট', gu: 'સાઇન આઉટ', kn: 'ಸೈನ್ ಔಟ್', ml: 'സൈൻ ഔട്ട്', mr: 'साइन आउट', pa: 'ਸਾਈਨ ਆਊਟ', or: 'ସାଇନ ଆଉଟ', ur: 'سائن آؤٹ' }
};

export function translate(key: string, language: string): string {
  return translations[key]?.[language] || translations[key]?.['en'] || key;
}

export function getLanguageByCode(code: string): Language | undefined {
  return languages.find(lang => lang.code === code);
}