import { useState } from 'react';
import { SplashScreen } from './auth/SplashScreen';
import { LanguageSelection } from './auth/LanguageSelection';
import { OnboardingCarousel } from './onboarding/OnboardingCarousel';
import { SignIn } from './auth/SignIn';
import { PhoneVerification } from './auth/PhoneVerification';
import { OtpVerification } from './auth/OtpVerification';
import { AadhaarVerification } from './auth/AadhaarVerification';
import { ProfileCreation } from './auth/ProfileCreation';
import { BiometricSetup } from './auth/BiometricSetup';
import { MainDashboard } from './dashboard/MainDashboard';

type AppState = 
  | 'splash' 
  | 'language' 
  | 'onboarding' 
  | 'signin' 
  | 'phone' 
  | 'otp' 
  | 'aadhaar' 
  | 'profile' 
  | 'biometric' 
  | 'dashboard';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

interface UserData {
  language: Language | null;
  phoneNumber: string;
  aadhaarNumber: string;
}

export const GovernmentApp = () => {
  const [currentState, setCurrentState] = useState<AppState>('splash');
  const [userData, setUserData] = useState<UserData>({
    language: null,
    phoneNumber: '',
    aadhaarNumber: ''
  });

  const handleSplashComplete = () => {
    setCurrentState('language');
  };

  const handleLanguageSelect = (language: Language) => {
    setUserData(prev => ({ ...prev, language }));
    setCurrentState('onboarding');
  };

  const handleOnboardingComplete = () => {
    setCurrentState('signin');
  };

  const handleSignInSuccess = () => {
    setCurrentState('dashboard');
  };

  const handleCreateAccount = () => {
    setCurrentState('phone');
  };

  const handlePhoneComplete = (phoneNumber: string) => {
    setUserData(prev => ({ ...prev, phoneNumber }));
    setCurrentState('otp');
  };

  const handleOtpComplete = () => {
    setCurrentState('aadhaar');
  };

  const handleAadhaarComplete = (aadhaarNumber: string) => {
    setUserData(prev => ({ ...prev, aadhaarNumber }));
    setCurrentState('profile');
  };

  const handleProfileComplete = () => {
    setCurrentState('biometric');
  };

  const handleBiometricComplete = () => {
    setCurrentState('dashboard');
  };

  const goBack = () => {
    switch (currentState) {
      case 'language':
        setCurrentState('splash');
        break;
      case 'onboarding':
        setCurrentState('language');
        break;
      case 'signin':
        setCurrentState('onboarding');
        break;
      case 'phone':
        setCurrentState('signin');
        break;
      case 'otp':
        setCurrentState('phone');
        break;
      case 'aadhaar':
        setCurrentState('otp');
        break;
      case 'profile':
        setCurrentState('aadhaar');
        break;
      case 'biometric':
        setCurrentState('profile');
        break;
      default:
        break;
    }
  };

  switch (currentState) {
    case 'splash':
      return <SplashScreen onComplete={handleSplashComplete} />;
    
    case 'language':
      return <LanguageSelection onComplete={handleLanguageSelect} />;
    
    case 'onboarding':
      return <OnboardingCarousel onComplete={handleOnboardingComplete} />;
    
    case 'signin':
      return (
        <SignIn 
          onSignInSuccess={handleSignInSuccess}
          onCreateAccount={handleCreateAccount}
        />
      );
    
    case 'phone':
      return (
        <PhoneVerification 
          onComplete={handlePhoneComplete}
          onBack={goBack}
        />
      );
    
    case 'otp':
      return (
        <OtpVerification 
          phoneNumber={userData.phoneNumber}
          onComplete={handleOtpComplete}
          onBack={goBack}
        />
      );
    
    case 'aadhaar':
      return (
        <AadhaarVerification 
          onComplete={handleAadhaarComplete}
          onBack={goBack}
        />
      );
    
    case 'profile':
      return (
        <ProfileCreation 
          aadhaarNumber={userData.aadhaarNumber}
          phoneNumber={userData.phoneNumber}
          onComplete={handleProfileComplete}
          onBack={goBack}
        />
      );
    
    case 'biometric':
      return (
        <BiometricSetup 
          onComplete={handleBiometricComplete}
          onBack={goBack}
        />
      );
    
    case 'dashboard':
      return <MainDashboard onSignOut={() => setCurrentState('splash')} />;
    
    default:
      return <SplashScreen onComplete={handleSplashComplete} />;
  }
};