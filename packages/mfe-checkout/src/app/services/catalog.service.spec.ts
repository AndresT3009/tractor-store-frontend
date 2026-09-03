import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CATALOG_API_URL, CatalogService } from './catalog.service';

describe('CatalogService', () => {
  let service: CatalogService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: CATALOG_API_URL, useValue: 'http://api.test/api/catalog' },
      ],
    });

    service = TestBed.inject(CatalogService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('requests the store list', () => {
    service.getStores().subscribe();

    const req = httpMock.expectOne('http://api.test/api/catalog/stores');
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });
});
