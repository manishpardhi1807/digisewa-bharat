import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, User, Calendar, MapPin, Phone, Upload, 
  Camera, FileText, CheckCircle, AlertCircle, CreditCard 
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { GovButton } from '@/components/ui/government-button';
import { Card } from '@/components/ui/government-card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type ApplicationStep = 'personal' | 'documents' | 'payment' | 'review';

interface DocumentUpload {
  id: string;
  name: string;
  nameHi: string;
  required: boolean;
  uploaded: boolean;
  verified: boolean;
}

const requiredDocuments: DocumentUpload[] = [
  { id: 'age-proof', name: 'Age Proof', nameHi: 'आयु प्रमाण', required: true, uploaded: false, verified: false },
  { id: 'address-proof', name: 'Address Proof', nameHi: 'पता प्रमाण', required: true, uploaded: false, verified: false },
  { id: 'identity-proof', name: 'Identity Proof', nameHi: 'पहचान प्रमाण', required: true, uploaded: false, verified: false },
  { id: 'photo', name: 'Passport Size Photo', nameHi: 'पासपोर्ट साइज़ फोटो', required: true, uploaded: false, verified: false },
  { id: 'medical', name: 'Medical Certificate', nameHi: 'चिकित्सा प्रमाणपत्र', required: true, uploaded: false, verified: false },
];

interface DrivingLicenseApplicationScreenProps {
  onBack: () => void;
  licenseType: string;
}

