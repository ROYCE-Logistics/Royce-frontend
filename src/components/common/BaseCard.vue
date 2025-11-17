<template>
  <section class="base-card" :class="variant">
    <header v-if="title" class="card-header">
      <p>{{ title }}</p>
      <slot name="actions" />
    </header>
    <slot />
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ title?: string; variant?: 'default' | 'subtle' }>(), {
  variant: 'default'
});
const { title, variant } = props;
</script>

<style scoped lang="scss">
.base-card {
  background: #fff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
}

.base-card.subtle {
  background: #f8fafc;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-weight: 600;
}
</style>
