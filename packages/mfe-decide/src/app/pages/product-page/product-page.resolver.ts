import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import type { ProductDetail } from 'shared-catalog';
import { ProductService } from '../../services/product.service';

export const productResolver: ResolveFn<ProductDetail> = (route) => {
  const id = route.paramMap.get('id') ?? '';
  return inject(ProductService).getProduct(id);
};
