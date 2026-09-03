import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TsProductCardComponent, TsVariantOptionComponent } from 'ts-design-system';
import { ProductFacade } from '../../state/product.facade';
import { encodeVariantQueryParams } from './variant-url.util';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CurrencyPipe, TsVariantOptionComponent, TsProductCardComponent],
  template: `
    @if (facade.product(); as productDetail) {
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <img
          [src]="facade.selectedVariant()?.imageUrl"
          [alt]="productDetail.name"
          class="aspect-square w-full rounded-lg bg-surface-muted object-cover"
        />

        <div>
          <h1 class="text-2xl font-semibold text-text">{{ productDetail.name }}</h1>
          <p class="mt-2 text-text-muted">{{ productDetail.description }}</p>

          <ul class="mt-4 list-inside list-disc text-sm text-text-muted">
            @for (highlight of productDetail.highlights; track highlight) {
              <li>{{ highlight }}</li>
            }
          </ul>

          <div class="mt-6 flex gap-2">
            @for (variant of productDetail.variants; track variant.sku) {
              <ts-variant-option
                [variant]="variant"
                [selected]="variant.sku === facade.selectedSku()"
                (chosen)="selectVariant($event)"
              />
            }
          </div>

          <p class="mt-6 text-xl font-semibold text-text">{{ productDetail.price | currency }}</p>

          @if (facade.stock(); as currentStock) {
            <p class="mt-1 text-sm" [class.text-danger]="!currentStock.available">
              @if (currentStock.available) {
                {{ currentStock.quantityAvailable }} in stock, free shipping
              } @else {
                Out of stock
              }
            </p>
          }
        </div>
      </div>

      @if (facade.recommendations().length > 0) {
        <div class="mt-16">
          <h2 class="mb-4 text-lg font-semibold text-text">You might also like</h2>
          <div class="grid grid-cols-2 gap-6 sm:grid-cols-4">
            @for (recommendation of facade.recommendations(); track recommendation.sku) {
              <ts-product-card
                [product]="{
                  id: recommendation.productId,
                  name: recommendation.productName,
                  price: recommendation.price,
                  imageUrl: recommendation.imageUrl,
                  category: '',
                }"
              />
            }
          </div>
        </div>
      }
    }
  `,
})
export class ProductPageComponent {
  protected readonly facade = inject(ProductFacade);
  private readonly router = inject(Router);

  selectVariant(sku: string): void {
    this.facade.selectVariant(sku).subscribe();
    this.router.navigate([], {
      queryParams: encodeVariantQueryParams(sku),
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
