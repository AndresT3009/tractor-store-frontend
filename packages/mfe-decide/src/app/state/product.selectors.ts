import { computed, inject, Injectable } from '@angular/core';
import { ProductStore } from './product.store';

@Injectable({ providedIn: 'root' })
export class ProductSelectors {
  private readonly store = inject(ProductStore);

  readonly product = computed(() => this.store.snapshot().product);
  readonly selectedSku = computed(() => this.store.snapshot().selectedSku);
  readonly stock = computed(() => this.store.snapshot().stock);

  readonly selectedVariant = computed(() =>
    this.store.snapshot().product?.variants.find((variant) => variant.sku === this.selectedSku())
  );
}
