<template>
  <DropDown
    :items="locales"
    @change="handleCommand"
    :icon-props="iconPropsComputed"
    :icon-class="iconClass"
    v-model="current"
  >
    <template #header>
      <span class="mr-2">
        <Iconify icon="ion:language" :class="iconClass" v-bind="iconPropsComputed"></Iconify>
      </span>
    </template>
    <template #item="{ item }">
      {{ item.text }}
    </template>
  </DropDown>
</template>

<script setup lang="ts">
import DropDown from '../Menu/DropDown.vue';
import type { IconProps } from '@iconify/vue';
import type { LocaleItem } from './types';

interface ChangeLocaleProps extends Partial<IconProps> {
  locales: LocaleItem[];
  iconClass?: string;
}

const props = withDefaults(defineProps<ChangeLocaleProps>(), {
  iconClass: 'text-xl'
});

const current = ref(0);

const emits = defineEmits<{
  change: [command: string];
}>();

// method 1
// const dropDownItemIcon = (icon: IconifyIcon | string) => <Iconify icon={icon}></Iconify>
// method 2
// const dropDownItemIcon = (icon: IconifyIcon | string) =>
//   h('Iconify', {
//     icon
//   })

const iconPropsComputed = computed(() => {
  const { locales, icon, ...restProps } = props;
  return restProps;
});

const handleCommand = (locale: LocaleItem) => {
  // current.value = props.locales.findIndex((item) => item.name === command)
  // current.value = index
  emits('change', locale.name);
};
</script>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item) {
  &.active {
    color: var(--el-dropdown-menuItem-hover-color);
    background-color: var(--el-dropdown-menuItem-hover-fill);
  }
}
</style>
