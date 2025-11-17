import { defineStore } from 'pinia';
import { driverApi } from '@/api/driverApi';
import type { Driver, LoadSummary } from '@/types';

interface DriversState {
  drivers: Driver[];
  selectedDriver: Driver | null;
  loads: LoadSummary[];
  loading: boolean;
}

export const useDriversStore = defineStore('drivers', {
  state: (): DriversState => ({
    drivers: [],
    selectedDriver: null,
    loads: [],
    loading: false
  }),
  actions: {
    async fetchDrivers() {
      this.loading = true;
      try {
        const { data } = await driverApi.list();
        this.drivers = data;
      } finally {
        this.loading = false;
      }
    },
    async viewDriver(id: string) {
      const [{ data: driver }, { data: loads }] = await Promise.all([
        driverApi.getById(id),
        driverApi.loads(id)
      ]);
      this.selectedDriver = driver;
      this.loads = loads;
    }
  }
});
