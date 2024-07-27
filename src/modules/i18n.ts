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
  Object.entries(import.meta.glob('../../locales/*.js')).map(([path, loadLocale]) => [
    path.match(/([\w-]*)\.js$/)?.[1],
    loadLocale
  ])
) as Record<Locale, () => Promise<{ default: Record<string, string> }>>;
localesMap['zh-CN']().then((res) => console.log(res.default));

export const availableLocales = Object.keys(localesMap);

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
  // set locale and locale message
  i18n.global.setLocaleMessage(lang, {
    ...messages.default
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
