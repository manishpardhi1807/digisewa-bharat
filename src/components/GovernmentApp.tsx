import { useState } from 'react';
import { SplashScreen } from './auth/SplashScreen';
import { LanguageSelection } from './auth/LanguageSelection';
import { OnboardingCarousel } from './onboarding/OnboardingCarousel';
import { MainDashboard } from './dashboard/MainDashboard';

type AppState = 'splash' | 'language' | 'onboarding' | 'dashboard';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export const GovernmentApp = () => {
  const [currentState, setCurrentState] = useState<AppState>('splash');
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

  const handleSplashComplete = () => {
    setCurrentState('language');
  };

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    setCurrentState('onboarding');
  };

  const handleOnboardingComplete = () => {
    setCurrentState('dashboard');
  };

  switch (currentState) {
    case 'splash':
      return <SplashScreen onComplete={handleSplashComplete} />;
    
    case 'language':
      return <LanguageSelection onComplete={handleLanguageSelect} />;
    
    case 'onboarding':
      return <OnboardingCarousel onComplete={handleOnboardingComplete} />;
    
    case 'dashboard':
      return <MainDashboard />;
    
    default:
      return <SplashScreen onComplete={handleSplashComplete} />;
  }
};