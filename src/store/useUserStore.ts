import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  aadhaarNumber: string;
  panNumber?: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  documents: {
    id: string;
    name: string;
    type: string;
    url: string;
    uploadDate: string;
    verified: boolean;
  }[];
  preferences: {
    language: string;
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    theme: 'light' | 'dark' | 'auto';
  };
  securitySettings: {
    twoFactorEnabled: boolean;
    biometricEnabled: boolean;
    lastPasswordChange: string;
    loginHistory: {
      date: string;
      device: string;
      location: string;
    }[];
  };
}

interface UserState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: UserProfile) => void;
  updateUser: (updates: Partial<UserProfile>) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addDocument: (document: Omit<UserProfile['documents'][0], 'id' | 'uploadDate'>) => void;
  removeDocument: (documentId: string) => void;
  updateSecuritySettings: (settings: Partial<UserProfile['securitySettings']>) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: {
        id: "user_001",
        name: "राहुल शर्मा",
        email: "rahul.sharma@email.com",
        phone: "+91 9876543210",
        aadhaarNumber: "1234-5678-9012",
        panNumber: "ABCDE1234F",
        address: {
          street: "123 Main Street, Sector 15",
          city: "New Delhi",
          state: "Delhi",
          pincode: "110001"
        },
        documents: [
          {
            id: "doc_001",
            name: "Aadhaar Card",
            type: "identity",
            url: "/documents/aadhaar.pdf",
            uploadDate: "2024-01-10",
            verified: true
          },
          {
            id: "doc_002",
            name: "PAN Card",
            type: "identity",
            url: "/documents/pan.pdf",
            uploadDate: "2024-01-12",
            verified: true
          }
        ],
        preferences: {
          language: "hi",
          notifications: {
            email: true,
            sms: true,
            push: true
          },
          theme: "light"
        },
        securitySettings: {
          twoFactorEnabled: false,
          biometricEnabled: true,
          lastPasswordChange: "2024-01-01",
          loginHistory: [
            {
              date: "2024-01-22",
              device: "Mobile - Chrome",
              location: "New Delhi, India"
            },
            {
              date: "2024-01-20",
              device: "Desktop - Firefox",
              location: "New Delhi, India"
            }
          ]
        }
      },
      isAuthenticated: true,
      loading: false,
      error: null,

      setUser: (user) => {
        set({ user, isAuthenticated: true });
      },

      updateUser: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null
        }));
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      setLoading: (loading) => {
        set({ loading });
      },

      setError: (error) => {
        set({ error });
      },

      addDocument: (documentData) => {
        const newDocument = {
          ...documentData,
          id: Date.now().toString(),
          uploadDate: new Date().toISOString().split('T')[0]
        };

        set((state) => ({
          user: state.user 
            ? {
                ...state.user,
                documents: [...state.user.documents, newDocument]
              }
            : null
        }));
      },

      removeDocument: (documentId) => {
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                documents: state.user.documents.filter(doc => doc.id !== documentId)
              }
            : null
        }));
      },

      updateSecuritySettings: (settings) => {
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                securitySettings: { ...state.user.securitySettings, ...settings }
              }
            : null
        }));
      }
    }),
    {
      name: 'user-store',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
);