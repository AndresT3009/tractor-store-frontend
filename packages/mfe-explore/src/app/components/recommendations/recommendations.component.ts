import { Component, inject, Input, OnChanges } from '@angular/core';
import type { Recommendation } from 'shared-catalog';
import { TsProductCardComponent } from 'ts-design-system';
import { CatalogService } from '../../services/catalog.service';

// Expuesto vía Module Federation: mfe-decide lo embebe en la página de producto, pasándole el
// sku seleccionado — las recomendaciones son responsabilidad de explore, no de decide.
@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [TsProductCardComponent],
  template: `
    @if (recommendations.length > 0) {
      <div class="mt-16">
        <h2 class="mb-4 text-lg font-semibold text-text">You might also like</h2>
        <div class="grid grid-cols-2 gap-6 sm:grid-cols-4">
          @for (recommendation of recommendations; track recommendation.sku) {
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
export class RecommendationsComponent implements OnChanges {
  @Input({ required: true }) sku!: string;

  private readonly catalogService = inject(CatalogService);

  recommendations: Recommendation[] = [];

  ngOnChanges(): void {
    this.catalogService
      .getRecommendations([this.sku])
      .subscribe((recommendations) => (this.recommendations = recommendations));
  }
}
