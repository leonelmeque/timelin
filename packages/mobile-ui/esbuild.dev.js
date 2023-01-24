const esbuild = require('esbuild');
const { execSync } = require('child_process');
esbuild
  .context({
    entryPoints: ['src/index.ts'],
    outdir: 'dist',
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
    plugins: [
      {
        name: 'start',
        setup(build) {
          execSync('yarn ts-types');
          build.onStart(() => console.log('Starting to watch files'));
        },
      },
    ],
  })
  .then(({ watch }) => {
    watch();
  })
  .catch(() => process.exit(1));
