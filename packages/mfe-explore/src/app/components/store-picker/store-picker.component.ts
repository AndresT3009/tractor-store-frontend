import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { EXPLORE_STORE_SELECTED_EVENT } from 'shared-catalog';
import { CatalogFacade } from '../../state/catalog.facade';

// Expuesto vía Module Federation: mfe-checkout lo embebe en su página de checkout. La
// selección se comunica con un CustomEvent (no un @Output(), que NgComponentOutlet no
// permite enlazar) — mismo mecanismo ya usado para el carrito entre mfe-decide y el shell.
@Component({
  selector: 'app-store-picker',
  standalone: true,
  template: `
    <label class="block">
      <span class="text-sm text-text-muted">Store pickup</span>
      <select
        class="mt-1 w-full rounded border border-border px-3 py-2"
        [value]="selectedStoreId()"
        (change)="onSelect($event)"
      >
        <option value="" disabled>Choose a store</option>
        @for (store of stores(); track store.id) {
          <option [value]="store.id">{{ store.name }} — {{ store.city }}</option>
        }
      </select>
    </label>
  `,
})
export class StorePickerComponent implements OnInit {
  private readonly catalogFacade = inject(CatalogFacade);

  protected readonly stores = computed(() => this.catalogFacade.stores() ?? []);
  protected readonly selectedStoreId = signal('');

  ngOnInit(): void {
    if (!this.catalogFacade.stores()) {
      this.catalogFacade.loadStores().subscribe();
    }
  }

  onSelect(event: Event): void {
    const storeId = (event.target as HTMLSelectElement).value;
    this.selectedStoreId.set(storeId);
    window.dispatchEvent(new CustomEvent(EXPLORE_STORE_SELECTED_EVENT, { detail: { storeId } }));
  }
}
