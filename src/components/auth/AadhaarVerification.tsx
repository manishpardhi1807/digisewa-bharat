import { useState } from 'react';
import { motion } from 'framer-motion';
import { GovButton } from '@/components/ui/government-button';
import { Card } from '@/components/ui/government-card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Shield, Check, AlertCircle } from 'lucide-react';

interface AadhaarVerificationProps {
  onComplete: (aadhaarNumber: string) => void;
  onBack: () => void;
}

export const AadhaarVerification = ({ onComplete, onBack }: AadhaarVerificationProps) => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const formatAadhaar = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    // Add spaces after every 4 digits
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  };

  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatAadhaar(value);
    setAadhaarNumber(formatted);
    setError('');
  };

  const validateAadhaar = (aadhaar: string) => {
    const digits = aadhaar.replace(/\s/g, '');
    if (digits.length !== 12) return false;
    
    // Simple Verhoeff algorithm check (simplified for demo)
    return /^\d{12}$/.test(digits);
  };

  const handleSubmit = async () => {
    const cleanAadhaar = aadhaarNumber.replace(/\s/g, '');
    
    if (!validateAadhaar(aadhaarNumber)) {
      setError('Please enter a valid 12-digit Aadhaar number');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate UIDAI verification
    setTimeout(() => {
      setIsLoading(false);
      if (cleanAadhaar === '123456789012') {
        onComplete(cleanAadhaar);
      } else {
        setError('Aadhaar verification failed. Please check your number.');
      }
    }, 3000);
  };

  const isValidAadhaar = validateAadhaar(aadhaarNumber);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9InJnYmEoMjU1LDE1MywgNTEsMC4wNSkiIGZpbGwtcnVsZT0ibm9uemVybyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
      
      <div className="relative z-10 p-4">
        {/* Header */}
        <motion.div
          className="flex items-center mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GovButton variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="w-5 h-5" />
          </GovButton>
          <div>
            <h1 className="text-2xl font-bold text-accent">Link Aadhaar</h1>
            <p className="text-sm text-muted-foreground">आधार लिंक करें</p>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="max-w-md mx-auto space-y-8">
          {/* Illustration */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="w-24 h-24 bg-gradient-to-br from-secondary to-accent rounded-full mx-auto flex items-center justify-center mb-4">
              <Shield className="w-12 h-12 text-secondary-foreground" />
            </div>
            <p className="text-muted-foreground">
              Secure identity verification with UIDAI
            </p>
            <p className="text-sm text-muted-foreground">
              UIDAI के साथ सुरक्षित पहचान सत्यापन
            </p>
          </motion.div>

          {/* Aadhaar input form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card variant="elevated" size="lg">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="aadhaar" className="text-accent font-semibold">
                    Aadhaar Number / आधार संख्या
                  </Label>
                  <div className="relative">
                    <Input
                      id="aadhaar"
                      type="text"
                      placeholder="XXXX XXXX XXXX"
                      value={aadhaarNumber}
                      onChange={handleAadhaarChange}
                      className={`text-lg font-mono tracking-wider pr-10 ${
                        error ? 'border-destructive' : 
                        isValidAadhaar ? 'border-secondary' : ''
                      }`}
                      maxLength={14} // 12 digits + 2 spaces
                    />
                    {isValidAadhaar && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Check className="w-5 h-5 text-secondary" />
                      </div>
                    )}
                  </div>
                  {error && (
                    <div className="flex items-center space-x-2 text-destructive">
                      <AlertCircle className="w-4 h-4" />
                      <p className="text-sm">{error}</p>
                    </div>
                  )}
                </div>

                {/* Security note */}
                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center mt-0.5">
                      <Shield className="w-3 h-3 text-secondary-foreground" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-secondary-foreground">
                        Your Aadhaar is secure
                      </p>
                      <p className="text-xs text-secondary-foreground/80">
                        Protected with 256-bit encryption and verified through UIDAI servers
                      </p>
                      <p className="text-xs text-secondary-foreground/80">
                        256-बिट एन्क्रिप्शन और UIDAI सर्वर के माध्यम से सत्यापित
                      </p>
                    </div>
                  </div>
                </div>

                <GovButton
                  variant="saffron"
                  size="xl"
                  className="w-full"
                  disabled={!isValidAadhaar || isLoading}
                  onClick={handleSubmit}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Verifying with UIDAI...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Shield className="w-5 h-5" />
                      <span>Verify with UIDAI / UIDAI से सत्यापित करें</span>
                    </div>
                  )}
                </GovButton>
              </div>
            </Card>
          </motion.div>

          {/* Help text */}
          <motion.div
            className="text-center space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <p className="text-xs text-muted-foreground">
              For demo purposes, use Aadhaar: <span className="font-semibold">1234 5678 9012</span>
            </p>
            <p className="text-xs text-muted-foreground">
              Don't have Aadhaar? Visit your nearest enrollment center
            </p>
            <p className="text-xs text-muted-foreground">
              आधार नहीं है? अपने निकटतम नामांकन केंद्र पर जाएं
            </p>
          </motion.div>

          {/* UIDAI badge */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-muted px-4 py-2 rounded-full">
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">UIDAI Verified</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};