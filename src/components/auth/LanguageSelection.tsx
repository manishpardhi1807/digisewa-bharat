import { useState } from 'react';
import { motion } from 'framer-motion';
import { GovButton } from '@/components/ui/government-button';
import { Card } from '@/components/ui/government-card';
import { Check } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🐅' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🏛️' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🏛️' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🏛️' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🏛️' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🏛️' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🥥' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🌾' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🏛️' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '📜' },
];

interface LanguageSelectionProps {
  onComplete: (language: Language) => void;
}

export const LanguageSelection = ({ onComplete }: LanguageSelectionProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
  };

  const handleContinue = () => {
    if (selectedLanguage) {
      onComplete(selectedLanguage);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9InJnYmEoMjU1LDE1MywgNTEsMC4wNSkiIGZpbGwtcnVsZT0ibm9uemVybyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center space-y-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-accent">Choose Your Language</h1>
          <h2 className="text-2xl font-semibold text-accent">अपनी भाषा चुनें</h2>
          <p className="text-muted-foreground">Select your preferred language for the application</p>
        </motion.div>

        {/* Language Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {languages.map((language, index) => (
            <motion.div
              key={language.code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <Card
                variant="elevated"
                size="sm"
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedLanguage?.code === language.code
                    ? 'ring-2 ring-primary bg-gradient-saffron'
                    : 'hover:shadow-saffron'
                }`}
                onClick={() => handleLanguageSelect(language)}
              >
                <div className="flex flex-col items-center space-y-3 p-2">
                  <div className="text-2xl">{language.flag}</div>
                  <div className="text-center">
                    <p className="font-semibold text-sm">{language.name}</p>
                    <p className="text-lg font-medium text-accent">{language.nativeName}</p>
                  </div>
                  {selectedLanguage?.code === language.code && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 bg-secondary rounded-full p-1"
                    >
                      <Check className="w-4 h-4 text-secondary-foreground" />
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Continue Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <GovButton
            variant="saffron"
            size="xl"
            disabled={!selectedLanguage}
            onClick={handleContinue}
            className="w-full max-w-md"
          >
            Continue / आगे बढ़ें
          </GovButton>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-8 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <p className="text-sm text-muted-foreground">Government of India</p>
          <p className="text-sm text-muted-foreground">भारत सरकार</p>
        </motion.div>
      </div>
    </div>
  );
};