import { initFederation } from '@angular-architects/native-federation';

initFederation({
  mfeCheckout: 'http://localhost:4203/remoteEntry.json',
})
  .catch((err) => console.error(err))
  .then(() => import('./bootstrap'))
  .catch((err) => console.error(err));
