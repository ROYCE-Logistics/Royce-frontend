<template>
  <div class="chart-card">
    <svg viewBox="0 0 300 120">
      <polyline
        :points="points"
        fill="none"
        stroke="#2563eb"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <div class="chart-footer">
      <strong>{{ title }}</strong>
      <span>{{ subtitle }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{ data?: { value: number }[]; title?: string; subtitle?: string }>(), {
  data: () => [],
  title: 'Revenue Trend',
  subtitle: 'Last 7 days'
});

const points = computed(() => {
  if (!props.data?.length) return '';
  const max = Math.max(...props.data.map((item) => item.value));
  const min = Math.min(...props.data.map((item) => item.value));
  const range = max - min || 1;
  const denominator = Math.max(props.data.length - 1, 1);
  return props.data
    .map((item, index) => {
      const x = (index / denominator) * 300;
      const y = 120 - ((item.value - min) / range) * 100 - 10;
      return `${x},${y}`;
    })
    .join(' ');
});
</script>

<style scoped lang="scss">
.chart-card {
  background: #fff;
  border-radius: 16px;
  padding: 1.25rem;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.08);
}

svg {
  width: 100%;
  height: 160px;
}

.chart-footer {
  display: flex;
  justify-content: space-between;
  color: #475569;
}
</style>
