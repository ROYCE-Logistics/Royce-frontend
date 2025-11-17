import http from './http';
import type { AlertItem, KPIResponse, RevenueTrendPoint } from '@/types';

export const analyticsApi = {
  kpis() {
    return http.get<KPIResponse>('/analytics/kpis');
  },
  revenueTrend() {
    return http.get<RevenueTrendPoint[]>('/analytics/revenue-trend', {
      params: { range: '7d' }
    });
  },
  alerts() {
    return http.get<AlertItem[]>('/analytics/alerts');
  },
  activeDrivers() {
    return http.get('/analytics/active-drivers');
  },
  aiInsights() {
    return http.get('/analytics/ai/insights');
  }
};
