import http from './http';
import type { Trailer, Truck } from '@/types';

export const fleetApi = {
  trucks() {
    return http.get<Truck[]>('/fleet/trucks');
  },
  trailers() {
    return http.get<Trailer[]>('/fleet/trailers');
  },
  maintenanceAlerts() {
    return http.get(`/fleet/maintenance-alerts`);
  }
};
