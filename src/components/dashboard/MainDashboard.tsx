import { motion } from 'framer-motion';
import { useState, Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/government-card';
import { GovButton } from '@/components/ui/government-button';
import { Header } from '@/components/layout/Header';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { ServicesPage } from '@/components/pages/ServicesPage';
import { DocumentsPage } from '@/components/pages/DocumentsPage';
import { ApplicationsPage } from '@/components/pages/ApplicationsPage';
import { ProfilePage } from '@/components/pages/ProfilePage';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApplications } from '@/hooks/useApplications';
import { useUserStore } from '@/store/useUserStore';
import { DashboardSkeleton } from '@/components/ui/loading-skeleton';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import {
  Bell,
  Briefcase,
  FolderOpen,
  Search,
  Wallet,
  User,
  Cloud,
  Sun,
  FileText,
  Award,
  Building,
  Car,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import governmentEmblem from '@/assets/government-emblem.png';

interface QuickAction {
  title: string;
  icon: React.ReactNode;
  variant: "saffron" | "navy" | "gold" | "success";
  description: string;
}

interface RecentApplication {
  id: string;
  type: string;
  status: 'submitted' | 'reviewing' | 'approved' | 'rejected';
  date: string;
}

interface Service {
  name: string;
  icon: React.ReactNode;
  processingTime: string;
  popularity: number;
}

const quickActions: QuickAction[] = [
  {
    title: "Apply License",
    icon: <Briefcase className="w-6 h-6" />,
    variant: "saffron",
    description: "Start new application"
  },
  {
    title: "Upload Documents",
    icon: <FolderOpen className="w-6 h-6" />,
    variant: "navy",
    description: "Add your documents"
  },
  {
    title: "Track Applications",
    icon: <Search className="w-6 h-6" />,
    variant: "success",
    description: "Check application status"
  },
  {
    title: "Pay Fees",
    icon: <Wallet className="w-6 h-6" />,
    variant: "gold",
    description: "Make payments"
  }
];

// Remove hardcoded data - now using store

const featuredServices: Service[] = [
  { name: "Driving License", icon: <Car className="w-5 h-5" />, processingTime: "7-14 days", popularity: 5 },
  { name: "Property Registration", icon: <Building className="w-5 h-5" />, processingTime: "15-30 days", popularity: 4 },
  { name: "Birth Certificate", icon: <FileText className="w-5 h-5" />, processingTime: "3-7 days", popularity: 5 },
  { name: "Business License", icon: <Award className="w-5 h-5" />, processingTime: "10-21 days", popularity: 4 }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'submitted': return 'text-info';
    case 'reviewing': return 'text-gold';
    case 'approved': return 'text-secondary';
    case 'rejected': return 'text-destructive';
    default: return 'text-muted-foreground';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'submitted': return <Clock className="w-4 h-4" />;
    case 'reviewing': return <AlertCircle className="w-4 h-4" />;
    case 'approved': return <CheckCircle className="w-4 h-4" />;
    case 'rejected': return <AlertCircle className="w-4 h-4" />;
    default: return <Clock className="w-4 h-4" />;
  }
};

interface MainDashboardProps {
  onSignOut: () => void;
}

