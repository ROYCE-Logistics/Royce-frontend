import { defineStore } from 'pinia';
import { authApi, type LoginPayload } from '@/api/authApi';
import type { User } from '@/types';

const STORAGE_KEY = 'a1-logistics-token';

interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null,
    user: null,
    loading: false,
    error: null
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.token)
  },
  actions: {
    async login(payload: LoginPayload) {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await authApi.login(payload);
        this.token = data.token;
        this.user = data.user;
        localStorage.setItem(STORAGE_KEY, data.token);
      } catch (error: any) {
        this.error = error.response?.data?.message ?? 'Unable to login.';
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async fetchProfile() {
      if (!this.token) return;
      try {
        const { data } = await authApi.me();
        this.user = data.user;
      } catch (error) {
        console.error('Failed to fetch profile', error);
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem(STORAGE_KEY);
    }
  }
});
