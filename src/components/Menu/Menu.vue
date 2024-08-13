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
import type { MenuProps as ElMenuProps, SubMenuProps } from 'element-plus';
import type { AppRouteMenuItem, EmitSelectType, IconOptions, OpenCloseType } from './types';
import { useMenu } from './useMenu';

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

const emits = defineEmits<{
  select: [item: AppRouteMenuItem];
  open: [arg: OpenCloseType];
  close: [arg: OpenCloseType];
}>();

const slots = useSlots();
const { generateMenuKeys, getItem } = useMenu();

const fileredMenus = computed(() => generateMenuKeys(props.data));
const menuProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { subMenuProps, data, ...restProps } = props;
  return restProps;
});

const handleSelect = (...args: EmitSelectType) => {
  const [index] = args;

  const item = getItem(fileredMenus.value, index);
  if (item) emits('select', item);
};
const handleOpen = (...args: OpenCloseType) => {
  emits('open', args);
};
const handleClose = (...args: OpenCloseType) => {
  emits('close', args);
};
</script>

<style lang="scss">
.el-menu--vertical .el-sub-menu__title {
  padding-right: 0 !important;
}

.el-menu--horizontal.el-menu {
  border-bottom: 0 !important;
}
</style>
