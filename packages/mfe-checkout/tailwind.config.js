const { join } = require('path');

module.exports = {
  presets: [require('../../packages/design-tokens/tailwind.preset.js')],
  content: [
    join(__dirname, 'src/**/*.{html,ts}'),
    join(__dirname, '../../packages/ts-design-system/src/**/*.{html,ts}'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
