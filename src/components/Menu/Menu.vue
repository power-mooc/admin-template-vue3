<template>
  <el-menu
    :style="{ '--bg-color': backgroundColor }"
    v-bind="menuProps"
    @select="handleSelect"
    @open="handleOpen"
    @close="handleClose"
  >
    <slot name="icon"></slot>
    <!-- 左右Logo +菜单的情况 -->
    <div class="flex-grow" v-if="isDefined(slots['icon'])" />
    <sub-menu
      v-for="menu in fileredMenus"
      :key="menu.path"
      :data="menu"
      :collapse="collapse"
      v-bind="subMenuProps"
    ></sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
import type { MenuProps as ElMenuProps, MenuItemClicked, SubMenuProps } from 'element-plus';
import type { AppRouteMenuItem, IconOptions } from './types';
import { useMenu } from './useMenu';
import type { NavigationFailure } from 'vue-router';

// 菜单组件props类型
interface MenuProps extends Partial<ElMenuProps> {
  data: AppRouteMenuItem[];
  subMenuProps?: Partial<SubMenuProps>;
  iconProps?: Partial<IconOptions>;
}

type EmitSelectType = [
  index: string,
  indexPath: string[],
  item: MenuItemClicked,
  routerResult?: Promise<void | NavigationFailure>
];
type OpenCloseType = [index: string, indexPath: string[]];

const props = withDefaults(defineProps<MenuProps>(), {
  data: () => [],
  iconProps: () => ({
    style: {
      fontSize: '22px'
    },
    class: 'mr-3'
  }),
  backgroundColor: 'transparent'
});
provide('iconProps', props.iconProps);

const emits = defineEmits<{
  select: EmitSelectType;
  open: OpenCloseType;
  close: OpenCloseType;
}>();

const slots = useSlots();
const { generateMenuKeys } = useMenu();

const fileredMenus = computed(() => generateMenuKeys(props.data));
const menuProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { subMenuProps, data, ...restProps } = props;
  return restProps;
});

const handleSelect = (...args: EmitSelectType) => {
  emits('select', ...args);
};
const handleOpen = (...args: OpenCloseType) => {
  emits('open', ...args);
};
const handleClose = (...args: OpenCloseType) => {
  emits('close', ...args);
};
</script>

<style scoped></style>
