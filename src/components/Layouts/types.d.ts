import type { LocaleItem } from '../Themes/types';
import type { AvatarMenuProps } from '../Avatar/types';
import type { ThemeSettingsProps } from '../Themes/types';

export interface HeaderProps extends Partial<AvatarMenuProps> {
  collapse: boolean;
  // availableLocales: string[]
  locales: LocaleItem[];
  settings?: ThemeSettingsProps;
}
