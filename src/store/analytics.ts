import { defineStore } from 'pinia';
import { analyticsApi } from '@/api/analyticsApi';
import type { AlertItem, KPIResponse, RevenueTrendPoint } from '@/types';

interface AnalyticsState {
  kpis: KPIResponse | null;
  revenueTrend: RevenueTrendPoint[];
  alerts: AlertItem[];
  activeDrivers: any[];
  aiInsights: string;
  loading: boolean;
}

export const useAnalyticsStore = defineStore('analytics', {
  state: (): AnalyticsState => ({
    kpis: null,
    revenueTrend: [],
    alerts: [],
    activeDrivers: [],
    aiInsights: '',
    loading: false
  }),
  actions: {
    async bootstrap() {
      this.loading = true;
      try {
        const [{ data: kpis }, { data: trend }, { data: alerts }, { data: drivers }, { data: insights }] =
          await Promise.all([
            analyticsApi.kpis(),
            analyticsApi.revenueTrend(),
            analyticsApi.alerts(),
            analyticsApi.activeDrivers(),
            analyticsApi.aiInsights()
          ]);
        this.kpis = kpis;
        this.revenueTrend = trend;
        this.alerts = alerts;
        this.activeDrivers = drivers;
        this.aiInsights = insights.message ?? JSON.stringify(insights);
      } finally {
        this.loading = false;
      }
    }
  }
});
