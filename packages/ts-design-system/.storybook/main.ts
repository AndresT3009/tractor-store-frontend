import type { StorybookConfig } from '@storybook/angular';
import { join } from 'path';

const config: StorybookConfig = {
  stories: ['../**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: [],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  webpackFinal: async (webpackConfig) => {
    webpackConfig.module?.rules?.push({
      test: /\.css$/,
      include: join(__dirname, '../../design-tokens'),
      use: ['style-loader', 'css-loader'],
    });
    return webpackConfig;
  },
};

export default config;
