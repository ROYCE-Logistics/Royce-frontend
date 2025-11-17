<template>
  <div class="auth-page">
    <section class="auth-card">
      <h1>Reset password</h1>
      <p>Enter your email to receive reset instructions.</p>
      <form @submit.prevent="submit">
        <label>
          Email
          <input v-model="email" type="email" required />
        </label>
        <BaseButton :disabled="loading">{{ loading ? 'Sending...' : 'Send reset link' }}</BaseButton>
      </form>
      <router-link to="/login">Back to login</router-link>
      <p v-if="message" class="success">{{ message }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from '@/components/common/BaseButton.vue';
import { authApi } from '@/api/authApi';

const email = ref('');
const loading = ref(false);
const message = ref('');

async function submit() {
  loading.value = true;
  try {
    await authApi.forgotPassword(email.value);
    message.value = 'If an account exists we emailed password instructions.';
  } finally {
    loading.value = false;
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

.success {
  color: #16a34a;
}
</style>
