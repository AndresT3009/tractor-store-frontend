import { Route } from '@angular/router';
import { cartResolver } from './pages/cart-page/cart-page.resolver';
import { storesResolver } from './pages/checkout-page/checkout-page.resolver';
import { unsavedChangesGuard } from './pages/checkout-page/checkout-page.guard';
import { orderResolver } from './pages/thanks-page/thanks-page.resolver';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'cart', pathMatch: 'full' },
  {
    path: 'cart',
    loadComponent: () =>
      import('./pages/cart-page/cart-page.component').then((m) => m.CartPageComponent),
    resolve: { cart: cartResolver },
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./pages/checkout-page/checkout-page.component').then(
        (m) => m.CheckoutPageComponent
      ),
    resolve: { stores: storesResolver },
    canDeactivate: [unsavedChangesGuard],
  },
  {
    path: 'thanks/:id',
    loadComponent: () =>
      import('./pages/thanks-page/thanks-page.component').then((m) => m.ThanksPageComponent),
    resolve: { order: orderResolver },
  },
];
