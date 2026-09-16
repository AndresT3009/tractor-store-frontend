import { Route } from '@angular/router';
import { homeResolver } from './pages/home-page/home-page.resolver';
import { categoryResolver } from './pages/category-page/category-page.resolver';
import { storesResolver } from './pages/stores-page/stores-page.resolver';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home-page/home-page.component').then((m) => m.HomePageComponent),
    resolve: { home: homeResolver },
  },
  {
    path: 'category/:filter',
    loadComponent: () =>
      import('./pages/category-page/category-page.component').then(
        (m) => m.CategoryPageComponent
      ),
    resolve: { category: categoryResolver },
  },
  {
    path: 'stores',
    loadComponent: () =>
      import('./pages/stores-page/stores-page.component').then((m) => m.StoresPageComponent),
    resolve: { stores: storesResolver },
  },
];
