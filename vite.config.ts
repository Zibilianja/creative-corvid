import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ command }) => {
  const isDev = command === 'serve';
  return {
    plugins: [vue()],
    root: isDev ? 'demo' : process.cwd(),
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'CreativeCorvidStyleLibrary',
        fileName: (format) => `creative-corvid-style-library.${format}.js`,
        formats: ['es', 'umd'],
      },
      rollupOptions: {
        external: ['vue', 'pinia'],
        output: {
          globals: {
            vue: 'Vue',
            pinia: 'Pinia',
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '~': path.resolve(__dirname, 'demo/src'),
      },
    },
  };
});
