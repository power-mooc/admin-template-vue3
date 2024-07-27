import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import './assets/main.css';
import 'element-plus/theme-chalk/dark/css-vars.css'; // dark mode
import '@unocss/reset/tailwind.css';
import 'virtual:uno.css';
// 国际化
import i18n from './modules/i18n';

const app = createApp(App);

app.use(i18n);
app.use(createPinia());
app.use(router);

app.mount('#app');
