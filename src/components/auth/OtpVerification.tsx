import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { GovButton } from '@/components/ui/government-button';
import { Card } from '@/components/ui/government-card';
import { ArrowLeft, MessageSquare, RotateCcw } from 'lucide-react';

interface OtpVerificationProps {
  phoneNumber: string;
  onComplete: () => void;
  onBack: () => void;
}

export const OtpVerification = ({ phoneNumber, onComplete, onBack }: OtpVerificationProps) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all fields are filled
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
      setTimeout(() => verifyOtp(newOtp.join('')), 100);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyOtp = async (otpValue: string) => {
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (otpValue === '123456') {
        onComplete();
      } else {
        setError('Invalid OTP. Please try again.');
        // Shake animation for wrong OTP
        const inputs = inputRefs.current;
        inputs.forEach(input => {
          if (input) {
            input.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
              input.style.animation = '';
            }, 500);
          }
        });
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    }, 2000);
  };

  const handleResend = () => {
    setTimeLeft(30);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    setError('');
    inputRefs.current[0]?.focus();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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
            <h1 className="text-2xl font-bold text-accent">Enter OTP</h1>
            <p className="text-sm text-muted-foreground">OTP दर्ज करें</p>
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
            <div className="w-24 h-24 bg-gradient-navy rounded-full mx-auto flex items-center justify-center mb-4">
              <MessageSquare className="w-12 h-12 text-accent-foreground" />
            </div>
            <p className="text-muted-foreground">
              We've sent a 6-digit code to
            </p>
            <p className="font-semibold text-accent">+91 {phoneNumber}</p>
            <p className="text-sm text-muted-foreground mt-2">
              हमने 6 अंकों का कोड भेजा है
            </p>
          </motion.div>

          {/* OTP input form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card variant="elevated" size="lg">
              <div className="space-y-6">
                {/* OTP Input Fields */}
                <div className="space-y-4">
                  <div className="flex justify-center space-x-3">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ''))}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className={`w-12 h-14 text-center text-xl font-bold border-2 rounded-lg transition-all duration-300 ${
                          error 
                            ? 'border-destructive bg-destructive/10' 
                            : digit 
                            ? 'border-primary bg-primary/10' 
                            : 'border-border bg-background hover:border-primary/50'
                        } focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary`}
                      />
                    ))}
                  </div>
                  
                  {error && (
                    <motion.p
                      className="text-sm text-destructive text-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {error}
                    </motion.p>
                  )}
                </div>

                {/* Timer and Resend */}
                <div className="text-center space-y-3">
                  {!canResend ? (
                    <p className="text-sm text-muted-foreground">
                      Resend OTP in <span className="font-semibold text-gold">{formatTime(timeLeft)}</span>
                    </p>
                  ) : (
                    <GovButton
                      variant="outline"
                      onClick={handleResend}
                      className="text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Resend OTP / OTP पुनः भेजें
                    </GovButton>
                  )}
                </div>

                {/* Verify Button */}
                {otp.every(digit => digit !== '') && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <GovButton
                      variant="saffron"
                      size="xl"
                      className="w-full"
                      disabled={isLoading}
                      onClick={() => verifyOtp(otp.join(''))}
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Verifying...</span>
                        </div>
                      ) : (
                        'Verify OTP / OTP सत्यापित करें'
                      )}
                    </GovButton>
                  </motion.div>
                )}
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
              For demo purposes, use OTP: <span className="font-semibold">123456</span>
            </p>
            <p className="text-xs text-muted-foreground">
              Didn't receive the code? Check your SMS or try resending
            </p>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
};