import { useState } from 'react';
import { motion } from 'framer-motion';
import { GovButton } from '@/components/ui/government-button';
import { Card } from '@/components/ui/government-card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Smartphone, Lock, Eye, EyeOff, Fingerprint } from 'lucide-react';
import governmentEmblem from '@/assets/government-emblem.png';

interface SignInProps {
  onSignInSuccess: () => void;
  onCreateAccount: () => void;
}

export const SignIn = ({ onSignInSuccess, onCreateAccount }: SignInProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (phoneNumber.length !== 10 || !password) {
      setError('Please enter valid credentials');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate sign in
    setTimeout(() => {
      setIsLoading(false);
      if (phoneNumber === '9876543210' && password === 'password123') {
        onSignInSuccess();
      } else {
        setError('Invalid phone number or password');
      }
    }, 2000);
  };

  const handleBiometricSignIn = () => {
    // Simulate biometric authentication
    onSignInSuccess();
  };

  const isFormValid = phoneNumber.length === 10 && password.length >= 6;

  return (
    <div className="min-h-screen bg-gradient-saffron relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9InJnYmEoMjU1LDE1MywgNTEsMC4wNSkiIGZpbGwtcnVsZT0ibm9uemVybyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
      
      <div className="relative z-10 p-4 min-h-screen flex flex-col">
        {/* Header */}
        <motion.div
          className="text-center py-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 bg-white rounded-full mx-auto p-2 shadow-elegant mb-4">
            <img src={governmentEmblem} alt="Government" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-accent">Welcome Back</h1>
          <h2 className="text-xl text-accent/80">वापस स्वागत है</h2>
          <p className="text-accent/70 mt-2">Sign in to your Digital Government account</p>
        </motion.div>

        {/* Main content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md space-y-6">
            {/* Sign in form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card variant="elevated" size="lg">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-foreground">Sign In</h3>
                    <p className="text-sm text-muted-foreground">साइन इन करें</p>
                  </div>

                  <div className="space-y-4">
                    {/* Phone Number */}
                    <div className="space-y-2">
                      <Label htmlFor="signin-phone" className="text-accent font-semibold flex items-center space-x-2">
                        <Smartphone className="w-4 h-4" />
                        <span>Mobile Number / मोबाइल नंबर</span>
                      </Label>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2 bg-muted px-3 py-2 rounded-md">
                          <span className="text-lg">🇮🇳</span>
                          <span className="font-semibold text-accent">+91</span>
                        </div>
                        <Input
                          id="signin-phone"
                          type="tel"
                          placeholder="Enter mobile number"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          className="flex-1 text-base"
                          maxLength={10}
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <Label htmlFor="signin-password" className="text-accent font-semibold flex items-center space-x-2">
                        <Lock className="w-4 h-4" />
                        <span>Password / पासवर्ड</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="signin-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="text-base pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-accent"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
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

                  {/* Sign in button */}
                  <GovButton
                    variant="saffron"
                    size="xl"
                    className="w-full"
                    disabled={!isFormValid || isLoading}
                    onClick={handleSubmit}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Signing In...</span>
                      </div>
                    ) : (
                      'Sign In / साइन इन करें'
                    )}
                  </GovButton>

                  {/* Biometric sign in */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">or</span>
                    </div>
                  </div>

                  <GovButton
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={handleBiometricSignIn}
                  >
                    <Fingerprint className="w-5 h-5 mr-2" />
                    Use Biometric / बायोमेट्रिक उपयोग करें
                  </GovButton>
                </div>
              </Card>
            </motion.div>

            {/* Create account */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <p className="text-accent/70">
                Don't have an account?{' '}
                <button
                  onClick={onCreateAccount}
                  className="font-semibold text-accent hover:underline"
                >
                  Create Account
                </button>
              </p>
              <p className="text-sm text-accent/60 mt-1">
                खाता नहीं है? खाता बनाएं
              </p>
            </motion.div>

            {/* Demo credentials */}
            <motion.div
              className="bg-white/10 border border-white/20 rounded-lg p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <p className="text-xs text-accent/70 text-center">
                Demo Credentials: Phone: <span className="font-semibold">9876543210</span>, Password: <span className="font-semibold">password123</span>
              </p>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          className="text-center py-4 space-y-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-xs text-accent/60">Government of India</p>
          <p className="text-xs text-accent/60">भारत सरकार</p>
        </motion.div>
      </div>
    </div>
  );
};