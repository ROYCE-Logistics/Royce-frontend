import http from './http';
import type { LoadDetail, LoadSummary } from '@/types';

export interface LoadFilters {
  status?: string;
  dateRange?: { start: string; end: string };
  customer?: string;
  amazonOnly?: boolean;
  page?: number;
  size?: number;
}

export const loadApi = {
  list(filters: LoadFilters) {
    return http.get<LoadSummary[]>('/loads', { params: filters });
  },
  getById(id: string) {
    return http.get<LoadDetail>(`/loads/${id}`);
  },
  updateStatus(id: string, status: string) {
    return http.patch(`/loads/${id}/status`, { status });
  },
  assignResources(id: string, payload: { driverId: string; truckId: string }) {
    return http.post(`/loads/${id}/assign`, payload);
  }
};
