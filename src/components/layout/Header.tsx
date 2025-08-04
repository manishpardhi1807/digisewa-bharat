import { motion } from 'framer-motion';
import { Bell, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { languages } from '@/lib/i18n';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title?: string;
  showLanguageSelector?: boolean;
  showNotifications?: boolean;
  notificationCount?: number;
}

export const Header = ({ 
  title = "Digital Government", 
  showLanguageSelector = true, 
  showNotifications = true,
  notificationCount = 3
}: HeaderProps) => {
  const { currentLanguage, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-border">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <motion.div
            className="w-10 h-10 bg-gradient-saffron rounded-full flex items-center justify-center"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-6 h-6 border-2 border-white rounded-full border-dashed" />
          </motion.div>
          <div 
            className="font-bold text-lg text-foreground"
            style={{ fontFamily: currentLanguage.fontFamily }}
          >
            {title}
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          {/* Language Selector */}
          {showLanguageSelector && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg">{currentLanguage.flag}</span>
                  <span className="hidden sm:block text-sm font-medium">
                    {currentLanguage.nativeName}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-64 max-h-80 overflow-y-auto bg-white z-50"
              >
                {languages.map((language) => (
                  <DropdownMenuItem
                    key={language.code}
                    onClick={() => setLanguage(language)}
                    className={cn(
                      "flex items-center space-x-3 cursor-pointer py-3",
                      currentLanguage.code === language.code && "bg-accent"
                    )}
                  >
                    <span className="text-lg">{language.flag}</span>
                    <div className="flex-1">
                      <div className="font-medium">{language.name}</div>
                      <div 
                        className="text-sm text-muted-foreground"
                        style={{ fontFamily: language.fontFamily }}
                      >
                        {language.nativeName}
                      </div>
                    </div>
                    {currentLanguage.code === language.code && (
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Notifications */}
          {showNotifications && (
            <motion.button
              className="relative p-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 min-w-[20px] flex items-center justify-center text-xs"
                >
                  {notificationCount > 9 ? '9+' : notificationCount}
                </Badge>
              )}
            </motion.button>
          )}
        </div>
      </div>
    </header>
  );
};