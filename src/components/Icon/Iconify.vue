<template>
  <component v-cloak :is="Icon" v-bind="props"></component>
</template>

<script setup lang="ts">
import { Icon, type IconProps } from '@iconify/vue'
const props = defineProps<IconProps>()
</script>

<style scoped></style>