const esbuild = require('esbuild');
const reactnativePlugin = require('babel-plugin-react-native');

esbuild
  .build({
    entryPoints: ['src/index.ts'],
    outfile: 'dist/index.js',
    bundle: true,
    sourcemap: true,
    minify: true,
    format: 'cjs',
    target: ['esnext'],
    packages: 'external',
    external: [
      'react',
      'react-dom',
      'styled-components',
      'styled-components/native',
      'react-native',
    ],
  })
  .catch(() => process.exit(1));
