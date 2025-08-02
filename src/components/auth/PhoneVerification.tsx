import { useState } from 'react';
import { motion } from 'framer-motion';
import { GovButton } from '@/components/ui/government-button';
import { Card } from '@/components/ui/government-card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Smartphone, Send } from 'lucide-react';

interface PhoneVerificationProps {
  onComplete: (phoneNumber: string) => void;
  onBack: () => void;
}

export const PhoneVerification = ({ onComplete, onBack }: PhoneVerificationProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (phoneNumber.length === 10) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        onComplete(phoneNumber);
      }, 2000);
    }
  };

  const isValidPhone = phoneNumber.length === 10 && /^\d+$/.test(phoneNumber);

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
            <h1 className="text-2xl font-bold text-accent">Verify Mobile Number</h1>
            <p className="text-sm text-muted-foreground">मोबाइल नंबर सत्यापित करें</p>
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
            <div className="w-24 h-24 bg-gradient-saffron rounded-full mx-auto flex items-center justify-center mb-4">
              <Smartphone className="w-12 h-12 text-accent" />
            </div>
            <p className="text-muted-foreground">
              We'll send you a verification code to secure your account
            </p>
            <p className="text-sm text-muted-foreground">
              आपके खाते को सुरक्षित करने के लिए हम आपको सत्यापन कोड भेजेंगे
            </p>
          </motion.div>

          {/* Phone input form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card variant="elevated" size="lg">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-accent font-semibold">
                    Mobile Number / मोबाइल नंबर
                  </Label>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2 bg-muted px-3 py-2 rounded-md">
                      <span className="text-lg">🇮🇳</span>
                      <span className="font-semibold text-accent">+91</span>
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter 10-digit number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="flex-1 text-lg font-medium"
                      maxLength={10}
                    />
                  </div>
                  {phoneNumber.length > 0 && phoneNumber.length < 10 && (
                    <p className="text-sm text-destructive">
                      Please enter a valid 10-digit mobile number
                    </p>
                  )}
                </div>

                <div className="bg-info/10 border border-info/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-info rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-xs text-info-foreground font-bold">ℹ</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-info-foreground">
                        SMS charges may apply
                      </p>
                      <p className="text-xs text-info-foreground/80">
                        Standard messaging rates from your carrier may apply for verification SMS
                      </p>
                    </div>
                  </div>
                </div>

                <GovButton
                  variant="saffron"
                  size="xl"
                  className="w-full"
                  disabled={!isValidPhone || isLoading}
                  onClick={handleSubmit}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending OTP...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="w-5 h-5" />
                      <span>Send OTP / OTP भेजें</span>
                    </div>
                  )}
                </GovButton>
              </div>
            </Card>
          </motion.div>

          {/* Terms */}
          <motion.div
            className="text-center space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <p className="text-xs text-muted-foreground">
              By proceeding, you agree to our Terms of Service and Privacy Policy
            </p>
            <p className="text-xs text-muted-foreground">
              आगे बढ़कर, आप हमारी सेवा की शर्तों और गोपनीयता नीति से सहमत हैं
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};