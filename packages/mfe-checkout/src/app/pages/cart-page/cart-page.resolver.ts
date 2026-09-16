import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import type { Cart } from 'shared-catalog';
import { CartFacade } from '../../state/cart.facade';

export const cartResolver: ResolveFn<Cart> = () => inject(CartFacade).loadCart();
