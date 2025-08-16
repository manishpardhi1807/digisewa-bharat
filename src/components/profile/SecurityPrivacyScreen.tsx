import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Lock, Eye, EyeOff, Smartphone, Key, AlertTriangle, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { GovButton } from '@/components/ui/government-button';
import { Card } from '@/components/ui/government-card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface SecurityPrivacyScreenProps {
  onBack: () => void;
}

interface SecuritySettings {
  biometricEnabled: boolean;
  twoFactorEnabled: boolean;
  dataSharing: boolean;
  locationTracking: boolean;
  marketingEmails: boolean;
  smsNotifications: boolean;
}

export const SecurityPrivacyScreen = ({ onBack }: SecurityPrivacyScreenProps) => {
  const { currentLanguage } = useLanguage();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [settings, setSettings] = useState<SecuritySettings>({
    biometricEnabled: true,
    twoFactorEnabled: false,
    dataSharing: false,
    locationTracking: true,
    marketingEmails: false,
    smsNotifications: true,
  });

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      // Show error
      return;
    }
    // Handle password change
    setIsChangingPassword(false);
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const handleSettingChange = (key: keyof SecuritySettings, value: boolean) => {
    setSettings({ ...settings, [key]: value });
  };

  const securityOptions = [
    {
      key: 'biometricEnabled',
      title: 'Biometric Authentication',
      titleHi: 'बायोमेट्रिक प्रमाणीकरण',
      description: 'Use fingerprint or face unlock',
      descriptionHi: 'फिंगरप्रिंट या फेस अनलॉक का उपयोग करें',
      icon: Smartphone,
    },
    {
      key: 'twoFactorEnabled',
      title: 'Two-Factor Authentication',
      titleHi: 'द्विकारक प्रमाणीकरण',
      description: 'Add extra security with SMS OTP',
      descriptionHi: 'SMS OTP के साथ अतिरिक्त सुरक्षा जोड़ें',
      icon: Shield,
    },
  ];

  const privacyOptions = [
    {
      key: 'dataSharing',
      title: 'Data Sharing',
      titleHi: 'डेटा साझाकरण',
      description: 'Share anonymized data for service improvement',
      descriptionHi: 'सेवा सुधार के लिए गुमनाम डेटा साझा करें',
      icon: Shield,
      warning: true,
    },
    {
      key: 'locationTracking',
      title: 'Location Services',
      titleHi: 'स्थान सेवाएं',
      description: 'Allow location access for better services',
      descriptionHi: 'बेहतर सेवाओं के लिए स्थान पहुंच की अनुमति दें',
      icon: Shield,
    },
    {
      key: 'marketingEmails',
      title: 'Marketing Emails',
      titleHi: 'मार्केटिंग ईमेल',
      description: 'Receive updates about new services',
      descriptionHi: 'नई सेवाओं के बारे में अपडेट प्राप्त करें',
      icon: Shield,
    },
    {
      key: 'smsNotifications',
      title: 'SMS Notifications',
      titleHi: 'SMS सूचनाएं',
      description: 'Receive important updates via SMS',
      descriptionHi: 'SMS के माध्यम से महत्वपूर्ण अपडेट प्राप्त करें',
      icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <GovButton variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </GovButton>
            <h1 className="text-lg font-semibold">
              {currentLanguage.code === 'hi' ? 'सुरक्षा और गोपनीयता' : 'Security & Privacy'}
            </h1>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Password Change */}
        <Card variant="elevated" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Lock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">
                  {currentLanguage.code === 'hi' ? 'पासवर्ड बदलें' : 'Change Password'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {currentLanguage.code === 'hi' 
                    ? 'अपना खाता सुरक्षित रखने के लिए नियमित रूप से पासवर्ड बदलें'
                    : 'Regularly change your password to keep your account secure'
                  }
                </p>
              </div>
            </div>
            <GovButton
              variant="outline"
              size="sm"
              onClick={() => setIsChangingPassword(!isChangingPassword)}
            >
              {isChangingPassword 
                ? (currentLanguage.code === 'hi' ? 'रद्द करें' : 'Cancel')
                : (currentLanguage.code === 'hi' ? 'बदलें' : 'Change')
              }
            </GovButton>
          </div>

          {isChangingPassword && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label>{currentLanguage.code === 'hi' ? 'वर्तमान पासवर्ड' : 'Current Password'}</Label>
                <div className="relative">
                  <Input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={passwords.current}
                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? 
                      <EyeOff className="w-4 h-4 text-muted-foreground" /> : 
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    }
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>{currentLanguage.code === 'hi' ? 'नया पासवर्ड' : 'New Password'}</Label>
                <div className="relative">
                  <Input
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwords.new}
                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? 
                      <EyeOff className="w-4 h-4 text-muted-foreground" /> : 
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    }
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>{currentLanguage.code === 'hi' ? 'पासवर्ड की पुष्टि करें' : 'Confirm Password'}</Label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? 
                      <EyeOff className="w-4 h-4 text-muted-foreground" /> : 
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    }
                  </button>
                </div>
              </div>

              <GovButton variant="saffron" onClick={handlePasswordChange}>
                {currentLanguage.code === 'hi' ? 'पासवर्ड अपडेट करें' : 'Update Password'}
              </GovButton>
            </motion.div>
          )}
        </Card>

        {/* Security Settings */}
        <Card variant="elevated" className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {currentLanguage.code === 'hi' ? 'सुरक्षा सेटिंग्स' : 'Security Settings'}
          </h3>
          <div className="space-y-4">
            {securityOptions.map((option) => {
              const Icon = option.icon;
              const isEnabled = settings[option.key as keyof SecuritySettings];
              
              return (
                <div key={option.key} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">
                        {currentLanguage.code === 'hi' ? option.titleHi : option.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {currentLanguage.code === 'hi' ? option.descriptionHi : option.description}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={isEnabled}
                    onCheckedChange={(checked) => handleSettingChange(option.key as keyof SecuritySettings, checked)}
                  />
                </div>
              );
            })}
          </div>
        </Card>

        {/* Privacy Settings */}
        <Card variant="elevated" className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {currentLanguage.code === 'hi' ? 'गोपनीयता सेटिंग्स' : 'Privacy Settings'}
          </h3>
          <div className="space-y-4">
            {privacyOptions.map((option) => {
              const Icon = option.icon;
              const isEnabled = settings[option.key as keyof SecuritySettings];
              
              return (
                <div key={option.key} className="space-y-2">
                  <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${option.warning ? 'bg-yellow-100' : 'bg-green-100'}`}>
                        <Icon className={`w-4 h-4 ${option.warning ? 'text-yellow-600' : 'text-green-600'}`} />
                      </div>
                      <div>
                        <h4 className="font-medium">
                          {currentLanguage.code === 'hi' ? option.titleHi : option.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {currentLanguage.code === 'hi' ? option.descriptionHi : option.description}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={isEnabled}
                      onCheckedChange={(checked) => handleSettingChange(option.key as keyof SecuritySettings, checked)}
                    />
                  </div>
                  
                  {option.warning && isEnabled && (
                    <div className="flex items-start space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                      <p className="text-xs text-yellow-700">
                        {currentLanguage.code === 'hi' 
                          ? 'यह डेटा केवल सेवा सुधार के लिए उपयोग किया जाएगा और तीसरे पक्ष के साथ साझा नहीं किया जाएगा।'
                          : 'This data will only be used for service improvement and will not be shared with third parties.'
                        }
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Account Actions */}
        <Card variant="elevated" className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {currentLanguage.code === 'hi' ? 'खाता क्रियाएं' : 'Account Actions'}
          </h3>
          <div className="space-y-3">
            <GovButton variant="outline" className="w-full justify-start">
              <Key className="w-4 h-4" />
              <span>{currentLanguage.code === 'hi' ? 'सभी डिवाइस से लॉग आउट' : 'Log out from all devices'}</span>
            </GovButton>
            <GovButton variant="outline" className="w-full justify-start">
              <Shield className="w-4 h-4" />
              <span>{currentLanguage.code === 'hi' ? 'डेटा डाउनलोड करें' : 'Download my data'}</span>
            </GovButton>
            <GovButton variant="destructive" className="w-full justify-start">
              <AlertTriangle className="w-4 h-4" />
              <span>{currentLanguage.code === 'hi' ? 'खाता हटाएं' : 'Delete account'}</span>
            </GovButton>
          </div>
        </Card>
      </div>
    </div>
  );
};