const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'mfe-explore',

  exposes: {
    './Routes': './packages/mfe-explore/src/app/app.routes.ts',
    './Header': './packages/mfe-explore/src/app/components/header/header.component.ts',
    './Footer': './packages/mfe-explore/src/app/components/footer/footer.component.ts',
    './Recommendations':
      './packages/mfe-explore/src/app/components/recommendations/recommendations.component.ts',
    './StorePicker':
      './packages/mfe-explore/src/app/components/store-picker/store-picker.component.ts',
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
