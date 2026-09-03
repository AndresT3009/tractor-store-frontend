import { inject, Injectable } from '@angular/core';
import { CartActions } from './cart.actions';
import { CartSelectors } from './cart.selectors';

@Injectable({ providedIn: 'root' })
export class CartFacade {
  private readonly actions = inject(CartActions);
  private readonly selectors = inject(CartSelectors);

  readonly cart = this.selectors.cart;
  readonly items = this.selectors.items;
  readonly totalItems = this.selectors.totalItems;
  readonly totalPrice = this.selectors.totalPrice;

  loadCart() {
    return this.actions.loadCart();
  }

  addItem(sku: string) {
    return this.actions.addItem(sku);
  }

  removeItem(sku: string) {
    return this.actions.removeItem(sku);
  }
}
