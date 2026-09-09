import { initFederation } from '@angular-architects/native-federation';

initFederation({
  mfeExplore: 'http://localhost:4201/remoteEntry.json',
  mfeCheckout: 'http://localhost:4203/remoteEntry.json',
})
  .catch((err) => console.error(err))
  .then(() => import('./bootstrap'))
  .catch((err) => console.error(err));
