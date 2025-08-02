import { useState } from 'react';
import { motion } from 'framer-motion';
import { GovButton } from '@/components/ui/government-button';
import { Card } from '@/components/ui/government-card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, User, Mail, Calendar, MapPin, Upload, Camera } from 'lucide-react';

interface ProfileCreationProps {
  aadhaarNumber: string;
  phoneNumber: string;
  onComplete: () => void;
  onBack: () => void;
}

interface ProfileData {
  fullName: string;
  email: string;
  dateOfBirth: string;
  address: string;
  profilePhoto: string | null;
}

export const ProfileCreation = ({ aadhaarNumber, phoneNumber, onComplete, onBack }: ProfileCreationProps) => {
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: '',
    email: '',
    dateOfBirth: '',
    address: '',
    profilePhoto: null
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = () => {
    // Simulate photo upload
    const dummyPhotoUrl = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkY5OTMzIiByeD0iNTAiLz4KPHN2ZyB4PSIyNSIgeT0iMjUiIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMTIgMTJjMi4yMSAwIDQtMS43OSA0LTRzLTEuNzktNC00LTRTNCA3LjggNyAxMHMxLjc5IDQgNCA0em0wIDJjLTIuNjcgMC04IDEuMzQtOCA0djJoMTZ2LTJjMC0yLjY2LTUuMzMtNC04LTR6IiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPC9zdmc+";
    setProfileData(prev => ({ ...prev, profilePhoto: dummyPhotoUrl }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate profile creation
    setTimeout(() => {
      setIsLoading(false);
      onComplete();
    }, 2000);
  };

  const isFormValid = profileData.fullName && profileData.email && profileData.dateOfBirth && profileData.address;

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
            <h1 className="text-2xl font-bold text-accent">Complete Your Profile</h1>
            <p className="text-sm text-muted-foreground">अपनी प्रोफ़ाइल पूरी करें</p>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="max-w-md mx-auto space-y-6">
          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <Card variant="elevated">
              <div className="p-6 text-center space-y-4">
                <div className="relative mx-auto w-24 h-24">
                  {profileData.profilePhoto ? (
                    <img
                      src={profileData.profilePhoto}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-saffron rounded-full flex items-center justify-center">
                      <User className="w-12 h-12 text-accent" />
                    </div>
                  )}
                  <button
                    onClick={handlePhotoUpload}
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-saffron"
                  >
                    <Camera className="w-4 h-4 text-primary-foreground" />
                  </button>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Add Profile Photo</h3>
                  <p className="text-sm text-muted-foreground">प्रोफ़ाइल फ़ोटो जोड़ें</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Form Fields */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card variant="elevated">
              <div className="p-6 space-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-accent font-semibold flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Full Name / पूरा नाम</span>
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={profileData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="text-base"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-accent font-semibold flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Email Address / ईमेल पता</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="text-base"
                  />
                </div>

                {/* Date of Birth */}
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="text-accent font-semibold flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Date of Birth / जन्म तिथि</span>
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={profileData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="text-base"
                  />
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-accent font-semibold flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>Address / पता</span>
                  </Label>
                  <textarea
                    id="address"
                    placeholder="Enter your complete address"
                    value={profileData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full min-h-20 px-3 py-2 text-base border border-input rounded-md bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Linked Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card variant="cream">
              <div className="p-4 space-y-3">
                <h3 className="font-semibold text-foreground">Linked Information / लिंक की गई जानकारी</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Mobile Number:</span>
                    <span className="font-medium">+91 {phoneNumber}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Aadhaar Number:</span>
                    <span className="font-medium font-mono">
                      {aadhaarNumber.replace(/(\d{4})(\d{4})(\d{4})/, 'XXXX XXXX $3')}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
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
                  <span>Creating Profile...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Upload className="w-5 h-5" />
                  <span>Create Profile / प्रोफ़ाइल बनाएं</span>
                </div>
              )}
            </GovButton>
          </motion.div>

          {/* Privacy notice */}
          <motion.div
            className="text-center space-y-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <p className="text-xs text-muted-foreground">
              Your information is secure and protected by government encryption
            </p>
            <p className="text-xs text-muted-foreground">
              आपकी जानकारी सुरक्षित है और सरकारी एन्क्रिप्शन द्वारा संरक्षित है
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};