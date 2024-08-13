<template>
  <div class="w-full h-screen overflow-hidden flex">
    <!-- 左右布局 -->
    <!-- sidebar -->
    <div
      :style="{
        width: mixMenuWidth,
        backgroundColor: settings?.backgroundColor
      }"
      class="h-full transition-width"
      v-if="settings?.mode !== 'top'"
    >
      <el-row class="h-full">
        <el-scrollbar
          v-if="settings?.mode !== 'mix'"
          :class="[settings?.mode !== 'mixbar' ? 'flex-1' : 'w-[64px] py-4']"
          :style="{
            backgroundColor:
              settings?.mode !== 'mixbar' ? 'auto' : darken(settings?.backgroundColor, 0.2)
          }"
        >
          <!-- menu: 左侧 左侧菜单混合 -->
          <Menu
            v-if="settings?.mode === 'siderbar' || settings?.mode === 'mixbar'"
            text-color="#b8b8b8"
            :class="[{ mixbar: settings?.mode === 'mixbar' }]"
            :data="mixMenus"
            :collapse="settings?.mode !== 'mixbar' && localSettings.collapse"
            :background-color="
              settings?.mode !== 'mixbar' ? settings?.backgroundColor : 'transparent'
            "
            @select="handleSelect"
          ></Menu>
        </el-scrollbar>
        <!-- menu二级菜单：左侧菜单混合，顶部左侧菜单混合-->
        <el-scrollbar v-if="settings?.mode === 'mixbar' || settings?.mode === 'mix'" class="flex-1">
          <!-- menu -->
          <Menu
            text-color="#b8b8b8"
            :data="getSubMenus(menus)"
            :collapse="localSettings.collapse"
            :background-color="settings?.backgroundColor"
            @select="handleSelect"
          ></Menu>
        </el-scrollbar>
      </el-row>
    </div>
    <!-- content -->
    <div class="flex-1 h-full">
      <!-- header: fullscreen, darkmode, theme, menu -->
      <Header
        v-model:collapse="localSettings.collapse"
        :locales="locales"
        :username="username"
        :src="avatar"
        :data="avatarMenu"
        :settings="settings"
        @settings-change="handleSettigsChange"
        @select="handleSelect"
      >
        <!-- menu：顶部左侧菜单混合 -->
        <Menu
          v-if="settings?.mode === 'mix' || settings?.mode === 'top'"
          mode="horizontal"
          :data="settings?.mode === 'mix' ? getTopMenus(menus) : menus"
          :collapse="false"
          @select="handleSelect"
        ></Menu>
      </Header>
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
import type { ThemeSettingsProps } from '@/components/Themes/types';
import { routes } from 'vue-router/auto-routes';
import { useMenu } from '../components/Menu/useMenu';
import { darken } from '@/utils';

interface ThemeSettingsOption extends HeaderProps {
  username: string;
  avatar: string;
  avatarMenu: DropDownMenuItem[];
}

const router = useRouter();

const localSettings = reactive<ThemeSettingsOption>({
  // 折叠菜单
  collapse: false,
  locales: [
    {
      text: '中文',
      name: 'zh-CN',
      icon: 'uil:letter-chinese-a'
    },
    {
      text: 'English',
      name: 'en',
      icon: 'ri:english-input'
    }
  ],
  username: 'toimc',
  avatar: '',
  // TODO
  avatarMenu: [],
  settings: {
    menuWidth: 280
  } as ThemeSettingsProps
});
const { locales, username, avatar, avatarMenu } = toRefs(localSettings);

function generateMenuData(routes: RouteRecordRaw[]): AppRouteMenuItem[] {
  const menuData: AppRouteMenuItem[] = [];

  routes.forEach((route) => {
    let menuItem: AppRouteMenuItem = {
      path: route.path,
      name: route.name,
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

const { getTopMenus, getSubMenus } = useMenu();

const menus = computed(() => generateMenuData(routes));
const settings = computed(() => localSettings.settings);
// 混合菜单
const mixMenus = computed(() =>
  settings.value?.mode === 'mixbar' ? getTopMenus(menus.value) : menus.value
);
const menuWidth = computed(() => (localSettings.settings ? localSettings.settings.menuWidth : 240));

// 判断二组菜单的顶级是否所有的菜单项都设置了icon
const isFullIcons = computed(() =>
  getSubMenus(menus.value).every(
    (item) => typeof item.meta?.icon !== 'undefined' && item.meta?.icon
  )
);

// 混合左侧双菜单模式下的菜单宽度
const mixMenuWidth = computed(() => {
  if (settings.value?.mode === 'mixbar' && isFullIcons.value) {
    return localSettings.collapse ? 'auto' : menuWidth.value + 'px';
  } else {
    return localSettings.collapse ? '64px' : menuWidth.value + 'px';
  }
});

const handleSettigsChange = (themeSettings: ThemeSettingsProps) => {
  localSettings.settings = themeSettings;
};

const handleSelect = (item: AppRouteMenuItem) => {
  if (item && item.name) {
    router.push(item.name as string);
  }
};
</script>

<style lang="scss" scoped>
.mixbar {
  :deep(.el-menu-item) {
    height: auto;
    line-height: unset !important;
    flex-direction: column;
    margin-bottom: 15px;
    padding: 4px 0 !important;
    svg {
      margin-right: 0;
      margin-bottom: 10px;
    }
  }
}
</style>
