<template>
  <NetIcon url="//at.alicdn.com/t/font_1791095_hy6b9xbrdsk.css" type="kefu"></NetIcon>
  <IconfontIcon type="kefu"></IconfontIcon>
  <IconPicker></IconPicker>
  <DarkModeToggle></DarkModeToggle>
  <FullScreen></FullScreen>
  <div>{{ $t('hello') }}</div>
  {{ $t('el.colorpicker.confirm') }}
  <select v-model="locale">
    <option value="en">en</option>
    <option value="zh-CN">zh-CN</option>
  </select>
</template>

<script setup lang="ts">
import { loadLocaleMessages } from '@/modules/i18n';
import { registerSW } from 'virtual:pwa-register';
const locale = ref('zh-CN');
watch([locale], () => {
  loadLocaleMessages(locale.value);
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

function onMounted(arg0: () => void) { throw new Error('Function not implemented.') }
