import path from 'node:path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Unocss from 'unocss/vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Inspect from 'vite-plugin-inspect';

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, '../src')}/`,
      '@/': `${path.resolve(__dirname, '/src')}/`,
    },
  },
  plugins: [
    vueJsx(),
    Vue(),
    Pages(),
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        'vue-router',
        '@vueuse/core',
      ],
      dts: true,
    }),
    Components({
      dts: true,
    }),
    Inspect(),
    Unocss(),
  ],

});
