import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GovButton } from '@/components/ui/government-button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import digitalIndiaHero from '@/assets/digital-india-hero.png';
import noOfficeVisits from '@/assets/no-office-visits.png';
import blockchainSecurity from '@/assets/blockchain-security.png';

interface OnboardingSlide {
  id: number;
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  image: string;
  backgroundColor: string;
}

const slides: OnboardingSlide[] = [
  {
    id: 1,
    title: "Welcome to Digital Government",
    titleHindi: "डिजिटल सरकार में आपका स्वागत है",
    description: "Apply for licenses from home",
    descriptionHindi: "घर से लाइसेंस के लिए आवेदन करें",
    image: digitalIndiaHero,
    backgroundColor: "bg-gradient-saffron"
  },
  {
    id: 2,
    title: "No More Office Visits",
    titleHindi: "अब कोई दफ्तर जाने की जरूरत नहीं",
    description: "Save time and money",
    descriptionHindi: "समय और पैसा बचाएं",
    image: noOfficeVisits,
    backgroundColor: "bg-gradient-navy"
  },
  {
    id: 3,
    title: "Secure & Transparent",
    titleHindi: "सुरक्षित और पारदर्शी",
    description: "Blockchain-powered security",
    descriptionHindi: "ब्लॉकचेन-संचालित सुरक्षा",
    image: blockchainSecurity,
    backgroundColor: "bg-gradient-to-br from-secondary to-background"
  },
  {
    id: 4,
    title: "Track Everything",
    titleHindi: "सब कुछ ट्रैक करें",
    description: "Real-time status updates",
    descriptionHindi: "वास्तविक समय स्थिति अपडेट",
    image: digitalIndiaHero,
    backgroundColor: "bg-gradient-gold"
  }
];

interface OnboardingCarouselProps {
  onComplete: () => void;
}

export const OnboardingCarousel = ({ onComplete }: OnboardingCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className={`min-h-screen ${slides[currentSlide].backgroundColor} flex flex-col justify-between`}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Skip button */}
          <div className="flex justify-end p-6">
            <GovButton
              variant="ghost"
              onClick={onComplete}
              className="text-accent/70 hover:text-accent"
            >
              Skip
            </GovButton>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-8">
            {/* Image */}
            <motion.div
              className="w-full max-w-sm mx-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-auto max-h-64 object-contain"
              />
            </motion.div>

            {/* Text content */}
            <motion.div
              className="space-y-4 max-w-md mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h1 className="text-3xl font-bold text-accent">
                {slides[currentSlide].title}
              </h1>
              <h2 className="text-xl font-semibold text-accent/80">
                {slides[currentSlide].titleHindi}
              </h2>
              <p className="text-lg text-accent/70">
                {slides[currentSlide].description}
              </p>
              <p className="text-base text-accent/60">
                {slides[currentSlide].descriptionHindi}
              </p>
            </motion.div>
          </div>

          {/* Bottom navigation */}
          <div className="p-6 space-y-6">
            {/* Dots indicator */}
            <div className="flex justify-center space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-accent w-8'
                      : 'bg-accent/30 hover:bg-accent/50'
                  }`}
                />
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center">
              <GovButton
                variant="ghost"
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className={`${currentSlide === 0 ? 'invisible' : 'visible'}`}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </GovButton>

              <GovButton
                variant="saffron"
                onClick={nextSlide}
                size="lg"
              >
                {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
                <ChevronRight className="w-4 h-4 ml-2" />
              </GovButton>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};