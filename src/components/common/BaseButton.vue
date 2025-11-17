<template>
  <button class="base-button" :class="props.variant" v-bind="$attrs">
    <slot />
  </button>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false });
const props = withDefaults(defineProps<{ variant?: 'primary' | 'secondary' }>(), {
  variant: 'primary'
});
</script>

<style scoped lang="scss">
.base-button {
  border: none;
  border-radius: 999px;
  padding: 0.5rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.base-button.primary {
  background: linear-gradient(120deg, #2563eb, #1d4ed8);
  color: #fff;
}

.base-button.secondary {
  background: #e2e8f0;
  color: #0f172a;
}

.base-button:active {
  transform: scale(0.98);
}
</style>
