import type { AppRouteMenuItem } from './types';

export function useMenu() {
  function filterAndOrderMenus(menus: AppRouteMenuItem[]) {
    return menus
      .filter((m) => !m.meta?.hideMenu)
      .sort((a, b) => {
        const orderA = a.meta?.order ?? 100;
        const orderB = b.meta?.order ?? 100;
        return orderA - orderB;
      })
      .map((item) => ({ ...item }));
  }

  function generateMenuKeys(menus: AppRouteMenuItem[], level = '1') {
    const filteredMenus = filterAndOrderMenus(menus);
    let i = 1;
    filteredMenus.forEach((item) => {
      const key = level.indexOf('-') !== -1 ? `${level}${i}` : `${i}`;
      item.meta = {
        ...item.meta,
        key
      };
      i++;

      if (item.children && item.children.length > 0) {
        return (item.children = generateMenuKeys(item.children, `${key}-`));
      }
    });
    return filteredMenus;
  }

  // 获取顶部菜单
  function getTopMenus(menus: AppRouteMenuItem[]) {
    const filteredMenus = filterAndOrderMenus(menus);
    return filteredMenus.map((item) => {
      delete item.children;
      return item;
    });
  }

  // 获取子菜单
  function getSubMenus(menus: AppRouteMenuItem[]) {
    const route = useRoute();
    const path = computed(() => route.path);
    const filteredMenus = filterAndOrderMenus(menus);
    return filteredMenus.find((item) => item.path === path.value)?.children || [];
  }

  function getIndex(item: AppRouteMenuItem): string {
    return `${item.meta?.key}`;
  }

  function menuHasChildren(item: AppRouteMenuItem): boolean {
    return !item.meta?.hideMenu && Array.isArray(item.children) && item.children.length > 0;
  }
  function getItem(menus: AppRouteMenuItem[], index: string) {
    for (let i = 0; i < menus.length; i++) {
      if (menus[i].meta?.key === index) {
        return menus[i];
      } else {
        if (menus[i].children && Array.isArray(menus[i].children)) {
          const item = getItem(menus[i].children!, index) as AppRouteMenuItem | undefined;
          if (item) {
            return item;
          }
        }
      }
    }
  }

  return {
    generateMenuKeys,
    filterAndOrderMenus,
    getSubMenus,
    getTopMenus,
    getIndex,
    menuHasChildren,
    getItem
  };
}
