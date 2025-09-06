import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'path';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ command }) => {
  const isDev = command === 'serve';
  return {
    plugins: [vue(), dts({ entryRoot: 'src', outDir: 'dist/types' })],
    root: isDev ? 'demo' : process.cwd(),
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'CreativeCorvidStyleLibrary',
        fileName: (format) => `creative-corvid-library.${format}.js`,
        formats: ['es', 'umd'],
      },
      rollupOptions: {
        external: [
          'vue',
          'pinia',
          'dayjs',
          'maska',
          'axios',
          'primevue',
          'primeicons',
          '@primeuix/themes',
          '@fortawesome/fontawesome-svg-core',
          '@fortawesome/free-solid-svg-icons',
          '@fortawesome/free-brands-svg-icons',
          '@fortawesome/vue-fontawesome',
        ],
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
