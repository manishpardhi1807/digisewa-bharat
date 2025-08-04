export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  fontFamily: string;
  direction: 'ltr' | 'rtl';
}

export const languages: Language[] = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳', fontFamily: 'Noto Sans Devanagari', direction: 'ltr' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', fontFamily: 'Inter', direction: 'ltr' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🐅', fontFamily: 'Noto Sans Bengali', direction: 'ltr' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🏛️', fontFamily: 'Noto Sans Tamil', direction: 'ltr' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🏛️', fontFamily: 'Noto Sans Telugu', direction: 'ltr' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🏛️', fontFamily: 'Noto Sans Devanagari', direction: 'ltr' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🏛️', fontFamily: 'Noto Sans Gujarati', direction: 'ltr' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🏛️', fontFamily: 'Noto Sans Kannada', direction: 'ltr' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🥥', fontFamily: 'Noto Sans Malayalam', direction: 'ltr' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🌾', fontFamily: 'Noto Sans Gurmukhi', direction: 'ltr' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🏛️', fontFamily: 'Noto Sans Oriya', direction: 'ltr' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '📜', fontFamily: 'Noto Sans Arabic', direction: 'rtl' },
];

export interface Translations {
  [key: string]: {
    [languageCode: string]: string;
  };
}

export const translations: Translations = {
  // Navigation
  'nav.home': {
    'hi': 'गृह',
    'en': 'Home',
    'bn': 'বাড়ি',
    'ta': 'முகப்பு',
    'te': 'హోమ్',
    'mr': 'मुख्यपृष्ठ',
    'gu': 'ઘર',
    'kn': 'ಮನೆ',
    'ml': 'ഹോം',
    'pa': 'ਘਰ',
    'or': 'ଘର',
    'ur': 'ہوم'
  },
  'nav.services': {
    'hi': 'सेवाएं',
    'en': 'Services',
    'bn': 'সেবা',
    'ta': 'சேவைகள்',
    'te': 'సేవలు',
    'mr': 'सेवा',
    'gu': 'સેવાઓ',
    'kn': 'ಸೇವೆಗಳು',
    'ml': 'സേവനങ്ങൾ',
    'pa': 'ਸੇਵਾਵਾਂ',
    'or': 'ସେବା',
    'ur': 'خدمات'
  },
  'nav.documents': {
    'hi': 'दस्तावेज़',
    'en': 'Documents',
    'bn': 'নথি',
    'ta': 'ஆவணங்கள்',
    'te': 'పత్రాలు',
    'mr': 'कागदपत्रे',
    'gu': 'દસ્તાવેજો',
    'kn': 'ದಾಖಲೆಗಳು',
    'ml': 'രേഖകൾ',
    'pa': 'ਦਸਤਾਵੇਜ਼',
    'or': 'ଦଲିଲ',
    'ur': 'دستاویزات'
  },
  'nav.applications': {
    'hi': 'आवेदन',
    'en': 'Applications',
    'bn': 'আবেদন',
    'ta': 'விண்ணப்பங்கள்',
    'te': 'దరఖాస్తులు',
    'mr': 'अर्ज',
    'gu': 'અરજીઓ',
    'kn': 'ಅರ್ಜಿಗಳು',
    'ml': 'അപേക്ഷകൾ',
    'pa': 'ਅਰਜ਼ੀਆਂ',
    'or': 'ଆବେଦନ',
    'ur': 'درخواستیں'
  },
  'nav.profile': {
    'hi': 'प्रोफ़ाइल',
    'en': 'Profile',
    'bn': 'প্রোফাইল',
    'ta': 'சுயவிவரம்',
    'te': 'ప్రొఫైల్',
    'mr': 'प्रोफाइल',
    'gu': 'પ્રોફાઇલ',
    'kn': 'ಪ್ರೊಫೈಲ್',
    'ml': 'പ്രൊഫൈൽ',
    'pa': 'ਪ੍ਰੋਫਾਈਲ',
    'or': 'ପ୍ରୋଫାଇଲ',
    'ur': 'پروفائل'
  },
  // Quick Actions
  'quickAction.applyLicense': {
    'hi': 'लाइसेंस के लिए आवेदन करें',
    'en': 'Apply for License',
    'bn': 'লাইসেন্সের জন্য আবেদন করুন',
    'ta': 'உரிமத்திற்கு விண்ணப்பிக்கவும்',
    'te': 'లైసెన్స్ కోసం దరఖాస్తు చేయండి',
    'mr': 'परवान्यासाठी अर्ज करा',
    'gu': 'લાઇસન્સ માટે અરજી કરો',
    'kn': 'ಪರವಾನಗಿಗಾಗಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
    'ml': 'ലൈസൻസിനായി അപേക്ഷിക്കുക',
    'pa': 'ਲਾਇਸੈਂਸ ਲਈ ਅਰਜ਼ੀ ਦਿਓ',
    'or': 'ଲାଇସେନ୍ସ ପାଇଁ ଆବେଦନ କରନ୍ତୁ',
    'ur': 'لائسنس کے لیے درخواست دیں'
  },
  'quickAction.uploadDocuments': {
    'hi': 'दस्तावेज़ अपलोड करें',
    'en': 'Upload Documents',
    'bn': 'নথি আপলোড করুন',
    'ta': 'ஆவணங்களை பதிவேற்றவும்',
    'te': 'పత్రాలను అప్‌లోడ్ చేయండి',
    'mr': 'कागदपत्रे अपलोड करा',
    'gu': 'દસ્તાવેજો અપલોડ કરો',
    'kn': 'ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    'ml': 'രേഖകൾ അപ്‌ലോഡ് ചെയ്യുക',
    'pa': 'ਦਸਤਾਵੇਜ਼ ਅਪਲੋਡ ਕਰੋ',
    'or': 'ଦଲିଲ ଅପଲୋଡ଼ କରନ୍ତୁ',
    'ur': 'دستاویزات اپ لوڈ کریں'
  },
  'quickAction.trackApplications': {
    'hi': 'आवेदन ट्रैक करें',
    'en': 'Track Applications',
    'bn': 'আবেদন ট্র্যাক করুন',
    'ta': 'விண்ணப்பங்களை கண்காணிக்கவும்',
    'te': 'దరఖాస్తులను ట్రాక్ చేయండి',
    'mr': 'अर्ज ट्रॅक करा',
    'gu': 'અરજીઓ ટ્રેક કરો',
    'kn': 'ಅರ್ಜಿಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
    'ml': 'അപേക്ഷകൾ ട്രാക്ക് ചെയ്യുക',
    'pa': 'ਅਰਜ਼ੀਆਂ ਨੂੰ ਟਰੈਕ ਕਰੋ',
    'or': 'ଆବେଦନ ଟ୍ରାକ କରନ୍ତୁ',
    'ur': 'درخواستوں کو ٹریک کریں'
  },
  'quickAction.payFees': {
    'hi': 'शुल्क का भुगतान करें',
    'en': 'Pay Fees',
    'bn': 'ফি পরিশোধ করুন',
    'ta': 'கட்டணம் செலுத்தவும்',
    'te': 'రుసుము చెల్లించండి',
    'mr': 'फी भरा',
    'gu': 'ફી ચૂકવો',
    'kn': 'ಶುಲ್ಕ ಪಾವತಿಸಿ',
    'ml': 'ഫീസ് നൽകുക',
    'pa': 'ਫੀਸ ਦਾ ਭੁਗਤਾਨ ਕਰੋ',
    'or': 'ଫି ପ୍ରଦାନ କରନ୍ତୁ',
    'ur': 'فیس ادا کریں'
  },
  // Common Actions
  'action.continue': {
    'hi': 'आगे बढ़ें',
    'en': 'Continue',
    'bn': 'এগিয়ে যান',
    'ta': 'தொடரவும்',
    'te': 'కొనసాగించు',
    'mr': 'पुढे चला',
    'gu': 'આગળ વધો',
    'kn': 'ಮುಂದುವರಿಸಿ',
    'ml': 'തുടരുക',
    'pa': 'ਅੱਗੇ ਵਧੋ',
    'or': 'ଆଗକୁ ବଢ଼ନ୍ତୁ',
    'ur': 'آگے بڑھیں'
  },
  'action.back': {
    'hi': 'वापस',
    'en': 'Back',
    'bn': 'ফিরে যান',
    'ta': 'பின்',
    'te': 'వెనుకకు',
    'mr': 'मागे',
    'gu': 'પાછળ',
    'kn': 'ಹಿಂದೆ',
    'ml': 'പിന്നോട്ട്',
    'pa': 'ਵਾਪਸ',
    'or': 'ପଛକୁ',
    'ur': 'واپس'
  },
  'action.submit': {
    'hi': 'जमा करें',
    'en': 'Submit',
    'bn': 'জমা দিন',
    'ta': 'சமர்பிக்கவும்',
    'te': 'సమర్పించు',
    'mr': 'सबमिट करा',
    'gu': 'સબમિટ કરો',
    'kn': 'ಸಲ್ಲಿಸಿ',
    'ml': 'സമർപ്പിക്കുക',
    'pa': 'ਸਬਮਿਟ ਕਰੋ',
    'or': 'ଜମା କରନ୍ତୁ',
    'ur': 'جمع کریں'
  },
  'action.signOut': {
    'hi': 'साइन आउट',
    'en': 'Sign Out',
    'bn': 'সাইন আউট',
    'ta': 'வெளியேறு',
    'te': 'సైన్ అవుట్',
    'mr': 'साइन आउट',
    'gu': 'સાઇન આઉટ',
    'kn': 'ಸೈನ್ ಔಟ್',
    'ml': 'സൈൻ ഔട്ട്',
    'pa': 'ਸਾਈਨ ਆਊਟ',
    'or': 'ସାଇନ ଆଉଟ',
    'ur': 'سائن آؤٹ'
  },
  // Greetings
  'greeting.goodMorning': {
    'hi': 'सुप्रभात',
    'en': 'Good Morning',
    'bn': 'সুপ্রভাত',
    'ta': 'காலை வணக்கம்',
    'te': 'శుభోదయం',
    'mr': 'सुप्रभात',
    'gu': 'સુપ્રભાત',
    'kn': 'ಶುಭೋದಯ',
    'ml': 'സുപ്രഭാതം',
    'pa': 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ',
    'or': 'ସୁପ୍ରଭାତ',
    'ur': 'صبح بخیر'
  },
  'greeting.goodAfternoon': {
    'hi': 'शुभ दोपहर',
    'en': 'Good Afternoon',
    'bn': 'শুভ দুপুর',
    'ta': 'மதிய வணக்கம்',
    'te': 'శుభ మధ్యాహ్నం',
    'mr': 'शुभ दुपार',
    'gu': 'શુભ દુપહર',
    'kn': 'ಶುಭ ಮಧ್ಯಾಹ್ನ',
    'ml': 'ശുഭ ഉച്ചകഴിഞ്ഞ്',
    'pa': 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ',
    'or': 'ଶୁଭ ଅପରାହ୍ନ',
    'ur': 'دوپہر بخیر'
  },
  'greeting.goodEvening': {
    'hi': 'शुभ संध्या',
    'en': 'Good Evening',
    'bn': 'শুভ সন্ধ্যা',
    'ta': 'மாலை வணக்கம்',
    'te': 'శుభ సాయంత్రం',
    'mr': 'शुभ संध्याकाळ',
    'gu': 'શુભ સાંજ',
    'kn': 'ಶುಭ ಸಂಜೆ',
    'ml': 'ശുഭ സന്ധ്യ',
    'pa': 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ',
    'or': 'ଶୁଭ ସନ୍ଧ୍ୟା',
    'ur': 'شام بخیر'
  }
};

export function translate(key: string, language: string): string {
  return translations[key]?.[language] || translations[key]?.['en'] || key;
}

export function getLanguageByCode(code: string): Language | undefined {
  return languages.find(lang => lang.code === code);
}