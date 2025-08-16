import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowLeft, MapPin, Clock, CheckCircle, AlertCircle, Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { GovButton } from '@/components/ui/government-button';
import { Card } from '@/components/ui/government-card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface TrackApplicationScreenProps {
  onBack: () => void;
}

interface ApplicationStatus {
  id: string;
  type: string;
  typeHi: string;
  status: 'submitted' | 'processing' | 'approved' | 'rejected' | 'under-review';
  submissionDate: Date;
  lastUpdated: Date;
  progress: number;
  currentStage: string;
  currentStageHi: string;
  expectedCompletion: Date;
  trackingSteps: TrackingStep[];
  contactInfo: {
    office: string;
    officeHi: string;
    phone: string;
    email: string;
    address: string;
    addressHi: string;
  };
}

interface TrackingStep {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  status: 'completed' | 'current' | 'pending';
  date?: Date;
  location?: string;
  locationHi?: string;
}

const mockApplicationData: ApplicationStatus = {
  id: 'DL001234',
  type: 'Driving License',
  typeHi: 'ड्राइविंग लाइसेंस',
  status: 'processing',
  submissionDate: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-20'),
  progress: 60,
  currentStage: 'Document Verification',
  currentStageHi: 'दस्तावेज़ सत्यापन',
  expectedCompletion: new Date('2024-01-30'),
  trackingSteps: [
    {
      id: '1',
      title: 'Application Submitted',
      titleHi: 'आवेदन जमा किया गया',
      description: 'Your application has been successfully submitted',
      descriptionHi: 'आपका आवेदन सफलतापूर्वक जमा किया गया है',
      status: 'completed',
      date: new Date('2024-01-15'),
      location: 'Online Portal',
      locationHi: 'ऑनलाइन पोर्टल',
    },
    {
      id: '2',
      title: 'Document Verification',
      titleHi: 'दस्तावेज़ सत्यापन',
      description: 'Documents are being verified by our team',
      descriptionHi: 'हमारी टीम द्वारा दस्तावेज़ों का सत्यापन किया जा रहा है',
      status: 'current',
      date: new Date('2024-01-18'),
      location: 'RTO Office, Delhi',
      locationHi: 'आरटीओ कार्यालय, दिल्ली',
    },
    {
      id: '3',
      title: 'Test Scheduling',
      titleHi: 'परीक्षा निर्धारण',
      description: 'Driving test will be scheduled',
      descriptionHi: 'ड्राइविंग टेस्ट का समय निर्धारित किया जाएगा',
      status: 'pending',
    },
    {
      id: '4',
      title: 'License Issued',
      titleHi: 'लाइसेंस जारी',
      description: 'Your driving license will be issued',
      descriptionHi: 'आपका ड्राइविंग लाइसेंस जारी किया जाएगा',
      status: 'pending',
    },
  ],
  contactInfo: {
    office: 'Regional Transport Office',
    officeHi: 'क्षेत्रीय परिवहन कार्यालय',
    phone: '+91-11-23456789',
    email: 'rto.delhi@gov.in',
    address: 'RTO Complex, Sector 12, Delhi - 110001',
    addressHi: 'आरटीओ कॉम्प्लेक्स, सेक्टर 12, दिल्ली - 110001',
  },
};

