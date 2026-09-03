import { CurrencyPipe } from '@angular/common';
import { Component, inject, Input, OnInit, signal } from '@angular/core';
import type { ProductDetail, Recommendation, Stock } from 'shared-catalog';
import { TsProductCardComponent, TsVariantOptionComponent } from 'ts-design-system';
import { InventoryService } from '../../services/inventory.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CurrencyPipe, TsVariantOptionComponent, TsProductCardComponent],
  template: `
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
      <img
        [src]="selectedVariant()?.imageUrl"
        [alt]="product.name"
        class="aspect-square w-full rounded-lg bg-surface-muted object-cover"
      />

      <div>
        <h1 class="text-2xl font-semibold text-text">{{ product.name }}</h1>
        <p class="mt-2 text-text-muted">{{ product.description }}</p>

        <ul class="mt-4 list-inside list-disc text-sm text-text-muted">
          @for (highlight of product.highlights; track highlight) {
            <li>{{ highlight }}</li>
          }
        </ul>

        <div class="mt-6 flex gap-2">
          @for (variant of product.variants; track variant.sku) {
            <ts-variant-option
              [variant]="variant"
              [selected]="variant.sku === selectedSku()"
              (chosen)="selectVariant($event)"
            />
          }
        </div>

        <p class="mt-6 text-xl font-semibold text-text">{{ product.price | currency }}</p>

        @if (stock(); as currentStock) {
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

    @if (recommendations().length > 0) {
      <div class="mt-16">
        <h2 class="mb-4 text-lg font-semibold text-text">You might also like</h2>
        <div class="grid grid-cols-2 gap-6 sm:grid-cols-4">
          @for (recommendation of recommendations(); track recommendation.sku) {
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
  `,
})
export class ProductPageComponent implements OnInit {
  @Input({ required: true }) product!: ProductDetail;

  private readonly inventoryService = inject(InventoryService);
  private readonly productService = inject(ProductService);

  protected readonly selectedSku = signal<string | null>(null);
  protected readonly stock = signal<Stock | null>(null);
  protected readonly recommendations = signal<Recommendation[]>([]);

  ngOnInit(): void {
    const firstVariant = this.product.variants[0];
    if (firstVariant) {
      this.selectVariant(firstVariant.sku);
    }
  }

  selectedVariant() {
    return this.product.variants.find((variant) => variant.sku === this.selectedSku());
  }

  selectVariant(sku: string): void {
    this.selectedSku.set(sku);
    this.inventoryService.getStock(sku).subscribe((stock) => this.stock.set(stock));
    this.productService
      .getRecommendations([sku])
      .subscribe((recommendations) => this.recommendations.set(recommendations));
  }
}
