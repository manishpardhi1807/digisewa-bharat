import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Clock, CheckCircle, AlertCircle, XCircle, 
  Download, Share, Phone, MessageCircle, Bell, User, 
  Calendar, MapPin, FileText, Eye
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { GovButton } from '@/components/ui/government-button';
import { Card } from '@/components/ui/government-card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface TimelineStep {
  id: string;
  title: string;
  titleHi: string;
  date: Date;
  officer?: string;
  officerId?: string;
  note?: string;
  noteHi?: string;
  status: 'completed' | 'current' | 'pending';
  icon: React.ComponentType<{ className?: string }>;
}

interface ApplicationDetail {
  id: string;
  type: string;
  typeHi: string;
  status: 'submitted' | 'processing' | 'approved' | 'rejected';
  submissionDate: Date;
  estimatedCompletion: Date;
  progress: number;
  applicantName: string;
  applicantPhone: string;
  fee: number;
  timeline: TimelineStep[];
}

const mockApplication: ApplicationDetail = {
  id: 'DL001234',
  type: 'Driving License - Two Wheeler',
  typeHi: 'ड्राइविंग लाइसेंस - दो पहिया',
  status: 'processing',
  submissionDate: new Date('2024-01-15'),
  estimatedCompletion: new Date('2024-01-30'),
  progress: 60,
  applicantName: 'John Doe',
  applicantPhone: '+91 9876543210',
  fee: 625.40,
  timeline: [
    {
      id: 'submitted',
      title: 'Application Received',
      titleHi: 'आवेदन प्राप्त',
      date: new Date('2024-01-15T10:30:00'),
      officer: 'Digital Submission System',
      note: 'All documents received and verified',
      noteHi: 'सभी दस्तावेज़ प्राप्त और सत्यापित',
      status: 'completed',
      icon: CheckCircle,
    },
    {
      id: 'verification',
      title: 'Document Verification',
      titleHi: 'दस्तावेज़ सत्यापन',
      date: new Date('2024-01-16T14:15:00'),
      officer: 'Verification Officer',
      officerId: 'VO123',
      note: 'Documents verified successfully',
      noteHi: 'दस्तावेज़ सफलतापूर्वक सत्यापित',
      status: 'completed',
      icon: FileText,
    },
    {
      id: 'background',
      title: 'Background Check',
      titleHi: 'पृष्ठभूमि जांच',
      date: new Date('2024-01-18T09:00:00'),
      officer: 'Background Check Unit',
      note: 'Verification in progress',
      noteHi: 'सत्यापन जारी है',
      status: 'current',
      icon: AlertCircle,
    },
    {
      id: 'approval',
      title: 'Final Approval',
      titleHi: 'अंतिम अनुमोदन',
      date: new Date('2024-01-20T12:00:00'),
      officer: 'Licensing Authority',
      status: 'pending',
      icon: Clock,
    },
  ],
};

interface ApplicationDetailScreenProps {
  onBack: () => void;
  applicationId: string;
}

