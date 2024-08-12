<template>
  <el-menu
    v-bind="menuProps"
    :style="{ '--bg-color': backgroundColor }"
    class="border-r-0!"
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

interface MenuProps extends Partial<ElMenuProps> {
  data: AppRouteMenuItem[];
  subMenuProps?: Partial<SubMenuProps>;
  iconProps?: Partial<IconOptions>;
}

const props = withDefaults(defineProps<MenuProps>(), {
  data: () => [],
  iconProps: () => ({
    style: { fontSize: '22px' },
    class: 'mr-3'
  }),
  backgroundColor: 'transparent'
});

const iconProps = reactive(props.iconProps);

watch(
  () => props.collapse,
  () => {
    iconProps.class = props.collapse ? '' : 'mr-3';
  }
);

provide('iconProps', iconProps);

type EmitSelectType = [
  index: string,
  indexPath: string[],
  item: MenuItemClicked,
  routerResult?: Promise<void | NavigationFailure>
];
type OpenCloseType = [index: string, indexPath: string[]];

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
console.log(fileredMenus);
</script>

<style lang="scss">
.el-menu--vertical .el-sub-menu__title {
  padding-right: 0 !important;
}

.el-menu--horizontal.el-menu {
  border-bottom: 0 !important;
}
</style>
