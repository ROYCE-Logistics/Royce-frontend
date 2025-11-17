import http from './http';
import type { Driver, LoadSummary } from '@/types';

export const driverApi = {
  list() {
    return http.get<Driver[]>('/drivers');
  },
  getById(id: string) {
    return http.get<Driver>(`/drivers/${id}`);
  },
  loads(id: string) {
    return http.get<LoadSummary[]>(`/drivers/${id}/loads`);
  }
};
