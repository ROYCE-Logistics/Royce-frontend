<template>
  <div class="settings">
    <BaseCard title="Organization">
      <form class="grid" @submit.prevent="save">
        <label>
          Name
          <input v-model="organization.name" />
        </label>
        <label>
          DOT Number
          <input v-model="organization.dotNumber" />
        </label>
        <label>
          Timezone
          <input v-model="organization.timezone" />
        </label>
        <BaseButton>Save</BaseButton>
      </form>
    </BaseCard>

    <BaseCard title="Integrations">
      <ul>
        <li v-for="integration in settings.integrations" :key="integration.name">
          <div>
            <p>{{ integration.name }}</p>
            <small>{{ integration.description }}</small>
          </div>
          <BaseButton
            :variant="integration.status === 'connected' ? 'secondary' : 'primary'"
            @click="settings.toggleIntegration(integration.name)"
          >
            {{ integration.status === 'connected' ? 'Disconnect' : 'Connect' }}
          </BaseButton>
        </li>
      </ul>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import BaseCard from '@/components/common/BaseCard.vue';
import BaseButton from '@/components/common/BaseButton.vue';
import { useSettingsStore } from '@/store/settings';

const settings = useSettingsStore();
const organization = reactive({ ...settings.organization });

function save() {
  settings.updateOrganization(organization);
}
</script>

<style scoped lang="scss">
.settings {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
</style>
