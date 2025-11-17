import { defineStore } from 'pinia';
import { fleetApi } from '@/api/fleetApi';
import type { Trailer, Truck } from '@/types';

interface FleetState {
  trucks: Truck[];
  trailers: Trailer[];
  maintenanceAlerts: any[];
  loading: boolean;
}

export const useFleetStore = defineStore('fleet', {
  state: (): FleetState => ({
    trucks: [],
    trailers: [],
    maintenanceAlerts: [],
    loading: false
  }),
  actions: {
    async fetchFleet() {
      this.loading = true;
      try {
        const [{ data: trucks }, { data: trailers }, { data: alerts }] = await Promise.all([
          fleetApi.trucks(),
          fleetApi.trailers(),
          fleetApi.maintenanceAlerts()
        ]);
        this.trucks = trucks;
        this.trailers = trailers;
        this.maintenanceAlerts = alerts;
      } finally {
        this.loading = false;
      }
    }
  }
});
