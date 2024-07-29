import type { AppRouteMenuItem } from './types';

export function useMenu() {
  function generateMenuKeys(menus: AppRouteMenuItem[], level = '1') {
    const filteredMenus = menus.filter((m) => !m.meta?.hideMenu);

    let i = 0;
    filteredMenus.forEach((item) => {
      const key = level.indexOf('-') !== -1 ? `${level}${i}` : `${i}`;
      item.meta = {
        ...item.meta,
        key
      };

      if (item.children && item.children.length > 0) {
        return (item.children = generateMenuKeys(item.children, `${key}-`));
      }
      i++;
    });
    return filteredMenus;
  }

  function getIndex(item: AppRouteMenuItem): string {
    return `${item.meta?.key}`;
  }

  function menuHasChildren(item: AppRouteMenuItem): boolean {
    return !item.meta?.hideMenu && Array.isArray(item.children) && item.children.length > 0;
  }

  return { generateMenuKeys, getIndex, menuHasChildren };
}
