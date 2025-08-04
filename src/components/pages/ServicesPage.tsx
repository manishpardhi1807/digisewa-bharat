import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Car, Building, Award, FileText, Clock, Star, Users, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { GovButton } from '@/components/ui/government-button';
import { Card } from '@/components/ui/government-card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Service {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  processingTime: string;
  processingTimeHi: string;
  fee: number;
  documentsRequired: number;
  popularity: number;
  newService?: boolean;
}

const categories = [
  { id: 'all', name: 'All Services', nameHi: 'सभी सेवाएं', icon: FileText },
  { id: 'transport', name: 'Transport', nameHi: 'परिवहन', icon: Car },
  { id: 'business', name: 'Business', nameHi: 'व्यापार', icon: Building },
  { id: 'certificates', name: 'Certificates', nameHi: 'प्रमाणपत्र', icon: Award },
  { id: 'permits', name: 'Permits', nameHi: 'अनुमति', icon: FileText },
];

const services: Service[] = [
  {
    id: 'driving-license',
    name: 'Driving License',
    nameHi: 'ड्राइविंग लाइसेंस',
    description: 'Apply for new driving license or renewal',
    descriptionHi: 'नया ड्राइविंग लाइसेंस या नवीनीकरण के लिए आवेदन करें',
    category: 'transport',
    icon: Car,
    processingTime: '7-15 days',
    processingTimeHi: '7-15 दिन',
    fee: 500,
    documentsRequired: 5,
    popularity: 5,
  },
  {
    id: 'vehicle-registration',
    name: 'Vehicle Registration',
    nameHi: 'वाहन पंजीकरण',
    description: 'Register your new vehicle',
    descriptionHi: 'अपना नया वाहन पंजीकृत करें',
    category: 'transport',
    icon: Car,
    processingTime: '3-7 days',
    processingTimeHi: '3-7 दिन',
    fee: 750,
    documentsRequired: 6,
    popularity: 4,
  },
  {
    id: 'trade-license',
    name: 'Trade License',
    nameHi: 'व्यापार लाइसेंस',
    description: 'License for business operations',
    descriptionHi: 'व्यापारिक संचालन के लिए लाइसेंस',
    category: 'business',
    icon: Building,
    processingTime: '15-30 days',
    processingTimeHi: '15-30 दिन',
    fee: 1200,
    documentsRequired: 8,
    popularity: 4,
    newService: true,
  },
  {
    id: 'birth-certificate',
    name: 'Birth Certificate',
    nameHi: 'जन्म प्रमाणपत्र',
    description: 'Official birth certificate',
    descriptionHi: 'आधिकारिक जन्म प्रमाणपत्र',
    category: 'certificates',
    icon: Award,
    processingTime: '5-10 days',
    processingTimeHi: '5-10 दिन',
    fee: 100,
    documentsRequired: 3,
    popularity: 5,
  },
  {
    id: 'building-permit',
    name: 'Building Permit',
    nameHi: 'भवन निर्माण अनुमति',
    description: 'Permit for construction activities',
    descriptionHi: 'निर्माण गतिविधियों के लिए अनुमति',
    category: 'permits',
    icon: Building,
    processingTime: '30-45 days',
    processingTimeHi: '30-45 दिन',
    fee: 2500,
    documentsRequired: 12,
    popularity: 3,
  },
  {
    id: 'passport',
    name: 'Passport',
    nameHi: 'पासपोर्ट',
    description: 'Indian passport application',
    descriptionHi: 'भारतीय पासपोर्ट आवेदन',
    category: 'certificates',
    icon: Award,
    processingTime: '15-20 days',
    processingTimeHi: '15-20 दिन',
    fee: 1500,
    documentsRequired: 7,
    popularity: 5,
    newService: true,
  },
];

interface ServicesPageProps {
  onServiceSelect: (serviceId: string) => void;
}

export const ServicesPage = ({ onServiceSelect }: ServicesPageProps) => {
  const { t, currentLanguage, formatCurrency } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'popularity' | 'fee' | 'time'>('popularity');

  const filteredServices = services
    .filter(service => {
      const matchesSearch = 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.nameHi.includes(searchQuery) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.popularity - a.popularity;
        case 'fee':
          return a.fee - b.fee;
        case 'time':
          return a.processingTime.localeCompare(b.processingTime);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Search and Filter Section */}
      <div className="sticky top-16 z-30 bg-white border-b border-border p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder={currentLanguage.code === 'hi' ? 'सेवा खोजें...' : 'Search services...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-12"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Filter className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors",
                  isSelected 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {currentLanguage.code === 'hi' ? category.nameHi : category.name}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Sort Options */}
        <div className="flex gap-2">
          {[
            { key: 'popularity', label: 'Popular', labelHi: 'लोकप्रिय' },
            { key: 'fee', label: 'Low Fee', labelHi: 'कम शुल्क' },
            { key: 'time', label: 'Quick', labelHi: 'त्वरित' },
          ].map((option) => (
            <button
              key={option.key}
              onClick={() => setSortBy(option.key as any)}
              className={cn(
                "px-3 py-1 text-xs rounded-full transition-colors",
                sortBy === option.key
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {currentLanguage.code === 'hi' ? option.labelHi : option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="p-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredServices.map((service, index) => {
            const Icon = service.icon;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card
                  variant="elevated"
                  className="relative cursor-pointer transition-all duration-300 hover:shadow-saffron hover:scale-105"
                  onClick={() => onServiceSelect(service.id)}
                >
                  {/* New Service Badge */}
                  {service.newService && (
                    <Badge 
                      variant="destructive" 
                      className="absolute top-3 right-3 text-xs"
                    >
                      {currentLanguage.code === 'hi' ? 'नई' : 'New'}
                    </Badge>
                  )}

                  <div className="p-6 space-y-4">
                    {/* Service Header */}
                    <div className="flex items-start space-x-3">
                      <div className="p-3 bg-gradient-saffron rounded-lg">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg text-foreground truncate">
                          {currentLanguage.code === 'hi' ? service.nameHi : service.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {currentLanguage.code === 'hi' ? service.descriptionHi : service.description}
                        </p>
                      </div>
                    </div>

                    {/* Service Details */}
                    <div className="space-y-3">
                      {/* Processing Time */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>
                            {currentLanguage.code === 'hi' ? service.processingTimeHi : service.processingTime}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "w-3 h-3",
                                i < service.popularity 
                                  ? "text-yellow-400 fill-current" 
                                  : "text-gray-300"
                              )}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Fee and Documents */}
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-green-600">
                          {formatCurrency(service.fee)}
                        </span>
                        <div className="flex items-center space-x-1 text-muted-foreground">
                          <FileText className="w-4 h-4" />
                          <span>{service.documentsRequired} docs</span>
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
        {filteredServices.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-muted-foreground mb-4">
              <FileText className="w-12 h-12 mx-auto mb-2" />
              <p>
                {currentLanguage.code === 'hi' 
                  ? 'कोई सेवा नहीं मिली' 
                  : 'No services found'
                }
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};