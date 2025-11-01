import { defineConfig } from 'vite';

export default defineConfig({
  base: '/shell/',
  build: {
    sourcemap: true,
    outDir: '../../static-asset-server/mfes/shell',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'app-shell.js',
        assetFileNames: '[name].[ext]'
      }
    }
  }
});
