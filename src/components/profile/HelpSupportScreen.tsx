import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Phone, Mail, MessageCircle, HelpCircle, Search, ChevronRight, Clock, ExternalLink, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { GovButton } from '@/components/ui/government-button';
import { Card } from '@/components/ui/government-card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface HelpSupportScreenProps {
  onBack: () => void;
}

interface FAQ {
  question: string;
  questionHi: string;
  answer: string;
  answerHi: string;
  category: string;
}

interface SupportTicket {
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
}

const faqs: FAQ[] = [
  {
    question: 'How do I track my application?',
    questionHi: 'मैं अपने आवेदन को कैसे ट्रैक करूं?',
    answer: 'You can track your application by entering your application ID in the "Track Application" section.',
    answerHi: 'आप "ट्रैक एप्लिकेशन" सेक्शन में अपना एप्लिकेशन आईडी डालकर अपने आवेदन को ट्रैक कर सकते हैं।',
    category: 'applications',
  },
  {
    question: 'What documents do I need for a driving license?',
    questionHi: 'ड्राइविंग लाइसेंस के लिए मुझे कौन से दस्तावेज़ चाहिए?',
    answer: 'You need Aadhaar card, address proof, age proof, passport size photos, and medical certificate.',
    answerHi: 'आपको आधार कार्ड, पता प्रमाण, आयु प्रमाण, पासपोर्ट साइज़ फोटो, और मेडिकल सर्टिफिकेट चाहिए।',
    category: 'documents',
  },
  {
    question: 'How long does verification take?',
    questionHi: 'सत्यापन में कितना समय लगता है?',
    answer: 'Document verification typically takes 2-5 business days depending on the service.',
    answerHi: 'दस्तावेज़ सत्यापन आमतौर पर सेवा के आधार पर 2-5 कार्य दिवस लगते हैं।',
    category: 'general',
  },
  {
    question: 'Can I modify my application after submission?',
    questionHi: 'क्या मैं जमा करने के बाद अपने आवेदन में संशोधन कर सकता हूं?',
    answer: 'Minor changes can be made within 24 hours of submission. Major changes require a new application.',
    answerHi: 'जमा करने के 24 घंटे के भीतर मामूली बदलाव किए जा सकते हैं। बड़े बदलावों के लिए नया आवेदन चाहिए।',
    category: 'applications',
  },
  {
    question: 'What payment methods are accepted?',
    questionHi: 'कौन से भुगतान तरीके स्वीकार किए जाते हैं?',
    answer: 'We accept UPI, debit/credit cards, net banking, and mobile wallets.',
    answerHi: 'हम UPI, डेबिट/क्रेडिट कार्ड, नेट बैंकिंग, और मोबाइल वॉलेट स्वीकार करते हैं।',
    category: 'payments',
  },
];

const supportChannels = [
  {
    type: 'phone',
    title: 'Phone Support',
    titleHi: 'फोन सहायता',
    description: 'Call our helpline for immediate assistance',
    descriptionHi: 'तत्काल सहायता के लिए हमारी हेल्पलाइन पर कॉल करें',
    contact: '1800-123-4567',
    hours: '9 AM - 6 PM (Mon-Fri)',
    hoursHi: 'सुबह 9 - शाम 6 (सोम-शुक्र)',
    icon: Phone,
  },
  {
    type: 'email',
    title: 'Email Support',
    titleHi: 'ईमेल सहायता',
    description: 'Send us your queries via email',
    descriptionHi: 'ईमेल के माध्यम से अपने प्रश्न भेजें',
    contact: 'support@digitalindia.gov.in',
    hours: 'Response within 24 hours',
    hoursHi: '24 घंटे के भीतर उत्तर',
    icon: Mail,
  },
  {
    type: 'chat',
    title: 'Live Chat',
    titleHi: 'लाइव चैट',
    description: 'Chat with our support team',
    descriptionHi: 'हमारी सहायता टीम के साथ चैट करें',
    contact: 'Available on website',
    hours: '24/7 Available',
    hoursHi: '24/7 उपलब्ध',
    icon: MessageCircle,
  },
];

