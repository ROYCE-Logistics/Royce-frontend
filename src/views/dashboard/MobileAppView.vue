<template>
  <BaseCard title="Mobile App">
    <p>The A1 Driver mobile app keeps your fleet connected. Track geofences, message dispatch, and upload documents straight from the road.</p>
    <ul>
      <li>Realtime messaging</li>
      <li>Document scanner</li>
      <li>Amazon Relay integration</li>
    </ul>
    <BaseButton>Request beta access</BaseButton>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '@/components/common/BaseCard.vue';
import BaseButton from '@/components/common/BaseButton.vue';
</script>

<style scoped>
ul {
  margin: 1rem 0;
  padding-left: 1.25rem;
}
</style>
