import type { StorybookConfig } from "@storybook/react-native-web-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  framework: {
    name: "@storybook/react-native-web-vite",
    options: {},
  },
  addons: [],
  viteFinal: async (config) => {
    config.build = {
      ...config.build,
      commonjsOptions: {
        ...config.build?.commonjsOptions,
        transformMixedEsModules: true,
      },
    };
    return config;
  },
};

export default config;
