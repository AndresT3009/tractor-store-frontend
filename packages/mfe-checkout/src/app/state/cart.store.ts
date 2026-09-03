import { Injectable, signal } from '@angular/core';
import type { Cart } from 'shared-catalog';

interface CartState {
  cart: Cart | null;
}

@Injectable({ providedIn: 'root' })
export class CartStore {
  private readonly state = signal<CartState>({ cart: null });
  readonly snapshot = this.state.asReadonly();

  setCart(cart: Cart): void {
    this.state.update((current) => ({ ...current, cart }));
  }
}
