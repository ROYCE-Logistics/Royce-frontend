import { defineStore } from 'pinia';
import type { User } from '@/types';

interface UserState {
  profile: User | null;
  preferences: Record<string, unknown>;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    profile: null,
    preferences: {}
  }),
  actions: {
    setProfile(user: User) {
      this.profile = user;
    },
    updatePreference(key: string, value: unknown) {
      this.preferences[key] = value;
    }
  }
});
