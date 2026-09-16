import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import type { Order } from 'shared-catalog';
import { OrderService } from '../../services/order.service';

export const orderResolver: ResolveFn<Order> = (route) => {
  const id = route.paramMap.get('id') ?? '';
  return inject(OrderService).getOrder(id);
};
