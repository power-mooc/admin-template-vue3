<template>
  <component
    :is="tag"
    @click="toggle"
    :class="[!isFullscreen ? 'i-ep:full-screen' : 'i-ri:fullscreen-exit-fill', 'cursor-pointer']"
  ></component>
</template>

<script setup lang="ts">
const { isFullscreen, toggle } = useFullscreen();

defineProps({
  tag: {
    type: String,
    default: 'i'
  }
});
</script>

<style scoped></style>
