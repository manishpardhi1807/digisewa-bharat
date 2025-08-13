import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Car, Bike, Truck, Bus, Clock, Star, FileText, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { GovButton } from '@/components/ui/government-button';
import { Card } from '@/components/ui/government-card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface License {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  icon: React.ComponentType<{ className?: string }>;
  fee: number;
  processingTime: string;
  processingTimeHi: string;
  documentsRequired: number;
  popularity: number;
  category: 'transport' | 'business' | 'professional';
}

const licenses: License[] = [
  {
    id: 'driving-license-2w',
    name: 'Two Wheeler License',
    nameHi: 'दो पहिया लाइसेंस',
    description: 'License for motorcycles and scooters',
    descriptionHi: 'मोटरसाइकिल और स्कूटर के लिए लाइसेंस',
    icon: Bike,
    fee: 500,
    processingTime: '7-15 days',
    processingTimeHi: '7-15 दिन',
    documentsRequired: 5,
    popularity: 5,
    category: 'transport',
  },
  {
    id: 'driving-license-4w',
    name: 'Four Wheeler License',
    nameHi: 'चार पहिया लाइसेंस',
    description: 'License for cars and light vehicles',
    descriptionHi: 'कार और हल्के वाहनों के लिए लाइसेंस',
    icon: Car,
    fee: 750,
    processingTime: '7-15 days',
    processingTimeHi: '7-15 दिन',
    documentsRequired: 5,
    popularity: 5,
    category: 'transport',
  },
  {
    id: 'commercial-license',
    name: 'Commercial Vehicle License',
    nameHi: 'वाणिज्यिक वाहन लाइसेंस',
    description: 'License for commercial vehicles',
    descriptionHi: 'वाणिज्यिक वाहनों के लिए लाइसेंस',
    icon: Truck,
    fee: 1000,
    processingTime: '15-30 days',
    processingTimeHi: '15-30 दिन',
    documentsRequired: 8,
    popularity: 3,
    category: 'transport',
  },
  {
    id: 'heavy-vehicle-license',
    name: 'Heavy Vehicle License',
    nameHi: 'भारी वाहन लाइसेंस',
    description: 'License for buses and heavy trucks',
    descriptionHi: 'बस और भारी ट्रकों के लिए लाइसेंस',
    icon: Bus,
    fee: 1500,
    processingTime: '21-45 days',
    processingTimeHi: '21-45 दिन',
    documentsRequired: 10,
    popularity: 2,
    category: 'transport',
  },
];

interface LicenseSelectionScreenProps {
  onBack: () => void;
  onLicenseSelect: (licenseId: string) => void;
}

export const LicenseSelectionScreen = ({ onBack, onLicenseSelect }: LicenseSelectionScreenProps) => {
  const { currentLanguage, formatCurrency } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLicenses = licenses.filter(license =>
    license.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    license.nameHi.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-border p-4">
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
              {currentLanguage.code === 'hi' ? 'लाइसेंस चुनें' : 'Select License Type'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {currentLanguage.code === 'hi' 
                ? 'आवेदन करने के लिए लाइसेंस प्रकार चुनें' 
                : 'Choose the type of license to apply for'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <Input
          placeholder={currentLanguage.code === 'hi' ? 'लाइसेंस खोजें...' : 'Search licenses...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      {/* License Grid */}
      <div className="p-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredLicenses.map((license, index) => {
            const Icon = license.icon;
            
            return (
              <motion.div
                key={license.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card
                  variant="elevated"
                  className="cursor-pointer transition-all duration-300 hover:shadow-saffron hover:scale-105"
                  onClick={() => onLicenseSelect(license.id)}
                >
                  <div className="p-6 space-y-4">
                    {/* License Header */}
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-gradient-saffron rounded-lg">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground">
                          {currentLanguage.code === 'hi' ? license.nameHi : license.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {currentLanguage.code === 'hi' ? license.descriptionHi : license.description}
                        </p>
                      </div>
                    </div>

                    {/* License Details */}
                    <div className="space-y-3">
                      {/* Processing Time */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>
                            {currentLanguage.code === 'hi' ? license.processingTimeHi : license.processingTime}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < license.popularity 
                                  ? "text-yellow-400 fill-current" 
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Fee and Documents */}
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <p className="text-sm text-muted-foreground">
                            {currentLanguage.code === 'hi' ? 'शुल्क' : 'Fee'}
                          </p>
                          <p className="font-bold text-green-600">
                            {formatCurrency(license.fee)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">
                            {currentLanguage.code === 'hi' ? 'दस्तावेज़' : 'Documents'}
                          </p>
                          <div className="flex items-center space-x-1">
                            <FileText className="w-4 h-4" />
                            <span className="font-medium">{license.documentsRequired}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Apply Button */}
                    <GovButton
                      variant="saffron"
                      size="sm"
                      className="w-full"
                    >
                      <span>
                        {currentLanguage.code === 'hi' ? 'आवेदन करें' : 'Apply Now'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </GovButton>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* No Results */}
        {filteredLicenses.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-muted-foreground mb-4">
              <FileText className="w-12 h-12 mx-auto mb-2" />
              <p>
                {currentLanguage.code === 'hi' 
                  ? 'कोई लाइसेंस नहीं मिला' 
                  : 'No licenses found'
                }
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};