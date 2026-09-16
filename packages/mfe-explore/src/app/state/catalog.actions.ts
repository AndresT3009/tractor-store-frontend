import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs';
import type { CategoryData, HomeData, Store } from 'shared-catalog';
import { CatalogService } from '../services/catalog.service';
import { CatalogStore } from './catalog.store';

@Injectable({ providedIn: 'root' })
export class CatalogActions {
  private readonly catalogService = inject(CatalogService);
  private readonly store = inject(CatalogStore);

  loadHome(): Observable<HomeData> {
    return this.catalogService.getHome().pipe(tap((home) => this.store.setHome(home)));
  }

  loadCategory(filter: string): Observable<CategoryData> {
    return this.catalogService
      .getCategory(filter)
      .pipe(tap((category) => this.store.setCategory(category, filter)));
  }

  loadStores(): Observable<Store[]> {
    return this.catalogService.getStores().pipe(tap((stores) => this.store.setStores(stores)));
  }
}
