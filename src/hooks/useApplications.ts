import { useApplicationStore } from '@/store/useApplicationStore';
import { useMemo } from 'react';

export const useApplications = () => {
  const store = useApplicationStore();

  const stats = useMemo(() => {
    const apps = store.applications;
    return {
      total: apps.length,
      pending: apps.filter(app => app.status === 'submitted' || app.status === 'reviewing').length,
      approved: apps.filter(app => app.status === 'approved').length,
      rejected: apps.filter(app => app.status === 'rejected').length,
      pendingPayment: apps.filter(app => app.status === 'pending_payment').length
    };
  }, [store.applications]);

  const recentApplications = useMemo(() => {
    return store.applications
      .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
      .slice(0, 3);
  }, [store.applications]);

  const getApplicationsByStatus = (status: string) => {
    return store.applications.filter(app => app.status === status);
  };

  const searchApplications = (query: string) => {
    if (!query.trim()) return store.applications;
    return store.searchApplications(query);
  };

  return {
    ...store,
    stats,
    recentApplications,
    getApplicationsByStatus,
    searchApplications
  };
};