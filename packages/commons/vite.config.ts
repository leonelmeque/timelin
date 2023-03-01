import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: './dist',
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        extend: true,
        globals: { react: 'React', 'react-dom': 'ReactDOM' },
      },
    },
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['cjs'],
      fileName: 'index',
      name: '@todo/commons',
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [
          'babel-plugin-styled-components',
          'babel-plugin-transform-import-meta',
        ],
      },
    }),
    dts({
      insertTypesEntry: true,
    }),
  ],
});
