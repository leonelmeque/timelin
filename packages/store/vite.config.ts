import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: './dist',
    rollupOptions: {
      external: ['react', 'react-dom', "@todo/commons"],
      output: {
        extend: true,
        globals: { react: 'React', 'react-dom': 'ReactDOM' },
      },
    },
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['cjs'],
      fileName: 'index',
      name: '@todo/store',
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
});
