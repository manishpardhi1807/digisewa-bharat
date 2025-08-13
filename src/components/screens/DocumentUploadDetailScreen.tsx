import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Camera, Upload, FileText, CheckCircle, XCircle, 
  AlertCircle, Trash2, Eye, RotateCcw, Crop, Download
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { GovButton } from '@/components/ui/government-button';
import { Card } from '@/components/ui/government-card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface DocumentDetail {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  required: boolean;
  acceptedFormats: string[];
  maxSize: string;
  examples: string[];
  examplesHi: string[];
  uploadStatus: 'not_uploaded' | 'uploading' | 'uploaded' | 'verified' | 'rejected';
  uploadProgress?: number;
  rejectionReason?: string;
  rejectionReasonHi?: string;
  verificationDate?: Date;
}

const documentCategories = [
  {
    id: 'identity',
    name: 'Identity Proof',
    nameHi: 'पहचान प्रमाण',
    documents: [
      {
        id: 'aadhaar',
        name: 'Aadhaar Card',
        nameHi: 'आधार कार्ड',
        description: 'Government issued unique identification card',
        descriptionHi: 'सरकार द्वारा जारी अद्वितीय पहचान पत्र',
        required: true,
        acceptedFormats: ['PDF', 'JPG', 'PNG'],
        maxSize: '5 MB',
        examples: ['Original Aadhaar Card', 'E-Aadhaar (downloaded from UIDAI)'],
        examplesHi: ['मूल आधार कार्ड', 'ई-आधार (UIDAI से डाउनलोड)'],
        uploadStatus: 'verified' as const,
        verificationDate: new Date('2024-01-16'),
      },
      {
        id: 'pan',
        name: 'PAN Card',
        nameHi: 'पैन कार्ड',
        description: 'Permanent Account Number card issued by Income Tax Department',
        descriptionHi: 'आयकर विभाग द्वारा जारी स्थायी खाता संख्या कार्ड',
        required: false,
        acceptedFormats: ['PDF', 'JPG', 'PNG'],
        maxSize: '5 MB',
        examples: ['Original PAN Card', 'E-PAN'],
        examplesHi: ['मूल पैन कार्ड', 'ई-पैन'],
        uploadStatus: 'uploaded' as const,
        uploadProgress: 100,
      },
      {
        id: 'passport',
        name: 'Passport',
        nameHi: 'पासपोर्ट',
        description: 'Valid Indian passport',
        descriptionHi: 'वैध भारतीय पासपोर्ट',
        required: false,
        acceptedFormats: ['PDF', 'JPG', 'PNG'],
        maxSize: '5 MB',
        examples: ['First and last page of passport', 'Valid passport with clear photo'],
        examplesHi: ['पासपोर्ट का पहला और अंतिम पन्ना', 'स्पष्ट फोटो के साथ वैध पासपोर्ट'],
        uploadStatus: 'rejected' as const,
        rejectionReason: 'Document image is not clear. Please upload a clearer image.',
        rejectionReasonHi: 'दस्तावेज़ की छवि स्पष्ट नहीं है। कृपया एक स्पष्ट छवि अपलोड करें।',
      },
    ],
  },
  {
    id: 'address',
    name: 'Address Proof',
    nameHi: 'पता प्रमाण',
    documents: [
      {
        id: 'electricity-bill',
        name: 'Electricity Bill',
        nameHi: 'बिजली बिल',
        description: 'Latest electricity bill (not older than 3 months)',
        descriptionHi: 'नवीनतम बिजली बिल (3 महीने से पुराना नहीं)',
        required: true,
        acceptedFormats: ['PDF', 'JPG', 'PNG'],
        maxSize: '5 MB',
        examples: ['Latest electricity bill', 'Online bill from electricity board'],
        examplesHi: ['नवीनतम बिजली बिल', 'बिजली बोर्ड से ऑनलाइन बिल'],
        uploadStatus: 'not_uploaded' as const,
      },
    ],
  },
];

interface DocumentUploadDetailScreenProps {
  onBack: () => void;
  categoryId?: string;
}

