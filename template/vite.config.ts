import path from 'node:path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
import Jsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  /**
   *           target: 'http://localhost:1234',
          changeOrigin: true,
          rewrite: path => path.replace( privateEnv.VITE_BASE_API, ''),
   */
  server: {
    port: 3333,
    proxy: {
      '/dev-api': {
        target: 'http://localhost:1234',
        changeOrigin: true,
        rewrite: path => path.replace('/dev-api', ''),
      },
    },
  },
  plugins: [
    Vue(),
    Jsx(),
    UnoCSS(),
  ],
});
