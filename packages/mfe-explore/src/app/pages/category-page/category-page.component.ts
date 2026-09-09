import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TsProductCardComponent } from 'ts-design-system';
import { CatalogFacade } from '../../state/catalog.facade';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [RouterLink, TsProductCardComponent],
  template: `
    <div class="mb-8 flex items-center justify-between">
      <h1 class="text-2xl font-semibold text-text">All Machines</h1>
      <nav class="flex gap-2 text-sm">
        @for (available of catalog.category()?.availableFilters; track available) {
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
      @for (product of catalog.category()?.products; track product.id) {
        <ts-product-card [product]="product" (chosen)="onProductChosen($event)" />
      }
    </div>
  `,
})
export class CategoryPageComponent {
  @Input() filter = 'all';
  protected readonly catalog = inject(CatalogFacade);
  private readonly router = inject(Router);

  onProductChosen(productId: string): void {
    // La página de detalle es de mfe-decide, pero al estar compuestas por el shell en el mismo
    // Router es una navegación de ruta normal, no una llamada cross-MFE.
    this.router.navigate(['/product', productId]);
  }
}
