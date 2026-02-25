const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;

const firebaseMocks = {
  '@react-native-firebase/app': path.resolve(projectRoot, 'src/mocks/firebase/app.ts'),
  '@react-native-firebase/auth': path.resolve(projectRoot, 'src/mocks/firebase/auth.ts'),
  '@react-native-firebase/firestore': path.resolve(projectRoot, 'src/mocks/firebase/firestore.ts'),
  '@react-native-firebase/storage': path.resolve(projectRoot, 'src/mocks/firebase/storage.ts'),
  'firebase/firestore': path.resolve(projectRoot, 'src/mocks/firebase/firestore-js.ts'),
};

module.exports = (() => {
  const config = getDefaultConfig(projectRoot);
  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  };

  const originalResolveRequest = resolver.resolveRequest;

  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg'],
    nodeModulesPaths: [path.resolve(projectRoot, 'node_modules')],
    resolveRequest: (context, moduleName, platform) => {
      if (firebaseMocks[moduleName]) {
        return {
          filePath: firebaseMocks[moduleName],
          type: 'sourceFile',
        };
      }
      if (originalResolveRequest) {
        return originalResolveRequest(context, moduleName, platform);
      }
      return context.resolveRequest(context, moduleName, platform);
    },
  };

  return config;
})();