export const HelpSupportScreen = ({ onBack }: HelpSupportScreenProps) => {
  const { currentLanguage } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'faq' | 'contact' | 'ticket'>('faq');
  const [ticket, setTicket] = useState<SupportTicket>({
    subject: '',
    message: '',
    priority: 'medium',
  });

  const filteredFAQs = faqs.filter(faq =>
    (currentLanguage.code === 'hi' ? faq.questionHi : faq.question)
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
    (currentLanguage.code === 'hi' ? faq.answerHi : faq.answer)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleSubmitTicket = () => {
    // Submit support ticket
    console.log('Submitting ticket:', ticket);
    setTicket({ subject: '', message: '', priority: 'medium' });
  };

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
              {currentLanguage.code === 'hi' ? 'सहायता और समर्थन' : 'Help & Support'}
            </h1>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 z-30 bg-white border-b border-border p-4">
        <div className="flex gap-2">
          {[
            { key: 'faq', label: 'FAQ', labelHi: 'प्रश्न उत्तर' },
            { key: 'contact', label: 'Contact', labelHi: 'संपर्क' },
            { key: 'ticket', label: 'Support Ticket', labelHi: 'सहायता टिकट' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {currentLanguage.code === 'hi' ? tab.labelHi : tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* FAQ Section */}
        {activeTab === 'faq' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder={currentLanguage.code === 'hi' ? 'प्रश्न खोजें...' : 'Search questions...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* FAQ List */}
            <Card variant="elevated" className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                {currentLanguage.code === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}
              </h3>
              
              <Accordion type="single" collapsible className="space-y-2">
                {filteredFAQs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center space-x-2">
                        <HelpCircle className="w-4 h-4 text-primary" />
                        <span>{currentLanguage.code === 'hi' ? faq.questionHi : faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {currentLanguage.code === 'hi' ? faq.answerHi : faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {filteredFAQs.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <HelpCircle className="w-12 h-12 mx-auto mb-2" />
                  <p>{currentLanguage.code === 'hi' ? 'कोई प्रश्न नहीं मिला' : 'No questions found'}</p>
                </div>
              )}
            </Card>
          </motion.div>
        )}

        {/* Contact Section */}
        {activeTab === 'contact' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {supportChannels.map((channel) => {
              const Icon = channel.icon;
              
              return (
                <Card key={channel.type} variant="elevated" className="p-6 cursor-pointer hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">
                        {currentLanguage.code === 'hi' ? channel.titleHi : channel.title}
                      </h3>
                      <p className="text-muted-foreground mb-2">
                        {currentLanguage.code === 'hi' ? channel.descriptionHi : channel.description}
                      </p>
                      <div className="space-y-1 text-sm">
                        <p className="font-medium">{channel.contact}</p>
                        <div className="flex items-center space-x-1 text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{currentLanguage.code === 'hi' ? channel.hoursHi : channel.hours}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </Card>
              );
            })}

            {/* Additional Resources */}
            <Card variant="elevated" className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                {currentLanguage.code === 'hi' ? 'अतिरिक्त संसाधन' : 'Additional Resources'}
              </h3>
              <div className="space-y-3">
                {[
                  { 
                    title: 'User Guide', 
                    titleHi: 'उपयोगकर्ता गाइड',
                    url: '/user-guide'
                  },
                  { 
                    title: 'Video Tutorials', 
                    titleHi: 'वीडियो ट्यूटोरियल',
                    url: '/tutorials'
                  },
                  { 
                    title: 'Service Status', 
                    titleHi: 'सेवा स्थिति',
                    url: '/status'
                  },
                ].map((resource, index) => (
                  <button
                    key={index}
                    className="flex items-center justify-between w-full p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                  >
                    <span className="font-medium">
                      {currentLanguage.code === 'hi' ? resource.titleHi : resource.title}
                    </span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Support Ticket Section */}
        {activeTab === 'ticket' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card variant="elevated" className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                {currentLanguage.code === 'hi' ? 'सहायता टिकट बनाएं' : 'Create Support Ticket'}
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {currentLanguage.code === 'hi' ? 'विषय' : 'Subject'}
                  </label>
                  <Input
                    placeholder={currentLanguage.code === 'hi' ? 'अपनी समस्या का संक्षिप्त विवरण' : 'Brief description of your issue'}
                    value={ticket.subject}
                    onChange={(e) => setTicket({ ...ticket, subject: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {currentLanguage.code === 'hi' ? 'प्राथमिकता' : 'Priority'}
                  </label>
                  <div className="flex gap-2">
                    {[
                      { key: 'low', label: 'Low', labelHi: 'कम', color: 'bg-green-100 text-green-700' },
                      { key: 'medium', label: 'Medium', labelHi: 'मध्यम', color: 'bg-yellow-100 text-yellow-700' },
                      { key: 'high', label: 'High', labelHi: 'उच्च', color: 'bg-red-100 text-red-700' },
                    ].map((priority) => (
                      <button
                        key={priority.key}
                        onClick={() => setTicket({ ...ticket, priority: priority.key as any })}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          ticket.priority === priority.key
                            ? priority.color
                            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                        }`}
                      >
                        {currentLanguage.code === 'hi' ? priority.labelHi : priority.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {currentLanguage.code === 'hi' ? 'संदेश' : 'Message'}
                  </label>
                  <Textarea
                    placeholder={currentLanguage.code === 'hi' 
                      ? 'अपनी समस्या का विस्तृत विवरण प्रदान करें...'
                      : 'Provide detailed description of your issue...'
                    }
                    value={ticket.message}
                    onChange={(e) => setTicket({ ...ticket, message: e.target.value })}
                    className="min-h-[120px]"
                  />
                </div>

                <GovButton
                  variant="saffron"
                  size="lg"
                  className="w-full"
                  onClick={handleSubmitTicket}
                  disabled={!ticket.subject || !ticket.message}
                >
                  <Send className="w-4 h-4" />
                  <span>{currentLanguage.code === 'hi' ? 'टिकट जमा करें' : 'Submit Ticket'}</span>
                </GovButton>
              </div>
            </Card>

            {/* Tips */}
            <Card variant="elevated" className="p-6">
              <h4 className="font-semibold mb-3">
                {currentLanguage.code === 'hi' ? 'त्वरित सहायता के लिए सुझाव' : 'Tips for Quick Help'}
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• {currentLanguage.code === 'hi' 
                  ? 'अपना आवेदन आईडी शामिल करें'
                  : 'Include your application ID'
                }</li>
                <li>• {currentLanguage.code === 'hi' 
                  ? 'स्क्रीनशॉट या त्रुटि संदेश संलग्न करें'
                  : 'Attach screenshots or error messages'
                }</li>
                <li>• {currentLanguage.code === 'hi' 
                  ? 'समस्या के चरणों का वर्णन करें'
                  : 'Describe the steps that led to the issue'
                }</li>
              </ul>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};