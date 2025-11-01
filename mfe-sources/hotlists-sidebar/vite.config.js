import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production')
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.jsx'),
      name: 'HotlistsSidebarMFE',
      fileName: () => 'main.js',
      formats: ['iife']
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    },
    outDir: '../../static-asset-server/mfes/hotlists/navigation/sidebar',
    emptyOutDir: true
  }
});
