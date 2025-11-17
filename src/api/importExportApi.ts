import http from './http';
import type { ImportJob } from '@/types';

export const importExportApi = {
  upload(resource: string, payload: FormData) {
    return http.post(`/import/${resource}`, payload, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  jobs() {
    return http.get<ImportJob[]>('/import/jobs');
  },
  export(resource: string, format: string) {
    return http.get(`/export/${resource}`, {
      params: { format },
      responseType: 'blob'
    });
  }
};
