import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, CreditCard, Smartphone, Building, 
  CheckCircle, Clock, AlertCircle, Shield, Receipt,
  Download, Share, Phone, History
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { GovButton } from '@/components/ui/government-button';
import { Card } from '@/components/ui/government-card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface PaymentMethod {
  id: string;
  name: string;
  nameHi: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  descriptionHi: string;
  recommended?: boolean;
  processingTime: string;
  processingTimeHi: string;
}

interface Transaction {
  id: string;
  service: string;
  serviceHi: string;
  amount: number;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
  method: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'upi',
    name: 'UPI Payment',
    nameHi: 'यूपीआई भुगतान',
    icon: Smartphone,
    description: 'Pay using any UPI app like PhonePe, Google Pay, Paytm',
    descriptionHi: 'PhonePe, Google Pay, Paytm जैसे किसी भी UPI ऐप से भुगतान करें',
    recommended: true,
    processingTime: 'Instant',
    processingTimeHi: 'तुरंत',
  },
  {
    id: 'card',
    name: 'Debit/Credit Card',
    nameHi: 'डेबिट/क्रेडिट कार्ड',
    icon: CreditCard,
    description: 'Pay using your debit or credit card',
    descriptionHi: 'अपने डेबिट या क्रेडिट कार्ड से भुगतान करें',
    processingTime: 'Instant',
    processingTimeHi: 'तुरंत',
  },
  {
    id: 'netbanking',
    name: 'Net Banking',
    nameHi: 'नेट बैंकिंग',
    icon: Building,
    description: 'Pay directly from your bank account',
    descriptionHi: 'अपने बैंक खाते से सीधे भुगतान करें',
    processingTime: '2-5 minutes',
    processingTimeHi: '2-5 मिनट',
  },
];

const recentTransactions: Transaction[] = [
  {
    id: 'TXN001',
    service: 'Driving License',
    serviceHi: 'ड्राइविंग लाइसेंस',
    amount: 625.40,
    date: new Date('2024-01-15'),
    status: 'completed',
    method: 'UPI',
  },
  {
    id: 'TXN002',
    service: 'PAN Card',
    serviceHi: 'पैन कार्ड',
    amount: 110,
    date: new Date('2024-01-10'),
    status: 'completed',
    method: 'Card',
  },
];

type PaymentFlow = 'select' | 'payment' | 'processing' | 'success' | 'history';

interface PaymentScreenProps {
  onBack: () => void;
  initialFlow?: PaymentFlow;
  serviceType?: string;
  amount?: number;
}