export const DocumentUploadDetailScreen = ({ onBack, categoryId = 'identity' }: DocumentUploadDetailScreenProps) => {
  const { currentLanguage, formatDate } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState(categoryId);
  const [showUploadModal, setShowUploadModal] = useState<string | null>(null);
  const [uploadingDocument, setUploadingDocument] = useState<string | null>(null);

  const currentCategory = documentCategories.find(cat => cat.id === selectedCategory);
  const documents = currentCategory?.documents || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-600 bg-green-50 border-green-200';
      case 'uploaded': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'rejected': return 'text-red-600 bg-red-50 border-red-200';
      case 'uploading': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'not_uploaded': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return CheckCircle;
      case 'uploaded': return CheckCircle;
      case 'rejected': return XCircle;
      case 'uploading': return AlertCircle;
      case 'not_uploaded': return FileText;
      default: return FileText;
    }
  };

  const getStatusText = (status: string) => {
    const statusTexts = {
      verified: { en: 'Verified', hi: 'सत्यापित' },
      uploaded: { en: 'Uploaded', hi: 'अपलोड किया गया' },
      rejected: { en: 'Rejected', hi: 'अस्वीकृत' },
      uploading: { en: 'Uploading', hi: 'अपलोड हो रहा है' },
      not_uploaded: { en: 'Not Uploaded', hi: 'अपलोड नहीं किया गया' },
    };
    return statusTexts[status as keyof typeof statusTexts]?.[currentLanguage.code as 'en' | 'hi'] || status;
  };

  const handleUpload = (documentId: string, method: 'camera' | 'gallery' | 'file') => {
    setUploadingDocument(documentId);
    setShowUploadModal(null);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress >= 100) {
        clearInterval(interval);
        setUploadingDocument(null);
        // Update document status
      }
    }, 200);
  };

  const renderUploadModal = (documentId: string) => (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-end justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={() => setShowUploadModal(null)}
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
            onClick={() => handleUpload(documentId, 'camera')}
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
            onClick={() => handleUpload(documentId, 'gallery')}
          >
            <FileText className="w-5 h-5" />
            <span>
              {currentLanguage.code === 'hi' ? 'गैलरी से चुनें' : 'Choose from Gallery'}
            </span>
          </GovButton>

          <GovButton
            variant="outline"
            size="lg"
            className="w-full justify-start"
            onClick={() => handleUpload(documentId, 'file')}
          >
            <Upload className="w-5 h-5" />
            <span>
              {currentLanguage.code === 'hi' ? 'फाइल अपलोड करें' : 'Upload File'}
            </span>
          </GovButton>
        </div>
      </motion.div>
    </motion.div>
  );

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
          <div>
            <h1 className="text-xl font-bold text-foreground">
              {currentLanguage.code === 'hi' 
                ? currentCategory?.nameHi || 'दस्तावेज़ अपलोड' 
                : currentCategory?.name || 'Upload Documents'
              }
            </h1>
            <p className="text-sm text-muted-foreground">
              {currentLanguage.code === 'hi' 
                ? 'आवश्यक दस्तावेज़ अपलोड करें' 
                : 'Upload required documents'
              }
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {documentCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors",
                selectedCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
              whileTap={{ scale: 0.95 }}
            >
              {currentLanguage.code === 'hi' ? category.nameHi : category.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Documents List */}
      <div className="p-4">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {documents.map((document, index) => {
            const StatusIcon = getStatusIcon(document.uploadStatus);
            const isUploading = uploadingDocument === document.id;
            
            return (
              <motion.div
                key={document.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card variant="elevated" className="p-6">
                  <div className="space-y-4">
                    {/* Document Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">
                            {currentLanguage.code === 'hi' ? document.nameHi : document.name}
                          </h3>
                          {document.required && (
                            <Badge variant="destructive" className="text-xs">
                              {currentLanguage.code === 'hi' ? 'आवश्यक' : 'Required'}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {currentLanguage.code === 'hi' ? document.descriptionHi : document.description}
                        </p>
                        
                        {/* Document Requirements */}
                        <div className="space-y-2 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-4">
                            <span>
                              {currentLanguage.code === 'hi' ? 'प्रारूप:' : 'Formats:'} {document.acceptedFormats.join(', ')}
                            </span>
                            <span>
                              {currentLanguage.code === 'hi' ? 'अधिकतम आकार:' : 'Max size:'} {document.maxSize}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">
                              {currentLanguage.code === 'hi' ? 'उदाहरण:' : 'Examples:'}
                            </span>
                            <span className="ml-1">
                              {(currentLanguage.code === 'hi' ? document.examplesHi : document.examples).join(', ')}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="ml-4">
                        <Badge 
                          className={cn(
                            "border",
                            getStatusColor(document.uploadStatus)
                          )}
                        >
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {getStatusText(document.uploadStatus)}
                        </Badge>
                      </div>
                    </div>

                    {/* Upload Progress */}
                    {isUploading && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>
                            {currentLanguage.code === 'hi' ? 'अपलोड हो रहा है...' : 'Uploading...'}
                          </span>
                          <span>
                            {document.uploadProgress || 0}%
                          </span>
                        </div>
                        <Progress value={document.uploadProgress || 0} className="h-2" />
                      </div>
                    )}

                    {/* Verification Info */}
                    {document.uploadStatus === 'verified' && document.verificationDate && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2 text-green-700">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {currentLanguage.code === 'hi' 
                              ? `${formatDate(document.verificationDate)} को सत्यापित` 
                              : `Verified on ${formatDate(document.verificationDate)}`
                            }
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Rejection Info */}
                    {document.uploadStatus === 'rejected' && document.rejectionReason && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex items-start space-x-2 text-red-700">
                          <XCircle className="w-4 h-4 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium mb-1">
                              {currentLanguage.code === 'hi' ? 'अस्वीकृति का कारण:' : 'Rejection Reason:'}
                            </p>
                            <p className="text-sm">
                              {currentLanguage.code === 'hi' ? document.rejectionReasonHi : document.rejectionReason}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center pt-2">
                      <div className="flex space-x-2">
                        {document.uploadStatus === 'uploaded' || document.uploadStatus === 'verified' ? (
                          <>
                            <GovButton variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                              <span>
                                {currentLanguage.code === 'hi' ? 'देखें' : 'View'}
                              </span>
                            </GovButton>
                            <GovButton variant="outline" size="sm">
                              <Download className="w-4 h-4" />
                              <span>
                                {currentLanguage.code === 'hi' ? 'डाउनलोड' : 'Download'}
                              </span>
                            </GovButton>
                          </>
                        ) : null}
                      </div>

                      <div className="flex space-x-2">
                        {document.uploadStatus === 'rejected' && (
                          <GovButton 
                            variant="outline" 
                            size="sm"
                            onClick={() => setShowUploadModal(document.id)}
                          >
                            <RotateCcw className="w-4 h-4" />
                            <span>
                              {currentLanguage.code === 'hi' ? 'पुनः अपलोड' : 'Re-upload'}
                            </span>
                          </GovButton>
                        )}
                        
                        {(document.uploadStatus === 'not_uploaded' || document.uploadStatus === 'rejected') && (
                          <GovButton 
                            variant="saffron" 
                            size="sm"
                            onClick={() => setShowUploadModal(document.id)}
                          >
                            <Upload className="w-4 h-4" />
                            <span>
                              {currentLanguage.code === 'hi' ? 'अपलोड करें' : 'Upload'}
                            </span>
                          </GovButton>
                        )}

                        {(document.uploadStatus === 'uploaded' || document.uploadStatus === 'verified') && !document.required && (
                          <GovButton variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                            <span>
                              {currentLanguage.code === 'hi' ? 'हटाएं' : 'Remove'}
                            </span>
                          </GovButton>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* No Documents */}
        {documents.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-muted-foreground mb-4">
              <FileText className="w-12 h-12 mx-auto mb-2" />
              <p>
                {currentLanguage.code === 'hi' 
                  ? 'इस श्रेणी में कोई दस्तावेज़ नहीं मिला' 
                  : 'No documents found in this category'
                }
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && renderUploadModal(showUploadModal)}
    </div>
  );
};