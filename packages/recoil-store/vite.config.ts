import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: './dist',
    rollupOptions: {
      external: ['react', 'react-dom', 'recoil', "@todo/commons"],
      output: {
        extend: true,
        globals: { react: 'React', 'react-dom': 'ReactDOM', recoil: 'recoil' },
      },
    },
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['cjs'],
      fileName: 'index',
      name: '@todo/recoil-state',
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
});