export const PaymentScreen = ({ 
  onBack, 
  initialFlow = 'select', 
  serviceType = 'Driving License',
  amount = 625.40 
}: PaymentScreenProps) => {
  const { currentLanguage, formatCurrency, formatDate } = useLanguage();
  const [currentFlow, setCurrentFlow] = useState<PaymentFlow>(initialFlow);
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [paymentData, setPaymentData] = useState({
    upiId: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    selectedBank: '',
  });

  const serviceDetails = {
    name: serviceType,
    nameHi: 'ड्राइविंग लाइसेंस',
    baseFee: 500,
    serviceFee: 30,
    gst: 95.40,
    convenienceFee: 0,
    total: amount,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'failed': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'pending': return Clock;
      case 'failed': return AlertCircle;
      default: return Clock;
    }
  };

  const renderMethodSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">
          {currentLanguage.code === 'hi' ? 'भुगतान विधि चुनें' : 'Select Payment Method'}
        </h2>
        <p className="text-muted-foreground">
          {currentLanguage.code === 'hi' 
            ? 'अपनी पसंदीदा भुगतान विधि चुनें' 
            : 'Choose your preferred payment method'
          }
        </p>
      </div>

      {/* Service Fee Breakdown */}
      <Card variant="saffron" className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          {currentLanguage.code === 'hi' ? 'शुल्क विवरण' : 'Fee Details'}
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>{currentLanguage.code === 'hi' ? serviceDetails.nameHi : serviceDetails.name}</span>
            <span>{formatCurrency(serviceDetails.baseFee)}</span>
          </div>
          <div className="flex justify-between">
            <span>{currentLanguage.code === 'hi' ? 'सेवा शुल्क' : 'Service Charge'}</span>
            <span>{formatCurrency(serviceDetails.serviceFee)}</span>
          </div>
          <div className="flex justify-between">
            <span>{currentLanguage.code === 'hi' ? 'जीएसटी (18%)' : 'GST (18%)'}</span>
            <span>{formatCurrency(serviceDetails.gst)}</span>
          </div>
          {serviceDetails.convenienceFee > 0 && (
            <div className="flex justify-between">
              <span>{currentLanguage.code === 'hi' ? 'सुविधा शुल्क' : 'Convenience Fee'}</span>
              <span>{formatCurrency(serviceDetails.convenienceFee)}</span>
            </div>
          )}
          <hr className="my-2" />
          <div className="flex justify-between font-bold text-lg">
            <span>{currentLanguage.code === 'hi' ? 'कुल राशि' : 'Total Amount'}</span>
            <span>{formatCurrency(serviceDetails.total)}</span>
          </div>
        </div>
      </Card>

      {/* Payment Methods */}
      <div className="space-y-3">
        <h3 className="font-semibold">
          {currentLanguage.code === 'hi' ? 'भुगतान विधि' : 'Payment Methods'}
        </h3>
        
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;
          
          return (
            <motion.div
              key={method.id}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                variant="elevated" 
                className={cn(
                  "p-4 cursor-pointer transition-all",
                  isSelected ? "ring-2 ring-primary bg-primary/5" : "hover:bg-accent/5"
                )}
                onClick={() => setSelectedMethod(method.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={cn(
                      "p-2 rounded-lg",
                      isSelected ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">
                          {currentLanguage.code === 'hi' ? method.nameHi : method.name}
                        </h4>
                        {method.recommended && (
                          <Badge variant="secondary" className="text-xs">
                            {currentLanguage.code === 'hi' ? 'सुझावित' : 'Recommended'}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {currentLanguage.code === 'hi' ? method.descriptionHi : method.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {currentLanguage.code === 'hi' ? 'प्रसंस्करण:' : 'Processing:'} {' '}
                        {currentLanguage.code === 'hi' ? method.processingTimeHi : method.processingTime}
                      </p>
                    </div>
                  </div>
                  
                  <div className={cn(
                    "w-4 h-4 rounded-full border-2 transition-colors",
                    isSelected 
                      ? "border-primary bg-primary" 
                      : "border-muted-foreground/30"
                  )}>
                    {isSelected && (
                      <div className="w-full h-full rounded-full bg-white scale-50" />
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Security Notice */}
      <Card variant="elevated" className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-800">
              {currentLanguage.code === 'hi' ? 'सुरक्षित भुगतान' : 'Secure Payment'}
            </h4>
            <p className="text-sm text-blue-700">
              {currentLanguage.code === 'hi' 
                ? 'आपका भुगतान 256-बिट SSL एन्क्रिप्शन द्वारा सुरक्षित है' 
                : 'Your payment is secured with 256-bit SSL encryption'
              }
            </p>
          </div>
        </div>
      </Card>

      {/* Continue Button */}
      <GovButton
        variant="saffron"
        size="xl"
        className="w-full"
        disabled={!selectedMethod}
        onClick={() => setCurrentFlow('payment')}
      >
        {currentLanguage.code === 'hi' ? 'भुगतान जारी रखें' : 'Continue to Payment'}
      </GovButton>
    </div>
  );

  const renderPaymentForm = () => {
    const selectedMethodData = paymentMethods.find(m => m.id === selectedMethod);
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">
            {currentLanguage.code === 'hi' 
              ? selectedMethodData?.nameHi 
              : selectedMethodData?.name
            }
          </h2>
          <p className="text-muted-foreground">
            {currentLanguage.code === 'hi' 
              ? `${formatCurrency(serviceDetails.total)} का भुगतान करें` 
              : `Pay ${formatCurrency(serviceDetails.total)}`
            }
          </p>
        </div>

        {/* Payment Form based on selected method */}
        {selectedMethod === 'upi' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="upiId">
                {currentLanguage.code === 'hi' ? 'UPI ID दर्ज करें' : 'Enter UPI ID'}
              </Label>
              <Input
                id="upiId"
                value={paymentData.upiId}
                onChange={(e) => setPaymentData(prev => ({ ...prev, upiId: e.target.value }))}
                placeholder={currentLanguage.code === 'hi' ? 'yourname@upi' : 'yourname@upi'}
              />
            </div>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                {currentLanguage.code === 'hi' ? 'या QR कोड स्कैन करें' : 'Or scan QR code'}
              </p>
              <div className="w-48 h-48 bg-gray-100 rounded-lg mx-auto flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <div className="w-16 h-16 bg-black/10 rounded mx-auto mb-2" />
                  <p className="text-xs">QR Code</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedMethod === 'card' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">
                {currentLanguage.code === 'hi' ? 'कार्ड नंबर' : 'Card Number'}
              </Label>
              <Input
                id="cardNumber"
                value={paymentData.cardNumber}
                onChange={(e) => setPaymentData(prev => ({ ...prev, cardNumber: e.target.value }))}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">
                  {currentLanguage.code === 'hi' ? 'समाप्ति तारीख' : 'Expiry Date'}
                </Label>
                <Input
                  id="expiryDate"
                  value={paymentData.expiryDate}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, expiryDate: e.target.value }))}
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>
              
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  type="password"
                  value={paymentData.cvv}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, cvv: e.target.value }))}
                  placeholder="123"
                  maxLength={4}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="cardholderName">
                {currentLanguage.code === 'hi' ? 'कार्डधारक का नाम' : 'Cardholder Name'}
              </Label>
              <Input
                id="cardholderName"
                value={paymentData.cardholderName}
                onChange={(e) => setPaymentData(prev => ({ ...prev, cardholderName: e.target.value }))}
                placeholder={currentLanguage.code === 'hi' ? 'कार्ड पर नाम' : 'Name on card'}
              />
            </div>
          </div>
        )}

        {selectedMethod === 'netbanking' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="bank">
                {currentLanguage.code === 'hi' ? 'अपना बैंक चुनें' : 'Select Your Bank'}
              </Label>
              <select 
                className="w-full p-3 border border-input rounded-md bg-background"
                value={paymentData.selectedBank}
                onChange={(e) => setPaymentData(prev => ({ ...prev, selectedBank: e.target.value }))}
              >
                <option value="">
                  {currentLanguage.code === 'hi' ? 'बैंक चुनें' : 'Choose Bank'}
                </option>
                <option value="sbi">State Bank of India</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="icici">ICICI Bank</option>
                <option value="axis">Axis Bank</option>
                <option value="pnb">Punjab National Bank</option>
              </select>
            </div>
            
            <Card variant="elevated" className="p-4 bg-yellow-50 border-yellow-200">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800">
                    {currentLanguage.code === 'hi' ? 'महत्वपूर्ण सूचना' : 'Important Notice'}
                  </h4>
                  <p className="text-sm text-yellow-700">
                    {currentLanguage.code === 'hi' 
                      ? 'आपको अपने बैंक की वेबसाइट पर रीडायरेक्ट किया जाएगा' 
                      : 'You will be redirected to your bank website'
                    }
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <GovButton
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={() => setCurrentFlow('select')}
          >
            {currentLanguage.code === 'hi' ? 'वापस' : 'Back'}
          </GovButton>
          
          <GovButton
            variant="saffron"
            size="lg"
            className="flex-1"
            onClick={() => setCurrentFlow('processing')}
          >
            {currentLanguage.code === 'hi' ? 'भुगतान करें' : 'Pay Now'}
          </GovButton>
        </div>
      </div>
    );
  };

  const renderProcessing = () => (
    <div className="text-center space-y-6">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto"
      />
      
      <div>
        <h2 className="text-xl font-semibold mb-2">
          {currentLanguage.code === 'hi' ? 'भुगतान प्रक्रिया में...' : 'Processing Payment...'}
        </h2>
        <p className="text-muted-foreground">
          {currentLanguage.code === 'hi' 
            ? 'कृपया प्रतीक्षा करें, आपका भुगतान प्रक्रिया में है' 
            : 'Please wait while we process your payment'
          }
        </p>
      </div>

      <Card variant="elevated" className="p-4 text-left">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>{currentLanguage.code === 'hi' ? 'सेवा:' : 'Service:'}</span>
            <span>{currentLanguage.code === 'hi' ? serviceDetails.nameHi : serviceDetails.name}</span>
          </div>
          <div className="flex justify-between">
            <span>{currentLanguage.code === 'hi' ? 'राशि:' : 'Amount:'}</span>
            <span>{formatCurrency(serviceDetails.total)}</span>
          </div>
          <div className="flex justify-between">
            <span>{currentLanguage.code === 'hi' ? 'विधि:' : 'Method:'}</span>
            <span>{paymentMethods.find(m => m.id === selectedMethod)?.name}</span>
          </div>
        </div>
      </Card>

      {/* Auto redirect to success after 3 seconds */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        onAnimationComplete={() => setTimeout(() => setCurrentFlow('success'), 1000)}
      />
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center space-y-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto"
      >
        <CheckCircle className="w-12 h-12 text-green-600" />
      </motion.div>

      <div>
        <h2 className="text-xl font-semibold mb-2 text-green-600">
          {currentLanguage.code === 'hi' ? 'भुगतान सफल!' : 'Payment Successful!'}
        </h2>
        <p className="text-muted-foreground">
          {currentLanguage.code === 'hi' 
            ? 'आपका भुगतान सफलतापूर्वक प्रक्रिया हो गया है' 
            : 'Your payment has been processed successfully'
          }
        </p>
      </div>

      {/* Transaction Details */}
      <Card variant="elevated" className="p-6 text-left">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">
            {currentLanguage.code === 'hi' ? 'लेनदेन विवरण' : 'Transaction Details'}
          </h3>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            {currentLanguage.code === 'hi' ? 'सफल' : 'Success'}
          </Badge>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {currentLanguage.code === 'hi' ? 'लेनदेन ID:' : 'Transaction ID:'}
            </span>
            <span className="font-medium">TXN789123456</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {currentLanguage.code === 'hi' ? 'सेवा:' : 'Service:'}
            </span>
            <span className="font-medium">
              {currentLanguage.code === 'hi' ? serviceDetails.nameHi : serviceDetails.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {currentLanguage.code === 'hi' ? 'राशि:' : 'Amount:'}
            </span>
            <span className="font-medium">{formatCurrency(serviceDetails.total)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {currentLanguage.code === 'hi' ? 'तारीख:' : 'Date:'}
            </span>
            <span className="font-medium">{formatDate(new Date())}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {currentLanguage.code === 'hi' ? 'भुगतान विधि:' : 'Payment Method:'}
            </span>
            <span className="font-medium">
              {paymentMethods.find(m => m.id === selectedMethod)?.name}
            </span>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <div className="flex space-x-3">
          <GovButton variant="outline" size="lg" className="flex-1">
            <Download className="w-4 h-4" />
            <span>
              {currentLanguage.code === 'hi' ? 'रसीद डाउनलोड' : 'Download Receipt'}
            </span>
          </GovButton>
          
          <GovButton variant="outline" size="lg" className="flex-1">
            <Share className="w-4 h-4" />
            <span>
              {currentLanguage.code === 'hi' ? 'साझा करें' : 'Share'}
            </span>
          </GovButton>
        </div>

        <GovButton variant="saffron" size="xl" className="w-full" onClick={onBack}>
          {currentLanguage.code === 'hi' ? 'डैशबोर्ड पर वापस जाएं' : 'Back to Dashboard'}
        </GovButton>
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">
          {currentLanguage.code === 'hi' ? 'भुगतान इतिहास' : 'Payment History'}
        </h2>
        <p className="text-muted-foreground">
          {currentLanguage.code === 'hi' 
            ? 'आपके पिछले भुगतान और लेनदेन' 
            : 'Your previous payments and transactions'
          }
        </p>
      </div>

      <div className="space-y-3">
        {recentTransactions.map((transaction, index) => {
          const StatusIcon = getStatusIcon(transaction.status);
          
          return (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="elevated" className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Receipt className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {currentLanguage.code === 'hi' ? transaction.serviceHi : transaction.service}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>ID: {transaction.id}</span>
                        <span>•</span>
                        <span>{formatDate(transaction.date)}</span>
                        <span>•</span>
                        <span>{transaction.method}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(transaction.amount)}</p>
                    <div className="flex items-center space-x-1">
                      <StatusIcon className={cn("w-4 h-4", getStatusColor(transaction.status))} />
                      <Badge className={cn("text-xs", getStatusColor(transaction.status))}>
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {recentTransactions.length === 0 && (
        <div className="text-center py-8">
          <Receipt className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground">
            {currentLanguage.code === 'hi' 
              ? 'कोई भुगतान इतिहास नहीं मिला' 
              : 'No payment history found'
            }
          </p>
        </div>
      )}
    </div>
  );

  const getFlowContent = () => {
    switch (currentFlow) {
      case 'select':
        return renderMethodSelection();
      case 'payment':
        return renderPaymentForm();
      case 'processing':
        return renderProcessing();
      case 'success':
        return renderSuccess();
      case 'history':
        return renderHistory();
      default:
        return renderMethodSelection();
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={onBack}
              className="p-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                {currentLanguage.code === 'hi' ? 'भुगतान' : 'Payment'}
              </h1>
              <p className="text-sm text-muted-foreground">
                {currentFlow === 'history'
                  ? (currentLanguage.code === 'hi' ? 'भुगतान इतिहास' : 'Payment History')
                  : (currentLanguage.code === 'hi' ? 'सुरक्षित भुगतान' : 'Secure Payment')
                }
              </p>
            </div>
          </div>

          {currentFlow !== 'history' && (
            <motion.button
              onClick={() => setCurrentFlow('history')}
              className="p-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <History className="w-5 h-5" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <motion.div
          key={currentFlow}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {getFlowContent()}
        </motion.div>
      </div>
    </div>
  );
};