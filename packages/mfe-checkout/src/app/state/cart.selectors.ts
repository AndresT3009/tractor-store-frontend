import { computed, inject, Injectable } from '@angular/core';
import { CartStore } from './cart.store';

@Injectable({ providedIn: 'root' })
export class CartSelectors {
  private readonly store = inject(CartStore);

  readonly cart = computed(() => this.store.snapshot().cart);
  readonly items = computed(() => this.store.snapshot().cart?.items ?? []);
  readonly totalItems = computed(() => this.store.snapshot().cart?.totalQuantity ?? 0);
  readonly totalPrice = computed(() => this.store.snapshot().cart?.totalPrice ?? 0);
}
