import { z } from 'zod';

export const personalInfoSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+91[6-9]\d{9}$/, 'Invalid Indian mobile number'),
  dateOfBirth: z.date().refine((date) => {
    const age = new Date().getFullYear() - date.getFullYear();
    return age >= 18 && age <= 100;
  }, 'Age must be between 18 and 100'),
  gender: z.enum(['male', 'female', 'other']),
  aadhaarNumber: z.string().regex(/^\d{4}\s?\d{4}\s?\d{4}$/, 'Invalid Aadhaar number'),
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number').optional()
});

export const addressSchema = z.object({
  addressLine1: z.string().min(5, 'Address line 1 must be at least 5 characters'),
  addressLine2: z.string().optional(),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'State must be at least 2 characters'),
  pincode: z.string().regex(/^\d{6}$/, 'Invalid pincode'),
  country: z.string().default('India')
});

export const drivingLicenseSchema = z.object({
  licenseType: z.enum(['two_wheeler', 'four_wheeler', 'commercial', 'heavy_vehicle']),
  previousLicense: z.boolean().default(false),
  previousLicenseNumber: z.string().optional(),
  medicalCertificate: z.boolean().default(false),
  personalInfo: personalInfoSchema,
  address: addressSchema,
  emergencyContact: z.object({
    name: z.string().min(2, 'Emergency contact name required'),
    phone: z.string().regex(/^\+91[6-9]\d{9}$/, 'Invalid phone number'),
    relation: z.string().min(2, 'Relation required')
  })
});

export const documentUploadSchema = z.object({
  documentType: z.enum(['identity', 'address', 'income', 'educational', 'medical', 'other']),
  fileName: z.string().min(1, 'File name required'),
  fileSize: z.number().max(10 * 1024 * 1024, 'File size must be less than 10MB'),
  fileType: z.enum(['pdf', 'jpg', 'jpeg', 'png']),
  description: z.string().optional()
});

export const paymentSchema = z.object({
  applicationId: z.string().min(1, 'Application ID required'),
  amount: z.number().positive('Amount must be positive'),
  paymentMethod: z.enum(['upi', 'netbanking', 'card', 'wallet']),
  upiId: z.string().optional(),
  cardDetails: z.object({
    cardNumber: z.string().regex(/^\d{16}$/, 'Invalid card number'),
    expiryMonth: z.number().min(1).max(12),
    expiryYear: z.number().min(new Date().getFullYear()),
    cvv: z.string().regex(/^\d{3,4}$/, 'Invalid CVV')
  }).optional()
});

export const feedbackSchema = z.object({
  rating: z.number().min(1).max(5, 'Rating must be between 1 and 5'),
  category: z.enum(['service_quality', 'website_usability', 'processing_time', 'staff_behavior', 'other']),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  anonymous: z.boolean().default(false)
});

export type PersonalInfoForm = z.infer<typeof personalInfoSchema>;
export type AddressForm = z.infer<typeof addressSchema>;
export type DrivingLicenseForm = z.infer<typeof drivingLicenseSchema>;
export type DocumentUploadForm = z.infer<typeof documentUploadSchema>;
export type PaymentForm = z.infer<typeof paymentSchema>;
export type FeedbackForm = z.infer<typeof feedbackSchema>;