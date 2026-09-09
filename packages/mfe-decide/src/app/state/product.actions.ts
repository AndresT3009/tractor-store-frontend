import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs';
import type { ProductDetail } from 'shared-catalog';
import { InventoryService } from '../services/inventory.service';
import { ProductService } from '../services/product.service';
import { ProductStore } from './product.store';

@Injectable({ providedIn: 'root' })
export class ProductActions {
  private readonly productService = inject(ProductService);
  private readonly inventoryService = inject(InventoryService);
  private readonly store = inject(ProductStore);

  loadProduct(id: string, initialSku: string | null): Observable<ProductDetail> {
    return this.productService.getProduct(id).pipe(
      tap((product) => {
        this.store.setProduct(product);
        const hasInitialSku = product.variants.some((variant) => variant.sku === initialSku);
        const sku = hasInitialSku ? (initialSku as string) : product.variants[0]?.sku;
        if (sku) {
          this.selectVariant(sku).subscribe();
        }
      })
    );
  }

  selectVariant(sku: string): Observable<unknown> {
    this.store.setSelectedSku(sku);
    return this.inventoryService.getStock(sku).pipe(tap((stock) => this.store.setStock(stock)));
  }
}
