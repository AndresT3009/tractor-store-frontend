import { inject, Injectable } from '@angular/core';
import { CatalogActions } from './catalog.actions';
import { CatalogSelectors } from './catalog.selectors';

@Injectable({ providedIn: 'root' })
export class CatalogFacade {
  private readonly actions = inject(CatalogActions);
  private readonly selectors = inject(CatalogSelectors);

  readonly home = this.selectors.home;
  readonly category = this.selectors.category;
  readonly activeFilter = this.selectors.activeFilter;
  readonly stores = this.selectors.stores;

  loadHome() {
    return this.actions.loadHome();
  }

  loadCategory(filter: string) {
    return this.actions.loadCategory(filter);
  }

  loadStores() {
    return this.actions.loadStores();
  }
}
