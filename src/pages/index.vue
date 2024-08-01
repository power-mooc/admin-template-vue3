<template>
  <div></div>
</template>

<script setup lang="ts">
import { registerSW } from 'virtual:pwa-register';
definePage({
  meta: {
    title: '首页',
    icon: 'mdi:home'
  }
});

onMounted(() => {
  registerSW({
    immediate: true,
    onRegisteredSW(_url, registration) {
      setInterval(() => {
        registration && registration.update();
      }, 3600000);
    }
  });
});
</script>

<style scoped></style>

<route lang="yaml">
meta:
  layout: default
</route>