export const ApplicationDetailScreen = ({ onBack, applicationId }: ApplicationDetailScreenProps) => {
  const { currentLanguage, formatCurrency, formatDate } = useLanguage();
  const [activeTab, setActiveTab] = useState<'timeline' | 'details' | 'documents'>('timeline');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const application = mockApplication; // In real app, fetch by applicationId

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-50';
      case 'processing': return 'text-yellow-600 bg-yellow-50';
      case 'rejected': return 'text-red-600 bg-red-50';
      case 'submitted': return 'text-blue-600 bg-blue-50';
      default: return 'text-muted-foreground bg-gray-50';
    }
  };

  const getTimelineStepColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'current': return 'bg-yellow-500';
      case 'pending': return 'bg-gray-300';
      default: return 'bg-gray-300';
    }
  };

  const tabs = [
    { id: 'timeline', name: 'Timeline', nameHi: 'समयरेखा' },
    { id: 'details', name: 'Details', nameHi: 'विवरण' },
    { id: 'documents', name: 'Documents', nameHi: 'दस्तावेज़' },
  ];

  const renderTimeline = () => (
    <div className="space-y-6">
      {application.timeline.map((step, index) => {
        const Icon = step.icon;
        const isLast = index === application.timeline.length - 1;
        
        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {/* Timeline Line */}
            {!isLast && (
              <div className={cn(
                "absolute left-6 top-12 w-0.5 h-16",
                step.status === 'completed' ? 'bg-green-200' : 'bg-gray-200'
              )} />
            )}

            <div className="flex items-start space-x-4">
              {/* Timeline Icon */}
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center text-white",
                getTimelineStepColor(step.status)
              )}>
                <Icon className="w-6 h-6" />
              </div>

              {/* Timeline Content */}
              <div className="flex-1 min-w-0">
                <Card variant="elevated" className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">
                        {currentLanguage.code === 'hi' ? step.titleHi : step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formatDate(step.date)} • {step.date.toLocaleTimeString()}
                      </p>
                      
                      {step.officer && (
                        <div className="mt-2">
                          <div className="flex items-center space-x-2 text-sm">
                            <User className="w-4 h-4" />
                            <span className="font-medium">{step.officer}</span>
                            {step.officerId && (
                              <Badge variant="outline" className="text-xs">
                                {step.officerId}
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      {step.note && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {currentLanguage.code === 'hi' ? step.noteHi : step.note}
                        </p>
                      )}

                      {step.status === 'current' && (
                        <div className="mt-3 space-y-2">
                          <p className="text-xs text-muted-foreground">
                            {currentLanguage.code === 'hi' 
                              ? 'अनुमानित समय: 2-3 दिन' 
                              : 'Estimated time: 2-3 days'
                            }
                          </p>
                          <div className="flex space-x-2">
                            <GovButton variant="outline" size="sm">
                              <Phone className="w-4 h-4" />
                              <span>
                                {currentLanguage.code === 'hi' ? 'संपर्क' : 'Contact'}
                              </span>
                            </GovButton>
                            <GovButton variant="outline" size="sm">
                              <MessageCircle className="w-4 h-4" />
                              <span>
                                {currentLanguage.code === 'hi' ? 'चैट' : 'Chat'}
                              </span>
                            </GovButton>
                          </div>
                        </div>
                      )}
                    </div>

                    <Badge 
                      variant={step.status === 'completed' ? 'default' : 'secondary'}
                      className={cn(
                        "capitalize",
                        step.status === 'completed' && 'bg-green-100 text-green-800',
                        step.status === 'current' && 'bg-yellow-100 text-yellow-800',
                        step.status === 'pending' && 'bg-gray-100 text-gray-600'
                      )}
                    >
                      {step.status}
                    </Badge>
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );

  const renderDetails = () => (
    <div className="space-y-6">
      <Card variant="elevated" className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          {currentLanguage.code === 'hi' ? 'आवेदन विवरण' : 'Application Details'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">
              {currentLanguage.code === 'hi' ? 'आवेदन ID:' : 'Application ID:'}
            </span>
            <span className="ml-2 font-medium">{application.id}</span>
          </div>
          <div>
            <span className="text-muted-foreground">
              {currentLanguage.code === 'hi' ? 'प्रकार:' : 'Type:'}
            </span>
            <span className="ml-2 font-medium">
              {currentLanguage.code === 'hi' ? application.typeHi : application.type}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">
              {currentLanguage.code === 'hi' ? 'आवेदक:' : 'Applicant:'}
            </span>
            <span className="ml-2 font-medium">{application.applicantName}</span>
          </div>
          <div>
            <span className="text-muted-foreground">
              {currentLanguage.code === 'hi' ? 'मोबाइल:' : 'Mobile:'}
            </span>
            <span className="ml-2 font-medium">{application.applicantPhone}</span>
          </div>
          <div>
            <span className="text-muted-foreground">
              {currentLanguage.code === 'hi' ? 'जमा तारीख:' : 'Submitted:'}
            </span>
            <span className="ml-2 font-medium">{formatDate(application.submissionDate)}</span>
          </div>
          <div>
            <span className="text-muted-foreground">
              {currentLanguage.code === 'hi' ? 'अनुमानित पूर्णता:' : 'Expected:'}
            </span>
            <span className="ml-2 font-medium">{formatDate(application.estimatedCompletion)}</span>
          </div>
          <div>
            <span className="text-muted-foreground">
              {currentLanguage.code === 'hi' ? 'शुल्क:' : 'Fee:'}
            </span>
            <span className="ml-2 font-medium">{formatCurrency(application.fee)}</span>
          </div>
          <div>
            <span className="text-muted-foreground">
              {currentLanguage.code === 'hi' ? 'स्थिति:' : 'Status:'}
            </span>
            <Badge className={cn("ml-2", getStatusColor(application.status))}>
              {application.status}
            </Badge>
          </div>
        </div>
      </Card>

      <Card variant="elevated" className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          {currentLanguage.code === 'hi' ? 'सूचना सेटिंग्स' : 'Notification Settings'}
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">
                  {currentLanguage.code === 'hi' ? 'स्थिति अपडेट' : 'Status Updates'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {currentLanguage.code === 'hi' 
                    ? 'आवेदन स्थिति बदलने पर सूचना' 
                    : 'Get notified when status changes'
                  }
                </p>
              </div>
            </div>
            <motion.button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative",
                notificationsEnabled ? 'bg-primary' : 'bg-gray-300'
              )}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-5 h-5 rounded-full bg-white absolute top-0.5"
                animate={{ x: notificationsEnabled ? 26 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </motion.button>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-4">
      {[
        { name: 'Age Proof', nameHi: 'आयु प्रमाण', status: 'verified' },
        { name: 'Address Proof', nameHi: 'पता प्रमाण', status: 'verified' },
        { name: 'Identity Proof', nameHi: 'पहचान प्रमाण', status: 'verified' },
        { name: 'Photo', nameHi: 'फोटो', status: 'verified' },
        { name: 'Medical Certificate', nameHi: 'चिकित्सा प्रमाणपत्र', status: 'verified' },
      ].map((doc, index) => (
        <motion.div
          key={doc.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card variant="elevated" className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium">
                    {currentLanguage.code === 'hi' ? doc.nameHi : doc.name}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">
                      {currentLanguage.code === 'hi' ? 'सत्यापित' : 'Verified'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <motion.button
                  className="p-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  <Eye className="w-4 h-4" />
                </motion.button>
                <motion.button
                  className="p-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  const getTabContent = () => {
    switch (activeTab) {
      case 'timeline':
        return renderTimeline();
      case 'details':
        return renderDetails();
      case 'documents':
        return renderDocuments();
      default:
        return renderTimeline();
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-border p-4">
        <div className="flex items-center space-x-4 mb-4">
          <motion.button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">
              {currentLanguage.code === 'hi' ? application.typeHi : application.type}
            </h1>
            <p className="text-sm text-muted-foreground">
              ID: {application.id}
            </p>
          </div>
          <div className="flex space-x-2">
            <motion.button
              className="p-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5" />
            </motion.button>
            <motion.button
              className="p-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <Share className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span>
              {currentLanguage.code === 'hi' ? 'प्रगति' : 'Progress'}
            </span>
            <span>{application.progress}%</span>
          </div>
          <Progress value={application.progress} className="h-2" />
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-secondary rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                activeTab === tab.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {currentLanguage.code === 'hi' ? tab.nameHi : tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {getTabContent()}
        </motion.div>
      </div>
    </div>
  );
};