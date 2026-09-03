import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { CategoryData } from 'shared-catalog';
import { TsProductCardComponent } from 'ts-design-system';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [RouterLink, TsProductCardComponent],
  template: `
    <div class="mb-8 flex items-center justify-between">
      <h1 class="text-2xl font-semibold text-text">All Machines</h1>
      <nav class="flex gap-2 text-sm">
        @for (available of category.availableFilters; track available) {
          <a
            [routerLink]="['/category', available]"
            class="rounded-full px-3 py-1"
            [class.bg-primary]="available === filter"
            [class.text-white]="available === filter"
            [class.bg-surface-muted]="available !== filter"
          >
            {{ available }}
          </a>
        }
      </nav>
    </div>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      @for (product of category.products; track product.id) {
        <ts-product-card [product]="product" (chosen)="onProductChosen($event)" />
      }
    </div>
  `,
})
export class CategoryPageComponent {
  @Input() filter = 'all';
  @Input({ required: true }) category!: CategoryData;

  onProductChosen(productId: string): void {
    // La navegación al detalle real vive en mfe-decide; sin Module Federation (Fase 9) todavía no
    // hay forma de cruzar a esa app desde aquí.
    console.info('product chosen', productId);
  }
}
