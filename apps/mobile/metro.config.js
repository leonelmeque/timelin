const { getDefaultConfig } = require('expo/metro-config');
const { withUniwindConfig } = require('uniwind/metro');
const { withStorybook } = require('@storybook/react-native/metro/withStorybook');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

module.exports = (() => {
  const config = getDefaultConfig(projectRoot);
  const { transformer, resolver } = config;

  config.watchFolders = [...(config.watchFolders || []), monorepoRoot];

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  };

  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg'],
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(monorepoRoot, 'node_modules'),
    ],
  };

  const storybookConfig = withStorybook(config, {
    enabled: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true',
    configPath: './.rnstorybook',
  });

  return withUniwindConfig(storybookConfig, {
    cssEntryFile: './global.css',
    dtsFile: './src/uniwind-types.d.ts',
    polyfills: {
      rem: 14,
    },
  });
})();
