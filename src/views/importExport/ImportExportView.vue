<template>
  <div class="import-export">
    <BaseCard title="Import data">
      <form class="grid" @submit.prevent>
        <label v-for="type in importTypes" :key="type.value">
          {{ type.label }}
          <input type="file" @change="upload($event, type.value)" multiple />
        </label>
      </form>
    </BaseCard>

    <BaseCard title="Recent jobs">
      <DataTable :columns="columns" :rows="jobs">
        <template #status="{ row }">
          <StatusTag :status="row.status">{{ row.status }}</StatusTag>
        </template>
      </DataTable>
    </BaseCard>

    <BaseCard title="Exports">
      <div class="exports">
        <BaseButton v-for="option in exportOptions" :key="option.label" @click="download(option)">
          {{ option.label }}
        </BaseButton>
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import BaseCard from '@/components/common/BaseCard.vue';
import BaseButton from '@/components/common/BaseButton.vue';
import StatusTag from '@/components/common/StatusTag.vue';
import DataTable from '@/components/common/DataTable.vue';
import { importExportApi } from '@/api/importExportApi';
import type { ImportJob } from '@/types';

const importTypes = [
  { label: 'Loads CSV/Excel', value: 'loads' },
  { label: 'Drivers CSV/Excel', value: 'drivers' },
  { label: 'Settlements PDF', value: 'settlements' },
  { label: 'Fuel TXT', value: 'fuel' }
];

const exportOptions = [
  { label: 'Export Loads (Excel)', resource: 'loads', format: 'excel' },
  { label: 'Export Loads (PDF)', resource: 'loads', format: 'pdf' },
  { label: 'Export Drivers', resource: 'drivers', format: 'excel' }
];

const jobs = ref<ImportJob[]>([]);
const columns = [
  { key: 'id', label: 'Job' },
  { key: 'type', label: 'Type' },
  { key: 'createdAt', label: 'Created' },
  { key: 'status', label: 'Status' }
];

onMounted(async () => {
  try {
    const { data } = await importExportApi.jobs();
    jobs.value = data;
  } catch (error) {
    console.error('Failed to load jobs', error);
  }
});

async function upload(event: Event, type: string) {
  const files = (event.target as HTMLInputElement).files;
  if (!files?.length) return;
  const form = new FormData();
  Array.from(files).forEach((file) => form.append('files', file));
  await importExportApi.upload(type, form);
}

async function download(option: { resource: string; format: string }) {
  const { data } = await importExportApi.export(option.resource, option.format);
  const url = URL.createObjectURL(data);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${option.resource}.${option.format}`;
  link.click();
  URL.revokeObjectURL(url);
}
</script>

<style scoped lang="scss">
.import-export {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.exports {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
