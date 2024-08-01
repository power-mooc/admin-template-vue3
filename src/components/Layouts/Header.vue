<template>
  <el-row class="items-center">
    <Iconify
      :icon="collapseModel ? 'ep:expand' : 'ep:fold'"
      class="ml-2 text-2xl cursor-pointer"
      @click="collapseModel = !collapseModel"
    ></Iconify>
    <div class="flex-grow">
      <slot></slot>
    </div>
    <el-row class="items-center">
      <ThemeSettings v-bind="settings" @change="handleChange"></ThemeSettings>
      <DarkModeToggle
        :dark="settings?.darkMode"
        @change="handleDarkModeToggle"
        class="mr-2"
      ></DarkModeToggle>
      <ChangeLocale :locales="locales" class="mr-2"></ChangeLocale>
      <FullScreen class="mr-2"></FullScreen>
      <el-divider direction="vertical"></el-divider>
      <!-- 用户头像下拉菜单 -->
      <AvatarMenu
        v-if="username || src"
        class="mr-4"
        v-bind="avatarProps"
        @command="handleCommand"
        :data="[
          {
            key: 1,
            value: 'hello'
          },
          {
            key: 'divider',
            value: ''
          },
          {
            key: 2,
            value: 'hello username'
          }
        ]"
      ></AvatarMenu>
    </el-row>
  </el-row>
</template>

<script setup lang="ts">
import type { ThemeSettingsProps } from '../Themes/types';
import Iconify from '../Icon/Iconify.vue';
import DarkModeToggle from '../Themes/DarkModeToggle.vue';
import FullScreen from '../Themes/FullScreen.vue';
import ChangeLocale from '../Themes/ChangeLocale.vue';
import ThemeSettings from '../Themes/ThemeSettings.vue';
import AvatarMenu from '../Avatar/AvatarMenu.vue';
import type { HeaderProps } from './types';

const props = withDefaults(defineProps<HeaderProps>(), {
  collapse: false
});

const collapseModel = defineModel('collapse', {
  default: false
});

const localProps = reactive({ ...props });

const emits = defineEmits<{
  menuChange: [arg: string | number | object];
  settingsChange: [settings: ThemeSettingsProps];
}>();

const avatarProps = computed(() => {
  const { collapse, locales, settings, ...restProps } = props;
  return restProps;
});

const handleCommand = (command: string | number | object) => emits('menuChange', command);

watch(
  () => localProps.settings,
  () => {
    emits('settingsChange', localProps.settings!);
  },
  {
    deep: true
  }
);

// 获取菜单设置
const handleChange = (settings: ThemeSettingsProps) => {
  localProps.settings = settings;
  // emits('settingsChange', localProps.settings)
};
const handleDarkModeToggle = (dark: boolean) => {
  localProps.settings!.darkMode = dark;
  // emits('settingsChange', localProps.settings!)
};
</script>

<style scoped></style>
