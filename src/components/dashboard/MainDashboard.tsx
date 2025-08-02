import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/government-card';
import { GovButton } from '@/components/ui/government-button';
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

const recentApplications: RecentApplication[] = [
  { id: "DL001", type: "Driving License", status: "reviewing", date: "2024-01-15" },
  { id: "PAN002", type: "PAN Card", status: "approved", date: "2024-01-10" },
  { id: "PASS003", type: "Passport", status: "submitted", date: "2024-01-20" }
];

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

export const MainDashboard = () => {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good Morning' : currentHour < 18 ? 'Good Afternoon' : 'Good Evening';
  const greetingHindi = currentHour < 12 ? 'सुप्रभात' : currentHour < 18 ? 'नमस्कार' : 'शुभ संध्या';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        className="bg-card shadow-elegant border-b"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <img src={governmentEmblem} alt="Government" className="w-8 h-8" />
            <div>
              <h1 className="text-lg font-bold text-accent">Digital Government</h1>
              <p className="text-xs text-muted-foreground">डिजिटल सरकार</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <motion.button
              className="relative p-2 rounded-full hover:bg-muted transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5 text-accent" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs flex items-center justify-center text-white">
                3
              </span>
            </motion.button>
            <div className="w-8 h-8 bg-gradient-saffron rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-accent" />
            </div>
          </div>
        </div>
      </motion.header>

      <div className="p-4 space-y-6">
        {/* Greeting Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <Card variant="saffron" size="lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-accent">
                  {greeting}, Rahul
                </h2>
                <p className="text-lg text-accent/80">{greetingHindi}, राहुल</p>
                <p className="text-sm text-accent/70 mt-2">
                  You have 2 pending applications
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 text-accent/80">
                  <Sun className="w-5 h-5" />
                  <span>28°C</span>
                </div>
                <p className="text-sm text-accent/70">New Delhi</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
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
                      <h4 className="font-semibold text-foreground">{action.title}</h4>
                      <p className="text-xs text-muted-foreground">{action.description}</p>
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
          <h3 className="text-xl font-semibold text-foreground mb-4">Recent Applications</h3>
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
                          <h4 className="font-semibold text-foreground">{app.type}</h4>
                          <p className="text-sm text-muted-foreground">ID: {app.id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium capitalize ${getStatusColor(app.status)}`}>
                          {app.status}
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
          <h3 className="text-xl font-semibold text-foreground mb-4">Featured Services</h3>
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
                          <h4 className="font-semibold text-foreground">{service.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Processing: {service.processingTime}
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
          <GovButton variant="saffron" size="xl" className="w-full">
            Explore All Services
          </GovButton>
        </motion.div>
      </div>
    </div>
  );
};