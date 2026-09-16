const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'mfe-checkout',

  exposes: {
    './Routes': './packages/mfe-checkout/src/app/app.routes.ts',
    './AddToCart': './packages/mfe-checkout/src/app/components/add-to-cart/add-to-cart.component.ts',
    './MiniCart': './packages/mfe-checkout/src/app/components/mini-cart/mini-cart.component.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

  // Sin esta lista, native federation trata TODOS los alias de tsconfig.base.json (paths) como
  // "shared mappings" a compilar en solitario — incluido 'mock-api/node', que solo tiene sentido
  // en Jest (usa async_hooks y interceptores de Node) y nunca en el navegador. Se listan a mano
  // los que sí hace falta compartir así.
  sharedMappings: ['shared-catalog', 'ts-design-system', 'mock-api', 'mock-api/browser'],

  skip: ['rxjs/ajax', 'rxjs/fetch', 'rxjs/testing', 'rxjs/webSocket'],
});
