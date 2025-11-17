<template>
  <div class="notifications">
    <div class="filters">
      <label v-for="type in types" :key="type">
        <input type="checkbox" v-model="selected" :value="type" /> {{ type }}
      </label>
    </div>
    <BaseCard>
      <ul>
        <li v-for="notification in filtered" :key="notification.id">
          <StatusTag :status="notification.type">{{ notification.type }}</StatusTag>
          <div>
            <p>{{ notification.message }}</p>
            <small>{{ notification.timestamp }}</small>
          </div>
        </li>
      </ul>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import BaseCard from '@/components/common/BaseCard.vue';
import StatusTag from '@/components/common/StatusTag.vue';

const types = ['Safety', 'Compliance', 'Finance'];
const selected = ref<string[]>([...types]);

const notifications = [
  { id: '1', type: 'Safety', message: 'Driver 208 triggered harsh braking', timestamp: '2 min ago' },
  { id: '2', type: 'Finance', message: 'Settlement STL-2042 approved', timestamp: '1 hr ago' }
];

const filtered = computed(() => notifications.filter((item) => selected.value.includes(item.type)));
</script>

<style scoped lang="scss">
.notifications {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.filters {
  display: flex;
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
  gap: 0.75rem;
  align-items: center;
}
</style>
