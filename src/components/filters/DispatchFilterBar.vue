<template>
  <div class="filters">
    <select v-model="state.status">
      <option value="">All statuses</option>
      <option value="Pending">Pending</option>
      <option value="Assigned">Assigned</option>
      <option value="In-Transit">In transit</option>
      <option value="Delivered">Delivered</option>
    </select>
    <input v-model="state.customer" placeholder="Customer" />
    <label class="checkbox">
      <input type="checkbox" v-model="state.amazonOnly" /> Amazon only
    </label>
    <BaseButton @click="apply">Apply</BaseButton>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import BaseButton from '@/components/common/BaseButton.vue';

const emit = defineEmits<{
  apply: [filters: { status?: string; customer?: string; amazonOnly?: boolean }]
}>();

const state = reactive({ status: '', customer: '', amazonOnly: false });

function apply() {
  emit('apply', { ...state });
}
</script>

<style scoped lang="scss">
.filters {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 1.5rem;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.9rem;
  color: #475569;
}
</style>
