import type { IconifyIcon } from '@iconify/vue';

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<T>)
  | (() => Promise<typeof import('*.vue')>);

export interface RouteMeta extends Record<string | number | symbol, unknown> {
  title?: string;
  layout?: string;
  // 菜单排序
  order?: number;
  icon?: string | IconifyIcon;
  // 针对404这种页面
  hideMenu?: boolean;
  // 禁用
  disabled?: boolean;
}
export interface AppRouteMenuItem {
  name?: string;
  meta?: RouteMeta;
  children?: AppRouteMenuItem[];
  alias?: string;
  path: string;
  component?: Component;
}
