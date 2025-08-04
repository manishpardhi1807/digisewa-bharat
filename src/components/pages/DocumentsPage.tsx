import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, Camera, FolderOpen, FileText, Image, 
  CheckCircle, Clock, XCircle, Search, Filter,
  Download, Share, Eye, Plus, Trash2
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { GovButton } from '@/components/ui/government-button';
import { Card } from '@/components/ui/government-card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface Document {
  id: string;
  name: string;
  nameHi: string;
  type: string;
  category: string;
  uploadDate: Date;
  size: string;
  status: 'verified' | 'pending' | 'rejected';
  thumbnail?: string;
}

const documentCategories = [
  { id: 'all', name: 'All Documents', nameHi: 'सभी दस्तावेज़', icon: FolderOpen },
  { id: 'identity', name: 'Identity', nameHi: 'पहचान', icon: FileText },
  { id: 'address', name: 'Address Proof', nameHi: 'पता प्रमाण', icon: FileText },
  { id: 'education', name: 'Educational', nameHi: 'शैक्षणिक', icon: FileText },
  { id: 'professional', name: 'Professional', nameHi: 'व्यावसायिक', icon: FileText },
];

const sampleDocuments: Document[] = [
  {
    id: '1',
    name: 'Aadhaar Card',
    nameHi: 'आधार कार्ड',
    type: 'PDF',
    category: 'identity',
    uploadDate: new Date('2024-01-15'),
    size: '2.1 MB',
    status: 'verified',
  },
  {
    id: '2',
    name: 'PAN Card',
    nameHi: 'पैन कार्ड',
    type: 'PDF',
    category: 'identity',
    uploadDate: new Date('2024-01-20'),
    size: '1.8 MB',
    status: 'verified',
  },
  {
    id: '3',
    name: 'Electricity Bill',
    nameHi: 'बिजली बिल',
    type: 'PDF',
    category: 'address',
    uploadDate: new Date('2024-02-01'),
    size: '1.2 MB',
    status: 'pending',
  },
  {
    id: '4',
    name: 'Degree Certificate',
    nameHi: 'डिग्री प्रमाणपत्र',
    type: 'PDF',
    category: 'education',
    uploadDate: new Date('2024-02-05'),
    size: '3.5 MB',
    status: 'rejected',
  },
  {
    id: '5',
    name: 'Passport',
    nameHi: 'पासपोर्ट',
    type: 'PDF',
    category: 'identity',
    uploadDate: new Date('2024-02-10'),
    size: '2.8 MB',
    status: 'pending',
  },
];

export const DocumentsPage = () => {
  const { t, currentLanguage } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const filteredDocuments = sampleDocuments.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.nameHi.includes(searchQuery);
    
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'rejected': return 'text-red-600';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return CheckCircle;
      case 'pending': return Clock;
      case 'rejected': return XCircle;
      default: return FileText;
    }
  };

  const getStatusText = (status: string) => {
    const statusTexts = {
      verified: { en: 'Verified', hi: 'सत्यापित' },
      pending: { en: 'Pending', hi: 'लंबित' },
      rejected: { en: 'Rejected', hi: 'अस्वीकृत' },
    };
    return statusTexts[status as keyof typeof statusTexts]?.[currentLanguage.code as 'en' | 'hi'] || status;
  };

  // Storage calculation
  const totalStorage = 15; // GB
  const usedStorage = 8.5; // GB
  const storagePercentage = (usedStorage / totalStorage) * 100;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Storage Indicator */}
      <div className="sticky top-16 z-30 bg-white border-b border-border p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {currentLanguage.code === 'hi' ? 'भंडारण उपयोग' : 'Storage Used'}
            </span>
            <span className="font-medium">
              {usedStorage} GB {currentLanguage.code === 'hi' ? 'का' : 'of'} {totalStorage} GB
            </span>
          </div>
          <Progress value={storagePercentage} className="h-2" />
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="sticky top-28 z-30 bg-white border-b border-border p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder={currentLanguage.code === 'hi' ? 'दस्तावेज़ खोजें...' : 'Search documents...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-12"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Filter className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {documentCategories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors",
                  isSelected 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {currentLanguage.code === 'hi' ? category.nameHi : category.name}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Documents List */}
      <div className="p-4">
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredDocuments.map((document, index) => {
            const StatusIcon = getStatusIcon(document.status);
            
            return (
              <motion.div
                key={document.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card
                  variant="elevated"
                  className="cursor-pointer transition-all duration-300 hover:shadow-md"
                >
                  <div className="p-4">
                    <div className="flex items-center space-x-4">
                      {/* Document Icon */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-subtle rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-primary" />
                        </div>
                      </div>

                      {/* Document Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium text-foreground truncate">
                            {currentLanguage.code === 'hi' ? document.nameHi : document.name}
                          </h3>
                          <Badge 
                            variant="outline" 
                            className="text-xs"
                          >
                            {document.type}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{document.size}</span>
                          <span>•</span>
                          <span>
                            {document.uploadDate.toLocaleDateString(
                              currentLanguage.code === 'hi' ? 'hi-IN' : 'en-IN'
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="flex items-center space-x-2">
                        <StatusIcon 
                          className={cn("w-5 h-5", getStatusColor(document.status))} 
                        />
                        <span className={cn("text-sm font-medium", getStatusColor(document.status))}>
                          {getStatusText(document.status)}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2">
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
                        <motion.button
                          className="p-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                          whileTap={{ scale: 0.95 }}
                        >
                          <Share className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* No Documents */}
        {filteredDocuments.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-muted-foreground mb-4">
              <FolderOpen className="w-12 h-12 mx-auto mb-2" />
              <p>
                {currentLanguage.code === 'hi' 
                  ? 'कोई दस्तावेज़ नहीं मिला' 
                  : 'No documents found'
                }
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Floating Upload Button */}
      <motion.button
        className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-saffron rounded-full flex items-center justify-center shadow-lg z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowUploadModal(true)}
      >
        <Plus className="w-6 h-6 text-white" />
      </motion.button>

      {/* Upload Modal */}
      {showUploadModal && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-end justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowUploadModal(false)}
        >
          <motion.div
            className="bg-white rounded-t-2xl w-full max-w-md p-6 space-y-4"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">
                {currentLanguage.code === 'hi' ? 'दस्तावेज़ अपलोड करें' : 'Upload Document'}
              </h3>
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto" />
            </div>

            <div className="space-y-3">
              <GovButton
                variant="outline"
                size="lg"
                className="w-full justify-start"
              >
                <Camera className="w-5 h-5" />
                <span>
                  {currentLanguage.code === 'hi' ? 'फोटो लें' : 'Take Photo'}
                </span>
              </GovButton>

              <GovButton
                variant="outline"
                size="lg"
                className="w-full justify-start"
              >
                <Image className="w-5 h-5" />
                <span>
                  {currentLanguage.code === 'hi' ? 'गैलरी से चुनें' : 'Choose from Gallery'}
                </span>
              </GovButton>

              <GovButton
                variant="outline"
                size="lg"
                className="w-full justify-start"
              >
                <Upload className="w-5 h-5" />
                <span>
                  {currentLanguage.code === 'hi' ? 'फाइल अपलोड करें' : 'Upload File'}
                </span>
              </GovButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};