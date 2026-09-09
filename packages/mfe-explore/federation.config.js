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

  skip: ['rxjs/ajax', 'rxjs/fetch', 'rxjs/testing', 'rxjs/webSocket'],
});
