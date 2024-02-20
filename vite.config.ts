import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path'; // 正确导入 path 模块
import { viteReactSvgComponentPlugin } from 'svg-component-vite-plugin/dist/react';

const r = (p: string): string => path.resolve(__dirname, p); // 使用 path.resolve

export default defineConfig({
  server: {
    port: 8900,
    host: '0.0.0.0',
    proxy: {
      '/dev-api': {
        target: 'http://192.210.220.185/', // 后端服务的地址和端口
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev-api/, ''),
      },
    },
  },

  resolve: {
    alias: {
      '@': r('./src'),
      '@c': r('./src/components'),
      '@p': r('./src/pages'),
      process: 'process/browser',
      stream: 'stream-browserify',
      zlib: 'browserify-zlib',
      util: 'util',
    },
  },
  plugins: [
    react(),
    viteReactSvgComponentPlugin({
      include: 'src/assets/svg/**/*.svg*',
    }),
  ],
});
