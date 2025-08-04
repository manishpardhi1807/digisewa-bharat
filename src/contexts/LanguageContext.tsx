import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, languages, translate } from '@/lib/i18n';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage?: Language;
}

export const LanguageProvider = ({ children, initialLanguage }: LanguageProviderProps) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    initialLanguage || languages[1] // Default to English
  );

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('preferredLanguage', language.code);
    
    // Update HTML attributes
    document.documentElement.lang = language.code;
    document.documentElement.dir = language.direction;
    document.documentElement.style.fontFamily = language.fontFamily;
  };

  const t = (key: string): string => {
    return translate(key, currentLanguage.code);
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat(currentLanguage.code === 'en' ? 'en-IN' : 'hi-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const formatDate = (date: Date): string => {
    const locale = currentLanguage.code === 'en' ? 'en-IN' : 'hi-IN';
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      const language = languages.find(lang => lang.code === savedLanguage);
      if (language) {
        setLanguage(language);
      }
    }
  }, []);

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setLanguage,
      t,
      formatCurrency,
      formatDate,
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};