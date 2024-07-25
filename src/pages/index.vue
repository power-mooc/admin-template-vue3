<template>
  <el-button type="primary">Primary</el-button>
  <Icon icon="mdi:home" class="text-sky text-3xl"></Icon>
  <NetIcon url="//at.alicdn.com/t/font_1791095_hy6b9xbrdsk.css" type="kefu"></NetIcon>
  <IconfontIcon type="kefu"></IconfontIcon>
  <IconPicker></IconPicker>
</template>

<script setup lang="ts">
import { registerSW } from 'virtual:pwa-register'
import { Icon } from '@iconify/vue'

onMounted(() => {
  registerSW({
    immediate: true,
    onRegisteredSW(_url, registration) {
      console.log('🚀 ~ onRegisteredSW ~ registration:', registration)
      console.log('🚀 ~ onRegisteredSW ~ _url:', _url)
      setInterval(() => {
        registration && registration.update()
      }, 3600000)
    }
  })
})
</script>

<style scoped></style>

<route lang="yaml">
meta:
  layout: default
</route>

function onMounted(arg0: () => void) { throw new Error('Function not implemented.') }
