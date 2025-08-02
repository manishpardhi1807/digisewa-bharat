import { useState } from 'react';
import { motion } from 'framer-motion';
import { GovButton } from '@/components/ui/government-button';
import { Card } from '@/components/ui/government-card';
import { ArrowLeft, Fingerprint, Scan, KeyRound, CheckCircle } from 'lucide-react';

interface BiometricSetupProps {
  onComplete: () => void;
  onBack: () => void;
}

type BiometricType = 'fingerprint' | 'face' | 'pin';

export const BiometricSetup = ({ onComplete, onBack }: BiometricSetupProps) => {
  const [selectedMethod, setSelectedMethod] = useState<BiometricType | null>(null);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const biometricOptions = [
    {
      type: 'fingerprint' as BiometricType,
      title: 'Fingerprint',
      titleHindi: 'फिंगरप्रिंट',
      description: 'Use your fingerprint to unlock',
      icon: Fingerprint,
      gradient: 'bg-gradient-saffron',
      available: true
    },
    {
      type: 'face' as BiometricType,
      title: 'Face ID',
      titleHindi: 'फेस ID',
      description: 'Use face recognition to unlock',
      icon: Scan,
      gradient: 'bg-gradient-navy',
      available: true
    },
    {
      type: 'pin' as BiometricType,
      title: 'PIN',
      titleHindi: 'पिन',
      description: 'Use 4-digit PIN as fallback',
      icon: KeyRound,
      gradient: 'bg-gradient-gold',
      available: true
    }
  ];

  const handleSetup = async (type: BiometricType) => {
    setSelectedMethod(type);
    setIsLoading(true);

    // Simulate biometric setup
    setTimeout(() => {
      setIsLoading(false);
      setIsSetupComplete(true);
      
      // Auto-complete after showing success
      setTimeout(() => {
        onComplete();
      }, 2000);
    }, 3000);
  };

  if (isSetupComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-24 h-24 bg-secondary rounded-full mx-auto flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="w-12 h-12 text-secondary-foreground" />
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold text-accent">Setup Complete!</h2>
            <p className="text-lg text-accent/80">सेटअप पूर्ण!</p>
            <p className="text-muted-foreground mt-2">
              Your biometric security has been configured successfully
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (isLoading && selectedMethod) {
    const selectedOption = biometricOptions.find(opt => opt.type === selectedMethod)!;
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className={`w-32 h-32 ${selectedOption.gradient} rounded-full mx-auto flex items-center justify-center`}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <selectedOption.icon className="w-16 h-16 text-accent" />
          </motion.div>
          <div>
            <h2 className="text-xl font-bold text-accent">Setting up {selectedOption.title}</h2>
            <p className="text-muted-foreground">Please follow the on-screen instructions</p>
            <div className="flex justify-center mt-4">
              <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

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
            <h1 className="text-2xl font-bold text-accent">Setup Biometric Security</h1>
            <p className="text-sm text-muted-foreground">बायोमेट्रिक सुरक्षा सेटअप करें</p>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="max-w-md mx-auto space-y-8">
          {/* Header info */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p className="text-muted-foreground">
              Choose your preferred method to secure your government account
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              अपने सरकारी खाते को सुरक्षित करने के लिए अपना पसंदीदा तरीका चुनें
            </p>
          </motion.div>

          {/* Biometric options */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {biometricOptions.map((option, index) => (
              <motion.div
                key={option.type}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <Card
                  variant="elevated"
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                    !option.available ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={() => option.available && handleSetup(option.type)}
                >
                  <div className="p-6 flex items-center space-x-4">
                    <div className={`w-16 h-16 ${option.gradient} rounded-xl flex items-center justify-center`}>
                      <option.icon className="w-8 h-8 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">
                        {option.title}
                      </h3>
                      <p className="text-sm font-medium text-accent/80">
                        {option.titleHindi}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {option.description}
                      </p>
                    </div>
                    <div className="w-6 h-6 border-2 border-primary rounded-full flex items-center justify-center">
                      {option.available && (
                        <div className="w-3 h-3 bg-primary rounded-full" />
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Security info */}
          <motion.div
            className="bg-secondary/10 border border-secondary/20 rounded-lg p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center mt-0.5">
                <CheckCircle className="w-3 h-3 text-secondary-foreground" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-secondary-foreground">
                  Secure & Private
                </p>
                <p className="text-xs text-secondary-foreground/80">
                  Your biometric data is stored locally on your device and never shared
                </p>
                <p className="text-xs text-secondary-foreground/80">
                  आपका बायोमेट्रिक डेटा आपके डिवाइस पर संग्रहीत है और कभी साझा नहीं किया जाता
                </p>
              </div>
            </div>
          </motion.div>

          {/* Skip option */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <GovButton
              variant="ghost"
              onClick={onComplete}
              className="text-muted-foreground hover:text-accent"
            >
              Skip for now / अभी के लिए छोड़ें
            </GovButton>
          </motion.div>
        </div>
      </div>
    </div>
  );
};