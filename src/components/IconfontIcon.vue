<template>
  <NetIcon v-bind="props"></NetIcon>
</template>

<script setup lang="ts">
import type { NetIconProps } from './types'
import NetIcon from './NetIcon.vue'

const props = withDefaults(defineProps<NetIconProps>(), {
  url: '/font_1791095_hy6b9xbrdsk.css',
  prefix: 'iconfont-',
  fontFamily: 'iconfont',
  type: ''
})
</script>

<style scoped></style>
