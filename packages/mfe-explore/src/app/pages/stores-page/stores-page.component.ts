import { Component, inject } from '@angular/core';
import { CatalogFacade } from '../../state/catalog.facade';

@Component({
  selector: 'app-stores-page',
  standalone: true,
  template: `
    <h1 class="mb-8 text-2xl font-semibold text-text">Our Stores</h1>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      @for (store of catalog.stores(); track store.id) {
        <div class="rounded-lg border border-border bg-surface p-4 shadow-sm">
          <p class="font-semibold text-text">{{ store.name }}</p>
          <p class="text-sm text-text-muted">{{ store.addressLine }}</p>
          <p class="text-sm text-text-muted">{{ store.city }}</p>
        </div>
      }
    </div>
  `,
})
export class StoresPageComponent {
  protected readonly catalog = inject(CatalogFacade);
}
