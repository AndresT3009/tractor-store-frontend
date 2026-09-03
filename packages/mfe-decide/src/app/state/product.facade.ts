import { inject, Injectable } from '@angular/core';
import { ProductActions } from './product.actions';
import { ProductSelectors } from './product.selectors';

@Injectable({ providedIn: 'root' })
export class ProductFacade {
  private readonly actions = inject(ProductActions);
  private readonly selectors = inject(ProductSelectors);

  readonly product = this.selectors.product;
  readonly selectedSku = this.selectors.selectedSku;
  readonly selectedVariant = this.selectors.selectedVariant;
  readonly stock = this.selectors.stock;
  readonly recommendations = this.selectors.recommendations;

  loadProduct(id: string, initialSku: string | null) {
    return this.actions.loadProduct(id, initialSku);
  }

  selectVariant(sku: string) {
    return this.actions.selectVariant(sku);
  }
}
