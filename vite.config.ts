import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'CreativeCorvidStyleLIbrary',
      fileName: (format) => `creative-corvid-style-library.${format}.js`,
      formats: ['es'],
    },
    emptyOutDir: false,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
