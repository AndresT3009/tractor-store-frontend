import { Injectable, signal } from '@angular/core';
import type { CategoryData, HomeData, Store } from 'shared-catalog';

interface CatalogState {
  home: HomeData | null;
  category: CategoryData | null;
  activeFilter: string;
  stores: Store[] | null;
}

const initialState: CatalogState = {
  home: null,
  category: null,
  activeFilter: 'all',
  stores: null,
};

@Injectable({ providedIn: 'root' })
export class CatalogStore {
  private readonly state = signal<CatalogState>(initialState);
  readonly snapshot = this.state.asReadonly();

  setHome(home: HomeData): void {
    this.state.update((current) => ({ ...current, home }));
  }

  setCategory(category: CategoryData, filter: string): void {
    this.state.update((current) => ({ ...current, category, activeFilter: filter }));
  }

  setStores(stores: Store[]): void {
    this.state.update((current) => ({ ...current, stores }));
  }
}
