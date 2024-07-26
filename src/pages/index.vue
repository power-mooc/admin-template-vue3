<template>
  <NetIcon url="//at.alicdn.com/t/font_1791095_hy6b9xbrdsk.css" type="kefu"></NetIcon>
  <IconfontIcon type="kefu"></IconfontIcon>
  <IconPicker></IconPicker>
  <DarkModeToggle></DarkModeToggle>
</template>

<script setup lang="ts">
import { registerSW } from 'virtual:pwa-register';

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

function onMounted(arg0: () => void) { throw new Error('Function not implemented.') }
