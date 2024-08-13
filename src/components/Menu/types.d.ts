import type { IconifyIcon, IconProps } from '@iconify/vue';
import type { CSSProperties } from 'vue';

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
  name?: string | Symbol;
  meta?: RouteMeta;
  children?: AppRouteMenuItem[];
  alias?: string;
  path: string;
  component?: Component;
}

export interface IconOptions {
  style: CSSProperties;
  class: string;
}

export interface DropDownProps<T> {
  items: T[];
  iconProps?: Partial<IconProps>;
  iconClass?: string;
  // current?: number
}

export type EmitSelectType = [
  index: string,
  indexPath: string[],
  item: MenuItemClicked,
  routerResult?: Promise<void | NavigationFailure>
];
export type OpenCloseType = [index: string, indexPath: string[]];
