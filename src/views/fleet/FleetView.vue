<template>
  <div class="fleet">
    <BaseCard title="Truck roster">
      <input v-model="query" placeholder="Search plate or VIN" class="mb" />
      <DataTable :columns="truckColumns" :rows="filteredTrucks">
        <template #status="{ row }">
          <StatusTag :status="row.status">{{ row.status }}</StatusTag>
        </template>
      </DataTable>
    </BaseCard>

    <BaseCard title="Trailers">
      <DataTable :columns="trailerColumns" :rows="fleet.trailers" />
    </BaseCard>

    <BaseCard title="Maintenance & expiry">
      <ul class="alerts">
        <li v-for="alert in fleet.maintenanceAlerts" :key="alert.id">
          <StatusTag status="warning">Due soon</StatusTag>
          <div>
            <p>{{ alert.asset }}</p>
            <small>{{ alert.message }}</small>
          </div>
        </li>
      </ul>
      <router-link to="/analytics">Open camera & alert feed →</router-link>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import BaseCard from '@/components/common/BaseCard.vue';
import DataTable from '@/components/common/DataTable.vue';
import StatusTag from '@/components/common/StatusTag.vue';
import { useFleetStore } from '@/store/fleet';

const fleet = useFleetStore();
const query = ref('');

const truckColumns = [
  { key: 'number', label: 'Truck #' },
  { key: 'status', label: 'Status' },
  { key: 'location', label: 'Last location' },
  { key: 'vin', label: 'VIN' },
  { key: 'nextMaintenance', label: 'Next maintenance' }
];

const trailerColumns = [
  { key: 'number', label: 'Trailer #' },
  { key: 'status', label: 'Status' },
  { key: 'inspectionDue', label: 'Inspection due' }
];

onMounted(() => {
  fleet.fetchFleet();
});

const filteredTrucks = computed(() =>
  fleet.trucks.filter((truck) =>
    `${truck.number} ${truck.vin}`.toLowerCase().includes(query.value.toLowerCase())
  )
);
</script>

<style scoped lang="scss">
.fleet {
  display: grid;
  gap: 1.5rem;
}

.mb {
  margin-bottom: 0.75rem;
}

.alerts {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.alerts li {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
</style>