export const MainDashboard = ({ onSignOut }: MainDashboardProps) => {
  const [activeTab, setActiveTab] = useState('home');
  const { t, currentLanguage } = useLanguage();
  const { stats, recentApplications } = useApplications();
  const { user } = useUserStore();
  
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? t('greeting.morning') : currentHour < 18 ? t('greeting.afternoon') : t('greeting.evening');

  const renderCurrentPage = () => {
    switch (activeTab) {
      case 'home':
        return renderHomePage();
      case 'services':
        return <ServicesPage onServiceSelect={(service) => {
          // Navigate to specific service application based on service type
          if (service === 'driving-license') {
            // This would navigate to license selection
            console.log('Navigate to license selection');
          } else {
            // Navigate to general service application
            console.log('Service selected:', service);
          }
        }} />;
      case 'documents':
        return <DocumentsPage />;
      case 'applications':
        return <ApplicationsPage />;
      case 'profile':
        return <ProfilePage onSignOut={onSignOut} />;
      default:
        return renderHomePage();
    }
  };

  const renderHomePage = () => (
    <div className="p-4 space-y-6 pb-20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden"
      >
        <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-2xl p-8 text-white relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 rounded-2xl" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <img src={governmentEmblem} alt="Government Emblem" className="w-12 h-12 opacity-90" />
              <div className="text-right">
                <div className="flex items-center space-x-2 text-white/90">
                  <Sun className="w-5 h-5" />
                  <span className="text-sm">28°C Delhi</span>
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: currentLanguage.fontFamily }}>
              {greeting}, {user?.name || t('user.name')}
            </h1>
            <p className="text-xl text-white/90 mb-4" style={{ fontFamily: currentLanguage.fontFamily }}>
              Welcome to Digital India Portal
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>{stats.pending} Applications Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>{stats.approved} Recently Approved</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h3 
            className="text-xl font-semibold text-foreground mb-4"
            style={{ fontFamily: currentLanguage.fontFamily }}
          >
            {t('dashboard.quickActions')}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { key: 'applyLicense', icon: <Briefcase className="w-6 h-6" />, variant: 'saffron' as const },
              { key: 'uploadDocuments', icon: <FolderOpen className="w-6 h-6" />, variant: 'navy' as const },
              { key: 'trackApplications', icon: <Search className="w-6 h-6" />, variant: 'success' as const },
              { key: 'payFees', icon: <Wallet className="w-6 h-6" />, variant: 'gold' as const }
            ].map((action, index) => (
              <motion.div
                key={action.key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
              >
                <Card 
                  variant="elevated" 
                  className="cursor-pointer hover:scale-105 transition-transform duration-300"
                >
                  <CardContent className="p-4 text-center space-y-3">
                    <div className={`mx-auto w-12 h-12 rounded-lg flex items-center justify-center ${
                      action.variant === 'saffron' ? 'bg-gradient-saffron' :
                      action.variant === 'navy' ? 'bg-gradient-navy' :
                      action.variant === 'gold' ? 'bg-gradient-gold' :
                      'bg-secondary'
                    }`}>
                      {action.icon}
                    </div>
                    <div>
                      <h4 
                        className="font-semibold text-foreground"
                        style={{ fontFamily: currentLanguage.fontFamily }}
                      >
                        {t(`quickAction.${action.key}.title`)}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {t(`quickAction.${action.key}.description`)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Applications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h3 
            className="text-xl font-semibold text-foreground mb-4"
            style={{ fontFamily: currentLanguage.fontFamily }}
          >
            {t('dashboard.recentApplications')}
          </h3>
          <div className="space-y-3">
            {recentApplications.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
              >
                <Card variant="elevated" className="cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${getStatusColor(app.status)}`}>
                          {getStatusIcon(app.status)}
                        </div>
                        <div>
                          <h4 
                            className="font-semibold text-foreground"
                            style={{ fontFamily: currentLanguage.fontFamily }}
                          >
                            {t(`service.${app.type.toLowerCase().replace(' ', '')}`)}
                          </h4>
                          <p className="text-sm text-muted-foreground">ID: {app.id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium capitalize ${getStatusColor(app.status)}`}>
                          {t(`status.${app.status}`)}
                        </p>
                        <p className="text-xs text-muted-foreground">{app.date}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 
            className="text-xl font-semibold text-foreground mb-4"
            style={{ fontFamily: currentLanguage.fontFamily }}
          >
            {t('dashboard.featuredServices')}
          </h3>
          <div className="space-y-3">
            {featuredServices.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
              >
                <Card variant="elevated" className="cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                          {service.icon}
                        </div>
                        <div>
                          <h4 
                            className="font-semibold text-foreground"
                            style={{ fontFamily: currentLanguage.fontFamily }}
                          >
                            {t(`service.${service.name.toLowerCase().replace(' ', '')}`)}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {t('service.processing')}: {service.processingTime}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < service.popularity ? 'bg-gold' : 'bg-muted'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <GovButton 
            variant="saffron" 
            size="xl" 
            className="w-full"
            style={{ fontFamily: currentLanguage.fontFamily }}
          >
            {t('dashboard.exploreServices')}
          </GovButton>
        </motion.div>
      </div>
  );

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        <Header 
          title={t('app.title')}
          showLanguageSelector={true}
          showNotifications={true}
          notificationCount={stats.pending}
        />

        <Suspense fallback={<DashboardSkeleton />}>
          {renderCurrentPage()}
        </Suspense>
        
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
      </div>
    </ErrorBoundary>
  );
};