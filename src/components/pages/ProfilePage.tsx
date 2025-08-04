import { motion } from 'framer-motion';
import { User, Settings, Shield, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { GovButton } from '@/components/ui/government-button';
import { Card } from '@/components/ui/government-card';

interface ProfilePageProps {
  onSignOut: () => void;
}

export const ProfilePage = ({ onSignOut }: ProfilePageProps) => {
  const { t, currentLanguage } = useLanguage();

  const menuItems = [
    { icon: User, label: 'Personal Information', labelHi: 'व्यक्तिगत जानकारी' },
    { icon: Shield, label: 'Security & Privacy', labelHi: 'सुरक्षा और गोपनीयता' },
    { icon: Settings, label: 'App Settings', labelHi: 'ऐप सेटिंग्स' },
    { icon: HelpCircle, label: 'Help & Support', labelHi: 'सहायता और समर्थन' },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-4 space-y-6">
        {/* Profile Header */}
        <Card variant="elevated" className="p-6">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-saffron rounded-full mx-auto flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Rajesh Kumar</h2>
              <p className="text-muted-foreground">+91 98765 43210</p>
            </div>
          </div>
        </Card>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={index}
                className="w-full"
                whileTap={{ scale: 0.98 }}
              >
                <Card variant="default" className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-primary" />
                      <span className="font-medium">
                        {currentLanguage.code === 'hi' ? item.labelHi : item.label}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </Card>
              </motion.button>
            );
          })}
        </div>

        {/* Sign Out */}
        <Card variant="default" className="p-4">
          <GovButton
            variant="destructive"
            size="lg"
            className="w-full"
            onClick={onSignOut}
          >
            <LogOut className="w-5 h-5" />
            <span>{t('action.signOut')}</span>
          </GovButton>
        </Card>
      </div>
    </div>
  );
};