const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const workspaceRoot = path.resolve(__dirname, '../..');
const projectRoot = __dirname;

module.exports = (() => {
  const config = getDefaultConfig(projectRoot);
  const { transformer, resolver } = config;

  config.watchFolders = [workspaceRoot];

  config.transformer = {
    ...transformer,
  };

  config.resolver = {
    ...resolver,
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(workspaceRoot, 'node_modules'),
    ],
  };

  return config;
})();
