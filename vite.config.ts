import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'CreativeCorvidStyleLIbrary',
      fileName: (format) => `creative-corvid-style-library.${format}.js`,
      formats: ['es'],
    },
    emptyOutDir: false,
  },
});
