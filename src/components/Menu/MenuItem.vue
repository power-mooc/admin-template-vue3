<template>
  <!-- 单item -->
  <el-menu-item :index="getIndex(data)" :disabled="data.meta?.disabled" v-if="!data.meta?.icon">{{
    data.meta?.title
  }}</el-menu-item>
  <template v-else>
    <!-- 折叠 -->
    <el-menu-item v-if="collapse" :index="getIndex(data)" :disabled="data.meta?.disabled">
      <Iconify :icon="data.meta?.icon" :style="iconProps?.style" :class="iconProps.class"></Iconify>
      <template #title>{{ data.meta?.title }}</template>
    </el-menu-item>
    <!-- 侧栏 -->
    <el-menu-item v-else :index="getIndex(data)" :disabled="data.meta?.disabled">
      <Iconify :icon="data.meta?.icon" :style="iconProps?.style" :class="iconProps.class"></Iconify>
      <span>{{ data.meta?.title }} </span>
    </el-menu-item>
    <!-- item end -->
  </template>
</template>

<script setup lang="ts">
import type { AppRouteMenuItem, IconOptions } from './types';
import { useMenu } from './useMenu';

interface MenuItemProps {
  data: AppRouteMenuItem;
  collapse?: boolean;
}

defineProps<MenuItemProps>();
const iconProps = inject('iconProps') as IconOptions;

const { getIndex } = useMenu();
</script>

<style scoped></style>
