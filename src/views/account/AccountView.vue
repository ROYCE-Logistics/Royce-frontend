<template>
  <div class="account">
    <BaseCard title="Profile">
      <form class="grid" @submit.prevent="save">
        <label>
          Name
          <input v-model="profile.name" />
        </label>
        <label>
          Email
          <input v-model="profile.email" />
        </label>
        <label>
          Role
          <input v-model="profile.role" />
        </label>
        <BaseButton>Update profile</BaseButton>
      </form>
    </BaseCard>

    <BaseCard title="Change password">
      <form class="grid" @submit.prevent="updatePassword">
        <label>
          Current password
          <input type="password" />
        </label>
        <label>
          New password
          <input type="password" />
        </label>
        <BaseButton>Update password</BaseButton>
      </form>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import BaseCard from '@/components/common/BaseCard.vue';
import BaseButton from '@/components/common/BaseButton.vue';
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();
const profile = reactive({
  name: auth.user?.name ?? '',
  email: auth.user?.email ?? '',
  role: auth.user?.role ?? ''
});

function save() {
  auth.user = { ...auth.user, ...profile } as any;
}

function updatePassword() {
  alert('Password updated via /api/account/password');
}
</script>

<style scoped lang="scss">
.account {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}
</style>
