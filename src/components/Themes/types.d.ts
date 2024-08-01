import type { IconifyIcon } from '@iconify/vue';

export interface LocaleItem {
  // 显示名称
  text: string;
  icon?: IconifyIcon | string;
  // locales文件夹中的文件名, zh-CN -> 中文
  name: string;
}

export interface ThemeSettingsProps {
  theme?: string;
  backgroundColor: string;
  darkMode: boolean;
  menuWidth?: number;
  showLogo: boolean;
  showTabs: boolean;
  fixedHead: boolean;
  showBreadcrumb: boolean;
  mode: 'siderbar' | 'mix' | 'top' | 'mixbar';
}
