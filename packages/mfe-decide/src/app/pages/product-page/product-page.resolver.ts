import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import type { ProductDetail } from 'shared-catalog';
import { ProductFacade } from '../../state/product.facade';
import { decodeVariantQueryParams } from './variant-url.util';

export const productResolver: ResolveFn<ProductDetail> = (route) => {
  const id = route.paramMap.get('id') ?? '';
  const initialSku = decodeVariantQueryParams(route.queryParams);
  return inject(ProductFacade).loadProduct(id, initialSku);
};
