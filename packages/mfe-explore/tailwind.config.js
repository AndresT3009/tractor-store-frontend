const { join } = require('path');

module.exports = {
  presets: [require('../../packages/design-tokens/tailwind.preset.js')],
  // El shell compone las rutas de los 3 MFEs en el navegador vía Module Federation, pero solo su
  // propio CSS se enlaza en producción (nadie carga el <link> del CSS de un remoto) — sin escanear
  // también el código de los otros MFEs y del shell aquí, las clases de Tailwind que ellos usan
  // quedan purgadas del CSS que realmente se sirve al componer todo. Las 4 apps comparten el mismo
  // content por esta razón (así, sin importar cuál CSS termine sirviéndose, trae el superset
  // completo de clases que puede necesitar cualquier combinación compuesta).
  content: [
    join(__dirname, 'src/**/*.{html,ts}'),
    join(__dirname, '../../apps/shell/src/**/*.{html,ts}'),
    join(__dirname, '../../packages/mfe-decide/src/**/*.{html,ts}'),
    join(__dirname, '../../packages/mfe-checkout/src/**/*.{html,ts}'),
    join(__dirname, '../../packages/ts-design-system/src/**/*.{html,ts}'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
