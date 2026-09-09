const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'mfe-checkout',

  exposes: {
    './Routes': './packages/mfe-checkout/src/app/app.routes.ts',
    './AddToCart': './packages/mfe-checkout/src/app/components/add-to-cart/add-to-cart.component.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

  skip: ['rxjs/ajax', 'rxjs/fetch', 'rxjs/testing', 'rxjs/webSocket'],
});
