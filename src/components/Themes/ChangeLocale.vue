<template>
  <el-dropdown trigger="click" @command="handleCommand">
    <slot name="header">
      <span class="el-dropdown-link">
        <Iconify icon="ion:language" :class="iconClass" v-bind="$attrs"></Iconify>
      </span>
    </slot>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="(locale, index) in locales" :key="index" :command="locale.name">
          <!-- method 3 -->
          <div class="flex items-center">
            <Iconify
              v-if="locale.icon"
              :icon="locale.icon"
              v-bind="iconPropsComputed"
              class="mr-2"
              :class="iconClass"
            ></Iconify>
            {{ locale.text }}
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import type { IconProps } from '@iconify/vue';
import type { LocaleItem } from './types';
import Iconify from '../Icon/Iconify.vue';

interface ChangeLocaleProps extends Partial<IconProps> {
  locales: LocaleItem[];
  iconClass?: string;
}

const props = withDefaults(defineProps<ChangeLocaleProps>(), {
  iconClass: 'text-xl'
});

const emits = defineEmits<{
  change: [command: string | number | object];
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

const handleCommand = (command: string | number | object) => {
  emits('change', command);
};
</script>

<style scoped></style>
