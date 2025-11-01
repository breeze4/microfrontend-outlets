import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production')
  },
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/main.tsx'),
      name: 'HotlistsDashboardMFE',
      fileName: () => 'main.js',
      formats: ['iife']
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    },
    outDir: '../../static-asset-server/mfes/pages/hotlists/main/root/hotlists-dashboard',
    emptyOutDir: true
  }
});
