import { loadRemoteModule } from '@angular-architects/native-federation';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => loadRemoteModule('mfeExplore', './Routes').then((m) => m.appRoutes),
  },
  {
    path: '',
    loadChildren: () => loadRemoteModule('mfeDecide', './Routes').then((m) => m.appRoutes),
  },
  {
    path: '',
    loadChildren: () => loadRemoteModule('mfeCheckout', './Routes').then((m) => m.appRoutes),
  },
];
