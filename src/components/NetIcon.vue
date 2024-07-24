<template>
  <i :class="className"> </i>
</template>

<script setup lang="ts">
import type { NetIconProps } from './types'
const props = withDefaults(defineProps<NetIconProps>(), {
  url: '',
  prefix: 'iconfont-',
  fontFamily: 'iconfont',
  type: ''
})

onBeforeMount(() => {
  if (props.url) {
    const existingLink = document.querySelector(`link[href="${props.url}"]`)
    if (!existingLink) {
      const link = document.createElement('link')
      link.href = props.url
      link.rel = 'stylesheet'
      document.head.appendChild(link)
    }
  }
})

const className = computed(() => `${props.fontFamily} ${props.prefix}${props.type}`)
</script>

<style scoped></style>
