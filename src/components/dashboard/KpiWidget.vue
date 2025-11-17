<template>
  <div class="kpi">
    <div class="kpi-label">
      <p>{{ label }}</p>
      <small>{{ sublabel }}</small>
    </div>
    <p class="kpi-value">{{ value }}</p>
    <p class="kpi-trend" :class="{ positive: trend >= 0 }">{{ trend >= 0 ? '+' : '' }}{{ trend }}%</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ label: string; value: string | number; trend?: number; sublabel?: string }>(), {
  trend: 0,
  sublabel: 'Today'
});
</script>

<style scoped lang="scss">
.kpi {
  background: #fff;
  border-radius: 16px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.08);
}

.kpi-label p {
  font-size: 0.95rem;
  font-weight: 600;
  color: #475569;
}

.kpi-value {
  font-size: 2rem;
  font-weight: 700;
}

.kpi-trend {
  font-size: 0.85rem;
  color: #dc2626;
}

.kpi-trend.positive {
  color: #16a34a;
}
</style>
