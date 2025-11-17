import http from './http';
import type { AuthResponse } from '@/types';

export interface LoginPayload {
  email: string;
  password: string;
}

export const authApi = {
  login(payload: LoginPayload) {
    return http.post<AuthResponse>('/auth/login', payload);
  },
  me() {
    return http.get<AuthResponse>('/auth/me');
  },
  forgotPassword(email: string) {
    return http.post('/auth/forgot', { email });
  }
};
