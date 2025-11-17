<template>
  <span class="tag" :class="statusClass">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{ status?: string }>(), { status: 'default' });
const statusClass = computed(() => {
  switch (props.status?.toLowerCase()) {
    case 'delivered':
    case 'active':
    case 'ok':
    case 'completed':
    case 'finance':
      return 'status-success';
    case 'in-transit':
    case 'warning':
    case 'safety':
    case 'compliance':
    case 'queued':
    case 'processing':
      return 'status-warning';
    case 'delayed':
    case 'critical':
    case 'failed':
      return 'status-danger';
    default:
      return '';
  }
});
</script>
