const { join } = require('path');

module.exports = {
  presets: [require('../../packages/design-tokens/tailwind.preset.js')],
  // El shell compone las rutas de los 3 MFEs en el navegador vía Module Federation, pero solo su
  // propio CSS se enlaza en producción (nadie carga el <link> del CSS de un remoto) — sin escanear
  // también el código de los MFEs aquí, las clases de Tailwind que ellos usan (p. ej.
  // "aspect-video", "object-cover" del teaser de mfe-explore) quedan purgadas del CSS que
  // realmente se sirve al componer todo. Las 4 apps comparten el mismo content por esta razón.
  content: [
    join(__dirname, 'src/**/*.{html,ts}'),
    join(__dirname, '../../packages/mfe-explore/src/**/*.{html,ts}'),
    join(__dirname, '../../packages/mfe-decide/src/**/*.{html,ts}'),
    join(__dirname, '../../packages/mfe-checkout/src/**/*.{html,ts}'),
    join(__dirname, '../../packages/ts-design-system/src/**/*.{html,ts}'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
