<template>
  <Menu mode="vertical" :data="data" class="w-[600px] mx-auto!"> </Menu>
</template>

<script setup lang="ts">
// import { loadLocaleMessages } from '@/modules/i18n'
import type { AppRouteMenuItem } from '@/components/Menu/types';
import { registerSW } from 'virtual:pwa-register';

definePage({
  meta: {
    title: 'pages.home',
    icon: 'mdi:home'
  }
});

// const locale = ref('zh-CN')

// watch(locale, () => {
//   loadLocaleMessages(locale.value)
// })

// onBeforeMount(async () => {
//   await loadIcons(arr.map((o) => json.prefix + ':' + o))
// })

const data: AppRouteMenuItem[] = [
  {
    name: 'Home',
    path: '/home',
    meta: {
      title: '首页',
      layout: 'default',
      order: 1,
      icon: 'ep:apple',
      hideMenu: false,
      disabled: false
    },
    children: [
      {
        name: 'About',
        path: '/home/about',
        meta: {
          title: '关于我们',
          layout: 'default',
          order: 2,
          // icon: 'info',
          hideMenu: false,
          disabled: false
        },
        children: [
          {
            name: 'Contact',
            path: '/home/about/contact',
            meta: {
              title: '联系我们',
              layout: 'default',
              order: 3,
              // icon: 'phone',
              hideMenu: false,
              disabled: false
            }
          }
        ]
      }
    ]
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    meta: {
      title: '大屏',
      layout: 'default',
      order: 4,
      icon: 'ep:bell',
      hideMenu: false,
      disabled: false
    }
  }
];

onMounted(() => {
  registerSW({
    immediate: true,
    onRegisteredSW(_url, registration) {
      setInterval(() => {
        registration && registration.update();
      }, 3600000);
    }
  });
});
</script>

<style scoped></style>

<route lang="yaml">
meta:
  layout: default
</route>
