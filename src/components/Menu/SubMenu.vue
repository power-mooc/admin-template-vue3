<template>
  <MenuItem :data="data" :collapse="collapse" v-if="!menuHasChildren(data)"></MenuItem>
  <!-- 有下拉菜单 -->
  <el-sub-menu :index="getIndex(data)" v-if="menuHasChildren(data)">
    <template #title v-if="!data.meta?.icon">{{ data.meta?.title }}</template>
    <!-- 折叠,侧栏  -->
    <template #title v-else>
      <Iconify :icon="data.meta?.icon || ''"></Iconify>
      <span>{{ data.meta?.title }}</span>
    </template>
    <!-- data应该是子菜单的data -->
    <SubMenu
      v-for="child in data.children"
      :data="child"
      :key="`${data.path}/${child.path}`"
      v-bind="subAttrs"
    ></SubMenu>
  </el-sub-menu>
</template>

<script setup lang="ts">
import type { SubMenuProps as ElSubMenuProps } from 'element-plus';
import type { AppRouteMenuItem } from './types';
import { useMenu } from './useMenu';

interface SubMenuProps extends Partial<ElSubMenuProps> {
  data: AppRouteMenuItem;
  collapse?: boolean;
}
const props = defineProps<SubMenuProps>();
const { getIndex, menuHasChildren } = useMenu();

const subAttrs = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, ...restProps } = props;
  return restProps;
});
</script>

<style scoped></style>