export const DrivingLicenseApplicationScreen = ({ onBack, licenseType }: DrivingLicenseApplicationScreenProps) => {
  const { currentLanguage, formatCurrency } = useLanguage();
  const [currentStep, setCurrentStep] = useState<ApplicationStep>('personal');
  const [documents, setDocuments] = useState<DocumentUpload[]>(requiredDocuments);
  
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    motherName: '',
    dateOfBirth: '',
    address: '',
    pincode: '',
    phone: '',
    email: '',
  });

  const steps = [
    { id: 'personal', name: 'Personal Info', nameHi: 'व्यक्तिगत जानकारी', progress: 25 },
    { id: 'documents', name: 'Documents', nameHi: 'दस्तावेज़', progress: 50 },
    { id: 'payment', name: 'Payment', nameHi: 'भुगतान', progress: 75 },
    { id: 'review', name: 'Review', nameHi: 'समीक्षा', progress: 100 },
  ];

  const currentStepData = steps.find(step => step.id === currentStep);
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  const handleDocumentUpload = (documentId: string) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === documentId 
        ? { ...doc, uploaded: true, verified: false }
        : doc
    ));
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 'personal':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold mb-2">
                {currentLanguage.code === 'hi' ? 'व्यक्तिगत जानकारी' : 'Personal Information'}
              </h2>
              <p className="text-muted-foreground">
                {currentLanguage.code === 'hi' 
                  ? 'अपनी व्यक्तिगत जानकारी भरें' 
                  : 'Fill in your personal information'
                }
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">
                  {currentLanguage.code === 'hi' ? 'पूरा नाम' : 'Full Name'}
                </Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  placeholder={currentLanguage.code === 'hi' ? 'आपका पूरा नाम' : 'Your full name'}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fatherName">
                    {currentLanguage.code === 'hi' ? 'पिता का नाम' : "Father's Name"}
                  </Label>
                  <Input
                    id="fatherName"
                    value={formData.fatherName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fatherName: e.target.value }))}
                    placeholder={currentLanguage.code === 'hi' ? 'पिता का नाम' : "Father's name"}
                  />
                </div>

                <div>
                  <Label htmlFor="motherName">
                    {currentLanguage.code === 'hi' ? 'माता का नाम' : "Mother's Name"}
                  </Label>
                  <Input
                    id="motherName"
                    value={formData.motherName}
                    onChange={(e) => setFormData(prev => ({ ...prev, motherName: e.target.value }))}
                    placeholder={currentLanguage.code === 'hi' ? 'माता का नाम' : "Mother's name"}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="dateOfBirth">
                  {currentLanguage.code === 'hi' ? 'जन्म तारीख' : 'Date of Birth'}
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="address">
                  {currentLanguage.code === 'hi' ? 'पूरा पता' : 'Full Address'}
                </Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder={currentLanguage.code === 'hi' ? 'आपका पूरा पता' : 'Your complete address'}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pincode">
                    {currentLanguage.code === 'hi' ? 'पिन कोड' : 'PIN Code'}
                  </Label>
                  <Input
                    id="pincode"
                    value={formData.pincode}
                    onChange={(e) => setFormData(prev => ({ ...prev, pincode: e.target.value }))}
                    placeholder={currentLanguage.code === 'hi' ? 'पिन कोड' : 'PIN Code'}
                  />
                </div>

                <div>
                  <Label htmlFor="phone">
                    {currentLanguage.code === 'hi' ? 'मोबाइल नंबर' : 'Mobile Number'}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder={currentLanguage.code === 'hi' ? 'मोबाइल नंबर' : 'Mobile number'}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'documents':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold mb-2">
                {currentLanguage.code === 'hi' ? 'दस्तावेज़ अपलोड' : 'Upload Documents'}
              </h2>
              <p className="text-muted-foreground">
                {currentLanguage.code === 'hi' 
                  ? 'आवश्यक दस्तावेज़ अपलोड करें' 
                  : 'Upload required documents'
                }
              </p>
            </div>

            <div className="space-y-4">
              {documents.map((document) => (
                <Card key={document.id} variant="elevated" className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={cn(
                        "p-2 rounded-lg",
                        document.uploaded ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                      )}>
                        {document.uploaded ? <CheckCircle className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                      </div>
                      <div>
                        <h3 className="font-medium">
                          {currentLanguage.code === 'hi' ? document.nameHi : document.name}
                        </h3>
                        {document.required && (
                          <Badge variant="destructive" className="text-xs mt-1">
                            {currentLanguage.code === 'hi' ? 'आवश्यक' : 'Required'}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      {!document.uploaded ? (
                        <>
                          <motion.button
                            onClick={() => handleDocumentUpload(document.id)}
                            className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                            whileTap={{ scale: 0.95 }}
                          >
                            <Camera className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            onClick={() => handleDocumentUpload(document.id)}
                            className="p-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                            whileTap={{ scale: 0.95 }}
                          >
                            <Upload className="w-4 h-4" />
                          </motion.button>
                        </>
                      ) : (
                        <div className="flex items-center space-x-2 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {currentLanguage.code === 'hi' ? 'अपलोड हो गया' : 'Uploaded'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold mb-2">
                {currentLanguage.code === 'hi' ? 'शुल्क भुगतान' : 'Fee Payment'}
              </h2>
              <p className="text-muted-foreground">
                {currentLanguage.code === 'hi' 
                  ? 'आवेदन शुल्क का भुगतान करें' 
                  : 'Pay the application fee'
                }
              </p>
            </div>

            <Card variant="saffron" className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                {currentLanguage.code === 'hi' ? 'शुल्क विवरण' : 'Fee Details'}
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{currentLanguage.code === 'hi' ? 'लाइसेंस शुल्क' : 'License Fee'}</span>
                  <span>{formatCurrency(500)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{currentLanguage.code === 'hi' ? 'सेवा शुल्क' : 'Service Charge'}</span>
                  <span>{formatCurrency(30)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{currentLanguage.code === 'hi' ? 'जीएसटी' : 'GST (18%)'}</span>
                  <span>{formatCurrency(95.40)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-bold text-lg">
                  <span>{currentLanguage.code === 'hi' ? 'कुल राशि' : 'Total Amount'}</span>
                  <span>{formatCurrency(625.40)}</span>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <h3 className="font-semibold">
                {currentLanguage.code === 'hi' ? 'भुगतान विधि' : 'Payment Method'}
              </h3>
              
              {[
                { id: 'upi', name: 'UPI', nameHi: 'यूपीआई', preferred: true },
                { id: 'card', name: 'Debit/Credit Card', nameHi: 'डेबिट/क्रेडिट कार्ड', preferred: false },
                { id: 'netbanking', name: 'Net Banking', nameHi: 'नेट बैंकिंग', preferred: false },
              ].map((method) => (
                <Card key={method.id} variant="elevated" className="p-4 cursor-pointer hover:bg-accent/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5" />
                      <span className="font-medium">
                        {currentLanguage.code === 'hi' ? method.nameHi : method.name}
                      </span>
                      {method.preferred && (
                        <Badge variant="secondary">
                          {currentLanguage.code === 'hi' ? 'सुझावित' : 'Recommended'}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'review':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold mb-2">
                {currentLanguage.code === 'hi' ? 'आवेदन समीक्षा' : 'Application Review'}
              </h2>
              <p className="text-muted-foreground">
                {currentLanguage.code === 'hi' 
                  ? 'अपनी जानकारी की जांच करें और सबमिट करें' 
                  : 'Review your information and submit'
                }
              </p>
            </div>

            <Card variant="elevated" className="p-6">
              <h3 className="font-semibold mb-4">
                {currentLanguage.code === 'hi' ? 'व्यक्तिगत जानकारी' : 'Personal Information'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">
                    {currentLanguage.code === 'hi' ? 'नाम:' : 'Name:'}
                  </span>
                  <span className="ml-2 font-medium">{formData.fullName || 'John Doe'}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">
                    {currentLanguage.code === 'hi' ? 'जन्म तारीख:' : 'Date of Birth:'}
                  </span>
                  <span className="ml-2 font-medium">{formData.dateOfBirth || '1990-01-01'}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">
                    {currentLanguage.code === 'hi' ? 'मोबाइल:' : 'Mobile:'}
                  </span>
                  <span className="ml-2 font-medium">{formData.phone || '+91 9876543210'}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">
                    {currentLanguage.code === 'hi' ? 'पिन कोड:' : 'PIN Code:'}
                  </span>
                  <span className="ml-2 font-medium">{formData.pincode || '110001'}</span>
                </div>
              </div>
            </Card>

            <Card variant="elevated" className="p-6">
              <h3 className="font-semibold mb-4">
                {currentLanguage.code === 'hi' ? 'दस्तावेज़ स्थिति' : 'Document Status'}
              </h3>
              <div className="space-y-2">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between">
                    <span className="text-sm">
                      {currentLanguage.code === 'hi' ? doc.nameHi : doc.name}
                    </span>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-green-600 font-medium">
                        {currentLanguage.code === 'hi' ? 'अपलोड' : 'Uploaded'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <GovButton variant="saffron" size="xl" className="w-full">
              {currentLanguage.code === 'hi' ? 'आवेदन जमा करें' : 'Submit Application'}
            </GovButton>
          </div>
        );

      default:
        return null;
    }
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1].id as ApplicationStep);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].id as ApplicationStep);
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
          <div>
            <h1 className="text-xl font-bold text-foreground">
              {currentLanguage.code === 'hi' ? 'ड्राइविंग लाइसेंस आवेदन' : 'Driving License Application'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {currentLanguage.code === 'hi' ? currentStepData?.nameHi : currentStepData?.name}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>
              {currentLanguage.code === 'hi' ? 'प्रगति' : 'Progress'}
            </span>
            <span>{currentStepData?.progress}%</span>
          </div>
          <Progress value={currentStepData?.progress || 0} className="h-2" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {getStepContent()}
        </motion.div>
      </div>

      {/* Navigation */}
      {currentStep !== 'review' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4">
          <div className="flex justify-between space-x-4">
            <GovButton
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStepIndex === 0}
              className="flex-1"
            >
              {currentLanguage.code === 'hi' ? 'पिछला' : 'Previous'}
            </GovButton>
            <GovButton
              variant="saffron"
              onClick={handleNext}
              disabled={currentStepIndex === steps.length - 1}
              className="flex-1"
            >
              {currentLanguage.code === 'hi' ? 'अगला' : 'Next'}
            </GovButton>
          </div>
        </div>
      )}
    </div>
  );
};