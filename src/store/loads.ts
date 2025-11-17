import { defineStore } from 'pinia';
import { loadApi, type LoadFilters } from '@/api/loadApi';
import type { LoadDetail, LoadSummary } from '@/types';

interface LoadsState {
  records: LoadSummary[];
  selectedLoad: LoadDetail | null;
  loading: boolean;
  filters: LoadFilters;
}

const defaultFilters: LoadFilters = {
  status: undefined,
  page: 1,
  size: 10
};

export const useLoadsStore = defineStore('loads', {
  state: (): LoadsState => ({
    records: [],
    selectedLoad: null,
    loading: false,
    filters: { ...defaultFilters }
  }),
  actions: {
    async fetchLoads(customFilters?: LoadFilters) {
      this.loading = true;
      try {
        this.filters = { ...this.filters, ...customFilters };
        const { data } = await loadApi.list(this.filters);
        this.records = data;
      } finally {
        this.loading = false;
      }
    },
    async fetchLoad(id: string) {
      const { data } = await loadApi.getById(id);
      this.selectedLoad = data;
    },
    async changeStatus(id: string, status: string) {
      await loadApi.updateStatus(id, status);
      await this.fetchLoads();
    }
  }
});
