import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit, Save, X, User, Phone, Mail, MapPin, Calendar, IdCard } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { GovButton } from '@/components/ui/government-button';
import { Card } from '@/components/ui/government-card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface PersonalInformationScreenProps {
  onBack: () => void;
}

interface UserProfile {
  fullName: string;
  fullNameHi: string;
  email: string;
  phone: string;
  aadhaarNumber: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  addressHi: string;
  pincode: string;
  emergencyContact: string;
  emergencyContactName: string;
}

export const PersonalInformationScreen = ({ onBack }: PersonalInformationScreenProps) => {
  const { currentLanguage } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    fullName: 'Rajesh Kumar',
    fullNameHi: 'राजेश कुमार',
    email: 'rajesh.kumar@email.com',
    phone: '+91 98765 43210',
    aadhaarNumber: '1234 5678 9012',
    dateOfBirth: '1985-05-15',
    gender: 'Male',
    address: '123, MG Road, New Delhi',
    addressHi: '123, एमजी रोड, नई दिल्ली',
    pincode: '110001',
    emergencyContact: '+91 98765 43211',
    emergencyContactName: 'Priya Kumar',
  });

  const handleSave = () => {
    // Save profile data
    setIsEditing(false);
    // Show success toast
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data
  };

  const profileFields = [
    {
      key: 'fullName',
      label: 'Full Name',
      labelHi: 'पूरा नाम',
      icon: User,
      type: 'text',
    },
    {
      key: 'email',
      label: 'Email Address',
      labelHi: 'ईमेल पता',
      icon: Mail,
      type: 'email',
    },
    {
      key: 'phone',
      label: 'Phone Number',
      labelHi: 'फोन नंबर',
      icon: Phone,
      type: 'tel',
    },
    {
      key: 'aadhaarNumber',
      label: 'Aadhaar Number',
      labelHi: 'आधार संख्या',
      icon: IdCard,
      type: 'text',
      masked: true,
    },
    {
      key: 'dateOfBirth',
      label: 'Date of Birth',
      labelHi: 'जन्म तिथि',
      icon: Calendar,
      type: 'date',
    },
    {
      key: 'address',
      label: 'Address',
      labelHi: 'पता',
      icon: MapPin,
      type: 'textarea',
    },
    {
      key: 'pincode',
      label: 'PIN Code',
      labelHi: 'पिन कोड',
      icon: MapPin,
      type: 'text',
    },
    {
      key: 'emergencyContactName',
      label: 'Emergency Contact Name',
      labelHi: 'आपातकालीन संपर्क नाम',
      icon: User,
      type: 'text',
    },
    {
      key: 'emergencyContact',
      label: 'Emergency Contact Number',
      labelHi: 'आपातकालीन संपर्क नंबर',
      icon: Phone,
      type: 'tel',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <GovButton variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </GovButton>
            <h1 className="text-lg font-semibold">
              {currentLanguage.code === 'hi' ? 'व्यक्तिगत जानकारी' : 'Personal Information'}
            </h1>
          </div>
          {!isEditing ? (
            <GovButton variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Edit className="w-4 h-4" />
              <span>{currentLanguage.code === 'hi' ? 'संपादित करें' : 'Edit'}</span>
            </GovButton>
          ) : (
            <div className="flex space-x-2">
              <GovButton variant="ghost" size="sm" onClick={handleCancel}>
                <X className="w-4 h-4" />
              </GovButton>
              <GovButton variant="saffron" size="sm" onClick={handleSave}>
                <Save className="w-4 h-4" />
              </GovButton>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Photo */}
        <Card variant="elevated" className="p-6">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 bg-gradient-saffron rounded-full mx-auto flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                {currentLanguage.code === 'hi' ? profile.fullNameHi : profile.fullName}
              </h2>
              <p className="text-muted-foreground">{profile.phone}</p>
            </div>
            {isEditing && (
              <GovButton variant="outline" size="sm">
                {currentLanguage.code === 'hi' ? 'फोटो बदलें' : 'Change Photo'}
              </GovButton>
            )}
          </div>
        </Card>

        {/* Profile Fields */}
        <Card variant="elevated" className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {currentLanguage.code === 'hi' ? 'व्यक्तिगत विवरण' : 'Personal Details'}
          </h3>
          <div className="space-y-4">
            {profileFields.map((field) => {
              const Icon = field.icon;
              const value = profile[field.key as keyof UserProfile];
              
              return (
                <motion.div
                  key={field.key}
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Label className="flex items-center space-x-2 text-sm font-medium">
                    <Icon className="w-4 h-4 text-primary" />
                    <span>{currentLanguage.code === 'hi' ? field.labelHi : field.label}</span>
                  </Label>
                  
                  {isEditing ? (
                    field.type === 'textarea' ? (
                      <Textarea
                        value={value}
                        onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                        className="min-h-[80px]"
                      />
                    ) : (
                      <Input
                        type={field.type}
                        value={value}
                        onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                      />
                    )
                  ) : (
                    <div className="p-3 bg-secondary rounded-lg">
                      <p className="text-sm">
                        {field.masked && field.key === 'aadhaarNumber' 
                          ? `**** **** ${value.slice(-4)}`
                          : value
                        }
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </Card>

        {/* Verification Status */}
        <Card variant="elevated" className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {currentLanguage.code === 'hi' ? 'सत्यापन स्थिति' : 'Verification Status'}
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Phone Number', labelHi: 'फोन नंबर', verified: true },
              { label: 'Email Address', labelHi: 'ईमेल पता', verified: true },
              { label: 'Aadhaar Number', labelHi: 'आधार संख्या', verified: true },
              { label: 'Address', labelHi: 'पता', verified: false },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <span className="text-sm font-medium">
                  {currentLanguage.code === 'hi' ? item.labelHi : item.label}
                </span>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.verified 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {item.verified 
                    ? (currentLanguage.code === 'hi' ? 'सत्यापित' : 'Verified')
                    : (currentLanguage.code === 'hi' ? 'लंबित' : 'Pending')
                  }
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};