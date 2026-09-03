import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import type { Cart } from 'shared-catalog';
import { CartService } from '../../services/cart.service';

export const cartResolver: ResolveFn<Cart> = () => inject(CartService).getCart();
