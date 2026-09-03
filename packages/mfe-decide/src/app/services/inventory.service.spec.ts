import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { INVENTORY_API_URL, InventoryService } from './inventory.service';

describe('InventoryService', () => {
  let service: InventoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: INVENTORY_API_URL, useValue: 'http://api.test/api/inventory' },
      ],
    });

    service = TestBed.inject(InventoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('requests stock for a sku', () => {
    service.getStock('SF-TITAN-COPPER').subscribe();

    const req = httpMock.expectOne('http://api.test/api/inventory/SF-TITAN-COPPER');
    expect(req.request.method).toBe('GET');
    req.flush({ sku: 'SF-TITAN-COPPER', quantityAvailable: 6, available: true });
  });
});
