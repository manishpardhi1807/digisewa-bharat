import { motion } from 'framer-motion';
import { Home, Grid3X3, FolderOpen, ClipboardList, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  translationKey: string;
  badgeCount?: number;
}

const tabs: Tab[] = [
  { id: 'home', icon: Home, translationKey: 'nav.home' },
  { id: 'services', icon: Grid3X3, translationKey: 'nav.services', badgeCount: 3 },
  { id: 'documents', icon: FolderOpen, translationKey: 'nav.documents', badgeCount: 1 },
  { id: 'applications', icon: ClipboardList, translationKey: 'nav.applications', badgeCount: 2 },
  { id: 'profile', icon: User, translationKey: 'nav.profile' },
];

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const { t, currentLanguage } = useLanguage();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "relative flex flex-col items-center justify-center min-w-0 flex-1 py-1 px-2",
                "transition-colors duration-200",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
              whileTap={{ scale: 0.95 }}
              style={{ fontFamily: currentLanguage.fontFamily }}
            >
              <div className="relative">
                <Icon 
                  className={cn(
                    "w-5 h-5 mb-1",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )} 
                />
                
                {/* Badge */}
                {tab.badgeCount && tab.badgeCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-bold"
                  >
                    {tab.badgeCount > 9 ? '9+' : tab.badgeCount}
                  </motion.div>
                )}
              </div>
              
              <span 
                className={cn(
                  "text-xs font-medium truncate max-w-full",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {t(tab.translationKey)}
              </span>
              
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-[1px] left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};