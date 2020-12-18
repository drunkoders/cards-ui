const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: [
    "../src/components/**/*.stories.mdx",
    "../src/components/**/stories/*.story.@(ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-controls",
    "@storybook/addon-actions"
  ],
  webpackFinal: async (config, { configType }) => {
    if (!config.resolve.plugins) {
      config.resolve.plugins = [];
    }
    config.resolve.plugins.push(new TsconfigPathsPlugin());
    return config;
  }
};