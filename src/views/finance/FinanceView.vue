<template>
  <div class="finance">
    <BaseCard title="Settlements">
      <DataTable :columns="columns" :rows="settlements">
        <template #total="{ row }">${{ row.total.toLocaleString() }}</template>
        <template #id="{ row }">
          <button class="link" @click="open(row)">{{ row.id }}</button>
        </template>
      </DataTable>
    </BaseCard>

    <BaseCard title="Exports">
      <div class="exports">
        <BaseButton @click="exportFile('loads', 'excel')">Export Loads (Excel)</BaseButton>
        <BaseButton variant="secondary" @click="exportFile('drivers', 'pdf')">Export Drivers (PDF)</BaseButton>
      </div>
    </BaseCard>

    <div v-if="selected" class="modal-backdrop">
      <div class="modal">
        <header>
          <h3>Settlement {{ selected.id }}</h3>
          <button @click="selected = null">✕</button>
        </header>
        <p>Period: {{ selected.period }}</p>
        <p>Driver: {{ selected.driver }}</p>
        <p>Total: ${{ selected.total.toLocaleString() }}</p>
        <BaseButton variant="secondary">Download PDF</BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseCard from '@/components/common/BaseCard.vue';
import DataTable from '@/components/common/DataTable.vue';
import BaseButton from '@/components/common/BaseButton.vue';
import { importExportApi } from '@/api/importExportApi';
import type { Settlement } from '@/types';

const settlements: Settlement[] = [
  { id: 'STL-2041', period: '02/01 - 02/07', driver: 'Maria Clarke', total: 6400 },
  { id: 'STL-2042', period: '02/01 - 02/07', driver: 'James Lee', total: 5880 }
];

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'period', label: 'Period' },
  { key: 'driver', label: 'Driver' },
  { key: 'total', label: 'Total' }
];

const selected = ref<Settlement | null>(null);

function open(settlement: Settlement) {
  selected.value = settlement;
}

async function exportFile(resource: string, format: string) {
  const { data } = await importExportApi.export(resource, format);
  const url = URL.createObjectURL(data);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${resource}.${format}`;
  link.click();
  URL.revokeObjectURL(url);
}
</script>

<style scoped lang="scss">
.finance {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.exports {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  display: grid;
  place-items: center;
}

.modal {
  background: #fff;
  padding: 1.5rem;
  border-radius: 16px;
  width: min(420px, 100%);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.link {
  background: none;
  border: none;
  color: #2563eb;
}
</style>
