<template>
  <div class="analytics">
    <div class="grid">
      <BaseCard title="Revenue vs Loads">
        <LineChart :data="trend" />
        <p class="muted">Amazon vs non-Amazon breakdown</p>
      </BaseCard>
      <BaseCard title="Fleet utilization">
        <ul>
          <li v-for="metric in utilization" :key="metric.label">
            <strong>{{ metric.value }}%</strong> {{ metric.label }}
          </li>
        </ul>
      </BaseCard>
    </div>

    <BaseCard title="Accidents & compliance">
      <DataTable :columns="columns" :rows="accidents" />
    </BaseCard>

    <BaseCard title="AI Insights">
      <p>{{ analytics.aiInsights }}</p>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import BaseCard from '@/components/common/BaseCard.vue';
import LineChart from '@/components/dashboard/LineChart.vue';
import DataTable from '@/components/common/DataTable.vue';
import { useAnalyticsStore } from '@/store/analytics';

const analytics = useAnalyticsStore();

onMounted(() => {
  if (!analytics.revenueTrend.length) analytics.bootstrap();
});

const trend = computed(() => analytics.revenueTrend.map((point) => ({ value: point.revenue })));

const utilization = [
  { label: 'Prime fleet', value: 94 },
  { label: 'Amazon dedicated', value: 88 },
  { label: 'Owner-operators', value: 76 }
];

const columns = [
  { key: 'type', label: 'Type' },
  { key: 'count', label: 'Count' },
  { key: 'notes', label: 'Notes' }
];

const accidents = [
  { id: '1', type: 'DOT reportable', count: 1, notes: 'Under review' },
  { id: '2', type: 'Minor incident', count: 3, notes: 'Coaching scheduled' }
];
</script>

<style scoped lang="scss">
.analytics {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.muted {
  color: #64748b;
}
</style>
