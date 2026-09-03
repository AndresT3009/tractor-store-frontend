import { CurrencyPipe } from '@angular/common';
import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import type { Cart } from 'shared-catalog';
import { TsButtonComponent } from 'ts-design-system';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, TsButtonComponent],
  template: `
    <h1 class="mb-8 text-2xl font-semibold text-text">Shopping Cart</h1>

    @if (currentCart(); as cart) {
      @if (cart.items.length === 0) {
        <p class="text-text-muted">Your cart is empty.</p>
      } @else {
        <ul class="divide-y divide-border">
          @for (item of cart.items; track item.sku) {
            <li class="flex items-center gap-4 py-4">
              <img [src]="item.imageUrl" [alt]="item.productName" class="h-16 w-16 rounded object-cover" />
              <div class="flex-1">
                <p class="font-semibold text-text">{{ item.productName }}</p>
                <p class="text-sm text-text-muted">Qty {{ item.quantity }}</p>
              </div>
              <p class="font-semibold text-text">{{ item.subtotal | currency }}</p>
              <ts-button variant="danger" (press)="removeItem(item.sku)">Remove</ts-button>
            </li>
          }
        </ul>

        <p class="mt-6 text-right text-lg font-semibold text-text">
          Total: {{ cart.totalPrice | currency }}
        </p>
      }

      <div class="mt-8 flex items-center justify-between">
        <a routerLink="/" class="text-sm text-text-muted">Continue shopping</a>
        <ts-button [disabled]="cart.items.length === 0" (press)="goToCheckout()">
          Checkout
        </ts-button>
      </div>
    }
  `,
})
export class CartPageComponent implements OnInit {
  @Input({ required: true }) cart!: Cart;

  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);
  protected readonly currentCart = signal<Cart | null>(null);

  ngOnInit(): void {
    this.currentCart.set(this.cart);
  }

  removeItem(sku: string): void {
    this.cartService.removeItem(sku).subscribe((cart) => this.currentCart.set(cart));
  }

  goToCheckout(): void {
    if ((this.currentCart()?.items.length ?? 0) > 0) {
      this.router.navigate(['/checkout']);
    }
  }
}
