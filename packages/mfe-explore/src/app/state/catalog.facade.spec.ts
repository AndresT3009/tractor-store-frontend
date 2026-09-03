import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import type { CategoryData, HomeData, Store } from 'shared-catalog';
import { CatalogService } from '../services/catalog.service';
import { CatalogFacade } from './catalog.facade';

describe('CatalogFacade', () => {
  let facade: CatalogFacade;
  let catalogService: jest.Mocked<CatalogService>;

  const home: HomeData = { categories: [] };
  const category: CategoryData = { products: [], availableFilters: ['all', 'classic'] };
  const stores: Store[] = [{ id: 's1', name: 'Store', addressLine: 'A', city: 'B' }];

  beforeEach(() => {
    catalogService = {
      getHome: jest.fn().mockReturnValue(of(home)),
      getCategory: jest.fn().mockReturnValue(of(category)),
      getStores: jest.fn().mockReturnValue(of(stores)),
    } as unknown as jest.Mocked<CatalogService>;

    TestBed.configureTestingModule({
      providers: [{ provide: CatalogService, useValue: catalogService }],
    });

    facade = TestBed.inject(CatalogFacade);
  });

  it('has no data before any action runs', () => {
    expect(facade.home()).toBeNull();
    expect(facade.category()).toBeNull();
    expect(facade.stores()).toBeNull();
  });

  it('populates home through loadHome', () => {
    facade.loadHome().subscribe();

    expect(facade.home()).toEqual(home);
  });

  it('populates category and activeFilter through loadCategory', () => {
    facade.loadCategory('classic').subscribe();

    expect(facade.category()).toEqual(category);
    expect(facade.activeFilter()).toBe('classic');
  });

  it('populates stores through loadStores', () => {
    facade.loadStores().subscribe();

    expect(facade.stores()).toEqual(stores);
  });
});
