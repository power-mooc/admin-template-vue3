import { fileURLToPath, URL } from 'node:url';
import path from 'path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// import VueMacros from 'unplugin-vue-macros'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

import { VueRouterAutoImports } from 'unplugin-vue-router';

import VueRouter from 'unplugin-vue-router/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Layouts from 'vite-plugin-vue-layouts';
import UnoCSS from 'unocss/vite';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';

import { VitePWA } from 'vite-plugin-pwa';

import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter(),
    vue(),
    vueJsx(),
    UnoCSS(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],

      // global imports to register
      imports: [
        'vue',
        // 'vue-router'
        VueRouterAutoImports,
        '@vueuse/core'
      ],
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      directoryAsNamespace: false,
      collapseSamePrefixes: true,
      resolvers: [ElementPlusResolver()]
    }),
    Layouts({
      layoutsDirs: 'src/layouts',
      defaultLayout: 'default'
    }),
    VitePWA({
      manifest: {
        name: 'Vite App',
        short_name: 'Vite App',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      registerType: 'autoUpdate',
      workbox: {
        navigateFallback: '/',
        // 如果大家有很大的资源文件，wasm bundle.js
        globPatterns: ['**/*.*']
      },
      devOptions: {
        enabled: true,
        suppressWarnings: true,
        navigateFallbackAllowlist: [/^\/$/],
        type: 'module'
      }
    }),
    viteMockServe({
      mockPath: 'mock',
      enable: false
    }),
    VueI18nPlugin({
      include: path.resolve(__dirname, './locales/**')
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
