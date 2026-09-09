import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs';
import type { Cart } from 'shared-catalog';
import { CART_ITEM_ADDED_EVENT } from 'shared-catalog';
import { CartService } from '../services/cart.service';
import { CartStore } from './cart.store';

@Injectable({ providedIn: 'root' })
export class CartActions {
  private readonly cartService = inject(CartService);
  private readonly store = inject(CartStore);

  loadCart(): Observable<Cart> {
    return this.cartService.getCart().pipe(tap((cart) => this.store.setCart(cart)));
  }

  addItem(sku: string): Observable<Cart> {
    return this.cartService.addItem(sku).pipe(
      tap((cart) => {
        this.store.setCart(cart);
        window.dispatchEvent(
          new CustomEvent(CART_ITEM_ADDED_EVENT, {
            detail: { sku, totalItems: cart.totalQuantity },
          })
        );
      })
    );
  }

  removeItem(sku: string): Observable<Cart> {
    return this.cartService.removeItem(sku).pipe(tap((cart) => this.store.setCart(cart)));
  }
}
