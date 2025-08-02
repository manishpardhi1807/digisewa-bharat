import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import governmentEmblem from '@/assets/government-emblem.png';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-saffron flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIGZpbGwtcnVsZT0ibm9uemVybyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
      
      {/* Main content */}
      <div className="text-center space-y-8 z-10">
        {/* Government Emblem with rotation animation */}
        <motion.div
          className="flex justify-center"
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <div className="w-32 h-32 bg-white rounded-full p-4 shadow-elegant">
            <img 
              src={governmentEmblem} 
              alt="Government Emblem" 
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>

        {/* App Title */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-accent">Digital India</h1>
          <h2 className="text-2xl font-semibold text-accent">डिजिटल इंडिया</h2>
          <p className="text-lg text-accent/80">Government Services Portal</p>
        </motion.div>

        {/* Loading progress */}
        <motion.div
          className="w-64 mx-auto space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="w-full bg-white/20 rounded-full h-2">
            <motion.div 
              className="bg-secondary h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <p className="text-accent text-sm">Loading... {Math.round(progress)}%</p>
        </motion.div>

        {/* Government tagline */}
        <motion.div
          className="space-y-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <p className="text-accent/70 text-sm">Government of India</p>
          <p className="text-accent/70 text-sm">भारत सरकार</p>
        </motion.div>
      </div>

      {/* Bottom decorative elements */}
      <motion.div
        className="absolute bottom-10 left-0 right-0 flex justify-center space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        {[...Array(3)].map((_, i) => (
          <div key={i} className="w-2 h-2 bg-secondary rounded-full animate-pulse" 
               style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
      </motion.div>
    </div>
  );
};