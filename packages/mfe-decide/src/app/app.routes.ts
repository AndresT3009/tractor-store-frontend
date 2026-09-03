import { Route } from '@angular/router';
import { productResolver } from './pages/product-page/product-page.resolver';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'product/smartfarm-titan', pathMatch: 'full' },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./pages/product-page/product-page.component').then((m) => m.ProductPageComponent),
    resolve: { product: productResolver },
  },
];
