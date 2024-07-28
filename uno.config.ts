// uno.config.ts
import { defineConfig } from 'unocss';
// import presetWind from '@unocss/preset-wind'
import { presetWind, presetIcons } from 'unocss';
// 使用@apply规则
import transformerDirectives from '@unocss/transformer-directives';

export default defineConfig({
  presets: [
    // wind preset
    presetWind(),
    presetIcons({
      prefix: 'i-',
      extraProperties: {
        display: 'inline-block'
      }
    })
  ],
  safelist: ['ep:full-screen', 'ri:fullscreen-exit-fill'],
  transformers: [transformerDirectives()]
});
