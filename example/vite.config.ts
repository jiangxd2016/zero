/// <reference types="vitest" />

import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import UnoCSS from 'unocss/vite';
import Inspect from 'vite-plugin-inspect';
import Jsx from '@vitejs/plugin-vue-jsx';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';

const envPrefix = 'VITE_';
const envPath = path.resolve(__dirname, './config');
export default defineConfig(({ mode, ...args }) => {
  const privateEnv = loadEnv(mode, envPath, envPrefix);

  return {
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    envDir: envPath,
    server: {
      port: 9527,
      proxy: {
        [privateEnv.VITE_BASE_API]: {
          target: 'http://localhost:1159',
          changeOrigin: true,
          rewrite: path => path.replace( privateEnv.VITE_BASE_API, ''),
        },
      },
    },
    plugins: [
      Inspect(),
      Vue(),
      Jsx(),
      AutoImport({
        include: [
          /\.[jt]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/, /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        imports: [
          'vue',
          'vue-i18n',
          'vue-router',
          '@vueuse/core',
        ],
        dts: true,
        dirs: [
          './src/hooks',
          './src/stores',
        ],
        vueTemplate: true,
        resolvers: [ArcoResolver()],
      }),
      Components({
        dts: true,
        resolvers: [
          ArcoResolver({
            sideEffect: true
          })
        ]
      }),
      UnoCSS(),

    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vender: ['@arco-design/web-vue'],
            echarts: ['echarts'],
          },
        },
      },
    },
  };
});
