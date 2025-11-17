<template>
  <div class="auth-page">
    <section class="auth-card">
      <h1>A1 Logistics Admin</h1>
      <p>Sign in to orchestrate loads, drivers and revenue.</p>
      <form @submit.prevent="handleLogin">
        <label>
          Email
          <input v-model="form.email" type="email" placeholder="dispatch@a1logistics.com" required />
        </label>
        <label>
          Password
          <input v-model="form.password" type="password" placeholder="•••••••" required />
        </label>
        <BaseButton class="w-full" :disabled="auth.loading">{{ auth.loading ? 'Signing in…' : 'Login' }}</BaseButton>
      </form>
      <router-link to="/forgot-password">Forgot password?</router-link>
      <p v-if="auth.error" class="error">{{ auth.error }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import BaseButton from '@/components/common/BaseButton.vue';
import { useAuthStore } from '@/store/auth';

const router = useRouter();
const auth = useAuthStore();
const form = reactive({ email: '', password: '' });

async function handleLogin() {
  try {
    await auth.login({ ...form });
    router.push({ name: 'dashboard' });
  } catch (error) {
    // handled in store
  }
}
</script>

<style scoped lang="scss">
.auth-page {
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(120deg, #1d4ed8, #2563eb);
  padding: 2rem;
}

.auth-card {
  background: #fff;
  padding: 2.5rem;
  border-radius: 24px;
  width: min(420px, 100%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  text-align: left;
  font-size: 0.9rem;
  color: #475569;
}

.w-full {
  width: 100%;
}

.error {
  color: #dc2626;
}
</style>
