const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
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
    // Prefer CJS builds over ESM to avoid import.meta in classic scripts.
    // Libraries like jotai ship ESM with import.meta.env which crashes
    // when Metro serves the bundle as a non-module <script>.
    unstable_conditionNames: ['require', 'react-native', 'default'],
  };

  return withNativeWind(config, { input: './global.css' });
})();