export const TrackApplicationScreen = ({ onBack }: TrackApplicationScreenProps) => {
  const { currentLanguage, formatDate } = useLanguage();
  const [applicationId, setApplicationId] = useState('');
  const [applicationData, setApplicationData] = useState<ApplicationStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrackApplication = async () => {
    if (!applicationId.trim()) {
      setError(currentLanguage.code === 'hi' ? 'कृपया आवेदन आईडी दर्ज करें' : 'Please enter application ID');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      if (applicationId === 'DL001234') {
        setApplicationData(mockApplicationData);
      } else {
        setError(currentLanguage.code === 'hi' ? 'आवेदन नहीं मिला' : 'Application not found');
      }
      setIsLoading(false);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600';
      case 'processing': return 'text-blue-600';
      case 'rejected': return 'text-red-600';
      case 'under-review': return 'text-yellow-600';
      default: return 'text-muted-foreground';
    }
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'current': return Clock;
      case 'pending': return AlertCircle;
      default: return Clock;
    }
  };

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
              {currentLanguage.code === 'hi' ? 'आवेदन ट्रैक करें' : 'Track Application'}
            </h1>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Search Section */}
        <Card variant="elevated" className="p-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              {currentLanguage.code === 'hi' ? 'आवेदन आईडी दर्ज करें' : 'Enter Application ID'}
            </h2>
            <div className="space-y-3">
              <Input
                placeholder={currentLanguage.code === 'hi' ? 'DL001234' : 'e.g., DL001234'}
                value={applicationId}
                onChange={(e) => setApplicationId(e.target.value)}
              />
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
              <GovButton
                variant="saffron"
                size="lg"
                className="w-full"
                onClick={handleTrackApplication}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Clock className="w-4 h-4 animate-spin" />
                    <span>{currentLanguage.code === 'hi' ? 'खोज रहे हैं...' : 'Searching...'}</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>{currentLanguage.code === 'hi' ? 'ट्रैक करें' : 'Track Application'}</span>
                  </>
                )}
              </GovButton>
            </div>
          </div>
        </Card>

        {/* Application Details */}
        {applicationData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Status Overview */}
            <Card variant="elevated" className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {currentLanguage.code === 'hi' ? applicationData.typeHi : applicationData.type}
                    </h3>
                    <p className="text-sm text-muted-foreground">ID: {applicationData.id}</p>
                  </div>
                  <Badge variant="secondary" className={getStatusColor(applicationData.status)}>
                    {applicationData.status}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{currentLanguage.code === 'hi' ? 'प्रगति' : 'Progress'}</span>
                    <span>{applicationData.progress}%</span>
                  </div>
                  <Progress value={applicationData.progress} />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">
                      {currentLanguage.code === 'hi' ? 'जमा किया गया' : 'Submitted'}
                    </p>
                    <p className="font-medium">{formatDate(applicationData.submissionDate)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">
                      {currentLanguage.code === 'hi' ? 'अपेक्षित पूर्णता' : 'Expected Completion'}
                    </p>
                    <p className="font-medium">{formatDate(applicationData.expectedCompletion)}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Current Stage */}
            <Card variant="elevated" className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold">
                    {currentLanguage.code === 'hi' ? 'वर्तमान चरण' : 'Current Stage'}
                  </h4>
                  <p className="text-muted-foreground">
                    {currentLanguage.code === 'hi' ? applicationData.currentStageHi : applicationData.currentStage}
                  </p>
                </div>
              </div>
            </Card>

            {/* Tracking Timeline */}
            <Card variant="elevated" className="p-6">
              <h4 className="font-semibold mb-4">
                {currentLanguage.code === 'hi' ? 'ट्रैकिंग इतिहास' : 'Tracking Timeline'}
              </h4>
              <div className="space-y-4">
                {applicationData.trackingSteps.map((step, index) => {
                  const StepIcon = getStepIcon(step.status);
                  
                  return (
                    <div key={step.id} className="flex space-x-4">
                      <div className="flex flex-col items-center">
                        <div className={cn(
                          "p-2 rounded-full",
                          step.status === 'completed' ? "bg-green-100" :
                          step.status === 'current' ? "bg-blue-100" :
                          "bg-gray-100"
                        )}>
                          <StepIcon className={cn(
                            "w-4 h-4",
                            step.status === 'completed' ? "text-green-600" :
                            step.status === 'current' ? "text-blue-600" :
                            "text-gray-400"
                          )} />
                        </div>
                        {index < applicationData.trackingSteps.length - 1 && (
                          <div className={cn(
                            "w-0.5 h-8 mt-2",
                            step.status === 'completed' ? "bg-green-200" : "bg-gray-200"
                          )} />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <h5 className="font-medium">
                          {currentLanguage.code === 'hi' ? step.titleHi : step.title}
                        </h5>
                        <p className="text-sm text-muted-foreground">
                          {currentLanguage.code === 'hi' ? step.descriptionHi : step.description}
                        </p>
                        {step.date && (
                          <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                            <span>{formatDate(step.date)}</span>
                            {step.location && (
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-3 h-3" />
                                <span>{currentLanguage.code === 'hi' ? step.locationHi : step.location}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Contact Information */}
            <Card variant="elevated" className="p-6">
              <h4 className="font-semibold mb-4">
                {currentLanguage.code === 'hi' ? 'संपर्क जानकारी' : 'Contact Information'}
              </h4>
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium">
                    {currentLanguage.code === 'hi' ? applicationData.contactInfo.officeHi : applicationData.contactInfo.office}
                  </h5>
                  <p className="text-sm text-muted-foreground">
                    {currentLanguage.code === 'hi' ? applicationData.contactInfo.addressHi : applicationData.contactInfo.address}
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>{applicationData.contactInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>{applicationData.contactInfo.email}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};