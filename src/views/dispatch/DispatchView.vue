<template>
  <div>
    <DispatchFilterBar @apply="applyFilters" />
    <BaseCard>
      <DataTable :columns="columns" :rows="loads.records">
        <template #status="{ row }">
          <StatusTag :status="row.status">{{ row.status }}</StatusTag>
        </template>
        <template #rate="{ row }">
          ${{ row.rate.toLocaleString() }}
        </template>
        <template #id="{ row }">
          <button class="link" @click="openLoad(row.id)">{{ row.id }}</button>
        </template>
      </DataTable>
      <p v-if="loads.loading">Loading loads...</p>
    </BaseCard>

    <aside v-if="loads.selectedLoad" class="drawer">
      <div class="drawer-card">
        <header>
          <h3>Load #{{ loads.selectedLoad.id }}</h3>
          <button @click="loads.selectedLoad = null">✕</button>
        </header>
        <p><strong>Pickup:</strong> {{ loads.selectedLoad.pickup }}</p>
        <p><strong>Delivery:</strong> {{ loads.selectedLoad.delivery }}</p>
        <p><strong>Status:</strong> {{ loads.selectedLoad.status }}</p>
        <p><strong>Customer:</strong> {{ loads.selectedLoad.customer }}</p>
        <section>
          <h4>Status history</h4>
          <ul>
            <li v-for="history in loads.selectedLoad.statusHistory" :key="history.timestamp">
              {{ history.timestamp }} - {{ history.status }}
            </li>
          </ul>
        </section>
        <div class="actions">
          <BaseButton variant="secondary" @click="changeStatus('Delivered')">Mark Delivered</BaseButton>
          <BaseButton @click="changeStatus('In-Transit')">Resume Transit</BaseButton>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import DispatchFilterBar from '@/components/filters/DispatchFilterBar.vue';
import BaseCard from '@/components/common/BaseCard.vue';
import DataTable from '@/components/common/DataTable.vue';
import StatusTag from '@/components/common/StatusTag.vue';
import BaseButton from '@/components/common/BaseButton.vue';
import { useLoadsStore } from '@/store/loads';

const loads = useLoadsStore();

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'pickup', label: 'Pickup' },
  { key: 'delivery', label: 'Delivery' },
  { key: 'driver', label: 'Driver' },
  { key: 'truck', label: 'Truck' },
  { key: 'status', label: 'Status' },
  { key: 'eta', label: 'ETA' },
  { key: 'rate', label: 'Rate' }
];

onMounted(() => {
  loads.fetchLoads();
});

function applyFilters(filters: Record<string, any>) {
  loads.fetchLoads(filters);
}

async function openLoad(id: string) {
  await loads.fetchLoad(id);
}

async function changeStatus(status: string) {
  if (!loads.selectedLoad) return;
  await loads.changeStatus(loads.selectedLoad.id, status);
  await loads.fetchLoad(loads.selectedLoad.id);
}
</script>

<style scoped lang="scss">
.link {
  background: none;
  border: none;
  color: #2563eb;
  cursor: pointer;
}

.drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 360px;
  height: 100vh;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  justify-content: flex-end;
}

.drawer-card {
  width: 360px;
  background: #fff;
  padding: 1.25rem;
  overflow-y: auto;
}

.drawer-card header {
  display: flex;
  justify-content: space-between;
}

.actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
}
</style>
