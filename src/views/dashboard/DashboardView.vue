<template>
  <div class="dashboard">
    <section class="kpi-grid">
      <KpiWidget label="Loads today" :value="analytics.kpis?.totalLoads ?? 0" :trend="4.3" sublabel="Dispatched" />
      <KpiWidget label="Active trucks" :value="analytics.kpis?.activeTrucks ?? 0" :trend="1.8" sublabel="On the road" />
      <KpiWidget label="On-time %" :value="`${analytics.kpis?.onTimePercent ?? 0}%`" :trend="-0.4" sublabel="Week to date" />
      <KpiWidget label="Revenue today" :value="`$${analytics.kpis?.revenueToday?.toLocaleString?.() ?? '0'}`" :trend="6.1" sublabel="vs Forecast" />
    </section>

    <div class="grid-two">
      <LineChart :data="revenueChart" title="Revenue" subtitle="Past 7 days" />
      <BaseCard title="Real-time fleet map">
        <div class="map-placeholder">GPS + dashcam feed connected</div>
      </BaseCard>
    </div>

    <div class="grid-three">
      <BaseCard title="Recent alerts">
        <ul class="alerts">
          <li v-for="alert in analytics.alerts" :key="alert.id">
            <StatusTag :status="alert.severity">{{ alert.severity }}</StatusTag>
            <div>
              <p>{{ alert.message }}</p>
              <small>{{ alert.timestamp }}</small>
            </div>
          </li>
        </ul>
      </BaseCard>
      <BaseCard title="Active drivers">
        <ul class="drivers">
          <li v-for="driver in analytics.activeDrivers" :key="driver.id">
            <div>
              <p class="name">{{ driver.name }}</p>
              <small>{{ driver.currentLoad }}</small>
            </div>
            <StatusTag status="active">{{ driver.status }}</StatusTag>
          </li>
        </ul>
      </BaseCard>
      <BaseCard title="AI Insights">
        <p>{{ analytics.aiInsights }}</p>
      </BaseCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useAnalyticsStore } from '@/store/analytics';
import KpiWidget from '@/components/dashboard/KpiWidget.vue';
import LineChart from '@/components/dashboard/LineChart.vue';
import BaseCard from '@/components/common/BaseCard.vue';
import StatusTag from '@/components/common/StatusTag.vue';

const analytics = useAnalyticsStore();

onMounted(() => {
  analytics.bootstrap();
});

const revenueChart = computed(() =>
  analytics.revenueTrend.map((point) => ({ value: point.revenue }))
);
</script>

<style scoped lang="scss">
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.grid-two {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.grid-three {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.map-placeholder {
  min-height: 220px;
  border-radius: 16px;
  background: repeating-linear-gradient(45deg, #e2e8f0, #e2e8f0 10px, #f8fafc 10px, #f8fafc 20px);
  display: grid;
  place-items: center;
  color: #475569;
}

.alerts,
.drivers {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  padding: 0;
}

.alerts li,
.drivers li {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.drivers .name {
  font-weight: 600;
}
</style>
