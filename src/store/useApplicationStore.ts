import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Application {
  id: string;
  type: string;
  status: 'submitted' | 'reviewing' | 'approved' | 'rejected' | 'pending_payment';
  date: string;
  lastUpdated: string;
  documents: string[];
  fees: number;
  trackingNumber: string;
  estimatedCompletion: string;
  statusHistory: {
    status: string;
    date: string;
    description: string;
  }[];
}

interface ApplicationState {
  applications: Application[];
  selectedApplication: Application | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  addApplication: (application: Omit<Application, 'id' | 'date' | 'lastUpdated'>) => void;
  updateApplication: (id: string, updates: Partial<Application>) => void;
  deleteApplication: (id: string) => void;
  setSelectedApplication: (application: Application | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  getApplicationsByStatus: (status: string) => Application[];
  searchApplications: (query: string) => Application[];
}

export const useApplicationStore = create<ApplicationState>()(
  persist(
    (set, get) => ({
      applications: [
        {
          id: "DL001",
          type: "Driving License",
          status: "reviewing",
          date: "2024-01-15",
          lastUpdated: "2024-01-18",
          documents: ["aadhaar_card.pdf", "address_proof.pdf"],
          fees: 500,
          trackingNumber: "DL2024001",
          estimatedCompletion: "2024-02-01",
          statusHistory: [
            { status: "submitted", date: "2024-01-15", description: "Application submitted successfully" },
            { status: "reviewing", date: "2024-01-18", description: "Documents under review" }
          ]
        },
        {
          id: "PAN002",
          type: "PAN Card",
          status: "approved",
          date: "2024-01-10",
          lastUpdated: "2024-01-20",
          documents: ["identity_proof.pdf", "address_proof.pdf"],
          fees: 110,
          trackingNumber: "PAN2024002",
          estimatedCompletion: "2024-01-25",
          statusHistory: [
            { status: "submitted", date: "2024-01-10", description: "Application submitted successfully" },
            { status: "reviewing", date: "2024-01-12", description: "Documents verification started" },
            { status: "approved", date: "2024-01-20", description: "Application approved, PAN card will be dispatched" }
          ]
        },
        {
          id: "PASS003",
          type: "Passport",
          status: "pending_payment",
          date: "2024-01-20",
          lastUpdated: "2024-01-22",
          documents: ["birth_certificate.pdf", "aadhaar_card.pdf"],
          fees: 1500,
          trackingNumber: "PASS2024003",
          estimatedCompletion: "2024-02-15",
          statusHistory: [
            { status: "submitted", date: "2024-01-20", description: "Application submitted successfully" },
            { status: "pending_payment", date: "2024-01-22", description: "Payment pending for processing" }
          ]
        }
      ],
      selectedApplication: null,
      loading: false,
      error: null,

      addApplication: (applicationData) => {
        const newApplication: Application = {
          ...applicationData,
          id: Date.now().toString(),
          date: new Date().toISOString().split('T')[0],
          lastUpdated: new Date().toISOString().split('T')[0],
          statusHistory: [
            {
              status: applicationData.status,
              date: new Date().toISOString().split('T')[0],
              description: "Application submitted successfully"
            }
          ]
        };
        
        set((state) => ({
          applications: [...state.applications, newApplication]
        }));
      },

      updateApplication: (id, updates) => {
        set((state) => ({
          applications: state.applications.map((app) =>
            app.id === id 
              ? { 
                  ...app, 
                  ...updates, 
                  lastUpdated: new Date().toISOString().split('T')[0],
                  statusHistory: updates.status && updates.status !== app.status 
                    ? [...app.statusHistory, {
                        status: updates.status,
                        date: new Date().toISOString().split('T')[0],
                        description: `Status updated to ${updates.status}`
                      }]
                    : app.statusHistory
                }
              : app
          )
        }));
      },

      deleteApplication: (id) => {
        set((state) => ({
          applications: state.applications.filter((app) => app.id !== id)
        }));
      },

      setSelectedApplication: (application) => {
        set({ selectedApplication: application });
      },

      setLoading: (loading) => {
        set({ loading });
      },

      setError: (error) => {
        set({ error });
      },

      getApplicationsByStatus: (status) => {
        return get().applications.filter((app) => app.status === status);
      },

      searchApplications: (query) => {
        const applications = get().applications;
        return applications.filter((app) =>
          app.type.toLowerCase().includes(query.toLowerCase()) ||
          app.trackingNumber.toLowerCase().includes(query.toLowerCase()) ||
          app.id.toLowerCase().includes(query.toLowerCase())
        );
      }
    }),
    {
      name: 'application-store',
      partialize: (state) => ({ 
        applications: state.applications,
        selectedApplication: state.selectedApplication 
      })
    }
  )
);