import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import type { Store } from 'shared-catalog';
import { EXPLORE_STORE_SELECTED_EVENT } from 'shared-catalog';
import { CatalogService } from '../../services/catalog.service';
import { StorePickerComponent } from './store-picker.component';

describe('StorePickerComponent', () => {
  let fixture: ComponentFixture<StorePickerComponent>;
  let catalogService: jest.Mocked<CatalogService>;

  const stores: Store[] = [
    {
      id: 'store-1',
      name: 'Denver Yard',
      addressLine: '1 Main St',
      city: 'Denver',
      imageUrl: '/images/stores/denver.jpg',
    },
  ];

  beforeEach(async () => {
    catalogService = {
      getStores: jest.fn().mockReturnValue(of(stores)),
    } as unknown as jest.Mocked<CatalogService>;

    await TestBed.configureTestingModule({
      imports: [StorePickerComponent],
      providers: [{ provide: CatalogService, useValue: catalogService }],
    }).compileComponents();

    fixture = TestBed.createComponent(StorePickerComponent);
    fixture.detectChanges();
  });

  it('loads stores on init', () => {
    expect(catalogService.getStores).toHaveBeenCalled();
    const options = fixture.nativeElement.querySelectorAll('option');
    expect(options.length).toBe(stores.length + 1);
  });

  it('dispatches a window CustomEvent with the selected store id', () => {
    const listener = jest.fn();
    window.addEventListener(EXPLORE_STORE_SELECTED_EVENT, listener);

    const select: HTMLSelectElement = fixture.nativeElement.querySelector('select');
    select.value = 'store-1';
    select.dispatchEvent(new Event('change'));

    expect(listener).toHaveBeenCalledTimes(1);
    const event = listener.mock.calls[0][0] as CustomEvent<{ storeId: string }>;
    expect(event.detail.storeId).toBe('store-1');

    window.removeEventListener(EXPLORE_STORE_SELECTED_EVENT, listener);
  });
});
