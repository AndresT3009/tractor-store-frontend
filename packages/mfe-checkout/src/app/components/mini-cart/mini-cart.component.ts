import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CART_ITEM_ADDED_EVENT } from 'shared-catalog';
import { CartFacade } from '../../state/cart.facade';

// Expuesto vía Module Federation: el shell lo embebe en el header, visible en todas las
// páginas. Cuando el "Add to basket" embebido en mfe-decide agrega un ítem corre en su
// propio injector (otra instancia de CartStore) — por eso recarga el carrito real al recibir
// el evento, en vez de asumir que comparte estado en memoria con quien lo disparó.
@Component({
  selector: 'app-mini-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  template: `
    <a
      routerLink="/cart"
      class="flex items-center gap-2 text-sm text-text-muted"
      data-testid="mini-cart"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-5 w-5 text-primary"
        aria-hidden="true"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      <span>{{ cart.totalItems() }} items</span>
      <span class="font-semibold text-text">{{ cart.totalPrice() | currency }}</span>
    </a>
  `,
})
export class MiniCartComponent implements OnInit, OnDestroy {
  protected readonly cart = inject(CartFacade);

  private readonly onCartItemAdded = () => {
    this.cart.loadCart().subscribe();
  };

  ngOnInit(): void {
    this.cart.loadCart().subscribe();
    window.addEventListener(CART_ITEM_ADDED_EVENT, this.onCartItemAdded);
  }

  ngOnDestroy(): void {
    window.removeEventListener(CART_ITEM_ADDED_EVENT, this.onCartItemAdded);
  }
}
