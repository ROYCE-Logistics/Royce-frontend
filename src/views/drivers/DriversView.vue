<template>
  <div class="drivers-view">
    <BaseCard title="Drivers">
      <DataTable :columns="driverColumns" :rows="drivers.drivers">
        <template #status="{ row }">
          <StatusTag :status="row.status">{{ row.status }}</StatusTag>
        </template>
        <template #name="{ row }">
          <button class="link" @click="view(row.id)">{{ row.name }}</button>
        </template>
        <template #safetyScore="{ row }">
          {{ row.safetyScore }}/100
        </template>
      </DataTable>
    </BaseCard>

    <BaseCard v-if="drivers.selectedDriver" :title="drivers.selectedDriver.name">
      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab"
          :class="{ active: tab === activeTab }"
          @click="activeTab = tab"
        >
          {{ tab }}
        </button>
      </div>
      <div v-if="activeTab === 'Overview'">
        <p>Status: {{ drivers.selectedDriver.status }}</p>
        <p>Current load: {{ drivers.selectedDriver.currentLoad }}</p>
        <p>Last location: {{ drivers.selectedDriver.lastLocation }}</p>
      </div>
      <div v-else-if="activeTab === 'Loads'">
        <ul>
          <li v-for="load in drivers.loads" :key="load.id">{{ load.id }} - {{ load.status }}</li>
        </ul>
      </div>
      <div v-else>
        Coming soon...
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import BaseCard from '@/components/common/BaseCard.vue';
import DataTable from '@/components/common/DataTable.vue';
import StatusTag from '@/components/common/StatusTag.vue';
import { useDriversStore } from '@/store/drivers';

const drivers = useDriversStore();

onMounted(() => {
  drivers.fetchDrivers();
});

const driverColumns = [
  { key: 'name', label: 'Driver' },
  { key: 'status', label: 'Status' },
  { key: 'currentLoad', label: 'Current load' },
  { key: 'lastLocation', label: 'Last location' },
  { key: 'safetyScore', label: 'Safety score' }
];

const tabs = ['Overview', 'Loads', 'Documents', 'Settlements', 'Analytics'];
const activeTab = ref('Overview');

function view(id: string) {
  drivers.viewDriver(id);
  activeTab.value = 'Overview';
}
</script>

<style scoped lang="scss">
.drivers-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tabs button {
  border: none;
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  background: #e2e8f0;
}

.tabs button.active {
  background: #2563eb;
  color: #fff;
}

.link {
  background: none;
  border: none;
  color: #2563eb;
}
</style>
