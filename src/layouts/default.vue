<template>
  <div class="w-full h-screen overflow-hidden flex">
    <!-- 左右布局 -->
    <!-- sidebar -->
    <div
      :style="{ width: menuWidth + 'px', backgroundColor: settings?.backgroundColor }"
      class="h-full"
    >
      <el-scrollbar>
        <!-- menu -->
        <Menu :data="menus"></Menu>
        <!-- menu二级菜单 -->
      </el-scrollbar>
    </div>
    <!-- content -->
    <div class="flex-1 h-full">
      <!-- header: fullscreen, darkmode, theme, menu -->
      <Header
        :locales="locales"
        :username="username"
        :src="avatar"
        :data="avatarMenu"
        v-model:collapse="localSettings.collapse"
        :settings="settings"
        @settings-change="handleSettigsChange"
      ></Header>
      <!-- router-view -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router/auto';
import type { AppRouteMenuItem } from '@/components/Menu/types';
import type { DropDownMenuItem } from '@/components/Avatar/types';
import type { HeaderProps } from '../components/Layouts/types';
import { routes } from 'vue-router/auto-routes';
import type { ThemeSettingsProps } from '@/components/Themes/types';

interface ThemeSettingsOption extends HeaderProps {
  username: string;
  avatar: string;
  avatarMenu: DropDownMenuItem[];
}

const localSettings = reactive<ThemeSettingsOption>({
  locales: [
    {
      text: 'English',
      name: 'en',
      icon: 'ri:english-input'
    },
    {
      text: '中文',
      name: 'zh-CN',
      icon: 'uil:letter-chinese-a'
    }
  ],
  username: 'power',
  collapse: false,
  avatar: '',
  // TODO
  avatarMenu: [],
  settings: {
    menuWidth: 280
  } as ThemeSettingsProps
});

const { locales, username, avatar, avatarMenu } = toRefs(localSettings);
// 通过自动路由routes生成菜单
function generateMenuData(routes: RouteRecordRaw[]): AppRouteMenuItem[] {
  const menuData: AppRouteMenuItem[] = [];

  routes.forEach((route) => {
    let menuItem: AppRouteMenuItem = {
      path: route.path,
      name: String(route.name),
      meta: route.meta,
      alias: typeof route.redirect === 'string' ? route.redirect : undefined,
      component: route.component
    };
    if (route.children && Array.isArray(route.children) && route.children.length > 0) {
      menuItem.children = generateMenuData(route.children);
    }
    menuData.push(menuItem);
  });

  return menuData;
}

const menus = computed(() => generateMenuData(routes));
const settings = computed(() => localSettings.settings);

const menuWidth = computed(() => (localSettings.settings ? localSettings.settings.menuWidth : 240));

const handleSettigsChange = (themeSettings: ThemeSettingsProps) => {
  localSettings.settings = themeSettings;
};
</script>

<style scoped></style>
