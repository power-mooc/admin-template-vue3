import type { App } from 'vue';
import { createI18n, type Locale } from 'vue-i18n';

const i18n = createI18n({
  legacy: false,
  locale: '',
  messages: {}
});

const localesMap = Object.fromEntries(
  // import.meta.globa -> filename: ./locale/en.js: () => import(./locale/en.js)
  // -> [./locale/en.js: () => import(./locale/en.js] => ['en', () => import('./locale/en.js')]

  // { en: function () {}, zh-CN: function () {} }
  Object.entries(import.meta.glob('../../locales/*.json')).map(([path, loadLocale]) => [
    path.match(/([\w-]*)\.json$/)?.[1],
    loadLocale
  ])
) as Record<Locale, () => Promise<{ default: Record<string, string> }>>;
localesMap['zh-CN']().then(() => {});

// 思路一：过滤部分不相关的.mjs的locales文件
// 思路二：动态的匹配vite glob内容 -> 不太可能
const elementPlusLocalesMap = Object.fromEntries(
  Object.entries(import.meta.glob('../../node_modules/element-plus/dist/locale/*.mjs')).map(
    ([path, loadLocale]) => [path.match(/([\w-]*)\.mjs$/)?.[1], loadLocale]
  )
) as Record<Locale, () => Promise<{ default: Record<string, string> }>>;

export const availableLocales = Object.keys(localesMap);
// lodash pick
// for -> {}
// reduce
const filterEPLocalesMap = availableLocales.reduce(
  (acc: Record<Locale, () => Promise<{ default: Record<string, string> }>>, locale: Locale) => {
    return { ...acc, [locale]: elementPlusLocalesMap[locale.toLowerCase()] };
  },
  {}
);

const loadedLanguages: string[] = [];

export function setI18nLanguage(locale: string) {
  i18n.global.locale.value = locale;
  if (typeof document !== 'undefined') {
    document.querySelector('html')?.setAttribute('lang', locale);
  }
}

export async function loadLocaleMessages(lang: string) {
  // 如果已经被i18n插件进行加载的，则直接设置i18n.locale
  if (i18n.global.locale.value === lang || loadedLanguages.includes(lang)) {
    return setI18nLanguage(lang);
  }
  // load locale messages with dynamic import
  const messages = await localesMap[lang]();
  const messagesEP = await filterEPLocalesMap[lang]();
  // set locale and locale message
  i18n.global.setLocaleMessage(lang, {
    ...messages.default,
    ...messagesEP.default
  });
  loadedLanguages.push(lang);
  return setI18nLanguage(lang);
}

export default {
  install(app: App) {
    app.use(i18n);
    loadLocaleMessages('zh-CN');
  }
};
