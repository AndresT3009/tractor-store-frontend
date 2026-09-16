import { computed, inject, Injectable } from '@angular/core';
import { CatalogStore } from './catalog.store';

@Injectable({ providedIn: 'root' })
export class CatalogSelectors {
  private readonly store = inject(CatalogStore);

  readonly home = computed(() => this.store.snapshot().home);
  readonly category = computed(() => this.store.snapshot().category);
  readonly activeFilter = computed(() => this.store.snapshot().activeFilter);
  readonly stores = computed(() => this.store.snapshot().stores);
}
