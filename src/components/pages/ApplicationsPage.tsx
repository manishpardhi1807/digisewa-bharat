import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, XCircle, Eye, Download, Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { GovButton } from '@/components/ui/government-button';
import { Card } from '@/components/ui/government-card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { TrackApplicationScreen } from '@/components/screens/TrackApplicationScreen';

interface Application {
  id: string;
  type: string;
  typeHi: string;
  status: 'submitted' | 'processing' | 'approved' | 'rejected';
  submissionDate: Date;
  estimatedCompletion: Date;
  progress: number;
}

const applications: Application[] = [
  {
    id: 'DL001234',
    type: 'Driving License',
    typeHi: 'ड्राइविंग लाइसेंस',
    status: 'processing',
    submissionDate: new Date('2024-01-15'),
    estimatedCompletion: new Date('2024-01-30'),
    progress: 60,
  },
  {
    id: 'PAN5678',
    type: 'PAN Card',
    typeHi: 'पैन कार्ड',
    status: 'approved',
    submissionDate: new Date('2024-01-10'),
    estimatedCompletion: new Date('2024-01-25'),
    progress: 100,
  },
];

export const ApplicationsPage = () => {
  const { currentLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'all'>('active');
  const [showTrackScreen, setShowTrackScreen] = useState(false);

  if (showTrackScreen) return <TrackApplicationScreen onBack={() => setShowTrackScreen(false)} />;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600';
      case 'processing': return 'text-yellow-600';
      case 'rejected': return 'text-red-600';
      case 'submitted': return 'text-blue-600';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return CheckCircle;
      case 'processing': return Clock;
      case 'rejected': return XCircle;
      case 'submitted': return Clock;
      default: return Clock;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Track Application Button */}
      <div className="p-4">
        <GovButton variant="saffron" className="w-full" onClick={() => setShowTrackScreen(true)}>
          <Search className="w-4 h-4" />
          <span>{currentLanguage.code === 'hi' ? 'आवेदन ट्रैक करें' : 'Track Application'}</span>
        </GovButton>
      </div>

      {/* Filter Tabs */}
      <div className="sticky top-16 z-30 bg-white border-b border-border p-4">
        <div className="flex gap-2">
          {[
            { key: 'active', label: 'Active', labelHi: 'सक्रिय' },
            { key: 'completed', label: 'Completed', labelHi: 'पूर्ण' },
            { key: 'all', label: 'All', labelHi: 'सभी' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {currentLanguage.code === 'hi' ? tab.labelHi : tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      <div className="p-4 space-y-4">
        {applications.map((application, index) => {
          const StatusIcon = getStatusIcon(application.status);
          
          return (
            <motion.div
              key={application.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="elevated" className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {currentLanguage.code === 'hi' ? application.typeHi : application.type}
                      </h3>
                      <p className="text-sm text-muted-foreground">ID: {application.id}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <StatusIcon className={cn("w-5 h-5", getStatusColor(application.status))} />
                      <Badge variant="secondary">
                        {application.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{application.progress}%</span>
                    </div>
                    <Progress value={application.progress} />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80">
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                    <button className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80">
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};