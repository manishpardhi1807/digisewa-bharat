import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe, Bell, Moon, Sun, Palette, Volume2, VolumeX, Wifi, Battery, Download } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { GovButton } from '@/components/ui/government-button';
import { Card } from '@/components/ui/government-card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { languages } from '@/lib/i18n';

interface AppSettingsScreenProps {
  onBack: () => void;
}

interface AppSettings {
  darkMode: boolean;
  soundEnabled: boolean;
  pushNotifications: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  autoDownloadUpdates: boolean;
  dataSaverMode: boolean;
  fontSize: number;
  animationsEnabled: boolean;
}

export const AppSettingsScreen = ({ onBack }: AppSettingsScreenProps) => {
  const { currentLanguage, setLanguage } = useLanguage();
  const [settings, setSettings] = useState<AppSettings>({
    darkMode: false,
    soundEnabled: true,
    pushNotifications: true,
    emailNotifications: false,
    smsNotifications: true,
    autoDownloadUpdates: true,
    dataSaverMode: false,
    fontSize: 16,
    animationsEnabled: true,
  });

  const handleSettingChange = (key: keyof AppSettings, value: boolean | number) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleLanguageChange = (languageCode: string) => {
    const selectedLanguage = languages.find(lang => lang.code === languageCode);
    if (selectedLanguage) {
      setLanguage(selectedLanguage);
    }
  };

  const notificationSettings = [
    {
      key: 'pushNotifications',
      title: 'Push Notifications',
      titleHi: 'पुश सूचनाएं',
      description: 'Receive app notifications',
      descriptionHi: 'ऐप सूचनाएं प्राप्त करें',
      icon: Bell,
    },
    {
      key: 'emailNotifications',
      title: 'Email Notifications',
      titleHi: 'ईमेल सूचनाएं',
      description: 'Receive notifications via email',
      descriptionHi: 'ईमेल के माध्यम से सूचनाएं प्राप्त करें',
      icon: Bell,
    },
    {
      key: 'smsNotifications',
      title: 'SMS Notifications',
      titleHi: 'SMS सूचनाएं',
      description: 'Receive SMS for important updates',
      descriptionHi: 'महत्वपूर्ण अपडेट के लिए SMS प्राप्त करें',
      icon: Bell,
    },
  ];

  const displaySettings = [
    {
      key: 'darkMode',
      title: 'Dark Mode',
      titleHi: 'डार्क मोड',
      description: 'Switch to dark theme',
      descriptionHi: 'डार्क थीम पर स्विच करें',
      icon: Moon,
      iconAlt: Sun,
    },
    {
      key: 'animationsEnabled',
      title: 'Animations',
      titleHi: 'एनिमेशन',
      description: 'Enable smooth animations',
      descriptionHi: 'स्मूथ एनिमेशन सक्षम करें',
      icon: Palette,
    },
  ];

  const performanceSettings = [
    {
      key: 'autoDownloadUpdates',
      title: 'Auto Download Updates',
      titleHi: 'ऑटो डाउनलोड अपडेट',
      description: 'Automatically download app updates',
      descriptionHi: 'ऐप अपडेट स्वचालित रूप से डाउनलोड करें',
      icon: Download,
    },
    {
      key: 'dataSaverMode',
      title: 'Data Saver Mode',
      titleHi: 'डेटा सेवर मोड',
      description: 'Reduce data usage',
      descriptionHi: 'डेटा उपयोग कम करें',
      icon: Wifi,
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
              {currentLanguage.code === 'hi' ? 'ऐप सेटिंग्स' : 'App Settings'}
            </h1>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Language Settings */}
        <Card variant="elevated" className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Globe className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold">
                {currentLanguage.code === 'hi' ? 'भाषा सेटिंग्स' : 'Language Settings'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {currentLanguage.code === 'hi' 
                  ? 'अपनी पसंदीदा भाषा चुनें'
                  : 'Choose your preferred language'
                }
              </p>
            </div>
          </div>
          
          <Select value={currentLanguage.code} onValueChange={handleLanguageChange}>
            <SelectTrigger>
              <SelectValue>
                <div className="flex items-center space-x-2">
                  <span>{currentLanguage.flag}</span>
                  <span>{currentLanguage.name}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language.code} value={language.code}>
                  <div className="flex items-center space-x-2">
                    <span>{language.flag}</span>
                    <span>{language.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>

        {/* Notifications */}
        <Card variant="elevated" className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {currentLanguage.code === 'hi' ? 'सूचना सेटिंग्स' : 'Notification Settings'}
          </h3>
          <div className="space-y-4">
            {notificationSettings.map((setting) => {
              const Icon = setting.icon;
              const isEnabled = settings[setting.key as keyof AppSettings] as boolean;
              
              return (
                <div key={setting.key} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Icon className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">
                        {currentLanguage.code === 'hi' ? setting.titleHi : setting.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {currentLanguage.code === 'hi' ? setting.descriptionHi : setting.description}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={isEnabled}
                    onCheckedChange={(checked) => handleSettingChange(setting.key as keyof AppSettings, checked)}
                  />
                </div>
              );
            })}
          </div>
        </Card>

        {/* Display Settings */}
        <Card variant="elevated" className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {currentLanguage.code === 'hi' ? 'डिस्प्ले सेटिंग्स' : 'Display Settings'}
          </h3>
          <div className="space-y-6">
            {displaySettings.map((setting) => {
              const Icon = setting.icon;
              const IconAlt = setting.iconAlt;
              const isEnabled = settings[setting.key as keyof AppSettings] as boolean;
              
              return (
                <div key={setting.key} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      {IconAlt && isEnabled ? (
                        <IconAlt className="w-4 h-4 text-purple-600" />
                      ) : (
                        <Icon className="w-4 h-4 text-purple-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">
                        {currentLanguage.code === 'hi' ? setting.titleHi : setting.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {currentLanguage.code === 'hi' ? setting.descriptionHi : setting.description}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={isEnabled}
                    onCheckedChange={(checked) => handleSettingChange(setting.key as keyof AppSettings, checked)}
                  />
                </div>
              );
            })}

            {/* Font Size Slider */}
            <div className="p-4 bg-secondary rounded-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Palette className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium">
                    {currentLanguage.code === 'hi' ? 'फॉन्ट साइज़' : 'Font Size'}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {currentLanguage.code === 'hi' ? 'टेक्स्ट का आकार समायोजित करें' : 'Adjust text size'}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Aa</span>
                  <span className="font-medium">{settings.fontSize}px</span>
                  <span className="text-lg">Aa</span>
                </div>
                <Slider
                  value={[settings.fontSize]}
                  onValueChange={([value]) => handleSettingChange('fontSize', value)}
                  min={12}
                  max={24}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>

            {/* Sound Setting */}
            <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  {settings.soundEnabled ? (
                    <Volume2 className="w-4 h-4 text-purple-600" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-purple-600" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium">
                    {currentLanguage.code === 'hi' ? 'ध्वनि प्रभाव' : 'Sound Effects'}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {currentLanguage.code === 'hi' ? 'ऐप साउंड इफेक्ट्स सक्षम करें' : 'Enable app sound effects'}
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.soundEnabled}
                onCheckedChange={(checked) => handleSettingChange('soundEnabled', checked)}
              />
            </div>
          </div>
        </Card>

        {/* Performance Settings */}
        <Card variant="elevated" className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {currentLanguage.code === 'hi' ? 'प्रदर्शन सेटिंग्स' : 'Performance Settings'}
          </h3>
          <div className="space-y-4">
            {performanceSettings.map((setting) => {
              const Icon = setting.icon;
              const isEnabled = settings[setting.key as keyof AppSettings] as boolean;
              
              return (
                <div key={setting.key} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Icon className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">
                        {currentLanguage.code === 'hi' ? setting.titleHi : setting.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {currentLanguage.code === 'hi' ? setting.descriptionHi : setting.description}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={isEnabled}
                    onCheckedChange={(checked) => handleSettingChange(setting.key as keyof AppSettings, checked)}
                  />
                </div>
              );
            })}
          </div>
        </Card>

        {/* App Info */}
        <Card variant="elevated" className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {currentLanguage.code === 'hi' ? 'ऐप जानकारी' : 'App Information'}
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{currentLanguage.code === 'hi' ? 'संस्करण' : 'Version'}</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{currentLanguage.code === 'hi' ? 'बिल्ड नंबर' : 'Build Number'}</span>
              <span className="font-medium">2024.01.15</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{currentLanguage.code === 'hi' ? 'अंतिम अपडेट' : 'Last Updated'}</span>
              <span className="font-medium">Jan 15, 2024</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};